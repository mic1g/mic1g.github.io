export type ContactLink = {
  label: string;
  href: string;
  icon: "mail" | "github" | "linkedin" | "instagram";
};

export type Profile = {
  name: string;
  fullName: string;
  role: string;
  location: string;
  intro: string;
  summary: string;
  portrait: string;
  availability: string;
  highlights: Array<{
    label: string;
    value: string;
  }>;
  contactLinks: ContactLink[];
};

export type ExperienceItem = {
  title: string;
  company?: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
};

export type PrivateAppState =
  | {
      status: "in_progress";
      notice: string;
      signInLabel: string;
    }
  | {
      status: "live";
      href: string;
      label: string;
      signInLabel: string;
    };

export type Project = {
  slug: string;
  title: string;
  category: string;
  role: string;
  stack: string[];
  summary: string;
  challenge: string;
  impact: string;
  highlights?: string[];
  privateApp?: PrivateAppState;
  image: string;
  imageFit?: "cover" | "contain";
  gallery: string[];
  links: Array<{
    label: string;
    href: string;
  }>;
};

export type Certification = {
  name: string;
  issuer: string;
  status: "Completed / Current" | "Planned";
  earnedOn?: string;
  expiresOn?: string;
  link?: string;
  image: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};
