import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data/profile';

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROFILE_DATA.skills.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="glass-strong rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg md:text-xl mb-6 text-[#9333EA]">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.05 + skillIdx * 0.04 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs text-foreground cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
