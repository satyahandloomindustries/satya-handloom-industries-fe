import TemporaryUser from "@/models/TemporaryUser";
import nodemailer from "nodemailer";
export const generateOtp = async (email) => {

    try {
        // Generate 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Send OTP via nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
        });

        return otp;

    }
    catch (err) {
        throw new Error(`Failed to generate the otp: ${err.message}`)
    }

}

export async function verifyOtp({ email, enteredOtp }) {
    try {

        const tempUser = await TemporaryUser.findOne({ email });
        if (!tempUser) throw new Error("OTP expired or not found");
        if (tempUser.otp !== enteredOtp) throw new Error("Invalid OTP");

        await TemporaryUser.deleteOne({ email });

        return true;
    }
    catch (err) {
        throw new Error("Failed to verify the otp")
    }
}

