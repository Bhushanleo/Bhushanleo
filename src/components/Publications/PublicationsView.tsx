"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MediumPost } from "@/lib/medium";
import { useWipeReveal } from "@/hooks/useWipeReveal";
import styles from "./Publications.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function PublicationsView({ posts }: { posts: MediumPost[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useWipeReveal(sectionRef);

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

      gsap.utils.toArray<HTMLElement>('[data-anim="pub-row"]').forEach((row, i) => {
        gsap.from(row, {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="publications" ref={sectionRef} className={styles.publications}>
      <div
        className="wipeCurtain"
        data-wipe
        aria-hidden="true"
        style={{ background: "#08080b" }}
      />
      <Image
        src="/images/about-photo.jpg"
        alt=""
        width={720}
        height={1210}
        className={styles.bgPhoto}
        aria-hidden="true"
      />
      <span className={styles.watermark} aria-hidden="true">
        Written
      </span>

      <div className={styles.header}>
        <span className={styles.eyebrow} data-anim="pub-eyebrow">
          Research &amp; Writing
        </span>
        <h2 className={styles.title} data-anim="pub-title">
          Publications
        </h2>
      </div>

      <div className={styles.list}>
        {posts.map((post, i) => {
          const isReal = Boolean(post.link) && post.link !== "#";

          return (
            <a
              key={post.title}
              href={post.link || "#"}
              className={styles.row}
              data-anim="pub-row"
              target={isReal ? "_blank" : undefined}
              rel={isReal ? "noopener noreferrer" : undefined}
              onClick={isReal ? undefined : (e) => e.preventDefault()}
            >
              <div className={styles.rowMain}>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}.</span>
                <div className={styles.rowContent}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <span className={styles.badge}>Medium</span>
                  </div>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                </div>
              </div>
              {post.year && <span className={styles.year}>{post.year}</span>}
            </a>
          );
        })}
      </div>
    </section>
  );
}
