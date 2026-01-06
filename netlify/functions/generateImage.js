export async function handler(event) {
  const { prompt } = JSON.parse(event.body);
  const SUBNP_KEY = process.env.SUBNP_KEY;

  const subnpRes = await fetch("https://subnp.com/api/free/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SUBNP_KEY}` },
    body: JSON.stringify({ prompt, model: "turbo" })
  });

  const data = await subnpRes.json();
  return { statusCode: 200, body: JSON.stringify(data) };
}
