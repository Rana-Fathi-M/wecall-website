import { Hero } from "../components/Hero";
import { Intro } from "../components/Intro";
import { TrustBar } from "../components/TrustBar";
import { FillText } from "../components/FillText";
import { Strategies } from "../components/Strategies";
import { Difference } from "../components/Difference";
import { Services } from "../components/Services";
// import { AudioPolicy } from "../components/AudioPolicy";
import { Workflow } from "../components/Workflow";
import { About } from "../components/About";
import { TrackRecord } from "../components/TrackRecord";
import { Pricing } from "../components/Pricing";
import { Quote } from "../components/Quote";

export function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <FillText />
      <Strategies />
      <TrustBar />
      <Difference />
      <Services />
      {/* <AudioPolicy /> */}
      <Workflow />
      <About />
      <TrackRecord />
      <Pricing />
      <Quote />
    </main>
  );
}
