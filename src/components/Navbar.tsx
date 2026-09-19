import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PageView } from '../types';
import { HKLogo } from './HKLogo';

interface NavbarProps {
  currentPage?: PageView;
  onNavigate?: (page: PageView, targetSection?: string) => void;
}

/**
 * Navbar Component
 * - Sticky navigation with frosted white backdrop
 * - Dynamic bottom shadow on scroll
 * - Responsive mobile drawer
 * - Glossy green CTA button with micro-interactions
 * - Smooth switching between Home sections and Contact Us page
 */
export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
}) => {
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
    { name: 'Home', sectionId: 'home', href: '#home' },
    { name: 'About', sectionId: 'about-us-section', href: '#about-us-section' },
    { name: 'Service', sectionId: 'services-section', href: '#services-section' },
    { name: 'Work', sectionId: 'our-projects-section', href: '#our-projects-section' },
    { name: 'Reviews', sectionId: 'testimonials-section', href: '#testimonials-section' },
    { name: 'Contact', sectionId: 'contact', href: '#contact' },
  ];

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { name: string; sectionId: string; href: string }
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.sectionId === 'contact') {
      if (onNavigate) {
        onNavigate('contact');
      } else {
        window.location.hash = '#contact';
      }
      return;
    }

    if (onNavigate) {
      onNavigate('home', link.sectionId);
    } else {
      if (window.location.hash === '#contact') {
        window.location.hash = `#${link.sectionId}`;
      } else {
        const targetEl = document.getElementById(link.sectionId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleContactBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('contact');
    } else {
      window.location.hash = '#contact';
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home', 'home');
    } else {
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
            onClick={handleLogoClick}
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA82C] rounded-lg p-1 transition-transform active:scale-95 cursor-pointer"
            aria-label="HK Digital Agency Home"
          >
            {/* Official HK Cyber Tech Logo */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#0A0A0A] p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-neutral-800 transition-all duration-300 group-hover:border-[#1FA82C]/50 group-hover:shadow-[0_4px_16px_rgba(31,168,44,0.25)]">
              <HKLogo className="w-full h-full transition-transform duration-300 group-hover:scale-110" />
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
            className="hidden md:flex items-center space-x-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isContactActive = currentPage === 'contact' && link.sectionId === 'contact';
              const isHomeActive = currentPage === 'home' && link.sectionId === 'home';
              const isActive = isContactActive || isHomeActive;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link)}
                  className={`nav-link-item text-[15px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#1FA82C] font-semibold'
                      : 'text-[#0A0A0A]/80 hover:text-[#0A0A0A]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Glossy CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="cta-contact-btn"
              type="button"
              onClick={handleContactBtnClick}
              className={`relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[14px] font-semibold text-white bg-glossy-green btn-glossy-shadow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1FA82C] cursor-pointer btn-shine-sweep ${
                currentPage === 'contact' ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {currentPage === 'contact' ? 'Contact Form' : 'Contact Us'}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
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
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link)}
                className="text-[16px] font-medium text-neutral-800 hover:text-[#1FA82C] transition-colors py-2 border-b border-neutral-100 last:border-none cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleContactBtnClick}
                className="w-full flex items-center justify-center py-3 rounded-full text-sm font-semibold text-white bg-glossy-green btn-glossy-shadow cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
