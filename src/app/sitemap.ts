import { MetadataRoute } from 'next';
import { demoProjects, demoHackathons } from '@/lib/demo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dracarysweb.vercel.app';

  const staticRoutes = [
    '',
    '/projects',
    '/sold-projects',
    '/hackathons',
    '/team',
    '/founder',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const projectRoutes = demoProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const hackathonRoutes = demoHackathons.map((hackathon) => ({
    url: `${baseUrl}/hackathons/${hackathon.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...hackathonRoutes];
}
