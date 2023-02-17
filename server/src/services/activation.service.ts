import * as nodemailer from 'nodemailer';
import type SMTPTransport = require('nodemailer/lib/smtp-transport');

const options: SMTPTransport.Options = {
  service: 'gmail',
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export default class MailService {
  static async SendActivationMessage(receiver: string, activationURL: string) {
    const transporter = nodemailer.createTransport(options);
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: receiver,
      subject: 'Account activation',
      text: '',
      html: `
          <div>
            <h1><a href="${activationURL}">Follow the link to activate</a></h1>
          </div>
        `,
    });
  }
}
