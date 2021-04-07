import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../lib/auth";
import { connectToDataBase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDataBase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        } else {
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        console.log(credentials.password);
        if (!isValid) {
          client.close();
          throw new Error("Could not log in!");
        } else {
          console.log("You can log in");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
