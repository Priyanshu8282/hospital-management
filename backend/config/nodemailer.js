import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to send OTP emails
const sendOtpEmail = async (email, subject, templateData) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Render the OTP email template
        const templatePath = path.join(__dirname, '../views/otpEmail.ejs');
        const html = await ejs.renderFile(templatePath, templateData);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            html, // Use the rendered HTML content
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully');
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
};

// Function to send Welcome emails
const sendWelcomeEmail = async (email, name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Render the Welcome email template
        const templatePath = path.join(__dirname, '../views/welcome.ejs');
        const html = await ejs.renderFile(templatePath, { name });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to DocuCare!',
            html, // Use the rendered HTML content
        };

        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending Welcome email:', error);
    }
};

export { sendOtpEmail, sendWelcomeEmail };