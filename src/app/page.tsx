import VideoIntro from "@/components/VideoIntro/VideoIntro";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <VideoIntro />
      <section id="about" className={styles.about}>
        <div className={styles.aboutInner}>
          <span className={styles.aboutEyebrow}>About</span>
          <h2 className={styles.aboutTitle}>
            Designing and building products people remember.
          </h2>
          <p className={styles.aboutText}>
            This section is a placeholder landing target for the hero&apos;s
            scroll indicator &mdash; replace it with the rest of the
            portfolio.
          </p>
        </div>
      </section>
    </main>
  );
}
