'use client';

import { useEffect, useRef, useState } from 'react';

// Dynamic Timeline with DOM-Position-Driven Snake Line
function DynamicTimeline() {
  const [svgPath, setSvgPath] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState<boolean[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const projects = [
    { name: 'Danube Power Station', location: 'Austria', capacity: '180 MW', year: '2023', investment: '$450M' },
    { name: 'Alpine Hydro Complex', location: 'Switzerland', capacity: '250 MW', year: '2022', investment: '$620M' },
    { name: 'Nordic Flow Project', location: 'Norway', capacity: '320 MW', year: '2021', investment: '$780M' },
    { name: 'Balkan Energy Hub', location: 'Albania', capacity: '150 MW', year: '2023', investment: '$380M' },
    { name: 'Rhine Valley Station', location: 'Germany', capacity: '200 MW', year: '2022', investment: '$510M' },
  ];

  // Generate organic snake path from actual DOM card positions
  const generatePathFromDOM = () => {
    if (!containerRef.current || !svgRef.current) return '';

    const cards = containerRef.current.querySelectorAll('.project-card');
    if (cards.length === 0) return '';

    const containerRect = containerRef.current.getBoundingClientRect();
    const svgRect = svgRef.current.getBoundingClientRect();

    // Get actual card center points
    const points = Array.from(cards).map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top,
      };
    });

    if (points.length === 0) return '';

    // Cursor influence
    const xBias = (smoothMouse.x - 0.5) * 200; // ±100px horizontal shift
    const yWobble = (smoothMouse.y - 0.5) * 24; // ±12px vertical wobble

    // Build smooth cubic Bézier path
    let path = `M ${points[0].x + xBias} ${points[0].y + yWobble}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];

      // Calculate control points for DRAMATIC organic curves
      const isLeftCard = i % 2 === 0;
      const curveDistance = Math.abs(next.y - current.y) * 0.6; // Deep curves

      // Horizontal offset for dramatic S-curve
      const horizontalCurve = isLeftCard ? 150 : -150;
      const cursorInfluence = xBias * 0.8;

      // Control point 1: Push OUT from current card
      const cp1x = current.x + horizontalCurve + cursorInfluence;
      const cp1y = current.y + curveDistance * 0.3 + yWobble;

      // Control point 2: Pull INTO next card from opposite side
      const cp2x = next.x - horizontalCurve + cursorInfluence;
      const cp2y = next.y - curveDistance * 0.3 + yWobble;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x + xBias},${next.y + yWobble}`;
    }

    return path;
  };

  // Update path on any change
  const updatePath = () => {
    const newPath = generatePathFromDOM();
    if (newPath) setSvgPath(newPath);
  };

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth mouse interpolation
  useEffect(() => {
    const smoothing = 0.1;

    const animate = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * smoothing,
        y: prev.y + (mousePos.y - prev.y) * smoothing,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos]);

  // Update path on mouse, scroll, resize, and initial render
  useEffect(() => {
    updatePath();
  }, [smoothMouse]);

  useEffect(() => {
    // Initial path generation after cards render
    const timer = setTimeout(updatePath, 100);

    const handleResize = () => updatePath();
    const handleScroll = () => updatePath();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setIsVisible((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* DYNAMIC SVG SNAKE - Positioned absolutely, fills entire container */}
      <svg
        ref={svgRef}
        className="organic-snake-svg absolute inset-0 w-full h-full hidden lg:block pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <defs>
          {/* Organic gradient */}
          <linearGradient id="organicGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FF85" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#00FF85" stopOpacity="1" />
            <stop offset="100%" stopColor="#00FF85" stopOpacity="0.4" />
          </linearGradient>

          {/* Animated shimmer */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0">
              <animate attributeName="offset" values="-0.3;1" dur="2.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8">
              <animate attributeName="offset" values="0;1.3" dur="2.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0">
              <animate attributeName="offset" values="0.3;1.6" dur="2.5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          {/* Glow filter */}
          <filter id="snakeGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor="#00FF85" floodOpacity="0.7" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer glow halo */}
        <path
          d={svgPath}
          stroke="#00FF85"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
          style={{ filter: 'blur(10px)' }}
        />

        {/* Main snake path */}
        <path
          d={svgPath}
          stroke="url(#organicGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#snakeGlow)"
        />

        {/* Animated shimmer overlay */}
        <path
          d={svgPath}
          stroke="url(#shimmer)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>

      {/* Mobile straight line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-green-400 to-transparent lg:hidden transform -translate-x-1/2" style={{ zIndex: 1 }}></div>

      {/* Project Cards Container - WIDE SPACING FOR ORGANIC CURVES */}
      <div className="relative max-w-6xl mx-auto space-y-64 lg:space-y-80 py-20" style={{ zIndex: 10 }}>
        {projects.map((project, index) => (
          <div
            key={index}
            data-index={index}
            className={`project-card flex items-center ${
              index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
            } justify-center`}
            style={{
              opacity: isVisible[index] ? 1 : 0,
              transform: isVisible[index] ? 'translateY(0)' : 'translateY(5rem)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '1s, 1s',
              transitionTimingFunction: 'ease-out, ease-out',
              transitionDelay: `${index * 0.15}s, ${index * 0.15}s`,
            }}
          >
            <div className={`w-full lg:w-[38%] ${index % 2 === 0 ? 'lg:mr-auto lg:pr-24' : 'lg:ml-auto lg:pl-24'}`}>
              <div className="group relative">
                {/* Connection Dot - Pulsing */}
                <div
                  className="absolute top-1/2 hidden lg:block transform -translate-y-1/2 w-5 h-5 rounded-full z-20"
                  style={{
                    [index % 2 === 0 ? 'right' : 'left']: '-2.5rem',
                    background: 'radial-gradient(circle, #00FF85 0%, #00FF85 40%, transparent 70%)',
                    boxShadow: '0 0 20px rgba(0, 255, 133, 0.8), 0 0 40px rgba(0, 255, 133, 0.4)',
                    animation: 'dotPulse 2s ease-in-out infinite',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: '#00FF85',
                      animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                    }}
                  ></div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-green-500/20 transition-all duration-700 hover:scale-[1.03] hover:-translate-y-3 card-reveal">
                  {/* Year Badge */}
                  <div className="absolute top-6 right-6 z-30 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-green-500/30">
                    {project.year}
                  </div>

                  {/* Image Section */}
                  <div className="relative h-72 bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-base font-semibold backdrop-blur-sm bg-black/10">
                      {project.name}
                    </div>

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Animated glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                         style={{
                           background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 133, 0.15), transparent 70%)',
                         }}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="p-8 bg-gradient-to-br from-white to-gray-50">
                    {/* Green accent line */}
                    <div className="h-[3px] w-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full mb-5 group-hover:w-32 transition-all duration-500"></div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-green-500 transition-all duration-500">
                      {project.name}
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="flex items-center gap-3 group/item">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center text-blue-600 text-xl group-hover/item:scale-110 group-hover/item:rotate-6 transition-transform duration-300">
                          📍
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Location</div>
                          <div className="font-bold text-gray-900 text-base">{project.location}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 group/item">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center text-green-600 text-xl group-hover/item:scale-110 group-hover/item:rotate-6 transition-transform duration-300">
                          ⚡
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Capacity</div>
                          <div className="font-extrabold text-gray-900 text-base">{project.capacity}</div>
                        </div>
                      </div>
                    </div>

                    {/* Investment & Status */}
                    <div className="pt-6 border-t-2 border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Investment</div>
                          <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                            {project.investment}
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-5 py-2.5 rounded-full text-sm font-bold border-2 border-green-200 group-hover:scale-110 transition-transform duration-300">
                          ✓ Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0 z-0" ref={heroRef}>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        </div>

        {/* Green Line Accent */}
        <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60 animate-pulse"></div>

        <div className="container mx-auto px-6 lg:px-20 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                  Powering the
                  <span className="block text-blue-600">Future</span>
                  <span className="block">with Water</span>
                </h1>
                <div className="h-[2px] w-32 bg-green-400"></div>
              </div>

              <p className="text-xl lg:text-2xl text-gray-600 max-w-xl font-light leading-relaxed">
                Engineering excellence in hydrocentral design and turbine installation.
                Transforming water power into sustainable energy solutions.
              </p>

              <div className="flex gap-4">
                <button className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  View Projects
                </button>
                <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-medium rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-green-400 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-gray-200 rounded-2xl overflow-hidden aspect-[4/3] hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  [Turbine/Hydro Project Image]
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* ABOUT / COMPANY SECTION */}
      <section className="relative py-32 bg-white">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
              <div className="relative space-y-6">
                <div className="inline-block">
                  <div className="h-[2px] w-20 bg-green-400 mb-4"></div>
                  <h2 className="text-5xl lg:text-6xl font-bold text-gray-900">
                    20+ Years of
                    <span className="block text-blue-600">Engineering Excellence</span>
                  </h2>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  We are a premier hydrocentral engineering and turbine construction company,
                  dedicated to delivering precision-engineered solutions that harness the power
                  of water for sustainable energy generation.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Our commitment to innovation, precision, and environmental responsibility has
                  made us leaders in the hydropower industry. Every project we undertake is a
                  testament to our expertise and dedication to excellence.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-600 p-8 rounded-2xl text-white hover:scale-105 transition-transform duration-300">
                <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
                <div className="text-5xl font-bold mb-2">250+</div>
                <div className="text-blue-100 font-light">Projects Completed</div>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl text-white hover:scale-105 transition-transform duration-300">
                <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-gray-300 font-light">Countries Worldwide</div>
              </div>
              <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
                <div className="text-5xl font-bold mb-2 text-gray-900">5000+</div>
                <div className="text-gray-600 font-light">MW Installed</div>
              </div>
              <div className="bg-blue-50 p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
                <div className="text-5xl font-bold mb-2 text-gray-900">99.8%</div>
                <div className="text-gray-600 font-light">Uptime Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="h-[2px] w-20 bg-green-400 mb-4 mx-auto"></div>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive hydropower solutions from concept to completion
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Turbine Installation',
                description: 'State-of-the-art turbine systems designed for maximum efficiency and longevity.',
                icon: '⚡'
              },
              {
                title: 'Hydrocentral Design',
                description: 'Custom-engineered hydropower plants optimized for your specific site conditions.',
                icon: '🏗️'
              },
              {
                title: 'River Flow Analysis',
                description: 'Advanced hydraulic modeling and flow optimization for peak performance.',
                icon: '🌊'
              },
              {
                title: 'Monitoring Systems',
                description: '24/7 real-time monitoring with predictive maintenance capabilities.',
                icon: '📊'
              },
              {
                title: 'Electrical Planning',
                description: 'Complete power generation and grid integration solutions.',
                icon: '🔌'
              },
              {
                title: 'Civil Engineering',
                description: 'Robust infrastructure design for dams, channels, and support structures.',
                icon: '🏛️'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
                style={{
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                }}
              >
                <div className="h-[2px] w-12 bg-green-400 mb-6"></div>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION - DYNAMIC SNAKE TIMELINE */}
      <section className="relative py-32 bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-20 mb-20">
          <div className="text-center">
            <div className="inline-block">
              <div className="h-[2px] w-20 bg-green-400 mb-4 mx-auto"></div>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Completed Hydropower Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powering nations with sustainable energy infrastructure
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Timeline */}
        <DynamicTimeline />
      </section>

      {/* TECHNICAL SPECIFICATIONS SECTION */}
      <section className="relative py-32 bg-gray-900 text-white">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="h-[2px] w-20 bg-green-400 mb-4 mx-auto"></div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-4">
                Technical Excellence
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Industry-leading specifications and performance metrics
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Turbine Models', value: '15+', description: 'Francis, Kaplan, Pelton configurations' },
              { label: 'Avg. Efficiency', value: '94.5%', description: 'Peak performance optimization' },
              { label: 'CO₂ Reduced', value: '2.5M tons', description: 'Annual environmental impact' },
              { label: 'Flow Range', value: '5-500 m³/s', description: 'Adaptable to any site' },
            ].map((spec, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-green-400 transition-all duration-300 hover:scale-105"
              >
                <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
                <div className="text-4xl font-bold text-blue-400 mb-2">{spec.value}</div>
                <div className="text-xl font-semibold mb-2">{spec.label}</div>
                <p className="text-gray-400 text-sm">{spec.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white text-gray-900 p-8 rounded-2xl">
              <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
              <h3 className="text-2xl font-bold mb-4">Turbine Technology</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Advanced blade design for maximum energy capture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Corrosion-resistant materials for extended lifespan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Low-maintenance bearing systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-2xl">
              <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
              <h3 className="text-2xl font-bold mb-4">Efficiency Metrics</h3>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Real-time performance monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Adaptive flow optimization algorithms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Predictive maintenance scheduling</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl">
              <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
              <h3 className="text-2xl font-bold mb-4">Environmental Impact</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Fish-friendly turbine designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Minimal ecosystem disruption</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Zero emissions operation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="relative py-32 bg-gradient-to-br from-blue-50 to-white">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="h-[2px] w-20 bg-green-400 mb-4 mx-auto"></div>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Unmatched expertise and commitment to excellence
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                stat: '99.8%',
                label: 'Uptime Guarantee',
                description: 'Industry-leading reliability with 24/7 monitoring'
              },
              {
                stat: 'ISO 9001',
                label: 'Quality Certified',
                description: 'International standards compliance'
              },
              {
                stat: '24/7',
                label: 'Support Available',
                description: 'Round-the-clock technical assistance'
              },
              {
                stat: '100%',
                label: 'Energy Output',
                description: 'Guaranteed performance metrics'
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="h-[2px] w-12 bg-green-400 mb-6"></div>
                <div className="text-5xl font-bold text-blue-600 mb-3">{item.stat}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{item.label}</div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl p-12 shadow-xl">
            <div className="grid lg:grid-cols-3 gap-12">
              <div>
                <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Certifications</h3>
                <div className="space-y-2 text-gray-600">
                  <p>• ISO 9001:2015 Quality Management</p>
                  <p>• ISO 14001:2015 Environmental</p>
                  <p>• OHSAS 18001 Safety Standards</p>
                  <p>• IEC 61850 Power Systems</p>
                </div>
              </div>

              <div>
                <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Warranties</h3>
                <div className="space-y-2 text-gray-600">
                  <p>• 10-year turbine warranty</p>
                  <p>• 5-year parts guarantee</p>
                  <p>• Lifetime technical support</p>
                  <p>• Performance guarantees</p>
                </div>
              </div>

              <div>
                <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Monitoring</h3>
                <div className="space-y-2 text-gray-600">
                  <p>• Real-time SCADA systems</p>
                  <p>• Predictive maintenance AI</p>
                  <p>• Remote diagnostics</p>
                  <p>• Performance analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative py-32 bg-blue-600 text-white">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="h-[2px] w-20 bg-green-400 mb-6"></div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                Let's Power
                <span className="block">the Future Together</span>
              </h2>
              <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                Ready to start your hydropower project? Our team of experts is here
                to help you harness the power of water for sustainable energy generation.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Email</div>
                    <div className="text-blue-100">info@hydropower.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Phone</div>
                    <div className="text-blue-100">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Headquarters</div>
                    <div className="text-blue-100">Vienna, Austria</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl">
              <div className="h-[2px] w-12 bg-green-400 mb-6"></div>
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option>New Installation</option>
                    <option>Turbine Upgrade</option>
                    <option>Maintenance</option>
                    <option>Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-16 bg-blue-700 rounded-2xl p-12 text-center">
            <div className="h-[2px] w-20 bg-green-400 mb-6 mx-auto"></div>
            <h3 className="text-3xl font-bold mb-4">Global Project Locations</h3>
            <div className="bg-blue-800 rounded-xl h-64 flex items-center justify-center">
              <span className="text-blue-400">[Interactive Map with Project Pins]</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gray-900 text-white py-12">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="h-[2px] w-12 bg-green-400 mb-4"></div>
              <h4 className="font-bold text-xl mb-4">Hydropower Engineering</h4>
              <p className="text-gray-400 text-sm">
                Leading the future of sustainable energy through innovative hydrocentral solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Turbine Installation</li>
                <li>Hydrocentral Design</li>
                <li>Flow Analysis</li>
                <li>Monitoring Systems</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About Us</li>
                <li>Projects</li>
                <li>Certifications</li>
                <li>Careers</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>Contact</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Hydropower Engineering. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
