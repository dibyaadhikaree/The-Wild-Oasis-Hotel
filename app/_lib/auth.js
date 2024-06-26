import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { getUserFromEmail, createGuest } from "@/app/_lib/data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, req }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const currentUser = await getUserFromEmail(user.email);

        if (currentUser) return true;
        //old guest do nothing
        //new guest then update database

        const newUser = await createGuest({
          name: user.name,
          email: user.email,
        });

        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session, user }) {
      //In each session the ID updated to the database for an user will not be accessible , so the id is fetched and session is mutated

      const guest = await getUserFromEmail(session.user.email);
      session.user.guestId = guest._id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(authConfig);
