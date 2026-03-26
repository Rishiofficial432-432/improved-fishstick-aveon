export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
      
      console.warn('🚨 TAMPER DETECTED 🚨');
      console.warn('IP Address:', ip);
      console.warn('Tracker Token:', data.token || 'N/A');
      console.warn('Reason:', data.reason || 'Unknown');
      console.warn('User-Agent:', data.ua || 'Unknown');
      console.warn('Source:', data.source || 'Unknown');
      console.warn('Timestamp:', new Date().toISOString());
      console.warn('--------------------------------------------------');
      
      return res.status(200).json({ success: true, logged: true });
    } catch (err) {
      return res.status(400).json({ error: 'Bad Request' });
    }
  }
  return res.status(405).json({ error: 'Method Not Allowed' });
}
