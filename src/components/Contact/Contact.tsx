"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_LINKS } from "@/components/shared/socialLinks";
import { useWipeReveal } from "@/hooks/useWipeReveal";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

function getIstGreeting(date: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      hour12: false,
    }).format(date)
  );

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
}

const YEAR = new Date().getFullYear();

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const [greeting, setGreeting] = useState("Hello");

  useWipeReveal(sectionRef);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGreeting(getIstGreeting(new Date()));
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let rafId: number | undefined;

    const ctx = gsap.context(() => {
      gsap.from('[data-anim="contact-item"]', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="contact-item"]',
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from('[data-anim="contact-photo"]', {
        rotateY: 90,
        scale: 0.85,
        autoAlpha: 0,
        transformPerspective: 1200,
        transformOrigin: "50% 50%",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="contact-photo"]',
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (photoImgRef.current) {
        const img = photoImgRef.current;
        let targetScale = 1;
        let currentScale = 1;

        const loop = () => {
          currentScale += (targetScale - currentScale) * 0.07;
          img.style.transform = `scale(${currentScale})`;
          rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top+=72",
          onUpdate: (self) => {
            const tent = self.progress < 0.5 ? self.progress * 2 : (1 - self.progress) * 2;
            targetScale = 1 + tent * 0.22;
          },
        });
      }
    }, sectionRef);

    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      <div
        className="wipeCurtain"
        data-wipe
        aria-hidden="true"
        style={{ background: "#08080b" }}
      />
      <span className={styles.watermark} aria-hidden="true">
        Bhushan Gowda
      </span>

      <div className={styles.grid}>
        <div className={styles.left} data-anim="contact-item">
          <span className={styles.greeting}>
            <span className={styles.dot} />
            {greeting}
          </span>
          <span className={styles.role}>Software Developer</span>
          <h2 className={styles.name}>
            Bhushan <span className={styles.nameMuted}>Gowda</span>
          </h2>
          <p className={styles.bio}>
            Building cinematic digital experiences, scalable systems, and
            AI-powered products with modern web technologies.
          </p>
          <span className={styles.location}>Based in Bangalore, India</span>

          <ul className={styles.socials}>
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

          <a href="mailto:bushan.leo26@gmail.com" className={styles.email}>
            bushan.leo26@gmail.com
          </a>
        </div>

        <div className={styles.photoWrap} data-anim="contact-photo">
          <Image
            ref={photoImgRef}
            src="/images/contact-avatar.jpg"
            alt="Bhushan Gowda at his desk, illustrated"
            width={799}
            height={1344}
            className={styles.photo}
          />
        </div>

        <div className={styles.right} data-anim="contact-item">
          <span className={styles.available}>Available for Collaborations</span>
          <h2 className={styles.headline}>
            Crafting modern digital products that feel{" "}
            <span className={styles.highlight}>alive.</span>
          </h2>
          <a href="mailto:bushan.leo26@gmail.com" className={styles.cta}>
            Let&apos;s Talk <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerBrand}>
          <span className={styles.monogram}>BG</span>
          <span>&copy; {YEAR} Bhushan Gowda. All rights reserved.</span>
        </div>
        <span>Designed &amp; developed with precision.</span>
      </div>
    </section>
  );
}
