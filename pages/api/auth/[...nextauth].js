import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPasswod } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDatabase();
        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }
        const isValid = await verifyPasswod(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Can't be logged in!");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
