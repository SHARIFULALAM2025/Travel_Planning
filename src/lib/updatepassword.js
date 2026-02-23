"use server"
import bcrypt from "bcryptjs"
import axios from "axios"

export const UpdatePassword = async ({ newPassword, token }) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(newPassword, salt);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/update-password`, {
            token,
            passwordHashed
        });

        if (response.data.success) {
            return { success: true, message: "Password updated! You can now log in." };
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to update password"
        };
    }
}