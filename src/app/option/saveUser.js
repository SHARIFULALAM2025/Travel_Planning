import axios from 'axios'

export const postUser = async (userData) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/All_users`,
        userData
    )
    return data
}