export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  type: string;
  location: string;
  description: string;
  tags: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Nova Systems",
    role: "Senior Full-Stack Engineer",
    period: "2023 — Present",
    type: "Full-Time",
    location: "Bangalore, India",
    description:
      "Leading development of a microservices-based platform serving 100K+ daily users, mentoring a team of four engineers.",
    tags: ["Next.js", "Node.js", "AWS", "Redis"],
  },
  {
    company: "Lumen Studio",
    role: "Full-Stack Developer",
    period: "2022 — 2023",
    type: "Full-Time",
    location: "Bangalore, India",
    description:
      "Built and shipped customer-facing web applications end-to-end using React, Node.js, and PostgreSQL.",
    tags: ["React", "Express.js", "MongoDB"],
  },
  {
    company: "Arclight Labs",
    role: "Software Developer",
    period: "2020 — 2022",
    type: "Full-Time",
    location: "Remote",
    description:
      "Built reusable React components and internal tooling, reducing manual QA time by 40%.",
    tags: ["React", "JavaScript", "CSS"],
  },
  {
    company: "Meridian Tech",
    role: "Junior Developer",
    period: "2019 — 2020",
    type: "Internship",
    location: "Bangalore, India",
    description:
      "Contributed to automation scripts and internal dashboards used by the engineering team.",
    tags: ["Python", "Flask", "MySQL"],
  },
];
