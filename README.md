# Bhushan Leo — Cinematic Portfolio

A premium, cinematic portfolio hero built with Next.js App Router, React, Three.js, and GSAP.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Structure

- `src/components/VideoIntro` — fullscreen sticky hero: foreground + blurred ambient background video, gradient overlays, glassmorphism play/mute controls, GSAP entrance animation, and scroll indicator.
- `src/components/CinematicLayer` — a Three.js overlay rendering warm, additive-blended bokeh particles with sine-wave drift and mouse parallax, layered above the video with `mix-blend-mode: screen`.
- `public/videos/hero-intro.mp4` — the source talking-head video used as both the sharp foreground layer and the blurred ambient background layer.

## Tech Stack

Next.js (App Router) · React · Three.js · GSAP · CSS Modules
