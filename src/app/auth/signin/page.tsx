"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";
import styles from "./signin.module.scss";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.signInCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>Repository</div>
          <p>Sign in to connect with developers near you</p>
        </div>

        <div className={styles.providers}>
          <button
            className={styles.githubButton}
            onClick={() => handleSignIn("github")}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                <FontAwesomeIcon icon={faGithub} className={styles.providerIcon} />
                <span>Continue with GitHub</span>
              </>
            )}
          </button>
        </div>

        <div className={styles.footer}>
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
