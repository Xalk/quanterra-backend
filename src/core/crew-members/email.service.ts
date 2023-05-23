import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from 'process';

@Injectable()
export class EmailService {
  async sendPasswordEmail(email: string, password: string): Promise<void> {
    console.log(process.env.G_NAME, process.env.G_PASS);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.G_NAME,
        pass: process.env.G_PASS,
      },
    });

    const mailOptions = {
      from: process.env.G_NAME,
      to: email, // Recipient email
      subject: 'Your Account Password',
      text: `Your password is: ${password}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
