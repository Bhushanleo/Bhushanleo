"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CinematicLayer from "@/components/CinematicLayer/CinematicLayer";
import { MuteIcon, PauseIcon, PlayIcon, UnmuteIcon } from "./icons";
import styles from "./VideoIntro.module.css";

const VIDEO_SRC = "/videos/hero-intro.mp4";

export default function VideoIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(containerRef.current, { autoAlpha: 0 })
        .to(containerRef.current, { autoAlpha: 1, duration: 1.4 })
        .from(
          '[data-anim="eyebrow"]',
          { y: 24, autoAlpha: 0, duration: 0.9 },
          "-=0.7"
        )
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4500);
    return () => clearTimeout(timer);
  }, []);

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
    if (!next) setShowHint(false);
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
          autoPlay
          loop
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
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />

        <div className={styles.gradientOverlay} />

        <div className={styles.canvasLayer}>
          <CinematicLayer />
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
              Leo
            </span>
          </h1>
          <p className={styles.subtitle} data-anim="subtitle">
            Full-stack developer crafting cinematic, high-performance web
            experiences at the intersection of design and code.
          </p>
        </div>

        <div className={styles.controls} data-anim="controls">
          <span
            className={`${styles.hint} ${showHint ? styles.hintVisible : ""}`}
          >
            Tap for sound
          </span>
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
