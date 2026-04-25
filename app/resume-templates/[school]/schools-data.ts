export type School = {
  slug: string;
  name: string;
  fullName: string;
  location: string;
  acceptanceRate: string;
  resumeTip: string;
  topMajors: string[];
  clubsAndActivities: string[];
  resumeBulletTeaser: string;
};

export const SCHOOLS: School[] = [
  {
    slug: "harvard",
    name: "Harvard",
    fullName: "Harvard University",
    location: "Cambridge, MA",
    acceptanceRate: "3.6%",
    resumeTip: "Harvard reviewers look for sustained commitment over time, not a laundry list of activities.",
    topMajors: ["Economics", "Computer Science", "Political Science", "Biology"],
    clubsAndActivities: ["Model UN", "Research Assistant", "Debate Team", "Community Service"],
    resumeBulletTeaser: "Led Model UN committee of 40+ delegates, drafting 3 resolutions adopted by consensus",
  },
  {
    slug: "mit",
    name: "MIT",
    fullName: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    acceptanceRate: "3.9%",
    resumeTip: "MIT wants to see hands-on building and problem solving — projects beat titles.",
    topMajors: ["Engineering", "Computer Science", "Mathematics", "Physics"],
    clubsAndActivities: ["Robotics Club", "Science Olympiad", "Math Team", "Hackathons"],
    resumeBulletTeaser: "Built autonomous line-following robot using Arduino; placed 2nd at regional Science Olympiad",
  },
  {
    slug: "stanford",
    name: "Stanford",
    fullName: "Stanford University",
    location: "Stanford, CA",
    acceptanceRate: "3.7%",
    resumeTip: "Stanford loves entrepreneurial thinking — show initiative and impact, not just participation.",
    topMajors: ["Computer Science", "Engineering", "Psychology", "Economics"],
    clubsAndActivities: ["Startup Club", "Student Government", "Research", "Sports"],
    resumeBulletTeaser: "Founded school sustainability club; reduced cafeteria waste by 30% in first semester",
  },
  {
    slug: "yale",
    name: "Yale",
    fullName: "Yale University",
    location: "New Haven, CT",
    acceptanceRate: "4.6%",
    resumeTip: "Yale values intellectual curiosity and community impact — show both in your activities.",
    topMajors: ["Political Science", "Economics", "History", "Psychology"],
    clubsAndActivities: ["Debate", "Theater", "Community Outreach", "Research"],
    resumeBulletTeaser: "Directed student theater production with 200+ attendees; managed $2,000 budget",
  },
  {
    slug: "princeton",
    name: "Princeton",
    fullName: "Princeton University",
    location: "Princeton, NJ",
    acceptanceRate: "4.7%",
    resumeTip: "Princeton emphasizes service and leadership — highlight how you helped others.",
    topMajors: ["Economics", "Public Policy", "Computer Science", "Engineering"],
    clubsAndActivities: ["Community Service", "Research", "Student Government", "Sports"],
    resumeBulletTeaser: "Organized weekly tutoring program serving 50+ students in underresourced middle school",
  },
  {
    slug: "columbia",
    name: "Columbia",
    fullName: "Columbia University",
    location: "New York, NY",
    acceptanceRate: "3.9%",
    resumeTip: "Columbia values urban engagement — tie your activities to community and real-world impact.",
    topMajors: ["Economics", "Computer Science", "Political Science", "Engineering"],
    clubsAndActivities: ["Journalism", "Community Organizing", "Research", "Cultural Clubs"],
    resumeBulletTeaser: "Published 12 articles in school newspaper covering local policy and student issues",
  },
  {
    slug: "brown",
    name: "Brown",
    fullName: "Brown University",
    location: "Providence, RI",
    acceptanceRate: "5.6%",
    resumeTip: "Brown loves self-directed learners — show curiosity and independence in your activities.",
    topMajors: ["Computer Science", "Biology", "Economics", "International Relations"],
    clubsAndActivities: ["Independent Projects", "Arts", "Activism", "Research"],
    resumeBulletTeaser: "Designed independent study on climate policy; presented findings to 3 local city councils",
  },
  {
    slug: "dartmouth",
    name: "Dartmouth",
    fullName: "Dartmouth College",
    location: "Hanover, NH",
    acceptanceRate: "6.2%",
    resumeTip: "Dartmouth values outdoor leadership and tight-knit community involvement.",
    topMajors: ["Economics", "Government", "Engineering", "Psychology"],
    clubsAndActivities: ["Outdoor Club", "Student Government", "Athletics", "Community Service"],
    resumeBulletTeaser: "Led 8-person wilderness trip as certified trip leader; trained 15 new student guides",
  },
  {
    slug: "cornell",
    name: "Cornell",
    fullName: "Cornell University",
    location: "Ithaca, NY",
    acceptanceRate: "7.3%",
    resumeTip: "Cornell is practical and career-focused — internships, projects, and skills matter.",
    topMajors: ["Engineering", "Business", "Computer Science", "Biology"],
    clubsAndActivities: ["Internships", "Research", "Business Club", "Engineering Teams"],
    resumeBulletTeaser: "Completed summer internship at local architecture firm; assisted on 2 commercial projects",
  },
  {
    slug: "upenn",
    name: "UPenn",
    fullName: "University of Pennsylvania",
    location: "Philadelphia, PA",
    acceptanceRate: "5.9%",
    resumeTip: "Penn loves ambition and cross-disciplinary thinking — show range and drive.",
    topMajors: ["Economics", "Finance", "Computer Science", "Nursing"],
    clubsAndActivities: ["Business Club", "Community Health", "Research", "Entrepreneurship"],
    resumeBulletTeaser: "Launched school-wide financial literacy workshop attended by 120+ students",
  },
  {
    slug: "duke",
    name: "Duke",
    fullName: "Duke University",
    location: "Durham, NC",
    acceptanceRate: "6.3%",
    resumeTip: "Duke values leadership with impact — show results, not just titles.",
    topMajors: ["Economics", "Computer Science", "Biology", "Public Policy"],
    clubsAndActivities: ["Basketball", "Research", "Community Service", "Student Government"],
    resumeBulletTeaser: "Raised $4,500 for local food bank through student-organized charity basketball tournament",
  },
  {
    slug: "johns-hopkins",
    name: "Johns Hopkins",
    fullName: "Johns Hopkins University",
    location: "Baltimore, MD",
    acceptanceRate: "7.5%",
    resumeTip: "Hopkins is research-first — any lab work, independent study, or STEM project stands out.",
    topMajors: ["Biology", "Neuroscience", "Computer Science", "Public Health"],
    clubsAndActivities: ["Research", "Medical Volunteering", "Science Olympiad", "Pre-med Club"],
    resumeBulletTeaser: "Volunteered 120+ hours in hospital patient services; shadowed physicians in 3 departments",
  },
];

export function getSchool(slug: string): School | undefined {
  return SCHOOLS.find((s) => s.slug === slug);
}
