export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/config" && request.method === "GET") {
      const falConfigured = !!env.FAL_KEY;
      const matureAuthorized = falConfigured && env.FAL_MATURE_AUTHORIZED === "true";
      return Response.json({
        provider: falConfigured ? "fal.ai" : "cloudflare",
        falAvailable: falConfigured,
        falMatureAuthorized: matureAuthorized
      }, { headers: { "Cache-Control": "no-store" } });
    }

    if (url.pathname === "/api/generate") {
      if (request.method !== "POST") {
        return Response.json({ error: "Use POST to generate an image." }, { status: 405, headers: { Allow: "POST" } });
      }
      const origin = request.headers.get("Origin");
      if (origin && new URL(origin).host !== url.host) {
        return Response.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
      }

      let body;
      try { body = await request.json(); }
      catch { return Response.json({ error: "Send a valid JSON body." }, { status: 400 }); }

      const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
      const mature = body.mature === true;
      if (!prompt || prompt.length > 2048) {
        return Response.json({ error: "Enter a prompt between 1 and 2,048 characters." }, { status: 400 });
      }

      try {
        if (env.FAL_KEY) {
          if (mature && env.FAL_MATURE_AUTHORIZED !== "true") {
            return Response.json({ error: "Mature mode is unavailable until fal.ai authorizes disabling the safety checker for your account." }, { status: 403 });
          }

          const falResponse = await fetch("https://fal.run/fal-ai/flux-2-flex", {
            method: "POST",
            headers: {
              "Authorization": "Key " + env.FAL_KEY,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              prompt,
              image_size: ({portrait_4_3:"portrait_4_3",portrait_16_9:"portrait_16_9",square:"square",landscape_4_3:"landscape_4_3",landscape_16_9:"landscape_16_9"})[body.aspectRatio] || "portrait_4_3",
              num_inference_steps: 28,
              guidance_scale: 3.5,
              enable_safety_checker: !mature,
              output_format: "jpeg"
            })
          });

          const data = await falResponse.json().catch(() => ({}));
          if (!falResponse.ok) {
            const detail = typeof data.detail === "string" ? data.detail : (data.error || "fal.ai image generation failed. Check your API key, account access, and usage limits.");
            return Response.json({ error: detail }, { status: falResponse.status });
          }

          const imageUrl = data.images && data.images[0] && data.images[0].url;
          if (!imageUrl) throw new Error("fal.ai returned no image.");
          const imageResponse = await fetch(imageUrl);
          if (!imageResponse.ok) throw new Error("Could not retrieve the generated image from fal.ai.");

          return new Response(imageResponse.body, {
            headers: {
              "Content-Type": imageResponse.headers.get("Content-Type") || "image/jpeg",
              "Cache-Control": "no-store",
              "X-Content-Type-Options": "nosniff"
            }
          });
        }

        if (mature) {
          return Response.json({ error: "Mature mode requires a configured fal.ai API key. Add FAL_KEY in Cloudflare Worker secrets." }, { status: 503 });
        }
        if (!env.AI) {
          return Response.json({ error: "Neither fal.ai nor the Cloudflare Workers AI binding is configured." }, { status: 503 });
        }

        const result = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", { prompt, steps: 4 });
        if (!result || !result.image) throw new Error("Cloudflare Workers AI returned no image.");
        const binary = atob(result.image);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new Response(bytes, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff"
          }
        });
      } catch (error) {
        return Response.json({ error: error?.message || "Image generation failed." }, { status: 502 });
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({ error: "API route not found." }, { status: 404 });
    }
    return env.ASSETS.fetch(request);
  }
};