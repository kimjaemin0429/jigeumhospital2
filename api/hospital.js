export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { endpoint, ...params } = req.query;
  const SERVICE_KEY = process.env.HOSPITAL_API_KEY;

  // URLSearchParams 대신 수동으로 쿼리스트링 조립 (+ / 인코딩 방지)
  const otherParams = new URLSearchParams(params).toString();
  const url = `https://apis.data.go.kr/B552657/ErmctInfoInqireService/${endpoint}?serviceKey=${SERVICE_KEY}&${otherParams}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
