"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Accent } from "@/data/projects";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const ACCENT_COLOR: Record<Accent, string> = {
  orange: "#ff8a3d",
  blue: "#4fa8ff",
  violet: "#b285ff",
  teal: "#3ddbc0",
};

export default function Projects() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const outer = outerRef.current;
    if (!track || !outer) return;

    const ctx = gsap.context(() => {
      const panelCount = PROJECTS.length;

      const scrollTween = gsap.to(track, {
        xPercent: (-100 * (panelCount - 1)) / panelCount,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => "+=" + (track.scrollWidth - window.innerWidth),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onEnter: () => document.documentElement.classList.add("no-snap"),
          onEnterBack: () => document.documentElement.classList.add("no-snap"),
          onLeave: () => document.documentElement.classList.remove("no-snap"),
          onLeaveBack: () => document.documentElement.classList.remove("no-snap"),
          onUpdate: (self) => {
            const index = Math.round(self.progress * (panelCount - 1)) + 1;
            if (counterRef.current) {
              counterRef.current.textContent = String(index).padStart(2, "0");
            }
          },
        },
      });

      return () => {
        scrollTween.scrollTrigger?.kill();
        document.documentElement.classList.remove("no-snap");
      };
    }, outer);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={outerRef} className={styles.spotlight}>
      <div className={styles.topBar}>
        <span className={styles.eyebrow}>Projects</span>
        <Link href="/projects" className={styles.viewAll}>
          View All Projects <span aria-hidden="true">&#8599;</span>
        </Link>
        <span className={styles.counter}>
          <span ref={counterRef}>01</span> / {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>

      <div ref={trackRef} className={styles.track}>
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className={styles.panel}
            style={{
              background: project.gradient,
              "--accent": ACCENT_COLOR[project.accent],
            } as React.CSSProperties}
          >
            <div className={styles.panelOverlay} />

            <div className={styles.panelMain}>
              <span className={styles.badge}>{project.category}</span>
              <h2 className={styles.title}>{project.title}</h2>
              <span className={styles.subtitle}>{project.subtitle}</span>
              <a
                href={project.liveDemo}
                className={styles.liveDemo}
                onClick={project.liveDemo === "#" ? (e) => e.preventDefault() : undefined}
              >
                Live Demo <span aria-hidden="true">&#8599;</span>
              </a>
            </div>

            <div className={styles.panelDetails}>
              <p className={styles.description}>{project.description}</p>
              <ul className={styles.tags}>
                {project.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
