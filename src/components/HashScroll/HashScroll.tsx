"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);

    const timeout = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 350);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
