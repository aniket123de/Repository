"use client";

import { TeamSection } from "~/app/components/team";
// Handle potential import issues with lazy loading
import dynamic from 'next/dynamic';

const ScrollProgressBar = dynamic(
  () => import("~/app/components/scroll-progress-bar"),
  { ssr: false }
);

const ScrollToTopButton = dynamic(
  () => import("~/app/components/scroll-to-top-button"),
  { ssr: false }
);

export default function TeamPage() {
  return (
    <>
      <ScrollProgressBar />
      <main>
        <TeamSection />
      </main>
      <ScrollToTopButton />
    </>
  );
}
