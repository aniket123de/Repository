// This file is used to define types for the process.env variables
// This adds type safety for environment variables

declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_SITE_URL: string;
  }
}
