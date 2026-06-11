import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        {/* Degree cards */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {PROFILE_DATA.education.map((item, idx) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass-strong rounded-2xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex p-4 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-2xl flex-shrink-0"
                >
                  <GraduationCap className="w-8 h-8 text-[#9333EA]" />
                </motion.div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-1 text-foreground">{item.degree}</h3>
                  <p className="text-[#9333EA] mb-2">{item.institution}</p>
                  <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <Calendar className="w-4 h-4" />
                    {item.period}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification cards */}
        <h3 className="text-xl mb-6 text-[#9333EA] text-center">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROFILE_DATA.certifications.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-strong rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-bl-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-xl flex-shrink-0"
                >
                  <Award className="w-6 h-6 text-[#9333EA]" />
                </motion.div>
                <div>
                  <h4 className="text-base md:text-lg mb-1 text-foreground">{cert.name}</h4>
                  <p className="text-[#9333EA] text-sm mb-2">{cert.issuer}</p>
                  <p className="text-[#9CA3AF] text-xs">
                    Issued {cert.issued} · Expires {cert.expires}
                  </p>
                  {cert.credentialId && (
                    <p className="text-[#9CA3AF] text-xs mt-1">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
