"use client";

import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const educationData = [
  {
    degree: "BFA in Applied Art & Visual Communication",
    institution: "University",
    cgpa: "8.93 CGPA",
    icon: GraduationCap,
  },
  {
    degree: "UX Design Certification",
    institution: "Leap Frog Design Institute",
    icon: Award,
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">Education & Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {educationData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-strong rounded-2xl p-8 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex p-4 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-2xl mb-6"
                >
                  <Icon className="w-8 h-8 text-[#9333EA]" />
                </motion.div>

                <h3 className="text-2xl mb-2">{item.degree}</h3>
                <p className="text-[#9333EA] mb-2">{item.institution}</p>
                {item.cgpa && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full mt-2">
                    <BookOpen className="w-4 h-4 text-[#9333EA]" />
                    <span className="text-sm">{item.cgpa}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}