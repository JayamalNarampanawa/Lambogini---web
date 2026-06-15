import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Mail, Phone, MessageSquare, Car } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredModel: 'APEX V12',
    preferredDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/bookings`, formData);
      toast.success('Test drive booked successfully! We\'ll contact you soon.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        preferredModel: 'APEX V12',
        preferredDate: '',
        message: ''
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book test drive. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const models = ['APEX V12', 'STORM EVO', 'THUNDER HYBRID'];

  return (
    <section className="relative min-h-screen py-20 px-6 lg:px-12 bg-[#050505]" id="booking">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#050505] to-[#0A0A0A]"></div>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #E4FF1A10 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-[#E4FF1A] mb-4" style={{ fontFamily: 'Outfit' }}>
            Experience the Thrill
          </div>
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6"
            style={{ fontFamily: 'Unbounded' }}
          >
            Book Your
            <br />
            <span className="text-[#E4FF1A] glow-yellow">Test Drive</span>
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Manrope' }}>
            Feel the raw power and precision engineering firsthand. Schedule your exclusive test drive experience today.
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel rounded-2xl p-8 lg:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/80 mb-2" style={{ fontFamily: 'Outfit' }}>
                  <User className="w-4 h-4 text-[#E4FF1A]" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  data-testid="booking-full-name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#E4FF1A] focus:outline-none transition-all duration-300"
                  placeholder="John Doe"
                  style={{ fontFamily: 'Manrope' }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/80 mb-2" style={{ fontFamily: 'Outfit' }}>
                  <Mail className="w-4 h-4 text-[#E4FF1A]" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  data-testid="booking-email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#E4FF1A] focus:outline-none transition-all duration-300"
                  placeholder="john@example.com"
                  style={{ fontFamily: 'Manrope' }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/80 mb-2" style={{ fontFamily: 'Outfit' }}>
                  <Phone className="w-4 h-4 text-[#E4FF1A]" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  data-testid="booking-phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#E4FF1A] focus:outline-none transition-all duration-300"
                  placeholder="+1 (555) 000-0000"
                  style={{ fontFamily: 'Manrope' }}
                />
              </div>

              {/* Preferred Model */}
              <div>
                <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/80 mb-2" style={{ fontFamily: 'Outfit' }}>
                  <Car className="w-4 h-4 text-[#E4FF1A]" />
                  Preferred Model
                </label>
                <select
                  name="preferredModel"
                  data-testid="booking-preferred-model"
                  value={formData.preferredModel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#E4FF1A] focus:outline-none transition-all duration-300"
                  style={{ fontFamily: 'Manrope' }}
                >
                  {models.map((model) => (
                    <option key={model} value={model} className="bg-[#1A1A1A]">
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/80 mb-2" style={{ fontFamily: 'Outfit' }}>
                  <Calendar className="w-4 h-4 text-[#E4FF1A]" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  data-testid="booking-preferred-date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#E4FF1A] focus:outline-none transition-all duration-300"
                  style={{ fontFamily: 'Manrope' }}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/80 mb-2" style={{ fontFamily: 'Outfit' }}>
                <MessageSquare className="w-4 h-4 text-[#E4FF1A]" />
                Message (Optional)
              </label>
              <textarea
                name="message"
                data-testid="booking-message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#E4FF1A] focus:outline-none transition-all duration-300 resize-none"
                placeholder="Tell us about your preferences or special requirements..."
                style={{ fontFamily: 'Manrope' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="request-test-drive-btn"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#E4FF1A] text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(228,255,26,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ fontFamily: 'Outfit' }}
            >
              {isSubmitting ? 'Submitting...' : 'Request Test Drive'}
            </button>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: 'Instant Confirmation', desc: 'Get immediate booking confirmation via email' },
            { title: 'Flexible Scheduling', desc: 'Choose a date and time that works for you' },
            { title: 'Expert Guidance', desc: 'Our specialists will guide you through every detail' }
          ].map((item, index) => (
            <div key={index} className="glass-panel rounded-xl p-6 text-center">
              <h4 className="text-lg font-bold mb-2" style={{ fontFamily: 'Unbounded' }}>
                {item.title}
              </h4>
              <p className="text-sm text-white/60" style={{ fontFamily: 'Manrope' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;