"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, GanttChart, Monitor, Cloud, Layers2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import ganttChartImage from "figma:asset/bf8c9dfdec107a30d280aaa27b0e3838d449aee1.png";
import ueSimulatorImage from "figma:asset/e71b8ea74203e84f9aec6306785a76cd325ee445.png";
import ngdsImage from "figma:asset/545f08a5586c9adee8313c31e4a92b8614ec707e.png";
import designSystemImage from "figma:asset/6b4823511cb2030e969e6a21ba570ddb85caa9dc.png";

const projects = [
  {
    title: "Project Management - Gantt Chart",
    icon: GanttChart,
    image: ganttChartImage,
    description:
      "Designed interactive Gantt chart interfaces for project scheduling applications, featuring linked task categories, visual alerts, and optimized workflows that enhanced team visibility, risk identification, and resource management.",
    tags: ["Figma", "Wireframing", "Prototyping"],
  },
  {
    title: "UE Simulator",
    icon: Monitor,
    image: ueSimulatorImage,
    description:
      "Designed interactive UE Simulator interface for enterprise training platform, featuring intuitive controls and real-time feedback mechanisms that boosted user engagement by 45%.",
    tags: ["User Research", "Interaction Design", "Usability Testing"],
  },
  {
    title: "ngDS Platform",
    icon: Cloud,
    image: ngdsImage,
    description:
      "Designed quoting tool for ngDS Platform, enabling streamlined pricing calculations, quote generation, and client proposal workflows within the secure cloud storage environment.",
    tags: ["UI Design", "Workflow Design", "Enterprise UX"],
  },
  {
    title: "Design System Management",
    icon: Layers2,
    image: designSystemImage,
    description:
      "Led design system governance for enterprise client, managing icon libraries, proposing scalable components, and ensuring UI consistency across multiple web applications and product iterations.",
    tags: ["Design Systems", "Component Library", "Documentation"],
  },
];

const heuristicClients = ["Applied Materials", "LAM Research", "Multiple Semiconductor Firms"];
const clients = ["Ericsson", "Intel", "Infineon", "Nokia", "Danaher Corporation"];

export function Projects() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">Projects & Case Studies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        {/* Desktop View - Grid */}
        <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative glass-strong rounded-2xl overflow-hidden group cursor-pointer h-[450px] lg:h-[500px] xl:h-[550px]"
              >
                <div className="relative h-full">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain bg-[#050814]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-[#7C3AED]/40 to-[#9333EA]/40 rounded-lg">
                        <Icon className="w-6 h-6 text-[#9333EA]" />
                      </div>
                      <h3 className="text-xl lg:text-2xl">{project.title}</h3>
                    </div>
                    <p className="text-sm lg:text-base text-[#9CA3AF] mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs lg:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden grid grid-cols-1 gap-6 mb-16">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-6"
              >
                <div className="space-y-4">
                  <div className="relative h-48 rounded-xl overflow-hidden bg-[#050814]">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-[#7C3AED]/40 to-[#9333EA]/40 rounded-lg">
                        <Icon className="w-6 h-6 text-[#9333EA]" />
                      </div>
                      <h3 className="text-xl">{project.title}</h3>
                    </div>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-xl hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all">
                      View Case Study
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Heuristic Evaluation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-6 sm:p-8 mb-8"
        >
          <h3 className="text-xl sm:text-2xl mb-4 text-[#9333EA]">Heuristic Evaluation Projects</h3>
          <p className="text-[#9CA3AF] mb-4 text-sm sm:text-base">
            Conducted comprehensive heuristic analyses for leading technology companies:
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {heuristicClients.map((client, i) => (
              <motion.span
                key={client}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs sm:text-sm"
              >
                {client}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Clients */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-xl sm:text-2xl mb-6 text-[#9333EA] text-center">Clients I've Worked With</h3>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {clients.map((client, i) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="px-4 sm:px-6 py-2 sm:py-3 glass rounded-xl border-2 border-[#7C3AED]/30 hover:border-[#7C3AED] transition-all text-sm sm:text-base"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}