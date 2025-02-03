import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default defineEventHandler(async (event) => {
  const body = await readBody(event); 

  const email = process.env.EMAIL;
  const emailPassword = process.env.EMAIL_PASSWORD;

  try {
    if (event.req.method === 'POST') {
      const { name, email: senderEmail, subject, message } = body;

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: email,
          pass: emailPassword,
        },
      });

      const mailOptions = {
        from: `"${name}" <${email}>`, 
        to: email, 
        subject: subject,
        html: `
          <p><strong>İsim:</strong> ${name}</p>
          <p><strong>Gönderen E-posta:</strong> ${senderEmail}</p>
          <p><strong>Konu-Başlığı:</strong> ${subject}</p>
          <p><strong>Mesaj:</strong></p>
          <p style="font-size: 25px; color: #000;">${message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return { success: true, message: 'Mesaj gönderildi!' };

    } else {
      return { success: false, message: 'Yalnızca POST isteği kabul edilir.' };
    }
  } catch (error) {
    console.error('E-posta gönderimi sırasında hata oluştu:', error);
    return { success: false, message: 'Mesaj gönderilemedi!', error: error.message };
  }
});
