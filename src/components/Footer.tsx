import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-[#1E2A44]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="text-2xl bg-gradient-to-r from-white to-[#3B9EFF] bg-clip-text text-transparent">
            {PROFILE_DATA.name}
          </span>
          <p className="text-[#94A3B8] text-sm">{PROFILE_DATA.title}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-[#94A3B8]">
            <span>© {new Date().getFullYear()} Built with</span>
            <Heart className="w-4 h-4 text-[#2563EB] fill-[#2563EB]" />
            <span>by {PROFILE_DATA.name}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
