import 'dotenv/config';
const nodemailer = require('nodemailer');

export const sendMailHandler = async (userEmail: string, adminEmail: string, subject: string, text: string) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: adminEmail,
            pass: process.env.GMAIL_SECRET_PASSWORD
        }
    });

    const mailOptions = {
        from: userEmail,
        to: adminEmail,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}