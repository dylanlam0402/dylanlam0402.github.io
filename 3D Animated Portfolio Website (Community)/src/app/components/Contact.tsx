"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Send, Mail, Linkedin, Phone, Check } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto mb-4" />
          <p className="text-[#9CA3AF] max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-[#9CA3AF]">
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-[#9CA3AF]">
                  Your Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2 text-[#9CA3AF]">
                  Your Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitted}
                className="w-full py-4 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-strong rounded-2xl p-8">
              <h3 className="text-2xl mb-6 text-[#9333EA]">Contact Information</h3>
              <div className="space-y-4">
                <motion.a
                  href="tel:+918409415000"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-[#9333EA]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#9CA3AF]">Phone</p>
                    <p className="text-[#F9FAFB]">+91 8409415000</p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:priyanshukumarmishra002@gmail.com"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-[#9333EA]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#9CA3AF]">Email</p>
                    <p className="text-[#F9FAFB] break-all">priyanshukumarmishra002@gmail.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/priyanshu-mishra-5b9bb61bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Linkedin className="w-6 h-6 text-[#9333EA]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#9CA3AF]">LinkedIn</p>
                    <p className="text-[#F9FAFB]">View Profile</p>
                  </div>
                </motion.a>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-strong rounded-2xl p-8 text-center"
            >
              <h3 className="text-xl mb-4 text-[#9333EA]">Let's Create Something Amazing</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-strong rounded-2xl p-6"
            >
              <p className="text-center text-sm text-[#9CA3AF] mb-4">Connect with me</p>
              <div className="flex justify-center gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/priyanshu-mishra-5b9bb61bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-full hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all"
                >
                  <Linkedin className="w-6 h-6 text-[#9333EA]" />
                </motion.a>
                <motion.a
                  href="mailto:priyanshukumarmishra002@gmail.com"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-full hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all"
                >
                  <Mail className="w-6 h-6 text-[#9333EA]" />
                </motion.a>
                <motion.a
                  href="tel:+918409415000"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-full hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all"
                >
                  <Phone className="w-6 h-6 text-[#9333EA]" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}