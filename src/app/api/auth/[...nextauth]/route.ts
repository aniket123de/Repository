import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { JWT } from "next-auth/jwt";
import type { Session, User, Account, Profile } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: { token: JWT; account?: Account | null; profile?: Profile | undefined }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Send properties to the client, like an access_token from a provider.
      (session as any).accessToken = (token as any).accessToken;
      (session.user as any).profile = (token as any).profile;
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
// Do not export authOptions from this file, as Next.js expects only route handlers.
