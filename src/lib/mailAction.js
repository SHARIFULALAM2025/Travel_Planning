"use server"
import nodemailer from "nodemailer";
import axios from "axios";
import { nanoid } from 'nanoid'

export const myMailAction = async ({ email }) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/reset/${email}`
        );
        const token = nanoid(32)
        console.log(token);
        const transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: `${process.env.EMAIL_USER}`,
                pass: `${process.env.EMAIL_PASS}`,
            },
        });
        const info = await transporter.sendMail({
            from: `"${process.env.EMAIL_NAME || 'Support'}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Request",
            text: `To reset your password, use this token: ${token}`,
            html: `<p>To reset your password, click <b><a href="${process.env.NEXTAUTH_URL}/resetpassword/${token}">here</a></b>.</p>`,
        });
        console.log("Message sent: %s", info.messageId);
        //save token in db
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/store-reset-token`, {
            email,
            token
        });
        return { success: true, data: response.data };

    } catch (error) {
        if (error.response?.status === 404) {
            return { success: false, message: "User does not exist" };
        }

        console.error("Mail Action Error:", error.message);
        return { success: false, message: "Something went wrong on our end" };
    }
};
