// Facts provided by Seraj Abushnaf. Images are placeholders until real evidence is uploaded.
export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  technical: string[];
  evidence: string[];
};

export const profile =
  "Libyan robotics student. FTC autonomous lead programmer and robot designer for TLC CyberKnights and LyBrix.";

export const projects: Project[] = [
  {
    slug: "ftc-robot",
    title: "FTC Robot Design & Autonomous",
    category: "FTC Robotics",
    summary: "Robot design, CAD and autonomous programming for FTC teams TLC CyberKnights and LyBrix.",
    role: "Autonomous lead programmer and robot designer.",
    technical: ["Autonomous programming", "Robot design", "CAD in Onshape"],
    evidence: ["Robot photo", "Onshape CAD", "Competition photo"],
  },
  {
    slug: "fire-gas-detector",
    title: "Fire & Toxic-Gas Detection Prototype",
    category: "Engineering",
    summary: "An Arduino-based prototype that detects fire and toxic gas.",
    role: "Built and programmed the prototype.",
    technical: ["Arduino", "Fire sensing", "Toxic-gas sensing"],
    evidence: ["Prototype photo", "Wiring", "Demo"],
  },
  {
    slug: "soil-moisture",
    title: "Soil-Moisture Watering Project",
    category: "Engineering",
    summary: "An automatic watering project driven by soil-moisture sensing. Placed first in class.",
    role: "Designed and built the project.",
    technical: ["Soil-moisture sensing", "Automated watering", "First in class"],
    evidence: ["Project photo", "Setup", "Result"],
  },
  {
    slug: "educational-robotics",
    title: "Educational Robotics Project",
    category: "Outreach",
    summary: "An educational robotics project presented to hundreds of people.",
    role: "Created and presented the project.",
    technical: ["Presentation", "Robotics education"],
    evidence: ["Presentation photo", "Audience", "Materials"],
  },
  {
    slug: "mentoring",
    title: "Robotics Mentoring",
    category: "Outreach",
    summary: "Mentoring students in robotics.",
    role: "Mentor.",
    technical: ["Teaching", "Robotics fundamentals"],
    evidence: ["Session photo", "Materials", "Group"],
  },
  {
    slug: "seed-drone",
    title: "Agricultural Seed-Distribution Drone (Future Idea)",
    category: "Future Idea — not completed",
    summary: "A future idea for a drone that distributes seeds for agriculture. This is a concept, not a completed project.",
    role: "Concept stage.",
    technical: ["Status: future idea", "Not built"],
    evidence: ["Concept sketch"],
  },
];

export const business = [
  { title: "3D-Printing Business", detail: "Over 10,000 LYD in reported revenue." },
  { title: "Web Development", detail: "Four websites developed, two of them paid." },
  { title: "Video Editing", detail: "Paid video editing work." },
];

export const skills = [
  "FTC autonomous programming",
  "Robot design",
  "CAD (Onshape)",
  "Arduino & sensors",
  "3D printing",
  "Web development",
  "Video editing",
  "Mentoring & presenting",
];

export type Award = { title: string; issuer: string; year: string; type: "Team" | "Individual" };

export const awards: Award[] = [
  { title: "National Semifinalist & 6th Nationally", issuer: "FIRST Tech Challenge, Libya", year: "2024–25", type: "Team" },
  { title: "Control Award & Promote Award", issuer: "FIRST Tech Challenge", year: "2025–26", type: "Team" },
  { title: "Second Place & Concept Award", issuer: "Arab Robotics Championship, Benghazi", year: "", type: "Team" },
  { title: "Science Fair Winner", issuer: "Science Fair", year: "", type: "Individual" },
  { title: "Physics Genius of the Year", issuer: "School", year: "", type: "Individual" },
  { title: "Grade 9 Second Place", issuer: "School", year: "", type: "Individual" },
];

export const proofGroups = [
  { name: "Certificates", count: 4 },
  { name: "Robots", count: 4 },
  { name: "Photos", count: 4 },
  { name: "CAD", count: 3 },
];
