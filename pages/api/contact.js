import { sendEmail } from '../../lib/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
  try {
    await sendEmail(subject, text);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
