"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/data/experience";
import { useWipeReveal } from "@/hooks/useWipeReveal";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useWipeReveal(sectionRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="exp-eyebrow"], [data-anim="exp-title"], [data-anim="exp-count"]', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="exp-title"]',
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-anim="exp-column"]').forEach((column, i) => {
        gsap.from(column, {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: column,
            start: "top 88%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.experience}>
      <div
        className="wipeCurtain"
        data-wipe
        aria-hidden="true"
        style={{ background: "#08080b" }}
      />
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow} data-anim="exp-eyebrow">
            Career
          </span>
          <h2 className={styles.title} data-anim="exp-title">
            Work Experience
          </h2>
        </div>
        <span className={styles.count} data-anim="exp-count">
          {String(EXPERIENCE.length).padStart(2, "0")} Companies
        </span>
      </div>

      <div className={styles.timeline} onMouseLeave={() => setActiveIndex(0)}>
        <div className={styles.line} aria-hidden="true" />
        {EXPERIENCE.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={item.company}
              className={`${styles.column} ${isActive ? styles.columnActive : ""}`}
              data-anim="exp-column"
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              tabIndex={0}
            >
              <div className={`${styles.node} ${isActive ? styles.nodeActive : ""}`}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <span className={styles.meta}>
                {item.period} &middot; {item.type}
              </span>
              <span className={styles.location}>{item.location}</span>
              <h3 className={styles.company}>{item.company}</h3>
              <span className={styles.role}>{item.role}</span>
              <p className={`${styles.description} ${isActive ? styles.descriptionActive : ""}`}>
                {item.description}
              </p>
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
