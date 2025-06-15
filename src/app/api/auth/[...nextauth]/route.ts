import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth"

// You can configure your authentication providers here
export const authOptions: NextAuthOptions = {
  providers: [
    // Add your providers here (Google, GitHub, email, etc.)
    // For now, this is a minimal setup
  ],
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, user }) {
      return token
    },
  },
  pages: {
    // You can customize auth pages here if needed
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
