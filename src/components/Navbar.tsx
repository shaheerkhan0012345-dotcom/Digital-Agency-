import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

/**
 * Navbar Component
 * - Sticky navigation with frosted white backdrop
 * - Dynamic bottom shadow on scroll
 * - Responsive mobile drawer
 * - Glossy green CTA button with micro-interactions
 */
export const Navbar: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Monitor scroll position to apply subtle bottom shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', active: true },
    { name: 'About', href: '#about-us-section' },
    { name: 'Service', href: '#services-section' },
    { name: 'Work', href: '#our-projects-section' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        hasScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-neutral-100'
          : 'bg-white/90 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <a
            id="brand-logo"
            href="#home"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA82C] rounded-lg p-1 transition-transform active:scale-95"
            aria-label="HK Digital Agency Home"
          >
            {/* Custom geometric logo mark */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1FA82C] via-[#28B936] to-[#35D13F] text-white shadow-[0_4px_12px_rgba(31,168,44,0.3)] transition-transform duration-300 group-hover:rotate-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white stroke-[2.2]"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Typography: "HK" bold green, "digital" black regular, "agency" tagline */}
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline text-xl font-bold tracking-tight">
                <span className="text-[#1FA82C] font-extrabold mr-1">HK</span>
                <span className="text-[#0A0A0A] font-medium tracking-tight">digital</span>
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-semibold mt-0.5">
                agency
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center space-x-9"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link-item text-[15px] font-medium transition-colors ${
                  link.active
                    ? 'text-[#0A0A0A] font-semibold'
                    : 'text-[#0A0A0A]/80 hover:text-[#0A0A0A]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Glossy CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              id="cta-contact-btn"
              href="#contact"
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[14px] font-semibold text-white bg-glossy-green btn-glossy-shadow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1FA82C]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Contact Us
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA82C]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-white/98 backdrop-blur-xl border-b border-neutral-200 px-6 pt-3 pb-6 shadow-xl animate-fade-in-up"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-medium text-neutral-800 hover:text-[#1FA82C] transition-colors py-1.5 border-b border-neutral-100 last:border-none"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3 rounded-full text-sm font-semibold text-white bg-glossy-green btn-glossy-shadow"
              >
                Contact Us
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
