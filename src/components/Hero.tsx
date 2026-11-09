import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { PROFILE_DATA } from '../data/profile';

interface Particle {
  // Home position on a 3D shell (model space)
  hx: number; hy: number; hz: number;
  // Current offset from home (displaced by the cursor, springs back)
  ox: number; oy: number; oz: number;
  vx: number; vy: number; vz: number;
  size: number;
  hue: number; // 0 = cobalt, 1 = electric blue
}

const COUNT_DESKTOP = 900;
const COUNT_MOBILE = 420;
const FOV = 900;

/** Evenly-ish distribute points inside a flattened ellipsoid shell. */
function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const u = Math.random() * 2 - 1;
    const t = Math.random() * Math.PI * 2;
    const r = 0.55 + Math.random() * 0.45;
    const k = Math.sqrt(1 - u * u);
    return {
      hx: Math.cos(t) * k * r * 520,
      hy: u * r * 300,
      hz: Math.sin(t) * k * r * 520,
      ox: 0, oy: 0, oz: 0, vx: 0, vy: 0, vz: 0,
      size: Math.random() * 1.4 + 0.6,
      hue: Math.random(),
    };
  });
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1;
    let particles: Particle[] = [];

    // Pointer in CSS px relative to canvas; null when not hovering.
    const pointer = { x: 0, y: 0, active: false, down: false };
    // Rotation: eased toward a target driven by the cursor + drag + idle spin.
    let yaw = 0, pitch = -0.25, targetYaw = 0, targetPitch = -0.25, idleYaw = 0;
    let dragX = 0, dragY = 0;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? COUNT_MOBILE : COUNT_DESKTOP;
      if (particles.length !== count) particles = makeParticles(count);
    }
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      if (pointer.down) {
        dragX += e.movementX * 0.004;
        dragY += e.movementY * 0.004;
      } else {
        targetYaw = nx * 0.6;
        targetPitch = -0.25 + ny * 0.4;
      }
    };
    const onLeave = () => { pointer.active = false; pointer.down = false; };
    const onDown = () => { pointer.down = true; };
    const onUp = () => { pointer.down = false; };
    // Listen on window: the canvas sits under the hero content, so it never receives events itself.
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);

    let rafId = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !rafId && !reduceMotion) rafId = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    function frame() {
      rafId = 0;
      if (!ctx || !visible) return;
      ctx.clearRect(0, 0, w, h);

      idleYaw += reduceMotion ? 0 : 0.0016;
      yaw += (targetYaw + idleYaw + dragX - yaw) * 0.05;
      pitch += (targetPitch + dragY - pitch) * 0.05;
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const cx = w / 2, cyy = h / 2;
      const scale = Math.min(1, Math.max(0.55, w / 1280));
      const radius = (pointer.down ? 190 : 140);
      const radius2 = radius * radius;

      for (const p of particles) {
        // Current model-space position = home + displacement
        const x = p.hx * scale + p.ox;
        const y = p.hy * scale + p.oy;
        const z = p.hz * scale + p.oz;

        // Rotate around Y (yaw) then X (pitch)
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;

        const persp = FOV / (FOV + z2 + 400);
        const sx = cx + x1 * persp;
        const sy2 = cyy + y2 * persp;

        // Cursor interaction in screen space: push particles away (or pull while pressed)
        if (pointer.active && !reduceMotion) {
          const dx = sx - pointer.x;
          const dy = sy2 - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < radius2 && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / radius) * (pointer.down ? -0.9 : 2.2);
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
            p.vz += f * (Math.random() - 0.3) * 2;
          }
        }

        // Spring back toward home + damping
        p.vx += -p.ox * 0.018; p.vy += -p.oy * 0.018; p.vz += -p.oz * 0.018;
        p.vx *= 0.9; p.vy *= 0.9; p.vz *= 0.9;
        p.ox += p.vx; p.oy += p.vy; p.oz += p.vz;

        // Draw a short streak oriented along its velocity (stationary => dot)
        const depth = Math.min(1, Math.max(0.15, persp * 1.1 - 0.2));
        const speed = Math.hypot(p.vx, p.vy);
        const len = Math.min(10, speed * 2.2);
        const alpha = depth * (0.55 + Math.min(0.6, speed * 0.12));
        const g = Math.round(99 + p.hue * 59);
        const b = Math.round(235 + p.hue * 20);
        const r = Math.round(37 + p.hue * 22);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = p.size * persp * 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        if (len > 0.5) {
          const ux = p.vx / (speed || 1), uy = p.vy / (speed || 1);
          ctx.moveTo(sx - ux * len, sy2 - uy * len);
          ctx.lineTo(sx + ux * len, sy2 + uy * len);
        } else {
          ctx.moveTo(sx, sy2);
          ctx.lineTo(sx + 0.01, sy2);
        }
        ctx.stroke();
      }

      // Soft glow under the cursor
      if (pointer.active && !reduceMotion) {
        const grad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius);
        grad.addColorStop(0, 'rgba(59,158,255,0.18)');
        grad.addColorStop(1, 'rgba(59,158,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(pointer.x - radius, pointer.y - radius, radius * 2, radius * 2);
      }

      if (!reduceMotion) rafId = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" aria-hidden="true" />

      {/* Gradient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#2563EB] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#3B9EFF] opacity-20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-block mb-6 px-6 py-2 glass rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-sm tracking-wider text-[#3B9EFF]">
              {PROFILE_DATA.title}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 px-4 font-medium"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-foreground via-[#3B9EFF] to-foreground bg-clip-text text-transparent">
              {PROFILE_DATA.name}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#94A3B8] mb-4 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {PROFILE_DATA.tagline}
          </motion.p>

          <motion.button
            onClick={scrollToProjects}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#2563EB] to-[#3B9EFF] rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        {/* Floating shapes — desktop only */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-[#2563EB] rounded-lg opacity-20 hidden md:block"
          animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 border border-[#3B9EFF] rounded-full opacity-20 hidden md:block"
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}
