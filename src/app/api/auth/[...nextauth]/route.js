import { postUser } from "@/app/option/saveUser";
import { loginUser } from "@/lib/authActions";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                const user = await loginUser(credentials);
                if (user) {
                    return user;
                }
                return null;
            }
        }),
        // social login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account.provider === "google") {
                    const userData = {
                        name: user.name,
                        email: user.email,
                        image: user.image

                    };
                    await postUser(userData)
                }
                return true;

            } catch (error) {
                console.error("backend Error:", error);
                return true;
            }
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };