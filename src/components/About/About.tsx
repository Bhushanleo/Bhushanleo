"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_LINKS } from "@/components/shared/socialLinks";
import { useWipeReveal } from "@/hooks/useWipeReveal";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const caveat = Caveat({ subsets: ["latin"], weight: ["600"] });

const KEYWORDS = [
  "Full Stack Engineer",
  "React Developer",
  "Node.js",
  "System Design",
  "API Architect",
  "Problem Solver",
  "UI Engineer",
  "GSAP Animation",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useWipeReveal(sectionRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="about-photo"]', {
        x: -40,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="about-photo"]',
          start: "top 82%",
        },
      });

      gsap.from('[data-anim="about-item"]', {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="about-item"]',
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div
        className="wipeCurtain"
        data-wipe
        aria-hidden="true"
        style={{ background: "#08080b" }}
      />
      <div className={styles.grid}>
        <div className={styles.photoColumn} data-anim="about-photo">
          <div className={styles.photoWrap}>
            <Image
              src="/images/about-photo.jpg"
              alt="Bhushan Gowda"
              width={720}
              height={1210}
              className={styles.photo}
              sizes="(max-width: 860px) 80vw, 360px"
            />
            <span className={`${styles.signature} ${caveat.className}`}>
              Bhushan
            </span>
          </div>

          <ul className={styles.socials}>
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.name}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow} data-anim="about-item">
            Who I Am
          </span>
          <h2 className={styles.title} data-anim="about-item">
            Designing and building products people remember.
          </h2>

          <div className={styles.marquee} data-anim="about-item">
            <div className={styles.marqueeTrack}>
              {[...KEYWORDS, ...KEYWORDS].map((word, i) => (
                <span key={`${word}-${i}`} className={styles.marqueeItem}>
                  {word}
                  <span className={styles.marqueeDot}>&middot;</span>
                </span>
              ))}
            </div>
          </div>

          <p className={styles.bio} data-anim="about-item">
            I&apos;m a full-stack developer focused on building fast,
            reliable products end-to-end &mdash; from clean API design and
            scalable backend architecture to interfaces that feel considered
            down to the last transition. I care about the craft as much as
            the code: performance, accessible motion, and the details most
            people only notice when they&apos;re missing.
          </p>
        </div>
      </div>
    </section>
  );
}
