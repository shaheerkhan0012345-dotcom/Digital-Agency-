import React from 'react';
import {
  MessageSquare,
  Mail,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Heart,
  Globe,
} from 'lucide-react';
import { HKLogo } from './HKLogo';

interface FooterProps {
  onNavigateToContact: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToContact,
  onNavigateToSection,
}) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#0D0D0D] text-white pt-16 pb-12 border-t border-neutral-800 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#1FA82C]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-[#35D13F]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top CTA Banner inside Footer */}
        <div className="rounded-3xl bg-gradient-to-r from-[#171717] via-[#1E1E1E] to-[#141414] border border-neutral-800 p-8 sm:p-12 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1FA82C]/20 border border-[#1FA82C]/30 text-[#35D13F] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for New Projects</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
              Have an ambitious vision in mind?
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 mt-2">
              Let’s talk about how HK Digital Agency can design, build, and scale your next big initiative.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button
              type="button"
              onClick={onNavigateToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white bg-glossy-green btn-glossy-shadow transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(31,168,44,0.4)] cursor-pointer btn-shine-sweep"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <a
              href="https://wa.me/923115554198?text=Hello%20HK%20Digital%20Agency!%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-102"
            >
              <MessageSquare className="w-4 h-4 text-[#35D13F]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* 4-Column Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-neutral-900 flex items-center justify-center p-1.5 border border-neutral-800 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                <HKLogo className="w-full h-full" />
              </div>
              <div className="flex flex-col leading-none">
                <div className="flex items-baseline text-xl font-bold tracking-tight">
                  <span className="text-[#1FA82C] font-extrabold mr-1">HK</span>
                  <span className="text-white font-medium">digital</span>
                </div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-semibold mt-0.5">
                  agency
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed pr-4">
              Premium digital engineering, bespoke web experiences, and scalable visual identities engineered for forward-thinking brands worldwide.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
                <span>🇵🇰</span> Pakistan
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
                <span>🇦🇪</span> UAE
              </span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, 'home')}
                  className="text-neutral-400 hover:text-[#35D13F] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about-us-section"
                  onClick={(e) => handleNavClick(e, 'about-us-section')}
                  className="text-neutral-400 hover:text-[#35D13F] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services-section"
                  onClick={(e) => handleNavClick(e, 'services-section')}
                  className="text-neutral-400 hover:text-[#35D13F] transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#our-projects-section"
                  onClick={(e) => handleNavClick(e, 'our-projects-section')}
                  className="text-neutral-400 hover:text-[#35D13F] transition-colors"
                >
                  Our Projects
                </a>
              </li>
              <li>
                <a
                  href="#testimonials-section"
                  onClick={(e) => handleNavClick(e, 'testimonials-section')}
                  className="text-neutral-400 hover:text-[#35D13F] transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#blog-section"
                  onClick={(e) => handleNavClick(e, 'blog-section')}
                  className="text-neutral-400 hover:text-[#35D13F] transition-colors"
                >
                  Blog & Insights
                </a>
              </li>
              <li>
                <a
                  href="#faqs-section"
                  onClick={(e) => handleNavClick(e, 'faqs-section')}
                  className="text-neutral-400 hover:text-[#35D13F] transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateToContact}
                  className="text-neutral-400 hover:text-[#35D13F] transition-colors font-medium"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
              Our Core Services
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onNavigateToContact}>
                • Web Development (React/Next.js)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onNavigateToContact}>
                • UI/UX & Digital Product Design
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onNavigateToContact}>
                • Video Editing & Motion Graphics
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onNavigateToContact}>
                • SEO Service & Performance Audit
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onNavigateToContact}>
                • Graphic Designing & Brand Identity
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onNavigateToContact}>
                • Custom Software & SaaS Engineering
              </li>
            </ul>
          </div>

          {/* Direct Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              {/* WhatsApp */}
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#35D13F] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 font-medium">WhatsApp Direct</p>
                  <a
                    href="https://wa.me/923115554198"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-white hover:text-[#35D13F] transition-colors"
                  >
                    +92 311 555 4198
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#35D13F] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Official Email</p>
                  <a
                    href="mailto:hkdigitalagency0@gmail.com"
                    className="text-white hover:text-[#35D13F] transition-colors break-all"
                  >
                    hkdigitalagency0@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#35D13F] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Headquarters & Reach</p>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Peshawar, Pakistan — working with clients locally and across the UAE.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} HK Digital Agency. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={onNavigateToContact}
              className="text-[#35D13F] hover:underline font-semibold"
            >
              Get in touch →
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
