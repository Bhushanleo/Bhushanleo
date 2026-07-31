"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Publications.module.css";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    title: "Building Resilient APIs with FastAPI and LangChain",
    excerpt:
      "Patterns for structuring AI-powered endpoints that stay maintainable as the prompt logic grows.",
  },
  {
    title: "Scaling React Apps: Lessons from Production",
    excerpt:
      "What actually moved the needle on performance across three years of shipping React at scale.",
  },
  {
    title: "Designing Motion Systems for the Web",
    excerpt:
      "A practical approach to building animation primitives that stay consistent across a product.",
  },
];

export default function Publications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="pub-eyebrow"], [data-anim="pub-title"]', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="pub-title"]',
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-anim="pub-card"]').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          autoAlpha: 0,
          duration: 0.9,
          delay: i * 0.1,
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
    <section id="publications" ref={sectionRef} className={styles.publications}>
      <div className={styles.header}>
        <span className={styles.eyebrow} data-anim="pub-eyebrow">
          Writing
        </span>
        <h2 className={styles.title} data-anim="pub-title">
          Publications
        </h2>
      </div>

      <div className={styles.grid}>
        {ARTICLES.map((article) => (
          <a
            key={article.title}
            href="#"
            className={styles.card}
            data-anim="pub-card"
            onClick={(e) => e.preventDefault()}
          >
            <h3 className={styles.cardTitle}>{article.title}</h3>
            <p className={styles.excerpt}>{article.excerpt}</p>
            <span className={styles.readMore}>Read article &rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}
