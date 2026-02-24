
import { postUser } from "@/app/option/saveUser";
import { loginUser } from "@/lib/authActions";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                const user = await loginUser(credentials);
                console.log(user);

                // যদি user অবজেক্ট পাওয়া যায়, তবে সেটি রিটার্ন করুন
                if (user) {
                    return user;
                }
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // সেশন স্টাইল নির্দিষ্ট করে দিন (Credentials এর জন্য এটি জরুরি)
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // ১. JWT কলব্যাক: এটি টোকেনের মধ্যে ইউজার ডেটা ঢুকিয়ে দেয়
        async jwt({ token, user }) {
            console.log(token);

            if (user) {
                token.id = user.id || user._id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
            }
            return token;
        },
        // ২. Session কলব্যাক: এটি টোকেন থেকে ডেটা নিয়ে useSession() হুক-এ পাঠায়
        async session({ session, token }) {


            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.image;
            }
            return session;
        },
        async signIn({ user, account }) {
            try {
                if (account.provider === "google" || account.provider ==="github") {
                    const userData = {
                        name: user.name || user.login,
                        email: user.email || (user.emails && user.emails[0]?.value),
                        image: user.image,
                        provider:account.provider
                    };
                    await postUser(userData);
                }
                return true;
            } catch (error) {
                console.error("backend Error:", error);
                return true;
            }
        },

    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };