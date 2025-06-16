// This file is used to define types for the process.env variables
// This adds type safety for environment variables

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;
  }
}
