import { Metadata } from 'next';
import ProjectPageClient from './ProjectPageClient';

// Project interface for metadata
interface Project {
  id: number;
  name: string;
  location: string;
  capaticy: number;
  state: string;
  description: string;
  turbine_type?: string;
  hydropower_type?: string;
  annual_production?: number;
}

// Mock project data for metadata generation
const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Valbona Hydropower Plant",
    location: "Valbona Valley, Albania",
    capaticy: 15.5,
    state: "Operational",
    description: "A state-of-the-art run-of-river hydroelectric facility harnessing the pristine waters of the Valbona River in northern Albania.",
    turbine_type: "Francis",
    hydropower_type: "Run-of-River",
    annual_production: 65,
  },
  {
    id: 2,
    name: "Drin River Complex",
    location: "Shkodër Region, Albania",
    capaticy: 28.0,
    state: "Under Construction",
    description: "Large-scale hydroelectric project on the Drin River, featuring advanced turbine technology and environmental protection systems.",
    turbine_type: "Kaplan",
    hydropower_type: "Storage",
    annual_production: 140,
  },
  {
    id: 3,
    name: "Osumi Cascade",
    location: "Skrapar, Albania",
    capaticy: 12.3,
    state: "Planning",
    description: "Cascading hydropower system utilizing the natural elevation changes of the Osumi Canyon for sustainable energy generation.",
    turbine_type: "Pelton",
    hydropower_type: "Cascade",
    annual_production: 52,
  }
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rasimrama.com";

// Generate dynamic metadata for each project page
export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = MOCK_PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const title = `${project.name} | ${project.capaticy} MW ${project.hydropower_type || 'Hydropower'} Project`;
  const description = `${project.description} Located in ${project.location}. Capacity: ${project.capaticy} MW. Status: ${project.state}.${project.annual_production ? ` Annual production: ${project.annual_production} GWh.` : ''}`;

  return {
    title,
    description,
    keywords: [
      project.name,
      project.location,
      project.turbine_type ? `${project.turbine_type} turbine` : 'hydropower turbine',
      project.hydropower_type || 'hydropower',
      'Albania hydropower',
      'renewable energy',
      'hydroelectric plant',
      `${project.capaticy} MW`,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${siteUrl}/projects/${project.id}`,
      siteName: 'Rasim Rama Hydropower',
      locale: 'en_US',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${project.name} - Hydropower project by Rasim Rama`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `${siteUrl}/projects/${project.id}`,
    },
    other: {
      'article:section': 'Hydropower Projects',
      'article:tag': project.turbine_type || 'Hydropower',
    },
  };
}

// Generate static params for all known project IDs
export async function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({
    id: project.id.toString(),
  }));
}

// Server component that renders the client component
export default async function ProjectPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return <ProjectPageClient projectId={id} />;
}
