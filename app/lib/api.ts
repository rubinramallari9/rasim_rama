const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Project {
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

export interface ContactMessage {
  name: string;
  email: string;
  project_type: string;
  message: string;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects/`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProject(id: number): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}/`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function submitContactMessage(message: ContactMessage): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit message');
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}
