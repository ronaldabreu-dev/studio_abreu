import { sendEmail } from '../../lib/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { name, email, concept, message } = req.body || {};
  if (!name || !email || !concept || !message) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const subject = `New Studio Abreu enquiry · ${concept}`;
  const text = `Name: ${name}\nEmail: ${email}\nConcept: ${concept}\nMessage: ${message}`;

  try {
    await sendEmail(subject, text);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
