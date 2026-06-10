import { motion } from 'motion/react';
import { useState } from 'react';
import CountUp from 'react-countup';
import { Clock, Database, Users } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import type { LucideIcon } from 'lucide-react';

const ICONS: LucideIcon[] = [Clock, Database, Users];

export function Achievements() {
  const [inView, setInView] = useState(false);

  return (
    <section id="achievements" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setInView(true)}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {PROFILE_DATA.achievements.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-strong rounded-2xl p-8 text-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.1), transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(147,51,234,0.1), transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.1), transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  whileHover={{ rotate: 360 }}
                  className="inline-flex p-6 bg-gradient-to-br from-[#7C3AED] to-[#9333EA] rounded-2xl mb-6 relative z-10"
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  className="text-5xl mb-4 bg-gradient-to-r from-white to-[#9333EA] bg-clip-text text-transparent relative z-10 font-medium"
                >
                  {inView && (
                    <CountUp
                      start={0}
                      end={item.value}
                      duration={2}
                      suffix={item.suffix}
                    />
                  )}
                </motion.div>

                <p className="text-[#9CA3AF] relative z-10">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
