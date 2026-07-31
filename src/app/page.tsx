import VideoIntro from "@/components/VideoIntro/VideoIntro";
import Projects from "@/components/Projects/Projects";
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
            I&apos;m a full-stack developer focused on the details that make
            an interface feel alive &mdash; motion, timing, and craft.
          </p>
        </div>
      </section>
      <Projects />
    </main>
  );
}
