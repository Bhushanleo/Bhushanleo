"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MuteIcon, PauseIcon, PlayIcon, UnmuteIcon } from "./icons";
import styles from "./VideoIntro.module.css";

const VIDEO_SRC = "/videos/hero-intro.mp4";
const POSTER_SRC = "/images/hero-poster.jpg";

export default function VideoIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      tl.from('[data-anim="eyebrow"]', { y: 24, autoAlpha: 0, duration: 0.9 })
        .from(
          '[data-anim="name-line"]',
          { y: 70, autoAlpha: 0, duration: 1.1, stagger: 0.16 },
          "-=0.5"
        )
        .from(
          '[data-anim="subtitle"]',
          { y: 20, autoAlpha: 0, duration: 0.9 },
          "-=0.6"
        )
        .from(
          '[data-anim="controls"]',
          { y: 12, autoAlpha: 0, duration: 0.7 },
          "-=0.5"
        )
        .from(
          '[data-anim="scroll"]',
          { autoAlpha: 0, duration: 0.8 },
          "-=0.4"
        );

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleStart = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;

    setEntered(true);
    timelineRef.current?.play();

    if (fg) {
      fg.muted = false;
      fg.play();
    }
    bg?.play();
    setPlaying(true);
    setMuted(false);
  };

  const togglePlay = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;

    if (fg.paused) {
      fg.play();
      bg?.play();
      setPlaying(true);
    } else {
      fg.pause();
      bg?.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const fg = fgVideoRef.current;
    if (!fg) return;

    const next = !fg.muted;
    fg.muted = next;
    setMuted(next);
  };

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.stickyWrap}>
      <div ref={containerRef} className={styles.hero}>
        <video
          ref={bgVideoRef}
          className={styles.videoBg}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <video
          ref={fgVideoRef}
          className={styles.videoFg}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onEnded={() => setPlaying(false)}
        />

        <div className={styles.gradientOverlay} />

        <div
          className={`${styles.gate} ${entered ? styles.gateHidden : ""}`}
          aria-hidden={entered}
        >
          <span className={styles.gateName}>Bhushan Leo</span>
          <button
            type="button"
            className={styles.startButton}
            onClick={handleStart}
            disabled={entered}
          >
            Start
          </button>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow} data-anim="eyebrow">
            Portfolio &mdash; 2026
          </span>
          <h1 className={styles.name}>
            <span className={styles.nameLine} data-anim="name-line">
              Bhushan
            </span>
            <span className={styles.nameLine} data-anim="name-line">
              Gowda
            </span>
          </h1>
          <p className={styles.subtitle} data-anim="subtitle">
            Full-stack developer crafting cinematic, high-performance web
            experiences at the intersection of design and code.
          </p>
        </div>

        <div className={styles.controls} data-anim="controls">
          <button
            type="button"
            className={styles.controlBtn}
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? <MuteIcon /> : <UnmuteIcon />}
          </button>
        </div>

        <button
          type="button"
          className={styles.scrollIndicator}
          data-anim="scroll"
          onClick={scrollToNext}
          aria-label="Scroll to next section"
        >
          <span className={styles.scrollLabel}>Scroll</span>
          <span className={styles.scrollLine}>
            <span className={styles.scrollDot} />
          </span>
        </button>
      </div>
    </section>
  );
}
