"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./IntroReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Full-Stack Engineer",
  "AI-Assisted Development",
  "Cinematic Web Design",
  "MERN Stack",
];

export default function IntroReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        sectionRef.current,
        { clipPath: "circle(0% at 50% 100%)" },
        { clipPath: "circle(150% at 50% 100%)", duration: 1.3, ease: "power2.inOut" }
      )
        .from(
          '[data-anim="reveal-eyebrow"]',
          { y: 20, autoAlpha: 0, duration: 0.7 },
          "-=0.6"
        )
        .from(
          '[data-anim="reveal-name"]',
          { scale: 0.85, autoAlpha: 0, duration: 0.9, ease: "back.out(1.5)", stagger: 0.1 },
          "-=0.4"
        )
        .from(
          '[data-anim="reveal-tagline"]',
          { y: 16, autoAlpha: 0, duration: 0.7 },
          "-=0.5"
        )
        .from(
          '[data-anim="reveal-pill"]',
          { y: 16, autoAlpha: 0, duration: 0.6, ease: "back.out(1.6)", stagger: 0.08 },
          "-=0.4"
        )
        .from(
          '[data-anim="reveal-cta"]',
          { y: 12, autoAlpha: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          wrapRef.current,
          { clipPath: "inset(0% 0% 100% 0% round 1.75rem)", scale: 1.08, autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
            scale: 1,
            autoAlpha: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.9"
        )
        .fromTo(
          `.${styles.photoGlow}`,
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 0.7, scale: 1, duration: 1.3, ease: "power2.out" },
          "<"
        );

      gsap.to(stageRef.current, {
        y: -14,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(`.${styles.photoGlow}`, {
        scale: 1.14,
        opacity: 0.9,
        duration: 4.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(stageRef.current, {
        y: "+=44",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !window.matchMedia("(pointer: fine)").matches) return;

    const rotateX = gsap.quickTo(wrap, "rotateX", { duration: 0.6, ease: "power3.out" });
    const rotateY = gsap.quickTo(wrap, "rotateY", { duration: 0.6, ease: "power3.out" });
    const scaleTo = gsap.quickTo(wrap, "scale", { duration: 0.4, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 14);
      rotateX(-py * 14);
      scaleTo(1.03);
    };

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
      scaleTo(1);
    };

    wrap.addEventListener("pointermove", handleMove);
    wrap.addEventListener("pointerleave", handleLeave);

    return () => {
      wrap.removeEventListener("pointermove", handleMove);
      wrap.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <section id="intro" ref={sectionRef} className={styles.reveal}>
      <div className={styles.grid}>
        <div className={styles.content}>
          <span className={styles.eyebrow} data-anim="reveal-eyebrow">
            Hi, I&apos;m
          </span>
          <h2 className={styles.name}>
            <span data-anim="reveal-name">Bhushan</span>
            <span data-anim="reveal-name">Gowda</span>
          </h2>
          <p className={styles.tagline} data-anim="reveal-tagline">
            Building cinematic digital experiences with modern web
            technologies &amp; AI. Available for freelance &amp; full-time
            opportunities.
          </p>

          <ul className={styles.pills}>
            {ROLES.map((role) => (
              <li key={role} className={styles.pill} data-anim="reveal-pill">
                {role}
              </li>
            ))}
          </ul>

          <a href="#projects" className={styles.cta} data-anim="reveal-cta">
            View Projects
          </a>
        </div>

        <div className={styles.photoStage} ref={stageRef}>
          <div className={styles.photoGlow} aria-hidden="true" />
          <div className={styles.photoWrap} ref={wrapRef}>
            <Image
              src="/images/forbes-cover.jpg"
              alt="Bhushan Gowda featured as Forbes' visionary AI leader"
              width={1611}
              height={2000}
              className={styles.photo}
              sizes="(max-width: 860px) 80vw, 420px"
              priority={false}
            />
            <div className={styles.photoTint} aria-hidden="true" />
            <div className={styles.photoSheen} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
