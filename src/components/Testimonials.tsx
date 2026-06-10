import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

export function Testimonials() {
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Testimonials</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-2xl p-12 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="inline-flex p-6 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-full mb-6"
          >
            <Clock className="w-10 h-10 text-[#9333EA]" />
          </motion.div>

          <h3 className="text-2xl mb-4 text-[#9333EA]">Coming Soon</h3>
          <p className="text-[#9CA3AF] max-w-md mx-auto text-sm leading-relaxed">
            Testimonials from colleagues and clients will be featured here. Check back soon!
          </p>

          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
