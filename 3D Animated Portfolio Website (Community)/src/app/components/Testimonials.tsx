"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Johanna Stuke",
    role: "Head of Design, Infineon",
    content:
      "Priyanshu's design system management and visual design elevated our UI consistency across multiple applications along with the icon libraries and scalable components were seamlessly adopted by our teams.",
    avatar: "JS",
  },
  {
    name: "Jason A. Maxwell",
    role: "Business Head, Intel",
    content:
      "Priyanshu's Gantt chart Decision Timing model transformed project scheduling with interactive timelines and visual alerts, significantly improving decision efficiency and resource allocation.",
    avatar: "JM",
  },
  {
    name: "Sandeep",
    role: "Design Lead, Ericsson",
    content:
      "UE Simulator design delivered intuitive controls and real-time feedback, boosting user engagement by 45% across our enterprise training platform.",
    avatar: "S",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">Testimonials</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="glass-strong rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <motion.div className="absolute top-4 sm:top-8 left-4 sm:left-8 opacity-20" whileHover={{ rotate: 180 }}>
              <Quote className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#9333EA]" />
            </motion.div>

            <div className="space-y-6 sm:space-y-8 relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <motion.div
                  key={currentIndex}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#9333EA] flex items-center justify-center text-lg sm:text-xl flex-shrink-0"
                >
                  {testimonials[currentIndex].avatar}
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-xl">{testimonials[currentIndex].name}</h3>
                  <p className="text-xs sm:text-sm text-[#9333EA]">{testimonials[currentIndex].role}</p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed mb-4 sm:mb-6">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </p>

            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 sm:p-3 glass-strong rounded-full hover:bg-gradient-to-r hover:from-[#7C3AED]/20 hover:to-[#9333EA]/20 transition-all"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-gradient-to-r from-[#7C3AED] to-[#9333EA]"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 sm:p-3 glass-strong rounded-full hover:bg-gradient-to-r hover:from-[#7C3AED]/20 hover:to-[#9333EA]/20 transition-all"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}