import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data/profile';

export function About() {
  const focusAreas = PROFILE_DATA.skills[0].items.slice(0, 5);

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group order-2 md:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative glass-strong rounded-2xl p-2 overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-xl"
              >
                <img
                  src={PROFILE_DATA.avatarUrl}
                  alt={PROFILE_DATA.name}
                  className="w-full h-auto rounded-xl"
                  loading="eager"
                  fetchpriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bio cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6 order-1 md:order-2"
          >
            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-4 text-[#9333EA]">Senior Data Engineer</h3>
              <p className="text-[#9CA3AF] leading-relaxed text-sm md:text-base">
                {PROFILE_DATA.about}
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-4 text-[#9333EA]">Location</h3>
              <p className="text-[#9CA3AF] text-sm md:text-base">
                📍 {PROFILE_DATA.location}
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-4 text-[#9333EA]">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs md:text-sm text-foreground"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
