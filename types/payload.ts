export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  keyFeatures?: string[];
  techStack?: string[];
  metrics?: string[];
  impact?: string;
  caseStudy?: {
    problemStatement: string;
    solutionArchitecture: string;
    decisions: string[];
    results: string;
    architectureDetails?: string;
    systemRoles?: {
      name: string;
      description: string;
    }[];
    coreWorkflow?: {
      step: number;
      title: string;
      description: string;
    }[];
    featureModules?: {
      title: string;
      description: string;
    }[];
  };
  links?: {
    repo?: string;
    live?: string;
  };
  badges?: string[];
  categoryBadges?: { label: string; variant: string }[];
  infrastructure?: string[];
  domain?: string;
  roleCount?: string;
  impactMetrics?: {
    value: string;
    label: string;
  }[];
  techGroups?: Record<string, string[]>;
  coverImage?: string;
  images?: string[];
}

export interface Site {
  hero?: {
    headline: string;
    subheading: string;
    ctas: { label: string; href: string }[];
    summary: string;
  };
  aboutBullets?: string[];
  design?: {
    theme: string;
    accentColors: string[];
  };
  resume?: {
    file: {
      filename: string;
      url: string;
      mimeType: string;
    };
  };
  contact?: {
    location: string;
    email: string;
    phone: string;
    socials: Record<string, string>;
  };
}
