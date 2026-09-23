export type LauncherCategory = 'TEMPLATE' | 'UTILITY' | 'STARTER_KIT' | 'DEMO' | 'EXPERIMENT' | 'TOOL';
export type LicenseType = 'MIT' | 'APACHE_2.0' | 'GPL_3.0' | 'PROPRIETARY';

export interface Launcher {
  id: string;
  slug: string;
  title: string;
  version: string;
  description: string;
  features: string[];
  category: LauncherCategory;
  license: LicenseType;
  repositoryUrl?: string;
  releaseUrl?: string;
  maintainer: string; // Member name or ID
  releaseDate: string;
  technologyStack: string[];
  coverImage: string;
}
