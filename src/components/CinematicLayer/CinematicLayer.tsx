"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

const PARTICLE_COUNT = 150;

const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aAmp;

  uniform float uTime;
  uniform float uAmpScale;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 pos = position;
    pos.x += sin(uTime * aSpeed + aPhase) * aAmp * uAmpScale;
    pos.y += cos(uTime * aSpeed * 0.8 + aPhase) * aAmp * 0.6 * uAmpScale;
    pos.z += sin(uTime * aSpeed * 0.5 + aPhase * 1.3) * aAmp * 0.4 * uAmpScale;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = clamp(1.0 - (-mvPosition.z / 42.0), 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= alpha;
    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const amps = new Float32Array(PARTICLE_COUNT);

    const warm = new THREE.Color();
    const cool = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

      const isWarm = Math.random() < 0.68;
      const c = isWarm
        ? warm.setHSL(0.07 + Math.random() * 0.05, 0.85, 0.55 + Math.random() * 0.15)
        : cool.setHSL(0.1, 0.05, 0.88 + Math.random() * 0.1);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 40 + Math.random() * 110;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.15 + Math.random() * 0.3;
      amps[i] = 0.15 + Math.random() * 0.45;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("aAmp", new THREE.BufferAttribute(amps, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uAmpScale: { value: prefersReducedMotion ? 0.2 : 1 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const startTime = performance.now();
    let rafId = 0;
    let running = true;

    let camX = 0;
    let camY = 0;
    let targetX = 0;
    let targetY = 0;

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 1.2;
      targetY = (event.clientY / window.innerHeight - 0.5) * -0.7;
    };

    const handleVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        animate();
      } else {
        cancelAnimationFrame(rafId);
      }
    };

    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);
      material.uniforms.uTime.value = (performance.now() - startTime) / 1000;

      camX += (targetX - camX) * 0.04;
      camY += (targetY - camY) * 0.04;
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove);
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
