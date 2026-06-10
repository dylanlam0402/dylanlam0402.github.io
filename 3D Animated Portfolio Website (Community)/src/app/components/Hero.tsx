"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(123, 69, 189, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(123, 69, 189, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Gradient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#7C3AED] opacity-20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#9333EA] opacity-20 blur-[120px] rounded-full" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-6 px-6 py-2 glass rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-sm tracking-wider text-[#9333EA]">UI/UX Designer</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 px-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-foreground via-[#9333EA] to-foreground bg-clip-text text-transparent">
              Priyanshu
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Creating Intuitive Digital Experiences
          </motion.p>

          <motion.p
            className="text-sm sm:text-base text-muted-foreground mb-12 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            UI/UX Designer specializing in enterprise applications, design systems, and user-centered solutions
          </motion.p>

          <motion.button
            onClick={scrollToProjects}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]"
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

        {/* Floating elements - hidden on mobile */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-[#7C3AED] rounded-lg opacity-20 hidden md:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 border border-[#9333EA] rounded-full opacity-20 hidden md:block"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
}