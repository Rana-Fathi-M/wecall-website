import { AboutNarrative } from "../components/AboutNarrative";
import { HeroSlider } from "../components/HeroSlider";
import { TrackRecord } from "../components/TrackRecord";

export function AboutPage() {
  return (
    <main>
      <HeroSlider />
      <AboutNarrative />
      <TrackRecord />
    </main>
  );
}
