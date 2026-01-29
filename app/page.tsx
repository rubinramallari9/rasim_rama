'use client';

import { useState, useCallback, useMemo, memo, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { submitContact } from '@/lib/api';
import { validateContactForm, canSubmit, recordSubmission } from '@/lib/validation';

// Project interface
interface Project {
  id: number;
  name: string;
  location: string;
  capacity: number;
  state: string;
  description: string;
}

// Static project data - defined outside component to avoid recreation
const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Valbona Hydropower Plant",
    location: "Valbona Valley, Albania",
    capacity: 15.5,
    state: "Operational",
    description: "Run-of-river hydroelectric facility harnessing the Valbona River in northern Albania."
  },
  {
    id: 2,
    name: "Drin River Complex",
    location: "Shkodër Region, Albania",
    capacity: 28.0,
    state: "Under Construction",
    description: "Large-scale hydroelectric project featuring advanced turbine technology."
  },
  {
    id: 3,
    name: "Osumi Cascade",
    location: "Skrapar, Albania",
    capacity: 12.3,
    state: "Planning",
    description: "Cascading hydropower system utilizing the Osumi Canyon elevation."
  }
];

// Status color mapping
const getStatusColor = (status: string) => {
  const lowerStatus = status.toLowerCase();
  if (lowerStatus.includes('operational') || lowerStatus.includes('completed')) {
    return { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' };
  } else if (lowerStatus.includes('construction')) {
    return { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' };
  } else if (lowerStatus.includes('planning')) {
    return { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' };
  }
  return { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' };
};

// Memoized Project Card component to prevent unnecessary re-renders
const ProjectCard = memo(function ProjectCard({
  project,
  index
}: {
  project: Project;
  index: number;
}) {
  const statusColors = getStatusColor(project.state);

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group bg-white rounded-2xl p-5 sm:p-6 mb-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 active:bg-gray-50 transition-all duration-200 cursor-pointer">
        <div className="flex gap-4 sm:gap-5">
          {/* Visual Thumbnail */}
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
            <span className="text-2xl sm:text-3xl font-light">{project.capacity}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title Row */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                {project.name}
              </h3>
              <span className="flex-shrink-0 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all text-xl">
                →
              </span>
            </div>

            {/* Location */}
            <p className="text-sm text-gray-500 mb-3">{project.location}</p>

            {/* Stats Row */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Capacity Badge */}
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
                {project.capacity} MW
              </span>

              {/* Status Badge */}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${statusColors.bg} ${statusColors.text} text-sm font-medium`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`}></span>
                {project.state}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default function Home() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: 'turbine_installation',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  // Show floating CTA after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.5;
      setShowFloatingCTA(scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized handler to prevent recreation on every render
  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user types
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  // Memoized submit handler with validation
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: null, message: '' });
    setFormErrors({});

    // Client-side rate limiting
    if (!canSubmit()) {
      setFormStatus({
        type: 'error',
        message: 'Too many submissions. Please wait a moment before trying again.',
      });
      return;
    }

    // Client-side validation
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setSubmitting(true);

    try {
      recordSubmission();
      const response = await submitContact(formData);
      setFormStatus({
        type: 'success',
        message: response.message || 'Thank you for your message. We will contact you soon.',
      });
      setFormData({ name: '', email: '', project_type: 'turbine_installation', message: '' });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  }, [formData]);

  // Memoized scroll handlers
  const scrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Memoized services data
  const services = useMemo(() => [
    { number: '01', title: t.services.service1Title, description: t.services.service1Desc },
    { number: '02', title: t.services.service2Title, description: t.services.service2Desc },
    { number: '03', title: t.services.service3Title, description: t.services.service3Desc },
    { number: '04', title: t.services.service4Title, description: t.services.service4Desc }
  ], [t.services]);

  // Memoized specs data
  const specs = useMemo(() => [
    { value: '15+', label: t.technical.spec1Label },
    { value: '94.5%', label: t.technical.spec2Label },
    { value: '2.5M', label: t.technical.spec3Label },
    { value: '500 m³/s', label: t.technical.spec4Label },
  ], [t.technical]);

  return (
    <div className="bg-white overflow-x-hidden w-full max-w-full">
      {/* HERO - Responsive Editorial */}
      <section id="home" className="min-h-screen flex items-center border-b border-gray-100 pt-16 sm:pt-18 lg:pt-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-10 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-14 lg:gap-16 xl:gap-24 items-center">
            {/* Left - Typography (shows FIRST on mobile now) */}
            <div className="space-y-5 sm:space-y-8 order-1 lg:order-1">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 mb-3 sm:mb-6">
                  Hydropower Engineering
                </p>
                <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[1.1] sm:leading-[1.05] tracking-tight">
                  {t.hero.title1}
                  <span className="block font-medium">{t.hero.title2}</span>
                  <span className="block">{t.hero.title3}</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Buttons - Stack on mobile, row on tablet+ */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  onClick={scrollToProjects}
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-800 active:bg-gray-950 transition-colors"
                >
                  {t.hero.viewProjects}
                </button>
                <button
                  onClick={scrollToContact}
                  className="h-12 sm:h-14 px-6 sm:px-8 border border-gray-300 text-gray-900 text-sm font-medium tracking-wide hover:border-gray-900 active:bg-gray-100 transition-colors"
                >
                  {t.hero.contactUs}
                </button>
              </div>
            </div>

            {/* Right - Image (shows SECOND on mobile now) */}
            <div className="relative order-2 lg:order-2">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl">
                <Image
                  src="/mainscreenimage2.png"
                  alt="Hydropower facility"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover"
                  priority
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT - Responsive Editorial Two-Column */}
      <section id="about" className="py-14 sm:py-24 md:py-32 lg:py-40 bg-gray-50">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
            {/* Left Column - Headline */}
            <div className="lg:col-span-5">
              <p className="text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 mb-3 sm:mb-6">About</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 leading-[1.15] sm:leading-[1.1]">
                {t.about.heading1}
                <span className="block font-medium">{t.about.heading2}</span>
              </h2>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t.about.paragraph2}
              </p>

              {/* Stats - Responsive Grid */}
              <div className="grid grid-cols-2 gap-8 sm:gap-12 pt-6 sm:pt-8 border-t border-gray-200">
                <div>
                  <div className="text-4xl sm:text-5xl font-light text-gray-900 mb-1 sm:mb-2">{t.about.stat1}</div>
                  <div className="text-sm font-medium text-gray-500">{t.about.stat1Label}</div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-light text-gray-900 mb-1 sm:mb-2">{t.about.stat2}</div>
                  <div className="text-sm font-medium text-gray-500">{t.about.stat2Label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - Responsive Editorial List */}
      <section id="services" className="py-14 sm:py-24 md:py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="mb-10 sm:mb-16 md:mb-20 lg:mb-28">
            <p className="text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 mb-3 sm:mb-6">{t.services.heading}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light text-gray-900 max-w-3xl leading-[1.15] sm:leading-[1.1]">
              {t.services.subheading}
            </h2>
          </div>

          <div className="border-t border-gray-200">
            {services.map((service, index) => (
              <div key={index} className="group border-b border-gray-200 py-6 sm:py-8 md:py-10 lg:py-12">
                {/* Mobile: Stacked layout / Desktop: Grid layout */}
                <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-baseline">
                  {/* Number + Title row on mobile */}
                  <div className="flex items-baseline gap-4 md:contents">
                    <span className="text-xs sm:text-sm text-gray-300 font-mono md:col-span-1 flex-shrink-0 w-6 md:w-auto">
                      {service.number}
                    </span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 group-hover:text-gray-600 transition-colors md:col-span-4">
                      {service.title}
                    </h3>
                  </div>
                  {/* Description */}
                  <div className="mt-3 md:mt-0 md:col-span-7 pl-10 md:pl-0">
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS - Responsive Clean Layout */}
      <section id="projects" className="py-14 sm:py-24 md:py-32 lg:py-40 bg-gray-50">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="mb-10 sm:mb-16 md:mb-20 lg:mb-28">
            <p className="text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 mb-3 sm:mb-6">Portfolio</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light text-gray-900 max-w-3xl leading-[1.15] sm:leading-[1.1]">
              {t.projectsSection.heading}
            </h2>
          </div>

          <div className="space-y-0">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}

            {/* View All Link */}
            <div className="pt-6 text-center sm:text-left">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                View all projects
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES - Responsive Dark Section */}
      <section id="technology" className="py-14 sm:py-24 md:py-32 lg:py-40 bg-gray-900 text-white">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">
            <div className="lg:col-span-5">
              <p className="text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-500 mb-3 sm:mb-6">Capabilities</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.15] sm:leading-[1.1]">
                {t.technical.heading}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                {t.technical.subheading}
              </p>
            </div>
          </div>

          {/* Specs Grid - 2x2 on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 py-8 sm:py-10 md:py-12 border-t border-gray-800">
            {specs.map((spec, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light mb-2 sm:mb-3">{spec.value}</div>
                <div className="text-sm font-medium text-gray-400">{spec.label}</div>
              </div>
            ))}
          </div>

          {/* Three Columns - Stack on mobile, 3-col on desktop */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 md:gap-12 pt-12 sm:pt-16 md:pt-20 border-t border-gray-800 mt-8 sm:mt-10 md:mt-12">
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">{t.technical.turbineTitle}</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                <li>{t.technical.turbine1}</li>
                <li>{t.technical.turbine2}</li>
                <li>{t.technical.turbine3}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">{t.technical.efficiencyTitle}</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                <li>{t.technical.efficiency1}</li>
                <li>{t.technical.efficiency2}</li>
                <li>{t.technical.efficiency3}</li>
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">{t.technical.environmentTitle}</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                <li>{t.technical.environment1}</li>
                <li>{t.technical.environment2}</li>
                <li>{t.technical.environment3}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT - Responsive Professional Form */}
      <section id="contact" className="py-14 sm:py-24 md:py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            {/* Left - Info */}
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 mb-3 sm:mb-6">Contact</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 leading-[1.15] sm:leading-[1.1] mb-6 sm:mb-8">
                {t.contactSection.heading1}
                <span className="block font-medium">{t.contactSection.heading2}</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 leading-relaxed max-w-md">
                {t.contactSection.subtitle}
              </p>

              {/* Contact Info - Horizontal on tablet, vertical elsewhere */}
              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-6 sm:gap-4 lg:gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{t.contactSection.email}</p>
                  <p className="text-base sm:text-lg text-gray-900">info@ramarasim.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{t.contactSection.phone}</p>
                  <p className="text-base sm:text-lg text-gray-900">+355 69 XXX XXXX</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{t.contactSection.headquarters}</p>
                  <p className="text-base sm:text-lg text-gray-900">Tirana, Albania</p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                {formStatus.type && (
                  <div className={`p-3 sm:p-4 text-sm ${formStatus.type === 'success' ? 'bg-gray-100 text-gray-900' : 'bg-red-50 text-red-900'}`}>
                    {formStatus.message}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">{t.contactSection.nameLabel}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    maxLength={100}
                    className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 text-base transition-colors bg-white ${
                      formErrors.name ? 'border-red-500' : 'border-gray-200 focus:border-gray-900'
                    }`}
                    placeholder={t.contactSection.namePlaceholder}
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1.5">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">{t.contactSection.emailLabel}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    maxLength={254}
                    className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 text-base transition-colors bg-white ${
                      formErrors.email ? 'border-red-500' : 'border-gray-200 focus:border-gray-900'
                    }`}
                    placeholder={t.contactSection.emailPlaceholder}
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1.5">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">{t.contactSection.projectTypeLabel}</label>
                  <select
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleFormChange}
                    required
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 text-base bg-white transition-colors"
                  >
                    <option value="turbine_installation">{t.contactSection.option1}</option>
                    <option value="assembly">{t.contactSection.option2}</option>
                    <option value="maintenance">{t.contactSection.option3}</option>
                    <option value="generator_bearing">{t.contactSection.option4}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">{t.contactSection.messageLabel}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    maxLength={5000}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 text-base resize-none transition-colors bg-white ${
                      formErrors.message ? 'border-red-500' : 'border-gray-200 focus:border-gray-900'
                    }`}
                    placeholder={t.contactSection.messagePlaceholder}
                  ></textarea>
                  {formErrors.message && <p className="text-red-500 text-sm mt-1.5">{formErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 sm:h-14 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-800 active:bg-gray-950 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-6 sm:mt-8"
                >
                  {submitting ? 'Sending...' : t.contactSection.sendButton}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Responsive Minimal */}
      <footer className="py-12 sm:py-14 md:py-16 bg-white">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          {/* Footer Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12 lg:mb-16">
            <div className="col-span-2 sm:col-span-2 lg:col-span-2">
              <h4 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Rasim Rama</h4>
              <p className="text-sm sm:text-base text-gray-500 max-w-sm leading-relaxed">
                {t.footer.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm uppercase tracking-wide text-gray-400 mb-3 sm:mb-4">{t.footer.servicesTitle}</h4>
              <ul className="space-y-1 text-sm sm:text-base">
                <li>
                  <a href="#services" className="block py-2 text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors">
                    Turbine Installation
                  </a>
                </li>
                <li>
                  <a href="#services" className="block py-2 text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors">
                    Assembly
                  </a>
                </li>
                <li>
                  <a href="#services" className="block py-2 text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors">
                    Maintenance
                  </a>
                </li>
                <li>
                  <a href="#services" className="block py-2 text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors">
                    Repairs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm uppercase tracking-wide text-gray-400 mb-3 sm:mb-4">{t.footer.companyTitle}</h4>
              <ul className="space-y-1 text-sm sm:text-base">
                <li>
                  <a href="#about" className="block py-2 text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="block py-2 text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="block py-2 text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-gray-100 text-center space-y-3">
            <p className="text-xs sm:text-sm text-gray-400">{t.footer.copyright}</p>
            <p className="text-xs text-gray-400">
              Crafted with precision by{' '}
              <a
                href="https://averon.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Averon Agency
              </a>
              {' '}— Where ideas become digital reality
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Contact CTA - Mobile Only */}
      <div
        className={`lg:hidden fixed bottom-6 left-4 right-4 z-40 transition-all duration-300 ${
          showFloatingCTA
            ? 'translate-y-0 opacity-100'
            : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToContact}
          className="w-full h-14 bg-[#1F5EFF] text-white font-semibold text-base tracking-wide rounded-xl shadow-lg shadow-blue-500/25 hover:bg-[#0047E1] active:bg-[#003CBC] transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {t.nav.requestProposal}
        </button>
      </div>
    </div>
  );
}
