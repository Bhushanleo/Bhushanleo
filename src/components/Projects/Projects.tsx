"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

type Accent = "orange" | "blue" | "violet" | "teal";

const PROJECTS: {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  accent: Accent;
}[] = [
  {
    id: "01",
    title: "Cinematic Commerce",
    tagline:
      "A headless storefront with motion-driven product reveals and a sub-second checkout flow.",
    tags: ["Next.js", "Stripe", "Framer Motion"],
    accent: "orange",
  },
  {
    id: "02",
    title: "Realtime Ops Dashboard",
    tagline:
      "Live infrastructure monitoring for distributed systems, streaming metrics at sub-second latency.",
    tags: ["React", "WebSockets", "D3.js"],
    accent: "blue",
  },
  {
    id: "03",
    title: "AI Content Studio",
    tagline:
      "Generative tooling for scriptwriters and video editors, built around a custom prompt pipeline.",
    tags: ["Python", "FastAPI", "OpenAI"],
    accent: "violet",
  },
  {
    id: "04",
    title: "Motion Design System",
    tagline:
      "A component library engineered for cinematic micro-interactions across a product suite.",
    tags: ["TypeScript", "GSAP", "Storybook"],
    accent: "teal",
  },
];

const ACCENT_CLASS: Record<Accent, string> = {
  orange: styles.accentOrange,
  blue: styles.accentBlue,
  violet: styles.accentViolet,
  teal: styles.accentTeal,
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="projects-eyebrow"]', {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="projects-eyebrow"]',
          start: "top 85%",
        },
      });

      gsap.from('[data-anim="projects-title"]', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="projects-title"]',
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-anim="project-card"]').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          autoAlpha: 0,
          duration: 0.9,
          delay: (i % 2) * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className={styles.projects}>
      <div className={styles.header}>
        <span className={styles.eyebrow} data-anim="projects-eyebrow">
          Selected Work
        </span>
        <h2 className={styles.title} data-anim="projects-title">
          Projects
        </h2>
      </div>

      <div className={styles.grid}>
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className={`${styles.card} ${ACCENT_CLASS[project.accent]}`}
            data-anim="project-card"
          >
            <span className={styles.cardIndex}>{project.id}</span>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardTagline}>{project.tagline}</p>
            <ul className={styles.tagList}>
              {project.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
