"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Accent } from "@/data/projects";
import styles from "./ProjectsArchive.module.css";

gsap.registerPlugin(ScrollTrigger);

const ACCENT_CLASS: Record<Accent, string> = {
  orange: styles.accentOrange,
  blue: styles.accentBlue,
  violet: styles.accentViolet,
  teal: styles.accentTeal,
};

const techCount = new Set(PROJECTS.flatMap((p) => p.tags)).size;

const STATS = [
  { value: String(PROJECTS.length).padStart(2, "0"), label: "Featured Projects" },
  { value: `${techCount}+`, label: "Technologies" },
  { value: "5+", label: "Years Experience" },
];

export default function ProjectsArchive() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="archive-item"]', {
        y: 26,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>('[data-anim="archive-card"]').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          autoAlpha: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.archive}>
      <div className={styles.header}>
        <span className={styles.eyebrow} data-anim="archive-item">
          Project Archive
        </span>
        <h1 className={styles.title} data-anim="archive-item">
          Selected Projects
        </h1>
        <p className={styles.subtitle} data-anim="archive-item">
          Building cinematic digital experiences, scalable systems, and
          AI-powered products with modern web technologies.
        </p>

        <div className={styles.stats} data-anim="archive-item">
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className={`${styles.card} ${ACCENT_CLASS[project.accent]}`}
            data-anim="archive-card"
          >
            <div className={styles.cardTop}>
              <span className={styles.category}>{project.category}</span>
              <span className={styles.cardIndex}>{project.id}</span>
            </div>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDescription}>{project.description}</p>
            <ul className={styles.tagList}>
              {project.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
            <a
              href={project.liveDemo}
              className={styles.link}
              onClick={project.liveDemo === "#" ? (e) => e.preventDefault() : undefined}
            >
              Live Demo <span aria-hidden="true">&#8599;</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
