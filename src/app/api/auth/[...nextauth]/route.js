import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const userList = [
  {
    name: "Hablu",
    password: "1234",
  },
  {
    name: "Kamla",
    password: "5678",
  },
  {
    name: "Rehan",
    password: "9012",
  },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      //Sign in with (method name)
      name: "Email & Password",

      //   Form inputs
      credentials: {
        email: { label: "Email", type: "email", placeholder: "xxx@gmail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "xxxxxx",
        },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;
        // My own login logic
        // const user = userList.find((u) => u.name == username);
        const user = await dbConnect("Users").findOne({ email });
        if (!user) return null;

        const isPassWordOk = await bcrypt.compare(password, user.password);
        if (isPassWordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
