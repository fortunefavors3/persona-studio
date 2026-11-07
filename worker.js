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
        provider: env.GEMINI_API_KEY ? "google-gemini-with-fallback" : (env.FAL_KEY ? "fal-ai" : "cloudflare-workers-ai"),
        geminiAvailable: !!env.GEMINI_API_KEY,
        falAvailable: !!env.FAL_KEY,
        cloudflareAiAvailable: !!env.AI,
        xaviraAvailable: !!env.XAVIRA_API_KEY
      });
    }

    if (url.pathname === "/api/xavira/character") {
      if (request.method !== "POST") return json({ error: "Use POST to create a character." }, 405);
      const limited = await applyRateLimit(env.CHARACTER_LIMITER, "Too many character requests. Wait one minute and try again.");
      if (limited) return limited;
      if (!env.XAVIRA_API_KEY) return json({ error: "Xavira is not configured. Add the XAVIRA_API_KEY secret to your Cloudflare Worker." }, 503);
      let body;
      try { body = await readJson(request, 8192); } catch (error) { return json({ error: error.message === "Request body is too large." ? error.message : "Send valid character details." }, error.message === "Request body is too large." ? 413 : 400); }
      const name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "Look Here Sin character";
      const appearance = typeof body.look === "string" ? body.look.trim().slice(0, 300) : "";
      const age = Number(body.age);
      const gender = body.gender === "male" ? "male" : "female";
      const requestedEthnicity = typeof body.ethnicity === "string" ? body.ethnicity.trim().toLowerCase() : "";
      const ethnicity = /african american|black|afro-caribbean|west african|east african/.test(requestedEthnicity)
        ? "black"
        : /latina|hispanic/.test(requestedEthnicity) ? "hispanic"
        : /east asian/.test(requestedEthnicity) ? "east-asian"
        : /south.?east asian/.test(requestedEthnicity) ? "south-east-asian"
        : /south asian|indian/.test(requestedEthnicity) ? "indian"
        : /middle eastern|north african/.test(requestedEthnicity) ? "middle-eastern"
        : /white|european/.test(requestedEthnicity) ? "white"
        : undefined;
      const rawHairColor = typeof body.hairColor === "string" ? body.hairColor.trim().toLowerCase() : "";
      const hairColor = /black/.test(rawHairColor) ? "black"
        : /brown|chestnut|brunette/.test(rawHairColor) ? "brown"
        : /blonde|blond/.test(rawHairColor) ? "blonde"
        : /red|ginger|auburn|copper/.test(rawHairColor) ? "auburn"
        : /grey|gray/.test(rawHairColor) ? "grey"
        : /white|silver/.test(rawHairColor) ? "white" : "brown";
      const rawHairLength = typeof body.hairLength === "string" ? body.hairLength.trim().toLowerCase() : "";
      const hairLength = /short|pixie|cropped/.test(rawHairLength) ? "short"
        : /medium|shoulder/.test(rawHairLength) ? "medium" : "long";
      const rawBuild = typeof body.build === "string" ? body.build.trim().toLowerCase() : "";
      const build = /petite/.test(rawBuild) ? "petite"
        : /slim|thin/.test(rawBuild) ? "slim"
        : /athletic|muscular|toned/.test(rawBuild) ? "athletic"
        : /curvy/.test(rawBuild) ? "curvy"
        : /voluptuous|plus.?size|full.?figured/.test(rawBuild) ? "voluptuous" : undefined;
      const ageRange = age >= 50 ? "50-plus" : age >= 40 ? "40-plus" : age >= 30 ? "30-39" : age >= 23 ? "23-29" : "18-22";
      const traits = {
        gender,
        ...(ethnicity ? { ethnicity } : {}),
        ageRange,
        hairLength,
        hairColor,
        ...(build ? { build } : {})
      };
      const skinTone = typeof body.skinTone === "string" ? body.skinTone.trim() : "";
      const hairTexture = typeof body.hairTexture === "string" ? body.hairTexture.trim() : "";
      const appearanceDetails = [skinTone ? "skin tone: " + skinTone : "", hairTexture ? "hair texture: " + hairTexture : ""].filter(Boolean).join("; ");
      const idem = typeof body.idempotencyKey === "string" && /^[a-zA-Z0-9_-]{12,100}$/.test(body.idempotencyKey)
        ? body.idempotencyKey : crypto.randomUUID();
      try {
        const response = await fetchWithTimeout("https://api.xavira.ai/v1/characters", {
          method: "POST",
          headers: { "Authorization": "Bearer " + env.XAVIRA_API_KEY, "Content-Type": "application/json", "Idempotency-Key": idem },
          body: JSON.stringify({ model_id: "realistic-v2", traits, name, scene: appearanceDetails ? "Neutral studio portrait. " + appearanceDetails : "Neutral studio portrait.", wait: true })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) return json({ error: data.message || data.error?.message || data.error || "Xavira could not create the character." }, response.status);
        if (!data.character_id) return json({ error: "Xavira did not return a character ID." }, 502);
        return json({ characterId: data.character_id, status: data.status || "ready" });
      } catch (error) { return json({ error: error.message || "Could not connect to Xavira." }, 502); }
    }

    if (url.pathname === "/api/xavira/status" && request.method === "GET") {
      if (!env.XAVIRA_API_KEY) return json({ error: "Xavira is not configured. Add the XAVIRA_API_KEY secret to your Cloudflare Worker." }, 503);
      const statusLimited = await applyRateLimit(env.STATUS_LIMITER, "Too many status checks. Wait a minute and try again.");
      if (statusLimited) return statusLimited;
      const id = url.searchParams.get("id") || "";
      if (!/^[a-zA-Z0-9_-]{8,200}$/.test(id)) return json({ error: "Invalid generation ID." }, 400);
      try {
        const response = await fetchWithTimeout("https://api.xavira.ai/v1/generations/" + id, {
          headers: { "Authorization": "Bearer " + env.XAVIRA_API_KEY }
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) return json({ error: data.message || data.error?.message || "Could not check generation status." }, response.status);
        if (data.status !== "completed" || !data.output_url) {
          if (["failed", "cancelled", "timed_out"].includes(data.status)) return json({ error: data.error_message || "Xavira generation did not complete." }, 502);
          return json({ status: data.status || "pending" }, 202);
        }
        const output = new URL(data.output_url);
        if (output.protocol !== "https:") return json({ error: "Xavira returned an unexpected image URL." }, 502);
        const image = await fetchWithTimeout(output.toString());
        if (!image.ok) return json({ error: "Could not retrieve the generated image." }, 502);
        return new Response(image.body, { headers: { ...headers, "Content-Type": image.headers.get("Content-Type") || "image/png" } });
      } catch (error) { return json({ error: error.message || "Could not check Xavira generation." }, 502); }
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
          if (!env.XAVIRA_API_KEY) return json({ error: "Mature mode needs Xavira. Add the XAVIRA_API_KEY secret in Cloudflare and redeploy." }, 503);
          if (referenceImage) return json({ error: "Xavira reference-image use is separately gated and requires its approval process. This generation will use the saved text-based character identity instead; turn off Use reference image and try again." }, 400);
          const characterId = typeof body.characterId === "string" ? body.characterId : "";
          if (!/^[a-zA-Z0-9_-]{8,200}$/.test(characterId)) return json({ error: "Create or select this persona's Xavira character first, then try again." }, 400);
          const idem = typeof body.idempotencyKey === "string" && /^[a-zA-Z0-9_-]{12,100}$/.test(body.idempotencyKey) ? body.idempotencyKey : crypto.randomUUID();
          const response = await fetchWithTimeout("https://api.xavira.ai/v1/images:generate", {
            method: "POST",
            headers: { "Authorization": "Bearer " + env.XAVIRA_API_KEY, "Content-Type": "application/json", "Idempotency-Key": idem },
            body: JSON.stringify({ character_id: characterId, prompt: prompt.slice(0, 2000), resolution: "hd_portrait", hires_fix: "1.25x", ...(seed !== null ? { seed } : {}) })
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) return json({ error: data.message || data.error?.message || data.error || "Xavira image generation failed." }, response.status);
          if (data.status === "completed" && data.output_url) {
            const output = new URL(data.output_url);
            if (output.protocol !== "https:" || output.hostname !== "pub-202d3c54d6e442d592b80751c50c9c78.r2.dev") return json({ error: "Xavira returned an unexpected image host." }, 502);
            const image = await fetchWithTimeout(output.toString());
            if (!image.ok) return json({ error: "Could not retrieve the generated image from Xavira." }, 502);
            return new Response(image.body, { headers: { ...headers, "Content-Type": image.headers.get("Content-Type") || "image/png" } });
          }
          if (data.generation_id) return json({ pending: true, generationId: data.generation_id }, 202);
          return json({ error: "Xavira did not return an image or generation ID." }, 502);
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