import React, { useState, useEffect, useRef } from 'react';
import { HKLogo } from './HKLogo';
import {
  MessageSquare,
  Mail,
  MapPin,
  Send,
  Check,
  Copy,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  CheckCircle2,
  Code2,
  Palette,
  Video,
  Search,
  Layers,
  Terminal,
  TrendingUp,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ContactFormData, ServiceOption } from '../types';

interface ContactPageProps {
  onBackToHome: () => void;
}

const AVAILABLE_SERVICES: ServiceOption[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Engineering',
    description: 'High-performance React/Next.js websites & web apps',
    popular: true,
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    category: 'Design',
    description: 'Modern Figma prototypes, wireframes & design systems',
    popular: true,
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    category: 'Production',
    description: 'Cinematic reels, commercial cuts & motion graphics',
    popular: true,
  },
  {
    id: 'seo',
    title: 'SEO Service',
    category: 'Growth',
    description: 'Technical SEO, keyword dominance & audit strategy',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Designing',
    category: 'Branding',
    description: 'Visual identity, logos, marketing decks & social graphics',
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    category: 'Engineering',
    description: 'Custom dashboards, backend APIs & SaaS platforms',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Marketing',
    description: 'Paid ads, conversion optimization & funnel strategy',
  },
];

const BUDGET_OPTIONS = [
  '< $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000+',
  'Flexible / To Discuss',
];

