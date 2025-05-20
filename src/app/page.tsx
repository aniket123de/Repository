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
