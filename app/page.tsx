'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

// Project interface
interface Project {
  id: number;
  name: string;
  location: string;
  capaticy: number;
  state: string;
  description: string;
}

// Project data
const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Valbona Hydropower Plant",
    location: "Valbona Valley, Albania",
    capaticy: 15.5,
    state: "Operational",
    description: "Run-of-river hydroelectric facility harnessing the Valbona River in northern Albania."
  },
  {
    id: 2,
    name: "Drin River Complex",
    location: "Shkodër Region, Albania",
    capaticy: 28.0,
    state: "Under Construction",
    description: "Large-scale hydroelectric project featuring advanced turbine technology."
  },
  {
    id: 3,
    name: "Osumi Cascade",
    location: "Skrapar, Albania",
    capaticy: 12.3,
    state: "Planning",
    description: "Cascading hydropower system utilizing the Osumi Canyon elevation."
  }
];

export default function Home() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: 'new_installation',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus({ type: null, message: '' });

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form submitted:', formData);

    setFormStatus({
      type: 'success',
      message: 'Thank you for your message. We will respond within 24 hours.',
    });
    setFormData({ name: '', email: '', project_type: 'new_installation', message: '' });
    setSubmitting(false);
  };

  return (
    <div className="bg-white">
      {/* HERO - Clean, Confident, Editorial */}
      <section id="home" className="min-h-screen flex items-center border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 py-24">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            {/* Left - Typography */}
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">Hydropower Engineering</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.05] tracking-tight">
                  {t.hero.title1}
                  <span className="block font-medium">{t.hero.title2}</span>
                  <span className="block">{t.hero.title3}</span>
                </h1>
              </div>

              <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                {t.hero.subtitle}
              </p>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
                >
                  {t.hero.viewProjects}
                </button>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-gray-300 text-gray-900 text-sm font-medium tracking-wide hover:border-gray-900 transition-colors"
                >
                  {t.hero.contactUs}
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/mainscreenimage2.png"
                  alt="Hydropower facility"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT - Editorial Two-Column */}
      <section id="about" className="py-32 lg:py-40 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left Column - Headline */}
            <div className="lg:col-span-5">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">About</p>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-[1.1]">
                {t.about.heading1}
                <span className="block font-medium">{t.about.heading2}</span>
              </h2>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-7 space-y-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.about.paragraph2}
              </p>

              {/* Stats - Simple, No Cards */}
              <div className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-100">
                <div>
                  <div className="text-5xl font-light text-gray-900 mb-2">{t.about.stat1}</div>
                  <div className="text-sm uppercase tracking-wide text-gray-400">{t.about.stat1Label}</div>
                </div>
                <div>
                  <div className="text-5xl font-light text-gray-900 mb-2">{t.about.stat2}</div>
                  <div className="text-sm uppercase tracking-wide text-gray-400">{t.about.stat2Label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - Editorial List */}
      <section id="services" className="py-32 lg:py-40 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="mb-20 lg:mb-28">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">{t.services.heading}</p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 max-w-3xl leading-[1.1]">
              {t.services.subheading}
            </h2>
          </div>

          <div className="border-t border-gray-200">
            {[
              { number: '01', title: t.services.service1Title, description: t.services.service1Desc },
              { number: '02', title: t.services.service2Title, description: t.services.service2Desc },
              { number: '03', title: t.services.service3Title, description: t.services.service3Desc },
              { number: '04', title: t.services.service4Title, description: t.services.service4Desc }
            ].map((service, index) => (
              <div key={index} className="group border-b border-gray-200 py-10 lg:py-12">
                <div className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-2 lg:col-span-1">
                    <span className="text-sm text-gray-300 font-mono">{service.number}</span>
                  </div>
                  <div className="col-span-10 lg:col-span-4">
                    <h3 className="text-xl lg:text-2xl font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <div className="col-span-12 lg:col-span-7 mt-3 lg:mt-0">
                    <p className="text-gray-500 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS - Clean Grid, No Animation Gimmicks */}
      <section id="projects" className="py-32 lg:py-40 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="mb-20 lg:mb-28">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">Portfolio</p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 max-w-3xl leading-[1.1]">
              {t.projectsSection.heading}
            </h2>
          </div>

          <div className="space-y-0">
            {PROJECTS.map((project, index) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="group grid grid-cols-12 gap-6 py-12 border-b border-gray-100 cursor-pointer">
                  {/* Number */}
                  <div className="col-span-1 hidden lg:block">
                    <span className="text-sm text-gray-300 font-mono">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Name & Location */}
                  <div className="col-span-12 lg:col-span-4">
                    <h3 className="text-2xl lg:text-3xl font-medium text-gray-900 group-hover:text-gray-600 transition-colors mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-400">{project.location}</p>
                  </div>

                  {/* Capacity */}
                  <div className="col-span-6 lg:col-span-2">
                    <p className="text-sm uppercase tracking-wide text-gray-400 mb-1">Capacity</p>
                    <p className="text-lg font-medium text-gray-900">{project.capaticy} MW</p>
                  </div>

                  {/* Status */}
                  <div className="col-span-6 lg:col-span-2">
                    <p className="text-sm uppercase tracking-wide text-gray-400 mb-1">Status</p>
                    <p className="text-lg text-gray-900">{project.state}</p>
                  </div>

                  {/* Arrow */}
                  <div className="col-span-12 lg:col-span-3 flex items-center lg:justify-end">
                    <span className="text-gray-300 group-hover:text-gray-900 transition-colors text-2xl">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES - Replace Technical with cleaner approach */}
      <section id="technology" className="py-32 lg:py-40 bg-gray-900 text-white">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-5">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">Capabilities</p>
              <h2 className="text-4xl lg:text-5xl font-light leading-[1.1]">
                {t.technical.heading}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg text-gray-400 leading-relaxed">
                {t.technical.subheading}
              </p>
            </div>
          </div>

          {/* Specs Grid - Minimal */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 py-12 border-t border-gray-800">
            {[
              { value: '15+', label: t.technical.spec1Label },
              { value: '94.5%', label: t.technical.spec2Label },
              { value: '2.5M', label: t.technical.spec3Label },
              { value: '500 m³/s', label: t.technical.spec4Label },
            ].map((spec, index) => (
              <div key={index}>
                <div className="text-4xl lg:text-5xl font-light mb-3">{spec.value}</div>
                <div className="text-sm uppercase tracking-wide text-gray-500">{spec.label}</div>
              </div>
            ))}
          </div>

          {/* Three Columns */}
          <div className="grid lg:grid-cols-3 gap-12 pt-20 border-t border-gray-800 mt-12">
            <div>
              <h3 className="text-xl font-medium mb-6">{t.technical.turbineTitle}</h3>
              <ul className="space-y-3 text-gray-400">
                <li>{t.technical.turbine1}</li>
                <li>{t.technical.turbine2}</li>
                <li>{t.technical.turbine3}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-6">{t.technical.efficiencyTitle}</h3>
              <ul className="space-y-3 text-gray-400">
                <li>{t.technical.efficiency1}</li>
                <li>{t.technical.efficiency2}</li>
                <li>{t.technical.efficiency3}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-6">{t.technical.environmentTitle}</h3>
              <ul className="space-y-3 text-gray-400">
                <li>{t.technical.environment1}</li>
                <li>{t.technical.environment2}</li>
                <li>{t.technical.environment3}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT - Professional, No Emojis */}
      <section id="contact" className="py-32 lg:py-40 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left - Info */}
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">Contact</p>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-[1.1] mb-8">
                {t.contactSection.heading1}
                <span className="block font-medium">{t.contactSection.heading2}</span>
              </h2>
              <p className="text-lg text-gray-500 mb-12 leading-relaxed max-w-md">
                {t.contactSection.subtitle}
              </p>

              <div className="space-y-8">
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">{t.contactSection.email}</p>
                  <p className="text-lg text-gray-900">info@rasimrama.com</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">{t.contactSection.phone}</p>
                  <p className="text-lg text-gray-900">+355 69 XXX XXXX</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">{t.contactSection.headquarters}</p>
                  <p className="text-lg text-gray-900">Tirana, Albania</p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {formStatus.type && (
                  <div className={`p-4 text-sm ${formStatus.type === 'success' ? 'bg-gray-100 text-gray-900' : 'bg-red-50 text-red-900'}`}>
                    {formStatus.message}
                  </div>
                )}

                <div>
                  <label className="block text-sm uppercase tracking-wide text-gray-400 mb-3">{t.contactSection.nameLabel}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 text-lg transition-colors"
                    placeholder={t.contactSection.namePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-wide text-gray-400 mb-3">{t.contactSection.emailLabel}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 text-lg transition-colors"
                    placeholder={t.contactSection.emailPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-wide text-gray-400 mb-3">{t.contactSection.projectTypeLabel}</label>
                  <select
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleFormChange}
                    required
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 text-lg bg-transparent transition-colors"
                  >
                    <option value="new_installation">{t.contactSection.option1}</option>
                    <option value="turbine_upgrade">{t.contactSection.option2}</option>
                    <option value="maintenance">{t.contactSection.option3}</option>
                    <option value="consultation">{t.contactSection.option4}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-wide text-gray-400 mb-3">{t.contactSection.messageLabel}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 text-lg resize-none transition-colors"
                    placeholder={t.contactSection.messagePlaceholder}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gray-900 text-white py-4 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors disabled:bg-gray-400 mt-8"
                >
                  {submitting ? 'Sending...' : t.contactSection.sendButton}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Minimal */}
      <footer className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h4 className="text-xl font-medium text-gray-900 mb-4">Rasim Rama</h4>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                {t.footer.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wide text-gray-400 mb-4">{t.footer.servicesTitle}</h4>
              <ul className="space-y-3 text-gray-600">
                <li>Turbine Installation</li>
                <li>Assembly</li>
                <li>Maintenance</li>
                <li>Repairs</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wide text-gray-400 mb-4">{t.footer.companyTitle}</h4>
              <ul className="space-y-3 text-gray-600">
                <li>About</li>
                <li>Projects</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
