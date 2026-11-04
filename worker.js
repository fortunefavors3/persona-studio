export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const json = (data, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
    const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
    const origin = request.headers.get("Origin");
    if (origin && new URL(origin).host !== url.host) return json({ error: "Cross-origin requests are not allowed." }, 403);

    if (url.pathname === "/api/config" && request.method === "GET") {
      return json({
        provider: env.FAL_KEY ? "fal.ai" : "cloudflare",
        falAvailable: !!env.FAL_KEY,
        xaviraAvailable: !!env.XAVIRA_API_KEY
      });
    }

    if (url.pathname === "/api/xavira/character") {
      if (request.method !== "POST") return json({ error: "Use POST to create a character." }, 405);
      if (!env.XAVIRA_API_KEY) return json({ error: "Xavira is not configured. Add the XAVIRA_API_KEY secret to your Cloudflare Worker." }, 503);
      let body;
      try { body = await request.json(); } catch { return json({ error: "Send valid character details." }, 400); }
      const name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "Look Here Sin character";
      const appearance = typeof body.look === "string" ? body.look.trim().slice(0, 300) : "";
      const age = Number(body.age);
      const ageRange = age >= 30 ? "30-39" : "23-29";
      const gender = body.gender === "male" ? "male" : "female";
      const traits = {
        gender,
        ethnicity: "white",
        ageRange,
        hairLength: "long",
        hairColor: "brown",
        build: "slim"
      };
      const idem = typeof body.idempotencyKey === "string" && /^[a-zA-Z0-9_-]{12,100}$/.test(body.idempotencyKey)
        ? body.idempotencyKey : crypto.randomUUID();
      try {
        const response = await fetch("https://api.xavira.ai/v1/characters", {
          method: "POST",
          headers: { "Authorization": "Bearer " + env.XAVIRA_API_KEY, "Content-Type": "application/json", "Idempotency-Key": idem },
          body: JSON.stringify({ model_id: "realistic-v2", traits, name, appearance, wait: true })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) return json({ error: data.message || data.error?.message || data.error || "Xavira could not create the character." }, response.status);
        if (!data.character_id) return json({ error: "Xavira did not return a character ID." }, 502);
        return json({ characterId: data.character_id, status: data.status || "ready" });
      } catch (error) { return json({ error: error.message || "Could not connect to Xavira." }, 502); }
    }

    if (url.pathname === "/api/xavira/status" && request.method === "GET") {
      if (!env.XAVIRA_API_KEY) return json({ error: "Xavira is not configured. Add the XAVIRA_API_KEY secret to your Cloudflare Worker." }, 503);
      const id = url.searchParams.get("id") || "";
      if (!/^[a-zA-Z0-9_-]{8,200}$/.test(id)) return json({ error: "Invalid generation ID." }, 400);
      try {
        const response = await fetch("https://api.xavira.ai/v1/generations/" + id, {
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
        const image = await fetch(output.toString());
        if (!image.ok) return json({ error: "Could not retrieve the generated image." }, 502);
        return new Response(image.body, { headers: { ...headers, "Content-Type": image.headers.get("Content-Type") || "image/png" } });
      } catch (error) { return json({ error: error.message || "Could not check Xavira generation." }, 502); }
    }

    if (url.pathname === "/api/generate") {
      if (request.method !== "POST") return json({ error: "Use POST to generate an image." }, 405);
      let body;
      try { body = await request.json(); } catch { return json({ error: "Send a valid JSON body." }, 400); }
      const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
      const mature = body.mature === true;
      const referenceImage = typeof body.referenceImage === "string" ? body.referenceImage : "";
      const seed = Number.isInteger(body.seed) && body.seed >= 0 && body.seed <= 2147483647 ? body.seed : null;
      if (!prompt || prompt.length > 2000) return json({ error: "Enter a prompt between 1 and 2,000 characters." }, 400);

      try {
        if (mature) {
          if (!env.XAVIRA_API_KEY) return json({ error: "Mature mode needs Xavira. Add the XAVIRA_API_KEY secret in Cloudflare and redeploy." }, 503);
          if (referenceImage) return json({ error: "Xavira reference-image use is separately gated and requires its approval process. This generation will use the saved text-based character identity instead; turn off Use reference image and try again." }, 400);
          const characterId = typeof body.characterId === "string" ? body.characterId : "";
          if (!/^[a-zA-Z0-9_-]{8,200}$/.test(characterId)) return json({ error: "Create or select this persona's Xavira character first, then try again." }, 400);
          const idem = typeof body.idempotencyKey === "string" && /^[a-zA-Z0-9_-]{12,100}$/.test(body.idempotencyKey) ? body.idempotencyKey : crypto.randomUUID();
          const response = await fetch("https://api.xavira.ai/v1/images:generate", {
            method: "POST",
            headers: { "Authorization": "Bearer " + env.XAVIRA_API_KEY, "Content-Type": "application/json", "Idempotency-Key": idem },
            body: JSON.stringify({ character_id: characterId, prompt: prompt.slice(0, 2000), resolution: "hd_portrait", hires_fix: "1.25x", ...(seed !== null ? { seed } : {}) })
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) return json({ error: data.message || data.error?.message || data.error || "Xavira image generation failed." }, response.status);
          if (data.status === "completed" && data.output_url) {
            const output = new URL(data.output_url);
            if (output.protocol !== "https:" || output.hostname !== "pub-202d3c54d6e442d592b80751c50c9c78.r2.dev") return json({ error: "Xavira returned an unexpected image host." }, 502);
            const image = await fetch(output.toString());
            if (!image.ok) return json({ error: "Could not retrieve the generated image from Xavira." }, 502);
            return new Response(image.body, { headers: { ...headers, "Content-Type": image.headers.get("Content-Type") || "image/png" } });
          }
          if (data.generation_id) return json({ pending: true, generationId: data.generation_id }, 202);
          return json({ error: "Xavira did not return an image or generation ID." }, 502);
        }

        if (env.FAL_KEY) {
          const falResponse = await fetch(referenceImage ? "https://fal.run/fal-ai/flux-2-flex/edit" : "https://fal.run/fal-ai/flux-2-flex", {
            method: "POST",
            headers: { "Authorization": "Key " + env.FAL_KEY, "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt,
              image_size: ({portrait_4_3:"portrait_4_3",portrait_16_9:"portrait_16_9",square:"square",landscape_4_3:"landscape_4_3",landscape_16_9:"landscape_16_9"})[body.aspectRatio] || "portrait_4_3",
              num_inference_steps: 28, guidance_scale: 3.5, enable_safety_checker: true,
              safety_tolerance: 5, output_format: "jpeg",
              ...(referenceImage ? { image_urls: [referenceImage] } : {}),
              ...(seed !== null ? { seed } : {})
            })
          });
          const data = await falResponse.json().catch(() => ({}));
          if (!falResponse.ok) return json({ error: typeof data.detail === "string" ? data.detail : (data.error || "fal.ai image generation failed.") }, falResponse.status);
          const imageUrl = data.images && data.images[0] && data.images[0].url;
          if (!imageUrl) throw new Error("fal.ai returned no image.");
          const image = await fetch(imageUrl);
          if (!image.ok) throw new Error("Could not retrieve the generated image from fal.ai.");
          return new Response(image.body, { headers: { ...headers, "Content-Type": image.headers.get("Content-Type") || "image/jpeg" } });
        }
        if (referenceImage) return json({ error: "Character reference editing requires the fal.ai connection. Configure FAL_KEY." }, 503);
        if (!env.AI) return json({ error: "Neither fal.ai nor the Cloudflare Workers AI binding is configured." }, 503);
        const result = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", { prompt, steps: 4 });
        if (!result || !result.image) throw new Error("Cloudflare Workers AI returned no image.");
        const binary = atob(result.image), bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new Response(bytes, { headers: { ...headers, "Content-Type": "image/jpeg" } });
      } catch (error) { return json({ error: error?.message || "Image generation failed." }, 502); }
    }

    if (url.pathname.startsWith("/api/")) return json({ error: "API route not found." }, 404);
    return env.ASSETS.fetch(request);
  }
};