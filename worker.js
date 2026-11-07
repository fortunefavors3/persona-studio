export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const json = (data, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
    const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
    const fetchWithTimeout = (input, init = {}) => fetch(input, { ...init, signal: AbortSignal.timeout(60000) });
    const readJson = async (req, maxBytes) => {
      const declared = Number(req.headers.get("Content-Length") || 0);
      if (declared > maxBytes) throw new Error("Request body is too large.");
      const raw = await req.text();
      if (new TextEncoder().encode(raw).byteLength > maxBytes) throw new Error("Request body is too large.");
      return JSON.parse(raw);
    };
    const applyRateLimit = async (binding, message) => {
      if (!binding) return json({ error: "Image protection is temporarily unavailable. Please try again later." }, 503);
      try {
        const result = await binding.limit({ key: clientIp });
        return result.success ? null : json({ error: message }, 429);
      } catch {
        return json({ error: "Image protection is temporarily unavailable. Please try again later." }, 503);
      }
    };
    const origin = request.headers.get("Origin");
    if (origin && new URL(origin).host !== url.host) return json({ error: "Cross-origin requests are not allowed." }, 403);

    if (url.pathname === "/api/config" && request.method === "GET") {
      return json({
        provider: env.EROQ_API_KEY ? "eroq-mature-plus-gemini-standard" : (env.GEMINI_API_KEY ? "google-gemini-with-fallback" : (env.FAL_KEY ? "fal-ai" : "cloudflare-workers-ai")),
        geminiAvailable: !!env.GEMINI_API_KEY,
        falAvailable: !!env.FAL_KEY,
        cloudflareAiAvailable: !!env.AI,
        eroqAvailable: !!env.EROQ_API_KEY,
        xaviraAvailable: !!env.EROQ_API_KEY
      });
    }

    const eroqRequest = async (path, init = {}) => fetchWithTimeout("https://eroq.ai/v1" + path, {
      ...init, headers: { "Authorization": "Bearer " + env.EROQ_API_KEY, "Content-Type": "application/json", ...(init.headers || {}) }
    });
    const eroqError = (data, fallback) => data?.message || data?.error?.message || data?.error || data?.detail || fallback;

    if ((url.pathname === "/api/eroq/character" || url.pathname === "/api/xavira/character")) {
      if (request.method !== "POST") return json({ error: "Use POST to create a character." }, 405);
      const limited = await applyRateLimit(env.CHARACTER_LIMITER, "Too many character requests. Wait one minute and try again.");
      if (limited) return limited;
      if (!env.EROQ_API_KEY) return json({ error: "Eroq is not connected yet. Add the EROQ_API_KEY secret to your Cloudflare Worker." }, 503);
      let body;
      try { body = await readJson(request, 8192); } catch (error) { return json({ error: error.message === "Request body is too large." ? error.message : "Send valid character details." }, error.message === "Request body is too large." ? 413 : 400); }
      const age = Number(body.age);
      if (!Number.isFinite(age) || age < 18 || age > 110) return json({ error: "Mature-mode characters must be adults aged 18 or older." }, 400);
      const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "Fictional adult character";
      const look = typeof body.look === "string" ? body.look.trim().slice(0, 1800) : "";
      const details = [look, body.ethnicity, body.skinTone, body.hairColor, body.hairTexture, body.hairLength, body.build].filter(x => typeof x === "string" && x.trim()).map(x => x.trim()).join("; ").slice(0, 2000);
      try {
        const created = await eroqRequest("/characters", { method: "POST", body: JSON.stringify({
          name, age: Math.floor(age), gender: body.gender === "male" ? "male" : "female",
          prompt: "Fictional adult character. " + details,
          description: details || "Fictional adult character; preserve the same facial identity and appearance.", style: "photoreal"
        }) });
        const characterData = await created.json().catch(() => ({}));
        if (!created.ok) return json({ error: eroqError(characterData, "Eroq could not create the character.") }, created.status);
        const characterId = characterData.id || characterData.character?.id || characterData.character_id;
        if (!characterId || !/^[a-zA-Z0-9_-]{4,200}$/.test(characterId)) return json({ error: "Eroq did not return a valid character ID." }, 502);
        const sheet = await eroqRequest("/sheets", { method: "POST", body: JSON.stringify({
          target: "char:" + characterId, consent: true, layout: "turnaround", style: "match",
          description: details || "Photorealistic adult fictional character. Maintain the same face, hair, skin tone and proportions."
        }) });
        const sheetData = await sheet.json().catch(() => ({}));
        if (!sheet.ok) return json({ error: eroqError(sheetData, "Eroq could not prepare the character identity sheet.") }, sheet.status);
        const sheetJobId = sheetData.job?.id || sheetData.jobs?.[0]?.id || sheetData.id || sheetData.job_id;
        if (!sheetJobId) return json({ error: "Eroq did not return a character identity-sheet job." }, 502);
        return json({ characterId: characterId + "~" + sheetJobId, status: "preparing" }, 200);
      } catch (error) { return json({ error: error.message || "Could not connect to Eroq." }, 502); }
    }

    if (url.pathname === "/api/eroq/sheet-status" && request.method === "GET") {
      if (!env.EROQ_API_KEY) return json({ error: "Eroq is not connected. Add EROQ_API_KEY in Cloudflare." }, 503);
      const limited = await applyRateLimit(env.STATUS_LIMITER, "Too many status checks. Wait a minute and try again.");
      if (limited) return limited;
      const id = url.searchParams.get("id") || "", characterId = url.searchParams.get("characterId") || "";
      if (!/^[a-zA-Z0-9_-]{4,200}$/.test(id) || !/^[a-zA-Z0-9_-]{4,200}$/.test(characterId)) return json({ error: "Invalid character sheet job." }, 400);
      try {
        const poll = await eroqRequest("/images/generations/" + encodeURIComponent(id), { method: "GET" });
        const data = await poll.json().catch(() => ({}));
        if (!poll.ok) return json({ error: eroqError(data, "Could not check the character sheet.") }, poll.status);
        if (data.status === "failed" || data.status === "cancelled") return json({ error: data.error?.message || "Eroq could not prepare the character identity sheet." }, 502);
        if (data.status !== "succeeded") return json({ status: data.status || "pending" }, 202);
        const creationId = Array.isArray(data.data) ? (data.data[0]?.library_id || data.data[0]?.creation_id) : null;
        if (!creationId) return json({ error: "Eroq completed the sheet but did not return its library creation ID." }, 502);
        const applied = await eroqRequest("/sheets/apply", { method: "POST", body: JSON.stringify({ target: "char:" + characterId, creation_id: creationId }) });
        const appliedData = await applied.json().catch(() => ({}));
        if (!applied.ok) return json({ error: eroqError(appliedData, "Eroq could not activate the character identity sheet.") }, applied.status);
        return json({ status: "ready", characterId });
      } catch (error) { return json({ error: error.message || "Could not finish the character identity sheet." }, 502); }
    }

    if ((url.pathname === "/api/eroq/status" || url.pathname === "/api/xavira/status") && request.method === "GET") {
      if (!env.EROQ_API_KEY) return json({ error: "Eroq is not connected. Add EROQ_API_KEY in Cloudflare." }, 503);
      const limited = await applyRateLimit(env.STATUS_LIMITER, "Too many status checks. Wait a minute and try again.");
      if (limited) return limited;
      const id = url.searchParams.get("id") || "";
      if (!/^[a-zA-Z0-9_-]{4,200}$/.test(id)) return json({ error: "Invalid generation ID." }, 400);
      try {
        const poll = await eroqRequest("/images/generations/" + encodeURIComponent(id), { method: "GET" });
        const data = await poll.json().catch(() => ({}));
        if (!poll.ok) return json({ error: eroqError(data, "Could not check Eroq generation status.") }, poll.status);
        if (data.status === "failed" || data.status === "cancelled") return json({ error: data.error?.message || "Eroq image generation failed." }, 502);
        if (data.status !== "succeeded") return json({ status: data.status || "pending" }, 202);
        const take = Array.isArray(data.data) ? data.data[0] : null;
        if (!take) return json({ error: "Eroq completed without returning an image." }, 502);
        if (typeof take.b64_json === "string") {
          const binary = atob(take.b64_json), bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          return new Response(bytes, { headers: { ...headers, "Content-Type": take.mime_type || "image/png" } });
        }
        const imageUrl = take.url || take.image_url;
        if (typeof imageUrl !== "string") return json({ error: "Eroq did not return an image URL." }, 502);
        const output = new URL(imageUrl);
        if (output.protocol !== "https:") return json({ error: "Eroq returned an unexpected image URL." }, 502);
        const image = await fetchWithTimeout(output.toString());
        if (!image.ok) return json({ error: "Could not retrieve the image from Eroq." }, 502);
        return new Response(image.body, { headers: { ...headers, "Content-Type": image.headers.get("Content-Type") || "image/png" } });
      } catch (error) { return json({ error: error.message || "Could not retrieve the Eroq image." }, 502); }
    }

    if (url.pathname === "/api/generate") {
      if (request.method !== "POST") return json({ error: "Use POST to generate an image." }, 405);
      const limited = await applyRateLimit(env.GENERATION_LIMITER, "You have reached the image-generation limit. Wait one minute and try again.");
      if (limited) return limited;
      let body;
      try { body = await readJson(request, 16384); } catch (error) { return json({ error: error.message === "Request body is too large." ? error.message : "Send a valid JSON body." }, error.message === "Request body is too large." ? 413 : 400); }
      const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
      const mature = body.mature === true;
      const referenceImage = typeof body.referenceImage === "string" ? body.referenceImage.trim() : "";
      if (referenceImage) {
        if (referenceImage.length > 2048) return json({ error: "Reference image URL is too long." }, 400);
        try {
          const ref = new URL(referenceImage);
          const allowedHosts = [url.hostname, "raw.githubusercontent.com", "images.pexels.com", "images.unsplash.com"];
          if (ref.protocol !== "https:" || !allowedHosts.includes(ref.hostname)) return json({ error: "Reference image must use a trusted HTTPS image host." }, 400);
        } catch { return json({ error: "Reference image URL is invalid." }, 400); }
      }
      const seed = Number.isInteger(body.seed) && body.seed >= 0 && body.seed <= 2147483647 ? body.seed : null;
      if (!prompt || prompt.length > 2000) return json({ error: "Enter a prompt between 1 and 2,000 characters." }, 400);

      try {
        if (mature) {
          if (!env.EROQ_API_KEY) return json({ error: "Mature mode needs Eroq. Add the EROQ_API_KEY secret in Cloudflare." }, 503);
          const savedId = typeof body.characterId === "string" ? body.characterId : "";
          const parts = savedId.split("~");
          if (parts.length !== 2 || !/^[a-zA-Z0-9_-]{4,200}$/.test(parts[0]) || !/^[a-zA-Z0-9_-]{4,200}$/.test(parts[1])) return json({ error: "Create or select this adult persona first so Eroq can preserve its identity." }, 400);
          const characterId = parts[0], sheetJobId = parts[1];
          const sheetPoll = await eroqRequest("/images/generations/" + encodeURIComponent(sheetJobId), { method: "GET" });
          const sheetData = await sheetPoll.json().catch(() => ({}));
          if (!sheetPoll.ok) return json({ error: eroqError(sheetData, "Could not check the Eroq character identity sheet.") }, sheetPoll.status);
          if (sheetData.status === "failed" || sheetData.status === "cancelled") return json({ error: "Eroq could not prepare the character identity sheet. Create the character again." }, 502);
          if (sheetData.status !== "succeeded") return json({ error: "Eroq is still preparing this character identity. Please wait a few seconds and press Generate image again." }, 425);
          const creationId = Array.isArray(sheetData.data) ? (sheetData.data[0]?.library_id || sheetData.data[0]?.creation_id) : null;
          if (!creationId) return json({ error: "Eroq completed the identity sheet but returned no library ID." }, 502);
          const applied = await eroqRequest("/sheets/apply", { method: "POST", body: JSON.stringify({ target: "char:" + characterId, creation_id: creationId }) });
          const appliedData = await applied.json().catch(() => ({}));
          if (!applied.ok) return json({ error: eroqError(appliedData, "Eroq could not activate the character identity sheet.") }, applied.status);
          const response = await eroqRequest("/images/generations", { method: "POST", body: JSON.stringify({
            model: "eroq-uncensored", prompt, elements: ["char:" + characterId],
            aspect: ({ portrait_4_3: "3:4", portrait_16_9: "9:16", square: "1:1", landscape_4_3: "4:3", landscape_16_9: "16:9" })[body.aspectRatio] || "3:4",
            private: true, batch: 1
          }) });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) return json({ error: eroqError(data, "Eroq image generation failed.") }, response.status);
          const generationId = data.jobs?.[0]?.id || data.job?.id || data.id;
          if (!generationId) return json({ error: "Eroq did not return a generation job ID." }, 502);
          return json({ pending: true, generationId, provider: "eroq" }, 202);
        }
        const aspectRatio = ({
          portrait_4_3: "portrait_4_3",
          portrait_16_9: "portrait_16_9",
          square: "square",
          landscape_4_3: "landscape_4_3",
          landscape_16_9: "landscape_16_9"
        })[body.aspectRatio] || "portrait_4_3";
        const falGenerate = async () => {
          if (!env.FAL_KEY) return null;
          const endpoint = referenceImage ? "https://fal.run/fal-ai/flux-2-flex/edit" : "https://fal.run/fal-ai/flux-2-flex";
          const response = await fetchWithTimeout(endpoint, {
            method: "POST",
            headers: { "Authorization": "Key " + env.FAL_KEY, "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt,
              image_size: aspectRatio,
              num_inference_steps: 28,
              guidance_scale: 3.5,
              enable_safety_checker: true,
              safety_tolerance: 5,
              output_format: "jpeg",
              ...(referenceImage ? { image_urls: [referenceImage] } : {}),
              ...(seed !== null ? { seed } : {})
            })
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(typeof data.detail === "string" ? data.detail : (data.error || "fal.ai image generation failed."));
          const imageUrl = data.images?.[0]?.url;
          if (!imageUrl) throw new Error("fal.ai returned no image.");
          const output = new URL(imageUrl);
          if (output.protocol !== "https:") throw new Error("fal.ai returned an unexpected image URL.");
          const image = await fetchWithTimeout(output.toString());
          if (!image.ok) throw new Error("Could not retrieve the generated image from fal.ai.");
          return new Response(image.body, { headers: { ...headers, "Content-Type": image.headers.get("Content-Type") || "image/jpeg", "X-Image-Provider": "fal-ai-fallback" } });
        };
        const workersAiGenerate = async () => {
          if (!env.AI) throw new Error("No fallback image provider is configured. Add FAL_KEY or restore the Cloudflare AI binding.");
          if (referenceImage) throw new Error("Reference-image editing is unavailable on the free fallback. Disable Use reference image or configure fal.ai.");
          const result = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", { prompt, steps: 4 });
          if (!result?.image) throw new Error("Cloudflare Workers AI returned no image.");
          const binary = atob(result.image);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          return new Response(bytes, { headers: { ...headers, "Content-Type": "image/jpeg", "X-Image-Provider": "cloudflare-workers-ai-fallback" } });
        };

        let geminiFailure = null;
        if (env.GEMINI_API_KEY) {
          try {
            const geminiResponse = await fetchWithTimeout(
              "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent",
              {
                method: "POST",
                headers: { "x-goog-api-key": env.GEMINI_API_KEY, "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [{ role: "user", parts: [{ text: prompt }] }],
                  generationConfig: {
                    responseModalities: ["IMAGE"],
                    imageConfig: {
                      aspectRatio: ({ portrait_4_3: "3:4", portrait_16_9: "9:16", square: "1:1", landscape_4_3: "4:3", landscape_16_9: "16:9" })[body.aspectRatio] || "3:4",
                      imageSize: "2K"
                    }
                  }
                })
              }
            );
            const geminiData = await geminiResponse.json().catch(() => ({}));
            if (!geminiResponse.ok) throw new Error(geminiData.error?.message || "Google Gemini image generation failed.");
            const imagePart = (geminiData.candidates?.[0]?.content?.parts || []).find(part => part.inlineData?.data);
            if (!imagePart) {
              const reason = geminiData.promptFeedback?.blockReason;
              throw new Error(reason ? "Google Gemini blocked this prompt: " + reason : "Google Gemini returned no image.");
            }
            const mimeType = imagePart.inlineData.mimeType || "image/png";
            if (!/^image\/(png|jpeg|webp)$/i.test(mimeType)) throw new Error("Google Gemini returned an unsupported image format.");
            const binary = atob(imagePart.inlineData.data);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            return new Response(bytes, { headers: { ...headers, "Content-Type": mimeType, "X-Image-Provider": "google-gemini" } });
          } catch (error) {
            geminiFailure = error;
          }
        } else {
          geminiFailure = new Error("Gemini is not configured.");
        }

        // Gemini quota, billing, or availability errors automatically fall back to fal.ai,
        // then to the existing Cloudflare Workers AI binding when fal.ai is unavailable.
        if (env.FAL_KEY) {
          try { return await falGenerate(); }
          catch (falError) {
            if (!env.AI) return json({ error: "Gemini unavailable (" + geminiFailure.message + "); fal.ai fallback failed (" + falError.message + ")." }, 502);
          }
        }
        try { return await workersAiGenerate(); }
        catch (fallbackError) {
          return json({ error: "Gemini unavailable (" + geminiFailure.message + "). Fallback failed: " + fallbackError.message }, 503);
        }
      } catch (error) { return json({ error: error?.message || "Image generation failed." }, 502); }
    }

    if (url.pathname.startsWith("/api/")) return json({ error: "API route not found." }, 404);
    return env.ASSETS.fetch(request);
  }
};