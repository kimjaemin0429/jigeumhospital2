export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { endpoint, ...params } = req.query;
  const SERVICE_KEY = process.env.HOSPITAL_API_KEY;

  const qs = new URLSearchParams({ serviceKey: SERVICE_KEY, ...params }).toString();
  const url = `https://apis.data.go.kr/B552657/ErmctInfoInqireService/${endpoint}?${qs}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
