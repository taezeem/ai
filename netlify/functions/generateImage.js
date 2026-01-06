export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { prompt } = JSON.parse(event.body || "{}");
    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: "Empty prompt" }) };
    }

    const subnpRes = await fetch("https://subnp.com/api/free/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "turbo"
      })
    });

    if (!subnpRes.ok) {
      const text = await subnpRes.text();
      return { statusCode: subnpRes.status, body: `SubNP Error: ${text}` };
    }

    const data = await subnpRes.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
