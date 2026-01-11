'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

// Project interface
interface Project {
  id: number;
  name: string;
  location: string;
  capaticy: number;
  state: string;
  description: string;
  investment?: number;
  commissioning_year?: number;
  river?: string;
  hydropower_type?: string;
  turbine_type?: string;
  number_of_turbines?: number;
  annual_production?: number;
  coordinates_lat?: number;
  coordinates_lng?: number;
  region?: string;
  environmental_measures?: string;
  technology_used?: string;
  image_url?: string;
}

// Mock project data (same as in main page)
const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Valbona Hydropower Plant",
    location: "Valbona Valley, Albania",
    capaticy: 15.5,
    state: "Operational",
    description: "A state-of-the-art run-of-river hydroelectric facility harnessing the pristine waters of the Valbona River in northern Albania.",
    investment: 42,
    commissioning_year: 2022,
    river: "Valbona River",
    hydropower_type: "Run-of-River",
    turbine_type: "Francis",
    number_of_turbines: 2,
    annual_production: 65,
    coordinates_lat: 42.4167,
    coordinates_lng: 19.9167,
    region: "Kukës County",
    environmental_measures: "Fish ladders and minimum ecological flow systems installed to protect aquatic ecosystems.",
    technology_used: "Modern Francis turbines with digital monitoring and control systems for optimal efficiency."
  },
  {
    id: 2,
    name: "Drin River Complex",
    location: "Shkodër Region, Albania",
    capaticy: 28.0,
    state: "Under Construction",
    description: "Large-scale hydroelectric project on the Drin River, featuring advanced turbine technology and environmental protection systems.",
    investment: 85,
    commissioning_year: 2025,
    river: "Drin River",
    hydropower_type: "Storage",
    turbine_type: "Kaplan",
    number_of_turbines: 3,
    annual_production: 140,
    coordinates_lat: 42.0833,
    coordinates_lng: 19.5167,
    region: "Shkodër County",
    environmental_measures: "Comprehensive environmental impact mitigation including sediment management and habitat restoration.",
    technology_used: "Variable-speed Kaplan turbines with automated grid synchronization technology."
  },
  {
    id: 3,
    name: "Osumi Cascade",
    location: "Skrapar, Albania",
    capaticy: 12.3,
    state: "Planning",
    description: "Cascading hydropower system utilizing the natural elevation changes of the Osumi Canyon for sustainable energy generation.",
    investment: 35,
    commissioning_year: 2026,
    river: "Osumi River",
    hydropower_type: "Cascade",
    turbine_type: "Pelton",
    number_of_turbines: 4,
    annual_production: 52,
    coordinates_lat: 40.5833,
    coordinates_lng: 20.2833,
    region: "Berat County",
    environmental_measures: "Minimal water diversion with dedicated environmental flow monitoring systems.",
    technology_used: "High-efficiency Pelton turbines optimized for high-head applications."
  }
];

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    params.then(({ id }) => {
      setProjectId(id);
      loadProjectData(parseInt(id));
    });
  }, [params]);

  const loadProjectData = async (id: number) => {
    setLoading(true);

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find project from mock data
    const projectData = MOCK_PROJECTS.find(p => p.id === id) || null;
    setProject(projectData);

    // Load related projects (excluding current one)
    const related = MOCK_PROJECTS
      .filter(p => p.id !== id)
      .slice(0, 3);
    setRelatedProjects(related);

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Status color coding
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('operational') || lowerStatus.includes('completed')) {
      return 'from-green-500 to-emerald-600';
    } else if (lowerStatus.includes('construction')) {
      return 'from-yellow-500 to-orange-600';
    } else if (lowerStatus.includes('planning')) {
      return 'from-blue-500 to-cyan-600';
    }
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        {/* Neon Accent Line */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-60"></div>

        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <div className="max-w-5xl">
            {/* Status Badge */}
            <div className="inline-block mb-6">
              <div className={`px-6 py-2 bg-gradient-to-r ${getStatusColor(project.state)} rounded-full text-white font-bold text-sm shadow-lg`}>
                {project.state}
              </div>
            </div>

            {/* Project Title */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {project.name}
            </h1>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {/* Location */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-cyan-300 text-3xl mb-2">📍</div>
                <div className="text-xs text-cyan-200 uppercase tracking-wider mb-1">Location</div>
                <div className="text-xl font-bold">{project.location}</div>
              </div>

              {/* Capacity */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-cyan-300 text-3xl mb-2">⚡</div>
                <div className="text-xs text-cyan-200 uppercase tracking-wider mb-1">Capacity</div>
                <div className="text-xl font-bold">{project.capaticy} MW</div>
              </div>

              {/* Investment */}
              {project.investment && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-cyan-300 text-3xl mb-2">💰</div>
                  <div className="text-xs text-cyan-200 uppercase tracking-wider mb-1">Investment</div>
                  <div className="text-xl font-bold">€{project.investment}M</div>
                </div>
              )}

              {/* Year */}
              {project.commissioning_year && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-cyan-300 text-3xl mb-2">📅</div>
                  <div className="text-xs text-cyan-200 uppercase tracking-wider mb-1">Year</div>
                  <div className="text-xl font-bold">{project.commissioning_year}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Images Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-6"></div>
              <h2 className="text-4xl font-bold text-gray-900">Project Gallery</h2>
            </div>

            {/* Main Project Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 group">
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.name}
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-[500px] bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-white text-center p-8">
                    <div className="text-8xl mb-6">💧</div>
                    <h3 className="text-4xl font-bold mb-4">{project.name}</h3>
                    <p className="text-xl text-cyan-100">{project.location}</p>
                    <div className="mt-8 flex items-center justify-center gap-8">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                        <div className="text-3xl font-bold">{project.capaticy} MW</div>
                        <div className="text-sm text-cyan-100">Capacity</div>
                      </div>
                      {project.annual_production && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                          <div className="text-3xl font-bold">{project.annual_production} GWh</div>
                          <div className="text-sm text-cyan-100">Annual Output</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Image Overlay with Project Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{project.name}</h3>
                    <div className="flex items-center gap-4 text-cyan-300">
                      <span className="flex items-center gap-2">
                        <span>📍</span> {project.location}
                      </span>
                      {project.river && (
                        <span className="flex items-center gap-2">
                          <span>🌊</span> {project.river}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-cyan-300">{project.capaticy} MW</div>
                    <div className="text-sm text-cyan-100">Installed Capacity</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Images Grid (Placeholder for future expansion) */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder Image 1 - Turbine */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 group cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-5xl mb-2">⚙️</div>
                    <div className="text-sm font-semibold">Turbine Hall</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300"></div>
              </div>

              {/* Placeholder Image 2 - Dam */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 group cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-blue-700 to-cyan-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-5xl mb-2">🏗️</div>
                    <div className="text-sm font-semibold">Dam Structure</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300"></div>
              </div>

              {/* Placeholder Image 3 - Control Room */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 group cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-indigo-700 to-blue-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-5xl mb-2">🖥️</div>
                    <div className="text-sm font-semibold">Control Room</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300"></div>
              </div>
            </div>

            {/* Upload Image Button (for future admin functionality) */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-blue-400">
                <span className="flex items-center gap-2 justify-center">
                  <span className="text-xl">📸</span>
                  <span className="font-semibold">Add Project Images</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left: Description */}
                <div className="p-10 lg:p-12">
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-6"></div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    {project.description}
                  </p>

                  {project.river && (
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">
                        🌊
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">River</div>
                        <div className="font-bold text-gray-900">{project.river}</div>
                      </div>
                    </div>
                  )}

                  {project.region && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-xl">
                        🏔️
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Region</div>
                        <div className="font-bold text-gray-900">{project.region}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Key Stats */}
                <div className="p-10 lg:p-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                  <h3 className="text-2xl font-bold mb-8">Key Statistics</h3>
                  <div className="space-y-6">
                    {project.annual_production && (
                      <div className="border-l-4 border-cyan-300 pl-6">
                        <div className="text-cyan-200 text-sm uppercase tracking-wider mb-1">Annual Production</div>
                        <div className="text-3xl font-bold">{project.annual_production} GWh</div>
                      </div>
                    )}

                    {project.number_of_turbines && (
                      <div className="border-l-4 border-cyan-300 pl-6">
                        <div className="text-cyan-200 text-sm uppercase tracking-wider mb-1">Number of Turbines</div>
                        <div className="text-3xl font-bold">{project.number_of_turbines}</div>
                      </div>
                    )}

                    {project.turbine_type && (
                      <div className="border-l-4 border-cyan-300 pl-6">
                        <div className="text-cyan-200 text-sm uppercase tracking-wider mb-1">Turbine Type</div>
                        <div className="text-2xl font-bold">{project.turbine_type}</div>
                      </div>
                    )}

                    {project.hydropower_type && (
                      <div className="border-l-4 border-cyan-300 pl-6">
                        <div className="text-cyan-200 text-sm uppercase tracking-wider mb-1">Plant Type</div>
                        <div className="text-2xl font-bold">{project.hydropower_type}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      {(project.technology_used || project.environmental_measures) && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-6"></div>
                <h2 className="text-4xl font-bold text-gray-900">Technical Specifications</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Technology Used */}
                {project.technology_used && (
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-blue-100">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                        ⚙️
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Technology</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {project.technology_used}
                    </p>
                  </div>
                )}

                {/* Environmental Measures */}
                {project.environmental_measures && (
                  <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-8 shadow-lg border-2 border-green-100">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                        🌱
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Environmental Measures</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {project.environmental_measures}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Location Section */}
      {(project.coordinates_lat && project.coordinates_lng) && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-6"></div>
                <h2 className="text-4xl font-bold text-gray-900">Location</h2>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-blue-200 to-cyan-200 h-96 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🗺️</div>
                      <p className="text-gray-700 font-semibold text-lg">Interactive Map</p>
                      <p className="text-gray-600 text-sm mt-2">
                        {Number(project.coordinates_lat).toFixed(6)}, {Number(project.coordinates_lng).toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-cyan-200 mb-1">Coordinates</div>
                      <div className="font-mono text-lg font-bold">
                        {Number(project.coordinates_lat).toFixed(6)}°N, {Number(project.coordinates_lng).toFixed(6)}°E
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-cyan-200 mb-1">Region</div>
                      <div className="text-lg font-bold">{project.region || project.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="text-center mb-12">
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-6"></div>
              <h2 className="text-4xl font-bold text-gray-900">Related Projects</h2>
              <p className="text-gray-600 mt-4">Explore more hydropower installations</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedProjects.map((relatedProject) => (
                <div
                  key={relatedProject.id}
                  onClick={() => {
                    setLoading(true);
                    loadProjectData(relatedProject.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-gray-100 hover:border-blue-300"
                >
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                    <div className="relative z-10 text-white text-center p-4">
                      <div className="text-xl font-bold">{relatedProject.name}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        {relatedProject.state}
                      </div>
                      <div className="text-blue-600 font-bold text-lg">{relatedProject.capaticy} MW</div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <span>📍</span>
                      <span className="text-sm">{relatedProject.location}</span>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {relatedProject.description}
                    </p>

                    <div className="text-blue-600 font-semibold text-sm group-hover:text-cyan-600 transition-colors">
                      View Details →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Projects Button */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <button
            onClick={() => router.push('/#projects')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-600 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
          >
            ← Back to All Projects
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-8"></div>
          <p className="text-gray-400">© 2025 Rama Rasim Hydropower. Engineering excellence in renewable energy.</p>
        </div>
      </footer>
    </div>
  );
}
