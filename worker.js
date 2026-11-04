export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/generate") {
      if (request.method !== "POST") {
        return Response.json({ error: "Use POST to generate an image." }, {
          status: 405,
          headers: { Allow: "POST" }
        });
      }

      const origin = request.headers.get("Origin");
      if (origin && new URL(origin).host !== url.host) {
        return Response.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return Response.json({ error: "Send a valid JSON body." }, { status: 400 });
      }

      const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
      if (!prompt || prompt.length > 2048) {
        return Response.json({ error: "Enter a prompt between 1 and 2,048 characters." }, { status: 400 });
      }

      if (!env.AI) {
        return Response.json({ error: "Workers AI binding AI is missing. Check the Worker settings and redeploy." }, { status: 503 });
      }

      try {
        const result = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", {
          prompt,
          steps: 4
        });

        if (!result || !result.image) {
          throw new Error("The image model returned no image.");
        }

        const binary = atob(result.image);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }

        return new Response(bytes, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff"
          }
        });
      } catch (error) {
        return Response.json({ error: error?.message || "Cloudflare image generation failed." }, { status: 502 });
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({ error: "API route not found." }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  }
};
