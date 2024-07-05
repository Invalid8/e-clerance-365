import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const accessToken = await new Promise<string>((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token || "");
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      accessToken,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });

  return transporter;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `Your App Name <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `<p>Please verify your email by clicking the link: <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}">Verify Email</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};
