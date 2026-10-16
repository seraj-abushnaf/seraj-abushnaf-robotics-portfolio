// All entries are placeholders. Replace with verified facts and uploaded evidence.
export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  technical: string[];
  evidence: string[];
};

export const projects: Project[] = [
  {
    slug: "ftc-robot",
    title: "FTC Competition Robot",
    category: "FTC Robotics",
    summary: "Placeholder — describe the robot, the season, and the challenge it addressed.",
    role: "Placeholder — describe your personal responsibilities on the team.",
    technical: ["Drivetrain — add details", "Mechanisms — add details", "Software — add details"],
    evidence: ["Robot photo", "Build log", "Competition photo"],
  },
  {
    slug: "cad-design",
    title: "CAD Design Study",
    category: "CAD",
    summary: "Placeholder — describe the part or assembly and its purpose.",
    role: "Placeholder — describe what you modelled and decided.",
    technical: ["Software used — add", "Constraints — add", "Iterations — add"],
    evidence: ["CAD render", "Drawing sheet", "Printed prototype"],
  },
  {
    slug: "engineering-project",
    title: "Independent Engineering Project",
    category: "Engineering",
    summary: "Placeholder — describe the problem and your approach.",
    role: "Placeholder — describe your contribution.",
    technical: ["Hardware — add", "Testing — add", "Outcome — add"],
    evidence: ["Prototype photo", "Test data", "Final build"],
  },
];

export const awards = [
  { title: "Award title", issuer: "Issuing organisation", year: "Year" },
  { title: "Award title", issuer: "Issuing organisation", year: "Year" },
  { title: "Award title", issuer: "Issuing organisation", year: "Year" },
];

export const proofGroups = [
  { name: "Certificates", count: 4 },
  { name: "Robot & Build Photos", count: 6 },
  { name: "CAD Renders", count: 3 },
];
