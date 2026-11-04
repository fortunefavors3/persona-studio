export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin");
  const requestUrl = new URL(request.url);
  if (origin && new URL(origin).host !== requestUrl.host) {
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
    return Response.json({ error: "Cloudflare Workers AI binding AI is missing. Add it in Pages settings and redeploy." }, { status: 503 });
  }

  try {
    const result = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", {
      prompt,
      steps: 4
    });
    if (!result || !result.image) throw new Error("The image model returned no image.");

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
    return Response.json({ error: error?.message || "Cloudflare image generation failed." }, { status: 502 });
  }
}