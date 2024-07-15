const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developer.google.com/oauthplayground";

const {
  EMAIL,
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH_TOKEN,
  MAILING_ACCESS_TOKEN,
} = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH_TOKEN,
  oauth_link
);

exports.sendVarificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH_TOKEN,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH_TOKEN,
      accessToken: MAILING_ACCESS_TOKEN,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Instaloom User Email Varification",
    html: `<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; margin: 20px auto; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px;">
        <tr>
            <td align="center" style="padding: 10px 0;">
                <h1 style="color: #ff60b3; margin: 0;">Hello ${name}</h1>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 20px 0;">
                <a href="${url}" style="background-color: #ff60b3; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Email</a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 20px 0;">
                <p style="font-size: 14px; margin: 0;">Follow us on social media: <a href="https://instaloom.com" style="color: #ff60b3; text-decoration: none;">Instaloom</a></p>
            </td>
        </tr>
    </table>
</body>
</html>`,
  };
  stmp.sendMail(mailOptions, (error, res) => {
    if (error) return console.log("log from mail error", error);
    return res;
  });
};
