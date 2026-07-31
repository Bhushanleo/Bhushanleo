"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useWipeReveal(
  sectionRef: RefObject<HTMLElement | null>,
  wipeSelector = "[data-wipe]"
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const wipe = section.querySelector(wipeSelector);
    if (!wipe) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wipe,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 0.9,
          ease: "power4.inOut",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [sectionRef, wipeSelector]);
}
