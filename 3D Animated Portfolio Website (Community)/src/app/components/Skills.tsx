"use client";

import { motion } from "motion/react";
import { Figma, Palette, Layers, Code, Users, Lightbulb, Target, Gauge } from "lucide-react";

const skillCategories = [
  {
    title: "Design Tools",
    skills: [
      { name: "Figma", level: 95, icon: Figma },
      { name: "Adobe XD", level: 90, icon: Palette },
      { name: "Illustrator", level: 85, icon: Layers },
      { name: "Photoshop", level: 80, icon: Palette },
      { name: "Sketch", level: 75, icon: Figma },
    ],
  },
  {
    title: "UX Skills",
    skills: [
      { name: "User Research", level: 90, icon: Users },
      { name: "Wireframing", level: 95, icon: Layers },
      { name: "Prototyping", level: 93, icon: Code },
      { name: "Usability Testing", level: 88, icon: Gauge },
    ],
  },
  {
    title: "Methods",
    skills: [
      { name: "Design Thinking", level: 92, icon: Lightbulb },
      { name: "Heuristic Analysis", level: 90, icon: Target },
      { name: "Design Systems", level: 88, icon: Layers },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="glass-strong rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-xl md:text-2xl mb-6 text-[#9333EA]">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                            className="p-2 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-lg"
                          >
                            <Icon className="w-4 h-4 text-[#9333EA]" />
                          </motion.div>
                          <span className="text-sm">{skill.name}</span>
                        </div>
                        <span className="text-sm text-[#9333EA]">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-full relative"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Skills Pills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 glass-strong rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-xl sm:text-2xl mb-6 text-[#9333EA] text-center">Soft Skills</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {[
              "Communication",
              "Problem Solving",
              "Team Collaboration",
              "Time Management",
              "Adaptability",
              "Critical Thinking",
              "Attention to Detail",
              "Empathy",
              "Creativity",
            ].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-3 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}