// lib/types.ts

export type EntryType =
  | "Education"
  | "Coursework"
  | "Award"
  | "Activity"
  | "Sport"
  | "Volunteer"
  | "Work"
  | "Project"
  | "Skill"
  | "Certification";

export interface StudentProfile {
  name: string;
  grade: string;
  school: string;
  interests: string;
  gpa: string;
  email: string;
}

export interface Entry {
  id: string;
  type: EntryType;
  title: string;
  org: string;
  startDate: string;   // YYYY-MM
  endDate: string;     // YYYY-MM or "" for present
  hrsPerWeek: string;
  weeksPerYear: string;
  description: string;
  notes: string;
  bullets: string[];
  verified: boolean;
}

export interface GeneratedDraft {
  entryId: string;
  resumeBullets: string[];
  activityDescription: string;
}

export interface AppState {
  profile: StudentProfile;
  entries: Entry[];
  drafts: Record<string, GeneratedDraft>;
}

export const ENTRY_TYPES: EntryType[] = [
  "Education", "Coursework", "Award", "Activity",
  "Sport", "Volunteer", "Work", "Project", "Skill", "Certification",
];

export const SECTION_LABELS: Record<EntryType, string> = {
  Activity: "Extracurricular Activities",
  Award: "Honors & Awards",
  Work: "Work Experience",
  Volunteer: "Community Service",
  Education: "Education",
  Coursework: "Relevant Coursework",
  Sport: "Athletics",
  Project: "Projects",
  Skill: "Skills",
  Certification: "Certifications",
};

export const DEFAULT_PROFILE: StudentProfile = {
  name: "", grade: "", school: "", interests: "", gpa: "", email: "",
};

export const DEFAULT_STATE: AppState = {
  profile: DEFAULT_PROFILE,
  entries: [],
  drafts: {},
};
