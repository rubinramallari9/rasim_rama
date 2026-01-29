'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize dark mode state
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.gallery, href: '/gallery', isPage: true },
    { name: t.nav.technology, href: '#technology' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled
          ? 'bg-gradient-to-r from-[#1F5EFF]/90 to-[#0047E1]/90 backdrop-blur-lg shadow-lg'
          : 'bg-gradient-to-r from-[#1F5EFF] to-[#0047E1]'
      }`}
      style={{
        borderRadius: isScrolled ? '0 0 16px 16px' : '0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex-shrink-0"
          >
            <Image
              src="/rasimramalogo.png"
              alt="Rama Rasim Logo"
              width={320}
              height={80}
              className="h-10 sm:h-12 lg:h-14 w-auto max-w-[140px] sm:max-w-[180px] lg:max-w-[220px] object-contain"
              priority
            />
          </motion.div>

          {/* Desktop Navigation - Center/Right */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link, index) => (
              link.isPage ? (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  <Link
                    href={link.href}
                    className="relative text-white font-bold text-sm tracking-wide group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="absolute inset-0 blur-sm bg-white/20" />
                    </span>
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = link.href.replace('#', '');
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                    ease: 'easeOut',
                  }}
                  className="relative text-white font-bold text-sm tracking-wide group cursor-pointer"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="absolute inset-0 blur-sm bg-white/20" />
                  </span>
                </motion.a>
              )
            ))}
          </div>

          {/* Language Toggle, Dark Mode & CTA Button - Far Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="hidden lg:flex items-center space-x-3"
          >
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative w-10 h-10 flex items-center justify-center text-white border-2 border-white/50 rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105 hover:border-white"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="relative px-4 py-2 text-white font-bold text-sm tracking-wide border-2 border-white/50 rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105 hover:border-white"
            >
              <span className="relative z-10">{language === 'en' ? 'SQ' : 'EN'}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* CTA Button */}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-8 py-3 text-white font-bold text-sm tracking-wide border-2 border-white rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">{t.nav.requestProposal}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 blur-xl bg-white/30" />
              </span>
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </motion.button>
        </div>
      </div>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-16 bg-gradient-to-b from-[#1F5EFF] to-[#0047E1] z-40 overflow-y-auto"
          >
            <div className="flex flex-col min-h-full px-6 py-8">
              {/* Navigation Links - Centered */}
              <nav className="flex-1 flex flex-col justify-center space-y-2">
                {navLinks.map((link, index) => (
                  link.isPage ? (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-white text-2xl font-light tracking-wide py-4 text-center hover:bg-white/10 active:bg-white/20 transition-all duration-200 rounded-xl"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        const targetId = link.href.replace('#', '');
                        setTimeout(() => {
                          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      }}
                      className="block text-white text-2xl font-light tracking-wide py-4 text-center hover:bg-white/10 active:bg-white/20 transition-all duration-200 rounded-xl"
                    >
                      {link.name}
                    </motion.a>
                  )
                ))}
              </nav>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-8 pb-4 space-y-3"
              >
                {/* Dark Mode & Language Row */}
                <div className="flex gap-3">
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="flex-1 h-14 flex items-center justify-center gap-2 text-white font-medium text-base tracking-wide border-2 border-white/40 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all duration-200"
                  >
                    {isDark ? (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Light
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        Dark
                      </>
                    )}
                  </button>

                  {/* Language Toggle */}
                  <button
                    onClick={toggleLanguage}
                    className="flex-1 h-14 text-white font-medium text-base tracking-wide border-2 border-white/40 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all duration-200"
                  >
                    {language === 'en' ? 'SQ' : 'EN'}
                  </button>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full h-14 text-[#1F5EFF] font-semibold text-base tracking-wide bg-white rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
                >
                  {t.nav.requestProposal}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