const TIMELINE_OPTIONS = [
  'Immediate (< 2 weeks)',
  '1 Month',
  '2 – 3 Months',
  'Flexible',
];

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'web-dev': <Code2 className="w-4 h-4" />,
  'ui-ux': <Palette className="w-4 h-4" />,
  'video-editing': <Video className="w-4 h-4" />,
  seo: <Search className="w-4 h-4" />,
  'graphic-design': <Layers className="w-4 h-4" />,
  'software-dev': <Terminal className="w-4 h-4" />,
  'digital-marketing': <TrendingUp className="w-4 h-4" />,
};

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    selectedServices: ['Web Development'],
    budget: '$1,500 – $5,000',
    timeline: '1 Month',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Animate Entrance
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      tl.fromTo(
        leftColRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.45'
      );

      tl.fromTo(
        formCardRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Service Toggle Handler
  const toggleService = (serviceTitle: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(serviceTitle);
      const newServices = exists
        ? prev.selectedServices.filter((s) => s !== serviceTitle)
        : [...prev.selectedServices, serviceTitle];
      return { ...prev, selectedServices: newServices };
    });
    if (formErrors.services) {
      setFormErrors((prev) => ({ ...prev, services: '' }));
    }
  };

  // Copy to Clipboard Helper
  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your WhatsApp or phone number';
    }
    if (formData.selectedServices.length === 0) {
      errors.services = 'Please select at least one service';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide a brief overview of your project';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form Submit leading to WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Smooth scroll to first error
      const firstErrorEl = document.querySelector('[data-error="true"]');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Build Formatted WhatsApp Message
    const targetWhatsAppNumber = '923115554198';
    const messageLines = [
      `*New Project Inquiry — HK Digital Agency*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${formData.fullName.trim()}`,
      `📧 *Email:* ${formData.email.trim()}`,
      `📱 *WhatsApp/Phone:* ${formData.phone.trim()}`,
      formData.company.trim() ? `🏢 *Company:* ${formData.company.trim()}` : null,
      ``,
      `🛠️ *Services Requested (${formData.selectedServices.length}):*`,
      ...formData.selectedServices.map((s) => `  • ${s}`),
      ``,
      `💰 *Estimated Budget:* ${formData.budget}`,
      `⏱️ *Target Timeline:* ${formData.timeline}`,
      ``,
      `📝 *Project Overview / Goals:*`,
      `${formData.message.trim()}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Sent via HK Digital Agency Official Portal_`,
    ]
      .filter(Boolean)
      .join('\n');

    const encodedMessage = encodeURIComponent(messageLines);
    const whatsappUrl = `https://wa.me/${targetWhatsAppNumber}?text=${encodedMessage}`;

    // Store for fallback display
    setSubmittedWhatsAppUrl(whatsappUrl);

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <div
      ref={containerRef}
      id="contact-page-container"
      className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] pb-24 pt-8 sm:pt-12 antialiased selection:bg-[#1FA82C]/20 selection:text-[#1FA82C]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            1. TOP NAVIGATION & BREADCRUMB
           ========================================================================= */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <button
            type="button"
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-sm font-semibold text-neutral-700 hover:text-black hover:border-neutral-400 hover:shadow-xs transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA82C]"
            aria-label="Back to Homepage"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#1FA82C]" />
            <span>Back to Home</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-neutral-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-black transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#1FA82C] font-semibold">Contact Us</span>
          </div>
        </div>

        {/* =========================================================================
            2. PAGE HEADER
           ========================================================================= */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1FA82C]/10 border border-[#1FA82C]/25 text-[#1FA82C] text-xs sm:text-[13px] font-semibold tracking-wide uppercase mb-4 shadow-2xs">
            <HKLogo className="w-4 h-4" showGlow={false} />
            <span>Initiate A Collaboration</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#0A0A0A] tracking-[-0.03em] leading-[1.15] mb-5">
            Let’s Build Something{' '}
            <span className="text-shimmer-green font-black">Remarkable</span>.
          </h1>

          <p className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed max-w-2xl mx-auto">
            Ready to transform your brand or scale your digital presence? Select your required services, share your project details, and submit directly to our official WhatsApp line.
          </p>
        </div>

        {/* =========================================================================
            3. TWO-COLUMN WORKFLOW: Direct Info (Left) + WhatsApp Inquiry Form (Right)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* -------------------------------------------------------------
              LEFT COLUMN (5 cols): Direct Contacts, Reach & Agency Credentials
             ------------------------------------------------------------- */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* WhatsApp Priority Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121212] via-[#1A1A1A] to-[#0A0A0A] text-white p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-neutral-800 dark-card-hover group">
              {/* Background ambient glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#1FA82C]/20 blur-3xl pointer-events-none" />
              
              {/* Top Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 p-1.5 flex items-center justify-center shadow-[0_4px_20px_rgba(31,168,44,0.3)]">
                    <HKLogo className="w-full h-full" showGlow={true} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                      Priority Line
                    </p>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Official WhatsApp
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1FA82C]/20 text-[#35D13F] text-[11px] font-semibold border border-[#1FA82C]/30">
                  <span className="w-2 h-2 rounded-full bg-[#35D13F] animate-pulse" />
                  Online
                </span>
              </div>

              {/* Number Presentation */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                <p className="text-xs text-neutral-400 mb-1 font-medium">Direct WhatsApp Number</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
                    +92 311 555 4198
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('+92 311 555 4198', 'whatsapp')}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90"
                    title="Copy phone number"
                    aria-label="Copy WhatsApp number"
                  >
                    {copiedField === 'whatsapp' ? (
                      <Check className="w-4 h-4 text-[#35D13F]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copiedField === 'whatsapp' && (
                  <p className="text-[11px] text-[#35D13F] mt-1.5 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Copied to clipboard!
                  </p>
                )}
              </div>

              {/* Quick WhatsApp Action Button */}
              <a
                href="https://wa.me/923115554198?text=Hello%20HK%20Digital%20Agency!%20I'm%20interested%20in%20discussing%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-white bg-glossy-green btn-glossy-shadow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] btn-shine-sweep"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat Instantly on WhatsApp</span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </a>

              <p className="text-xs text-neutral-400 text-center mt-3">
                Average reply time: under 15 minutes during business hours.
              </p>
            </div>

            {/* Email Contact Card */}
            <div className="rounded-3xl bg-white p-7 border border-neutral-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] card-hover-elevate transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-[#0A0A0A] shrink-0">
                  <Mail className="w-5 h-5 text-[#1FA82C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Inquiries & RFPs
                  </p>
                  <h4 className="text-lg font-bold text-[#0A0A0A] tracking-tight mt-0.5">
                    Email Address
                  </h4>
                  <p className="text-sm font-medium text-neutral-800 break-all mt-1 select-all font-mono">
                    hkdigitalagency0@gmail.com
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <a
                      href="mailto:hkdigitalagency0@gmail.com"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1FA82C] hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Send Email
                    </a>
                    <span className="text-neutral-300">•</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('hkdigitalagency0@gmail.com', 'email')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#1FA82C]" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Address
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Headquarters & Regional Reach Card */}
            <div className="rounded-3xl bg-white p-7 border border-neutral-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] card-hover-elevate transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-[#0A0A0A] shrink-0">
                  <MapPin className="w-5 h-5 text-[#1FA82C]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Headquarters & Reach
                  </p>
                  <h4 className="text-lg font-bold text-[#0A0A0A] tracking-tight mt-0.5">
                    Peshawar, Pakistan
                  </h4>
                  <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                    Working with clients locally and across the{' '}
                    <strong className="text-neutral-900 font-semibold">UAE</strong> (Dubai, Abu Dhabi, Sharjah & GCC).
                  </p>

                  {/* Dual Region Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-xs font-medium text-neutral-800 border border-neutral-200">
                      <span className="text-sm">🇵🇰</span> Peshawar / Pakistan
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-xs font-medium text-neutral-800 border border-neutral-200">
                      <span className="text-sm">🇦🇪</span> UAE / Dubai Network
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Points */}
            <div className="p-6 rounded-3xl bg-emerald-50/60 border border-[#1FA82C]/20">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#1FA82C]" />
                <span>The HK Agency Standard</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA82C] shrink-0" />
                  <span>24-hour turnaround on project scope and budget proposals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA82C] shrink-0" />
                  <span>Strict NDA and confidential codebase management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA82C] shrink-0" />
                  <span>Transparent milestones with live preview demonstrations</span>
                </li>
              </ul>
            </div>

          </div>

          {/* -------------------------------------------------------------
              RIGHT COLUMN (7 cols): Service Selection & WhatsApp Inquiry Form
             ------------------------------------------------------------- */}
          <div ref={formCardRef} className="lg:col-span-7">
            <div className="rounded-3xl sm:rounded-[36px] bg-white p-6 sm:p-10 border border-neutral-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] relative">
              
              {/* Form Title & Instruction */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
                    Project Brief
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600">
                    Step 1 of 1
                  </span>
                </div>
                <p className="text-sm text-neutral-500 mt-1.5">
                  Select your required services and share your vision. Submitting will launch WhatsApp with your ready-to-send brief.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. SERVICE SELECTION SECTION */}
                <div
                  data-error={Boolean(formErrors.services)}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      1. Which services do you need?{' '}
                      <span className="text-[#1FA82C]">*</span>
                    </label>
                    <span className="text-xs font-medium text-neutral-400">
                      {formData.selectedServices.length} selected
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500">
                    Click to select or unselect all the areas you would like assistance with.
                  </p>

                  {/* Interactive Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {AVAILABLE_SERVICES.map((service) => {
                      const isSelected = formData.selectedServices.includes(service.title);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.title)}
                          className={`group relative flex items-start gap-3 p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                            isSelected
                              ? 'bg-gradient-to-r from-emerald-50 to-white border-[#1FA82C] text-[#0A0A0A] shadow-[0_4px_16px_rgba(31,168,44,0.14)] scale-[1.01]'
                              : 'bg-neutral-50/80 hover:bg-neutral-100/80 border-neutral-200/80 text-neutral-700'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#1FA82C] text-white shadow-xs'
                                : 'bg-white text-neutral-500 border border-neutral-200'
                            }`}
                          >
                            {isSelected ? (
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            ) : (
                              SERVICE_ICONS[service.id] || <Sparkles className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-bold leading-tight ${
                                isSelected ? 'text-[#0A0A0A]' : 'text-neutral-800'
                              }`}>
                                {service.title}
                              </p>
                              {service.popular && !isSelected && (
                                <span className="text-[10px] uppercase font-semibold text-neutral-400">
                                  Top
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-neutral-500 leading-tight mt-1 line-clamp-1">
                              {service.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {formErrors.services && (
                    <p className="text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1">
                      <span>•</span> {formErrors.services}
                    </p>
                  )}
                </div>

                {/* 2. CLIENT INFORMATION INPUTS */}
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-[#0A0A0A]">
                    2. Your Contact Information <span className="text-[#1FA82C]">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div data-error={Boolean(formErrors.fullName)}>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                        }}
                        placeholder="e.g. Stephen Vance"
                        className={`w-full px-4 py-3 rounded-2xl bg-neutral-50 border text-sm text-[#0A0A0A] placeholder-neutral-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1FA82C] ${
                          formErrors.fullName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-200'
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-xs text-rose-500 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div data-error={Boolean(formErrors.email)}>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        placeholder="e.g. stephen@company.com"
                        className={`w-full px-4 py-3 rounded-2xl bg-neutral-50 border text-sm text-[#0A0A0A] placeholder-neutral-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1FA82C] ${
                          formErrors.email ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-200'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-rose-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div data-error={Boolean(formErrors.phone)}>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                        }}
                        placeholder="e.g. +971 50 123 4567 or +92 300 ..."
                        className={`w-full px-4 py-3 rounded-2xl bg-neutral-50 border text-sm text-[#0A0A0A] placeholder-neutral-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1FA82C] ${
                          formErrors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-200'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-xs text-rose-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                        Company or Brand Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. FinWave Corp"
                        className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm text-[#0A0A0A] placeholder-neutral-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1FA82C]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. BUDGET RANGE SELECTION */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#0A0A0A]">
                    3. Estimated Budget Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((tier) => {
                      const isSelected = formData.budget === tier;
                      return (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: tier })}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                            isSelected
                              ? 'bg-[#1FA82C] text-white border-[#1FA82C] shadow-xs scale-[1.02]'
                              : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                          }`}
                        >
                          {tier}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. TIMELINE SELECTION */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#0A0A0A]">
                    4. Target Timeline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINE_OPTIONS.map((time) => {
                      const isSelected = formData.timeline === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: time })}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                            isSelected
                              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs scale-[1.02]'
                              : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. PROJECT DETAILS TEXTAREA */}
                <div data-error={Boolean(formErrors.message)} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      5. Tell us about your project <span className="text-[#1FA82C]">*</span>
                    </label>
                    <span className="text-xs text-neutral-400 font-mono">
                      {formData.message.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                    placeholder="Describe your project, key goals, target audience, preferred visual style, or any existing links..."
                    className={`w-full px-4 py-3 rounded-2xl bg-neutral-50 border text-sm text-[#0A0A0A] placeholder-neutral-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1FA82C] resize-y ${
                      formErrors.message ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-200'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-xs text-rose-500 mt-1">{formErrors.message}</p>
                  )}
                </div>

                {/* 6. SUBMISSION CTA BUTTON (LEADING TO WHATSAPP) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-glossy-green btn-glossy-shadow transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed shadow-[0_12px_32px_rgba(31,168,44,0.35)] btn-shine-sweep"
                  >
                    <MessageSquare className="w-5 h-5 text-white" />
                    <span>
                      {isSubmitting ? 'Opening WhatsApp...' : 'Submit Inquiry via WhatsApp'}
                    </span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-center text-xs text-neutral-500 mt-3 flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1FA82C]" />
                    <span>Transfers directly to WhatsApp line: <strong>+92 311 555 4198</strong></span>
                  </p>
                </div>

                {/* Submitted WhatsApp Fallback notification */}
                {submittedWhatsAppUrl && (
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-[#1FA82C]/30 animate-fade-in-up">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#1FA82C] shrink-0 mt-0.5" />
                      <div className="flex-1 text-xs sm:text-sm">
                        <p className="font-bold text-[#0A0A0A]">
                          Inquiry Prepared for WhatsApp!
                        </p>
                        <p className="text-neutral-600 mt-0.5">
                          If WhatsApp didn't open automatically in your browser, click below to launch the conversation:
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <a
                            href={submittedWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1FA82C] text-white font-semibold text-xs hover:bg-[#199224] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Open WhatsApp Chat Now
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                fullName: '',
                                email: '',
                                phone: '',
                                company: '',
                                selectedServices: ['Web Development'],
                                budget: '$1,500 – $5,000',
                                timeline: '1 Month',
                                message: '',
                              });
                              setSubmittedWhatsAppUrl(null);
                            }}
                            className="text-xs text-neutral-600 hover:text-black font-semibold underline"
                          >
                            Submit another inquiry
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
