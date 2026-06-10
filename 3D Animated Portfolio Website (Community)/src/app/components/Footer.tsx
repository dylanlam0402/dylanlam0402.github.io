"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl bg-gradient-to-r from-white to-[#9333EA] bg-clip-text text-transparent">
              Priyanshu
            </span>
          </div>

          <p className="text-[#9CA3AF] text-sm">
            UI/UX Designer crafting exceptional digital experiences
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-[#9CA3AF]">
            <span>© {new Date().getFullYear()} Built with</span>
            <Heart className="w-4 h-4 text-[#7C3AED] fill-[#7C3AED]" />
            <span>by Priyanshu Mishra</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}