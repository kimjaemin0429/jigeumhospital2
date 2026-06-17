export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { endpoint, ...params } = req.query;
  const SERVICE_KEY = process.env.HOSPITAL_API_KEY;

  const otherParams = new URLSearchParams(params).toString();
  const url = `https://apis.data.go.kr/B552657/ErmctInfoInqireService/${endpoint}?serviceKey=${SERVICE_KEY}&${otherParams}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    // 디버그: 응답 원문 그대로 반환 (Content-Type 무시)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(`URL: ${url}\n\n---응답---\n${text}`);
  } catch (e) {
    res.status(500).send(`에러: ${e.message}`);
  }
}
