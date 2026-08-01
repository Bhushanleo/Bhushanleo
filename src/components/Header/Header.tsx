"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Publications", href: "/#publications", id: "publications" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

function formatIstTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

export default function Header() {
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tick = () => setTime(formatIstTime(new Date()));
    const timeout = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) {
      const timeout = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  return (
    <header className={`${styles.header} ${visible ? styles.headerVisible : ""}`}>
      <div className={styles.bar}>
        <span className={styles.clock} suppressHydrationWarning>
          India Time &mdash; {time ?? "--:--:--"}
        </span>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={handleNavClick(link.id)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="mailto:bushan.leo26@gmail.com" className={styles.emailBtn}>
            Email me
          </a>
          <a
            href="#"
            className={styles.resumeBtn}
            aria-label="Download resume"
            title="Resume coming soon"
            onClick={(e) => e.preventDefault()}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
              <path
                d="M7 3.5h7l3 3v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path d="M14 3.5V7h3.2" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8.5 13h7M8.5 16h4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </a>
          <button
            type="button"
            className={styles.menuToggle}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`${styles.bar1} ${menuOpen ? styles.open : ""}`} />
            <span className={`${styles.bar2} ${menuOpen ? styles.open : ""}`} />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={handleNavClick(link.id)}
          >
            {link.label}
          </Link>
        ))}
        <a href="mailto:bushan.leo26@gmail.com" className={styles.mobileLink} onClick={closeMenu}>
          Email me
        </a>
      </div>
    </header>
  );
}
