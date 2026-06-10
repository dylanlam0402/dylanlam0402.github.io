import { motion } from 'motion/react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7C3AED] to-[#9333EA] hidden md:block" />

          <div className="space-y-12">
            {PROFILE_DATA.experience.map((exp, idx) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative md:ml-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.2 + 0.2 }}
                  className="absolute -left-[82px] top-8 w-5 h-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA] border-4 border-background hidden md:block z-10"
                />

                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-xl w-fit"
                      >
                        <Briefcase className="w-6 h-6 text-[#9333EA]" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl md:text-2xl mb-1 text-foreground">{exp.role}</h3>
                        <p className="text-[#9333EA]">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>

                    <div className="space-y-3">
                      {exp.description.map((point, hIdx) => (
                        <motion.div
                          key={hIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + hIdx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#9333EA] mt-0.5 flex-shrink-0" />
                          <p className="text-[#9CA3AF] text-sm leading-relaxed">{point}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
