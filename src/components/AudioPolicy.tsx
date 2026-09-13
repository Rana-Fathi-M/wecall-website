import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  markRosterEnded,
  onRosterPlaying,
  registerRosterAudio,
  requestRosterPlay,
  stopRosterPlay,
} from "../lib/voiceUnlock";
import { ClaimSeatCta } from "./ClaimSeatCta";
import { asset } from "../media";

gsap.registerPlugin(ScrollTrigger);

const chips = ["Confidentiality", "Identity rights", "Active NDAs"];

export function AudioPolicy() {
  const root = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    registerRosterAudio(audioRef.current);

    const ctx = gsap.context(() => {
      gsap.from(".ap-kicker, .ap-rule, .ap-title, .ap-copy, .ap-chip, .ap-player, .ap-cta", {
        y: 32,
        opacity: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".ap-bar").forEach((bar, i) => {
        gsap.to(bar, {
          scaleY: gsap.utils.random(0.28, 1),
          duration: 0.38 + (i % 5) * 0.05,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.04,
          transformOrigin: "center center",
        });
      });

    }, root);

    const offPlaying = onRosterPlaying(setPlaying);

    return () => {
      registerRosterAudio(null);
      offPlaying();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="ap-sec relative overflow-hidden bg-ink px-3 py-16 md:px-6 md:py-28">
      <audio
        ref={audioRef}
        src={`${asset("assets/audio/elite-roster-invite.wav")}?v=10`}
        preload="auto"
        playsInline
        onEnded={() => markRosterEnded()}
      />
      <div className="ap-glow" />

      <div className="relative z-[2] mx-auto max-w-3xl text-center">
        <p className="ap-kicker font-mariyam text-[36px] leading-none text-gold md:text-[64px]">
          private
        </p>
        <span className="ap-rule mx-auto mt-3 block h-px w-14 bg-gold/50" />
        <h2 className="ap-title mt-4 font-nohemi text-[26px] leading-[0.95] font-light md:mt-6 md:text-[64px]">
          Audition Our Elite Caller Roster
          <span className="mt-1 block text-gold">(Private Review)</span>
        </h2>
        <p className="ap-copy mx-auto mt-4 max-w-2xl font-manrope text-[13px] leading-relaxed text-white/75 md:mt-8 md:text-[16px]">
          Tired of leads that go nowhere? Live caller recordings stay off this page to
          protect your deals, our callers, and active NDAs. Hear the elite roster on a
          private strategy call. Capped at 10 active desks.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:mt-8">
          {chips.map((chip) => (
            <span key={chip} className="ap-chip">
              {chip}
            </span>
          ))}
        </div>

        <div className={`ap-player ${playing ? "is-live" : ""}`}>
          <button
            type="button"
            className="ap-toggle"
            onClick={(e) => {
              e.stopPropagation();
              if (playing) stopRosterPlay();
              else requestRosterPlay();
            }}
            aria-pressed={playing}
            aria-label={playing ? "Stop invitation" : "Play invitation"}
          >
            {playing ? (
              <span className="ap-toggle-icon ap-toggle-stop" />
            ) : (
              <span className="ap-toggle-icon ap-toggle-play" />
            )}
          </button>
          <div className="ap-wave" aria-hidden>
            {Array.from({ length: 22 }).map((_, i) => (
              <span key={i} className="ap-bar" />
            ))}
          </div>
        </div>

        <ClaimSeatCta className="ap-cta mt-8 md:mt-10" />
      </div>
    </section>
  );
}
