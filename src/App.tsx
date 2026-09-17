import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeStrips } from './components/MarqueeStrips';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';

/**
 * HK Digital Agency Experience
 * 
 * Strict Implementation of User Requests & Reference Images:
 * 1. Sticky Frosted Navbar with "HK digital agency" branding
 * 2. Hero Section with GSAP Kinetic Text, rotating sparkle, 16:9 3D parallax team card
 * 3. Dual Skewed Crossing Marquee Ribbons with requested skills
 * 4. Interactive "About Us" Section with scroll-scrubbed highlight text reveal
 * 5. Interactive "Our Services" Section with dynamic accordion and tilted mockup panel (pics 3.png)
 */
export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col antialiased selection:bg-[#1FA82C]/20 selection:text-[#1FA82C]">
      {/* 1. Header / Navbar */}
      <Navbar />

      {/* 2. Main Page Experience */}
      <main className="flex-1 w-full flex flex-col">
        {/* Centered Hero Headline, Badges, and Team Photo */}
        <HeroSection />

        {/* Diagonal Crossing 2-Strip Animated Marquee Tickers */}
        <MarqueeStrips />

        {/* Interactive Scroll-Scrubbed "About Us" Section */}
        <AboutSection />

        {/* Interactive "Our Services" Section with Angled Mockup Card */}
        <ServicesSection />
      </main>
    </div>
  );
}
