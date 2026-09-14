import { AboutNarrative } from "../components/AboutNarrative";
import { HeroSlider } from "../components/HeroSlider";
import { SuccessStories } from "../components/SuccessStories";

export function AboutPage() {
  return (
    <main>
      <HeroSlider />
      <AboutNarrative />
      <SuccessStories />
    </main>
  );
}
