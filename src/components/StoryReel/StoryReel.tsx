"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StoryReel.module.css";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;
const framePath = (i: number) => `/frames/story/frame-${String(i).padStart(4, "0")}.jpg`;

export default function StoryReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      images.push(img);
    }

    let currentIndex = 0;

    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let drawWidth: number;
      let drawHeight: number;
      if (imgRatio > canvasRatio) {
        drawHeight = ch;
        drawWidth = drawHeight * imgRatio;
      } else {
        drawWidth = cw;
        drawHeight = drawWidth / imgRatio;
      }
      const offsetX = (cw - drawWidth) / 2;
      const offsetY = (ch - drawHeight) / 2;

      ctx2d.clearRect(0, 0, cw, ch);
      ctx2d.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentIndex);
    };

    images[0].onload = resize;
    resize();
    window.addEventListener("resize", resize);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        currentIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * FRAME_COUNT)
        );
        drawFrame(currentIndex);
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      trigger.kill();
      images.forEach((img) => {
        img.onload = null;
        img.src = "";
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.story}>
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <span className={styles.eyebrow}>The Process</span>
          <h2 className={styles.title}>Every frame, considered.</h2>
          <p className={styles.subtitle}>Scroll to keep watching.</p>
        </div>
      </div>
    </section>
  );
}
