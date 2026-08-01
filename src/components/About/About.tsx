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
  const photoWrapRef = useRef<HTMLDivElement>(null);

  useWipeReveal(sectionRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        })
        .fromTo(
          photoWrapRef.current,
          { autoAlpha: 0, y: 60, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, ease: "power1.out" }
        )
        .to(photoWrapRef.current, { autoAlpha: 1, duration: 0.6 })
        .to(photoWrapRef.current, { autoAlpha: 0, y: -60, scale: 0.92, ease: "power1.in" });

      gsap.from('[data-anim="about-item"]', {
        y: 28,
        rotateX: -35,
        transformPerspective: 800,
        transformOrigin: "50% 100%",
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="about-item"]',
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-anim="bio-row"]').forEach((row) => {
        const index = row.querySelector(`.${styles.bioIndex}`);
        const paragraph = row.querySelector(`.${styles.bioParagraph}`);

        gsap.fromTo(
          paragraph,
          { clipPath: "inset(0 100% 0 0)", filter: "blur(7px)" },
          {
            clipPath: "inset(0 0% 0 0)",
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          index,
          { autoAlpha: 0, x: -14 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div
        className={`wipeCurtain ${styles.wipeCurtainAbout}`}
        data-wipe
        aria-hidden="true"
      />
      <div className={styles.grid}>
        <div className={styles.photoColumn}>
          <div className={styles.photoWrap} ref={photoWrapRef}>
            <Image
              src="/images/about-photo-new.jpg"
              alt="Bhushan Gowda"
              width={1611}
              height={2000}
              className={styles.photo}
              sizes="(max-width: 860px) 80vw, 360px"
            />
            <span className={`${styles.signature} ${caveat.className}`}>
              Bhushan
            </span>
          </div>

          <ul className={styles.socials} data-anim="about-item">
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

          <div className={styles.bioBlock}>
            <div className={styles.bioRow} data-anim="bio-row">
              <span className={styles.bioIndex}>01</span>
              <p className={styles.bioParagraph}>
                I&apos;m Bhushan Kumar S, a Software Engineer and AI
                Enthusiast based in Bengaluru with over 4 years of
                experience in enterprise software, technical support,
                incident management, and digital transformation. My
                professional journey includes working with{" "}
                <span className={styles.highlight}>
                  NSOFT India Pvt. Ltd.
                </span>{" "}
                on <span className={styles.highlight}>GESCOM&apos;s</span>{" "}
                ERP systems, followed by{" "}
                <span className={styles.highlight}>Accenture</span>, where
                I supported Microsoft products and managed
                mission-critical incidents for global clients across the
                US and UK.
              </p>
            </div>

            <div className={styles.bioRow} data-anim="bio-row">
              <span className={styles.bioIndex}>02</span>
              <p className={styles.bioParagraph}>
                Currently, I&apos;m contributing to technology initiatives
                at the{" "}
                <span className={styles.highlight}>
                  Karnataka Milk Federation (KMF)
                </span>
                , while continuously expanding my expertise in{" "}
                <span className={styles.highlight}>
                  Artificial Intelligence
                </span>
                , full-stack development, automation, and cloud
                technologies.
              </p>
            </div>

            <div className={styles.bioRow} data-anim="bio-row">
              <span className={styles.bioIndex}>03</span>
              <p className={styles.bioParagraph}>
                An{" "}
                <span className={styles.highlight}>
                  MCA graduate from PES University
                </span>
                , I&apos;m passionate about building innovative digital
                solutions, exploring the latest AI tools, and expressing
                creativity through photography and videography. I believe
                in continuous learning and leveraging technology to solve
                real-world challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
