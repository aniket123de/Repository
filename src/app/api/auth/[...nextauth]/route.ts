import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/providers/overview
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.user.profile = token.profile;
      return session;
    },
  },
  theme: {
    colorScheme: "dark",
    brandColor: "#57B9C2", // Teal color from the GitHub login button
    logo: "/circle.png",
  },
  pages: {
    signIn: '/auth/signin',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
