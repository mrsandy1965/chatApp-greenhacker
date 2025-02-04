import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function sendEmail({ email, subject, text, html }) {
    try {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            throw new Error("Missing GMAIL_USER or GMAIL_PASS in environment variables");
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
        });

        await transporter.sendMail({
            from: `"Chat App" <${process.env.GMAIL_USER}>`,
            to: email,
            subject,
            text,
            html, // ✅ Supports HTML emails
        });

        console.log("✅ Email sent successfully");
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}

export default sendEmail;
