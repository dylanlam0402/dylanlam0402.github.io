import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { PROFILE_DATA } from '../data/profile';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let rafId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.fillStyle = `rgba(123, 69, 189, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(123, 69, 189, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#7C3AED] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#9333EA] opacity-20 blur-[120px] rounded-full pointer-events-none" />

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
            <span className="text-sm tracking-wider text-[#9333EA]">
              {PROFILE_DATA.title}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 px-4 font-medium"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-foreground via-[#9333EA] to-foreground bg-clip-text text-transparent">
              {PROFILE_DATA.name}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#9CA3AF] mb-4 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {PROFILE_DATA.tagline}
          </motion.p>

          <motion.button
            onClick={scrollToProjects}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] mt-8"
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
          className="absolute top-20 left-10 w-20 h-20 border border-[#7C3AED] rounded-lg opacity-20 hidden md:block"
          animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 border border-[#9333EA] rounded-full opacity-20 hidden md:block"
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}
