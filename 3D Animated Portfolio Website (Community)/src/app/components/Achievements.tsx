"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FolderOpen, Users, Building2 } from "lucide-react";
import CountUp from "react-countup";

const achievements = [
  {
    icon: FolderOpen,
    value: 35,
    suffix: "+",
    label: "UX Projects Completed",
    color: "from-[#7C3AED] to-[#9333EA]",
  },
  {
    icon: Users,
    value: 20,
    suffix: "%",
    label: "Usability Improvements",
    color: "from-[#9333EA] to-[#A855F7]",
  },
  {
    icon: Building2,
    value: 5,
    suffix: "+",
    label: "Enterprise Clients",
    color: "from-[#A855F7] to-[#7C3AED]",
  },
];

function Counter({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function Achievements() {
  const [isInView, setIsInView] = useState(false);

  return (
    <section id="achievements" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setIsInView(true)}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-strong rounded-2xl p-8 text-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    background: [
                      "radial-gradient(circle at 0% 0%, rgba(123, 69, 189, 0.1), transparent 50%)",
                      "radial-gradient(circle at 100% 100%, rgba(155, 111, 216, 0.1), transparent 50%)",
                      "radial-gradient(circle at 0% 0%, rgba(123, 69, 189, 0.1), transparent 50%)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  whileHover={{ rotate: 360 }}
                  className={`inline-flex p-6 bg-gradient-to-br ${achievement.color} rounded-2xl mb-6 relative z-10`}
                >
                  <Icon className="w-10 h-10 text-[#F9FAFB]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-5xl mb-4 bg-gradient-to-r from-white to-[#9333EA] bg-clip-text text-transparent relative z-10"
                >
                  {isInView && (
                    <CountUp start={0} end={achievement.value} duration={2} suffix={achievement.suffix} />
                  )}
                </motion.div>

                <p className="text-[#9CA3AF] relative z-10">{achievement.label}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass-strong rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl mb-4 text-[#9333EA]">Recognition</h3>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            Recognized for exceptional collaboration with cross-functional teams and delivering 
            user-centric design solutions that consistently exceed client expectations and drive 
            measurable business results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}