import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeStrips } from './components/MarqueeStrips';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { PageLoader } from './components/PageLoader';
import { AiAssistantWidget } from './components/AiAssistantWidget';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { PageView } from './types';

/**
 * HK Digital Agency Experience
 * 
 * 1. Sticky Frosted Navbar with "HK digital agency" branding & Contact Us CTA
 * 2. Hero Section with GSAP Kinetic Text, rotating sparkle, 16:9 3D parallax team card
 * 3. Dual Skewed Crossing Marquee Ribbons with requested skills
 * 4. Interactive "About Us" Section with scroll-scrubbed highlight text reveal
 * 5. Interactive "Our Services" Section with dynamic accordion and tilted mockup panel (pics 3.png)
 * 6. Interactive "Our Project" Portfolio Section with GSAP animations and modal lightbox (pics 4.png)
 * 7. "What Our Clients Say" Testimonials Section with centered GSAP carousel (pics 5.png)
 * 8. Dedicated, Professional "Contact Us" Page with interactive multi-service selection,
 *    direct WhatsApp submission (+92 311 555 4198), email, and Peshawar/UAE presence
 * 9. Comprehensive Agency Footer with quick links and direct communication channels
 */
export default function App() {
  const [isLoaderActive, setIsLoaderActive] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      return 'contact';
    }
    return 'home';
  });

  // Handle hash changes in browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#contact') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
        if (hash && hash !== '#home') {
          const targetId = hash.replace('#', '');
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 50);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageView, targetSection?: string) => {
    setCurrentPage(page);

    if (page === 'contact') {
      window.location.hash = '#contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (targetSection && targetSection !== 'home') {
        window.location.hash = `#${targetSection}`;
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.location.hash = '#home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col antialiased selection:bg-[#1FA82C]/20 selection:text-[#1FA82C]">
      {/* 0. Requested Bubble Gum Brand Loader */}
      <PageLoader
        isLoading={isLoaderActive}
        onFinish={() => setIsLoaderActive(false)}
      />

      {/* 1. Header / Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* 2. Main Body Content: Home Page vs. Dedicated Contact Us Page */}
      <main className="flex-1 w-full flex flex-col">
        {currentPage === 'contact' ? (
          <ContactPage onBackToHome={() => handleNavigate('home', 'home')} />
        ) : (
          <>
            {/* Centered Hero Headline, Badges, and Team Photo */}
            <HeroSection />

            {/* Diagonal Crossing 2-Strip Animated Marquee Tickers */}
            <MarqueeStrips />

            {/* Interactive Scroll-Scrubbed "About Us" Section */}
            <AboutSection />

            {/* Interactive "Our Services" Section with Angled Mockup Card */}
            <ServicesSection />

            {/* Interactive "Our Project" Portfolio Section */}
            <ProjectsSection />

            {/* Interactive "What Our Clients Say" Testimonials Section */}
            <TestimonialsSection />

            {/* Fully Optimized Blog & Latest Insights Section */}
            <BlogSection />

            {/* Comprehensive Interactive FAQs Section */}
            <FAQSection onNavigateToContact={() => handleNavigate('contact')} />
          </>
        )}
      </main>

      {/* 3. Global Modern Agency Footer */}
      <Footer
        onNavigateToContact={() => handleNavigate('contact')}
        onNavigateToSection={(sectionId) => handleNavigate('home', sectionId)}
      />

      {/* 4. Interactive Client AI Assistant Widget */}
      <AiAssistantWidget onNavigateToContact={() => handleNavigate('contact')} />
    </div>
  );
}
