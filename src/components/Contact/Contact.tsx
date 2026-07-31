"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_LINKS } from "@/components/shared/socialLinks";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="contact-item"]', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '[data-anim="contact-item"]',
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      <span className={styles.eyebrow} data-anim="contact-item">
        Get In Touch
      </span>
      <h2 className={styles.title} data-anim="contact-item">
        Let&apos;s build something worth remembering.
      </h2>
      <p className={styles.text} data-anim="contact-item">
        Open to freelance work and full-time opportunities. Reach out and
        I&apos;ll get back to you.
      </p>

      <a
        href="mailto:bushan.leo26@gmail.com"
        className={styles.emailBtn}
        data-anim="contact-item"
      >
        bushan.leo26@gmail.com
      </a>

      <ul className={styles.socials} data-anim="contact-item">
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
    </section>
  );
}
