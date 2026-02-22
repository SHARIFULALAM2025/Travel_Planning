import axios from 'axios'
import bcrypt from 'bcryptjs'
export const loginUser = async (payload) => {
    const { email, password } = payload

    try {
        
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/login-user`,
            { email }
        )

        const user = response.data

        if (user) {

            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                return user
            }
        }
        return null
    } catch (error) {
        console.error('Login error:', error)
        return null
    }
}


