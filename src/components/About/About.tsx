"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const caveat = Caveat({ subsets: ["latin"], weight: ["600"] });

const SKILLS = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "AWS",
  "GSAP",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

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
      <div className={styles.grid}>
        <div className={styles.photoWrap} data-anim="about-photo">
          <Image
            src="/images/about-photo.jpg"
            alt="Bhushan Gowda"
            width={720}
            height={1210}
            className={styles.photo}
            sizes="(max-width: 860px) 80vw, 360px"
          />
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow} data-anim="about-item">
            Who I Am
          </span>
          <h2 className={styles.title} data-anim="about-item">
            Designing and building products people remember.
          </h2>
          <p className={styles.bio} data-anim="about-item">
            I&apos;m a full-stack developer focused on building fast,
            reliable products end-to-end &mdash; from clean API design and
            scalable backend architecture to interfaces that feel considered
            down to the last transition. I care about the craft as much as
            the code: performance, accessible motion, and the details most
            people only notice when they&apos;re missing.
          </p>

          <ul className={styles.skills} data-anim="about-item">
            {SKILLS.map((skill) => (
              <li key={skill} className={styles.skill}>
                {skill}
              </li>
            ))}
          </ul>

          <span
            className={`${styles.signature} ${caveat.className}`}
            data-anim="about-item"
          >
            Bhushan Gowda
          </span>
        </div>
      </div>
    </section>
  );
}
