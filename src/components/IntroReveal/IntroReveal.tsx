"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Full-Stack Engineer",
  "AI-Assisted Development",
  "Cinematic Web Design",
  "MERN Stack",
];

export default function IntroReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        sectionRef.current,
        { clipPath: "circle(0% at 50% 100%)" },
        { clipPath: "circle(150% at 50% 100%)", duration: 1.3, ease: "power2.inOut" }
      )
        .from(
          '[data-anim="reveal-eyebrow"]',
          { y: 20, autoAlpha: 0, duration: 0.7 },
          "-=0.6"
        )
        .from(
          '[data-anim="reveal-name"]',
          { scale: 0.85, autoAlpha: 0, duration: 0.9, ease: "back.out(1.5)", stagger: 0.1 },
          "-=0.4"
        )
        .from(
          '[data-anim="reveal-tagline"]',
          { y: 16, autoAlpha: 0, duration: 0.7 },
          "-=0.5"
        )
        .from(
          '[data-anim="reveal-pill"]',
          { y: 16, autoAlpha: 0, duration: 0.6, ease: "back.out(1.6)", stagger: 0.08 },
          "-=0.4"
        )
        .from(
          '[data-anim="reveal-cta"]',
          { y: 12, autoAlpha: 0, duration: 0.6 },
          "-=0.3"
        )
        .from(
          '[data-anim="reveal-photo"]',
          { y: 60, autoAlpha: 0, duration: 1 },
          "-=0.9"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" ref={sectionRef} className={styles.reveal}>
      <div className={styles.grid}>
        <div className={styles.content}>
          <span className={styles.eyebrow} data-anim="reveal-eyebrow">
            Hi, I&apos;m
          </span>
          <h2 className={styles.name}>
            <span data-anim="reveal-name">Bhushan</span>
            <span data-anim="reveal-name">Gowda</span>
          </h2>
          <p className={styles.tagline} data-anim="reveal-tagline">
            Building cinematic digital experiences with modern web
            technologies &amp; AI. Available for freelance &amp; full-time
            opportunities.
          </p>

          <ul className={styles.pills}>
            {ROLES.map((role) => (
              <li key={role} className={styles.pill} data-anim="reveal-pill">
                {role}
              </li>
            ))}
          </ul>

          <a href="#projects" className={styles.cta} data-anim="reveal-cta">
            View Projects
          </a>
        </div>

        <div className={styles.photoWrap} data-anim="reveal-photo">
          <Image
            src="/images/forbes-cover.jpg"
            alt="Bhushan Gowda featured as Forbes' visionary AI leader"
            width={1611}
            height={2000}
            className={styles.photo}
            sizes="(max-width: 860px) 80vw, 420px"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
