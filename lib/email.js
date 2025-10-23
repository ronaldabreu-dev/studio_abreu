import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const {
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  EMAIL_TO,
} = process.env;

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const hasOAuthCredentials = Boolean(
  EMAIL_CLIENT_ID && EMAIL_CLIENT_SECRET && EMAIL_REFRESH_TOKEN
);

let oAuth2Client;
if (hasOAuthCredentials) {
  oAuth2Client = new google.auth.OAuth2(
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: EMAIL_REFRESH_TOKEN });
}

export async function sendEmail(subject, text) {
  try {
    if (!EMAIL_FROM || !EMAIL_TO) {
      throw new Error('Email sender/recipient environment variables are missing.');
    }

    let transporterConfig;

    if (hasOAuthCredentials) {
      const accessToken = await oAuth2Client.getAccessToken();

      if (!accessToken?.token) {
        throw new Error('Failed to retrieve access token for email transport.');
      }

      transporterConfig = {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: EMAIL_FROM,
          clientId: EMAIL_CLIENT_ID,
          clientSecret: EMAIL_CLIENT_SECRET,
          refreshToken: EMAIL_REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      };
    } else if (EMAIL_PASSWORD) {
      transporterConfig = {
        service: 'gmail',
        auth: {
          user: EMAIL_FROM,
          pass: EMAIL_PASSWORD,
        },
      };
    } else {
      throw new Error(
        'No email credentials configured. Provide OAuth credentials or set EMAIL_PASSWORD.'
      );
    }

    const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}
