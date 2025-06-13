

/**
 * @file Main page component for Repository
 * @copyright 2025 Repository Team
 * @license MIT
 * 
 * This file is part of the Repository project.
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { FallingCaps } from "./sections/falling-caps";
import { Footer } from "./sections/footer";
import { Hero } from "./sections/hero";
import { HorizontalMarquee } from "./sections/horizontal-marquee";
import { LastParallax } from "./sections/last-parallax";
import { LabIntro } from "./sections/lab-cylinder/intro";
import { LabCylinder } from "./sections/lab-cylinder";
import ScrollProgressBar from "./components/scroll-progress-bar";
import ScrollToTopButton from "./components/scroll-to-top-button";

export default function HomePage() {
  return (
    <main>
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Hero />
      <FallingCaps />
      <HorizontalMarquee />
      <LabIntro />
      <LabCylinder />
      <LastParallax />
      <Footer />
    </main>
  );
}
