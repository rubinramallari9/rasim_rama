const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types
export interface Project {
  id: number;
  name: string;
  name_sq: string;
  slug: string;
  location: string;
  country: string;
  capacity: string;
  turbine_type: string;
  turbine_type_display?: string;
  number_of_turbines: number | null;
  state: string;
  state_display?: string;
  year_completed: number | null;
  investment: string | null;
  description: string;
  description_sq: string;
  latitude: string | null;
  longitude: string | null;
  image: string | null;
  featured: boolean;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface Service {
  id: number;
  title: string;
  title_sq: string;
  slug: string;
  description: string;
  description_sq: string;
  icon: string;
  order: number;
  is_active: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  project_type: string;
  message: string;
}

export interface ApiResponse {
  message: string;
}

// API Functions

/**
 * Get all projects
 */
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects/`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

/**
 * Get a single project by slug
 */
export async function getProject(slug: string): Promise<Project> {
  const res = await fetch(`${API_URL}/projects/${slug}/`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch project');
  }
  return res.json();
}

/**
 * Get featured projects only
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects/featured/`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch featured projects');
  }
  return res.json();
}

/**
 * Get all services
 */
export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/services/`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch services');
  }
  return res.json();
}

/**
 * Submit contact form
 */
export async function submitContact(data: ContactFormData): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    // Handle validation errors
    if (result.message) {
      throw new Error(result.message);
    }
    // Handle field-specific errors
    const errors = Object.entries(result)
      .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
      .join('; ');
    throw new Error(errors || 'Failed to submit form');
  }

  return result;
}
