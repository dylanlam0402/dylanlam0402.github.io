"use client";

import { motion } from "motion/react";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    role: "UI/UX Designer",
    company: "TCS (Tata Consultancy Services)",
    period: "June 2023 - Present",
    type: "Full-time",
    highlights: [
      "Designed interactive interfaces for enterprise clients including Ericsson, Intel, Infineon, Nokia, and Danaher Corporation",
      "Created comprehensive design systems ensuring UI consistency across multiple web applications",
      "Led wireframing, prototyping, and usability testing initiatives",
      "Increased user engagement by 20% through data-driven design improvements",
      "Collaborated with cross-functional teams to deliver user-centric solutions",
      "Conducted heuristic evaluations for Applied Materials, LAM Research, and multiple semiconductor firms",
    ],
  },
  {
    role: "UI/UX Design Intern",
    company: "Acintyo Local",
    period: "February 2022 - September 2022",
    type: "Internship",
    highlights: [
      "Designed multi-platform ecosystem connecting customers, retailers (grocery, medical, fruits & vegetables), delivery executives, and admin management",
      "Created unified user experience across 4 interconnected platforms ensuring seamless order flow from customer to retailer",
      "Developed intuitive interfaces for local retailers to manage inventory, orders, and customer interactions",
      "Designed delivery executive dashboard with real-time order tracking and route optimization features",
      "Built comprehensive admin panel for Acintyo Local management to monitor business operations and analytics",
      "Conducted user research with local shop owners to understand pain points and optimize the onboarding process",
      "Implemented design solutions that simplified complex multi-stakeholder workflows into intuitive user journeys",
    ],
  },
];

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Timeline line - fixed positioning */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7C3AED] to-[#9333EA] hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative md:ml-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                  className="absolute -left-[82px] top-8 w-5 h-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA] border-4 border-background hidden md:block z-10"
                />

                {/* Content */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-xl w-fit"
                      >
                        <Briefcase className="w-6 h-6 text-[#9333EA]" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl mb-1">{exp.role}</h3>
                        <p className="text-[#9333EA]">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs w-fit">
                        {exp.type}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {exp.highlights.map((highlight, hIndex) => (
                        <motion.div
                          key={hIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + hIndex * 0.05 }}
                          className="flex items-start gap-3 group/item"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#9333EA] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                          <p className="text-muted-foreground text-sm leading-relaxed">{highlight}</p>
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