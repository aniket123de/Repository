// nextauth.d.ts
import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Extending the default session type
   */
  interface Session {
    accessToken?: string
    user: {
      /** Defaults to user.name */
      name?: string | null
      /** Defaults to user.email */
      email?: string | null  
      /** Defaults to user.image */
      image?: string | null
      /** GitHub profile information */
      profile?: any
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /** Extending the JWT token type */
  interface JWT {
    /** GitHub OAuth access token */
    accessToken?: string
    /** GitHub profile information */
    profile?: any
  }
}
