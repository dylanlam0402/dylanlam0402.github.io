import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2563EB] to-[#3B9EFF] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROFILE_DATA.projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-strong rounded-2xl overflow-hidden group"
            >
              {/* Project image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-lg mb-2 text-foreground">{project.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gradient-to-r from-[#2563EB]/20 to-[#3B9EFF]/20 border border-[#2563EB]/30 rounded-full text-xs text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Live link */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-[#2563EB] to-[#3B9EFF] rounded-xl text-white text-sm hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
