// engine/ai.js
export async function generateFromPrompt(prompt) {
  try {
    const res = await fetch("/api/ai-generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    if (!res.ok) throw new Error("AI server error");
    const data = await res.json();
    // basic validation
    return {
      objects: Array.isArray(data.objects) ? data.objects : [],
      code: typeof data.code === "string" ? data.code : "// no code"
    };
  } catch (e) {
    console.error("generateFromPrompt error:", e);
    return { objects: [], code: "// error" };
  }
}
