"use client";

import { motion } from "motion/react";
import profileImage from "figma:asset/6e0e2b476ccec5bceb64fc65a6fa8efab8e13270.png";

export function About() {
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
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
                  src={profileImage}
                  alt="Priyanshu - UI/UX Designer"
                  className="w-full h-auto rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6 order-1 md:order-2"
          >
            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-4 text-[#9333EA]">Creative & Detail-Oriented</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Creative and detail-oriented UI/UX Designer with 3+ years of experience designing 
                user-centric web and mobile applications. Skilled in Figma, Adobe XD, usability 
                testing, and design thinking.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-4 text-[#9333EA]">Location</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                📍 Hyderabad, India
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-4 text-[#9333EA]">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {["User Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems"].map(
                  (skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs md:text-sm"
                    >
                      {skill}
                    </motion.span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}