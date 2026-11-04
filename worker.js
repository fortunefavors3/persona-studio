export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/config" && request.method === "GET") {
      return Response.json({ falAvailable: !!env.FAL_KEY, falMatureAuthorized: !!env.FAL_KEY && env.FAL_MATURE_AUTHORIZED === "true" }, { headers: { "Cache-Control": "no-store" } });
    }
    if (url.pathname === "/api/generate") {
      if (request.method !== "POST") return Response.json({ error: "Use POST to generate an image." }, { status: 405, headers: { Allow: "POST" } });
      const origin = request.headers.get("Origin");
      if (origin && new URL(origin).host !== url.host) return Response.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
      let body;
      try { body = await request.json(); } catch { return Response.json({ error: "Send a valid JSON body." }, { status: 400 }); }
      const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
      const mature = body.mature === true;
      if (!prompt || prompt.length > 2048) return Response.json({ error: "Enter a prompt between 1 and 2,048 characters." }, { status: 400 });
      try {
        if (mature) {
          if (!env.FAL_KEY) return Response.json({ error: "Mature mode is not configured. Add the fal.ai API key as a Cloudflare Worker secret." }, { status: 503 });
          if (env.FAL_MATURE_AUTHORIZED !== "true") return Response.json({ error: "fal.ai has not authorized mature mode for this account. Keep the setting off until authorization is granted." }, { status: 403 });
          const response = await fetch("https://fal.run/fal-ai/flux-2-flex", {
            method: "POST",
            headers: { "Authorization": "Key " + env.FAL_KEY, "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, image_size: "portrait_4_3", num_inference_steps: 28, guidance_scale: 3.5, enable_safety_checker: false, output_format: "jpeg" })
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) return Response.json({ error: data.detail || data.error || "fal.ai generation failed. Check the API key, authorization, and usage limits." }, { status: response.status });
          const imageUrl = data.images && data.images[0] && data.images[0].url;
          if (!imageUrl) throw new Error("fal.ai returned no image.");
          const imageResponse = await fetch(imageUrl);
          if (!imageResponse.ok) throw new Error("Could not retrieve the generated image.");
          return new Response(imageResponse.body, { headers: { "Content-Type": imageResponse.headers.get("Content-Type") || "image/jpeg", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
        }
        if (!env.AI) return Response.json({ error: "Workers AI binding AI is missing. Check Worker settings and redeploy." }, { status: 503 });
        const result = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", { prompt, steps: 4 });
        if (!result || !result.image) throw new Error("The image model returned no image.");
        const binary = atob(result.image), bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new Response(bytes, { headers: { "Content-Type": "image/jpeg", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
      } catch (error) {
        return Response.json({ error: error?.message || "Image generation failed." }, { status: 502 });
      }
    }
    if (url.pathname.startsWith("/api/")) return Response.json({ error: "API route not found." }, { status: 404 });
    return env.ASSETS.fetch(request);
  }
};