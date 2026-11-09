import { motion } from 'motion/react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    href: `mailto:${PROFILE_DATA.contactEmail}`,
    display: PROFILE_DATA.contactEmail,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: PROFILE_DATA.socials.find(s => s.platform === 'linkedin')!.url,
    display: PROFILE_DATA.socials.find(s => s.platform === 'linkedin')!.displayText,
  },
  {
    icon: Github,
    label: 'GitHub',
    href: PROFILE_DATA.socials.find(s => s.platform === 'github')!.url,
    display: PROFILE_DATA.socials.find(s => s.platform === 'github')!.displayText,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2563EB] to-[#3B9EFF] mx-auto mb-4" />
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTACT_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label !== 'Email' ? '_blank' : undefined}
                rel={item.label !== 'Email' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass-strong rounded-2xl p-8 text-center group hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex p-4 bg-gradient-to-br from-[#2563EB]/20 to-[#3B9EFF]/20 rounded-2xl mb-4 group-hover:from-[#2563EB]/40 group-hover:to-[#3B9EFF]/40 transition-all"
                >
                  <Icon className="w-8 h-8 text-[#3B9EFF]" />
                </motion.div>
                <h3 className="text-lg mb-2 text-[#3B9EFF]">{item.label}</h3>
                <p className="text-[#94A3B8] text-sm break-all">{item.display}</p>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-strong rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl mb-3 text-[#3B9EFF]">Let's Create Something Amazing</h3>
          <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
