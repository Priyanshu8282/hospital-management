import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const sendSMS = async (mobile_no, otp) => {
    try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        await client.messages.create({
            body: `Your OTP code is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER, // Ensure this is your Twilio phone number
            to: mobile_no, // Ensure this is the user's mobile number
        });
        
        
        console.log('SMS sent successfully');
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};

export default sendSMS;