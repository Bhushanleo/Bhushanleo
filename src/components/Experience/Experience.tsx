"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  {
    role: "Senior Full-Stack Engineer",
    company: "Nova Systems",
    period: "2023 — Present",
    description:
      "Leading development of a microservices-based platform serving 100K+ daily users, mentoring a team of four engineers.",
  },
  {
    role: "Full-Stack Developer",
    company: "Lumen Studio",
    period: "2021 — 2023",
    description:
      "Built and shipped customer-facing web applications end-to-end using React, Node.js, and PostgreSQL.",
  },
  {
    role: "Junior Developer",
    company: "Arclight Labs",
    period: "2019 — 2021",
    description:
      "Contributed to internal tooling and automation, reducing manual QA time by 40%.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="exp-eyebrow"], [data-anim="exp-title"]', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="exp-title"]',
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-anim="exp-item"]').forEach((item) => {
        gsap.from(item, {
          x: -40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.experience}>
      <div className={styles.header}>
        <span className={styles.eyebrow} data-anim="exp-eyebrow">
          Career
        </span>
        <h2 className={styles.title} data-anim="exp-title">
          Experience
        </h2>
      </div>

      <div className={styles.timeline}>
        {ROLES.map((item) => (
          <article key={item.role} className={styles.item} data-anim="exp-item">
            <div className={styles.marker}>
              <span className={styles.dot} />
              <span className={styles.line} />
            </div>
            <div className={styles.body}>
              <span className={styles.period}>{item.period}</span>
              <h3 className={styles.role}>{item.role}</h3>
              <span className={styles.company}>{item.company}</span>
              <p className={styles.description}>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
