import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.EMAIL_SECURE),
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});
