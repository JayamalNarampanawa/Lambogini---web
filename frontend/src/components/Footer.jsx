import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' }
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Contact']
    },
    {
      title: 'Models',
      links: ['APEX V12', 'STORM EVO', 'THUNDER HYBRID', 'Configure']
    },
    {
      title: 'Support',
      links: ['FAQ', 'Service Centers', 'Owner\'s Manual', 'Warranty']
    }
  ];

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 carbon-texture opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 
                className="text-4xl font-black tracking-tighter text-[#E4FF1A] glow-yellow mb-4"
                style={{ fontFamily: 'Unbounded' }}
              >
                DRAFTLY
              </h3>
              <p className="text-white/60 leading-relaxed mb-6 max-w-sm" style={{ fontFamily: 'Manrope' }}>
                Pioneering the future of Italian supercar excellence. Where tradition meets innovation in perfect harmony.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#E4FF1A]" />
                  <span>Sant'Agata Bolognese, Italy</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#E4FF1A]" />
                  <span>+39 051 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#E4FF1A]" />
                  <span>info@draftly.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 
                className="text-lg font-bold uppercase tracking-wider mb-4"
                style={{ fontFamily: 'Unbounded' }}
              >
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-[#E4FF1A] transition-colors duration-300 text-sm"
                      style={{ fontFamily: 'Manrope' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm text-white/60"
            style={{ fontFamily: 'Manrope' }}
          >
            © {currentYear} Draftly. All rights reserved. Powered by Emergent.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  data-testid={`social-${social.label.toLowerCase()}`}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E4FF1A] hover:bg-[#E4FF1A]/10 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-white/60 group-hover:text-[#E4FF1A] transition-colors duration-300" />
                </a>
              );
            })}
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6 text-sm text-white/60"
            style={{ fontFamily: 'Manrope' }}
          >
            <a href="#" className="hover:text-[#E4FF1A] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#E4FF1A] transition-colors duration-300">
              Terms of Service
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;