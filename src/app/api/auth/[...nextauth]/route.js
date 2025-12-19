import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "xxxxxx",
        },
        secretCode: {
          label: "Secret Code",
          type: "password",
          placeholder: "enter code",
        },
      },

      async authorize(credentials, req) {
        const { username, password, secretCode } = credentials;
        // My own login logic
        const user = userList.find((u) => u.name == username);
        if (!user) return null;

        const isPassWordOk = user.password == password;
        if (isPassWordOk) {
          return user;
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
