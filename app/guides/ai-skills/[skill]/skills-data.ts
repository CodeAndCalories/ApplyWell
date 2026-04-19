export type Skill = {
  slug: string;
  name: string;
  description: string;
  courses: string[];
  resumeBulletTeaser: string;
  timeToLearn: string;
  demandLevel: "Very High" | "High" | "Medium";
};

export const SKILLS: Skill[] = [
  {
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    description: "Writing effective instructions for AI tools like ChatGPT, Claude, and Gemini.",
    courses: ["Google Prompting Essentials", "Coursera AI For Everyone"],
    resumeBulletTeaser: "Designed and tested AI prompts to automate [task] — reducing time by X%",
    timeToLearn: "1-2 weeks",
    demandLevel: "Very High",
  },
  {
    slug: "machine-learning-basics",
    name: "Machine Learning Basics",
    description: "Understanding how AI systems learn from data and make predictions.",
    courses: ["Harvard CS50 AI", "Elements of AI"],
    resumeBulletTeaser: "Completed machine learning coursework covering supervised and unsupervised models",
    timeToLearn: "4-6 weeks",
    demandLevel: "High",
  },
  {
    slug: "ai-tools-for-productivity",
    name: "AI Tools for Productivity",
    description: "Using AI tools like Copilot, Notion AI, and ChatGPT to work faster.",
    courses: ["Microsoft AI Skills", "Google AI Essentials"],
    resumeBulletTeaser: "Leveraged AI productivity tools to streamline workflows and reduce manual tasks",
    timeToLearn: "1 week",
    demandLevel: "Very High",
  },
  {
    slug: "ai-ethics",
    name: "AI Ethics",
    description: "Understanding bias, fairness, and responsible use of AI systems.",
    courses: ["Elements of AI", "Coursera AI For Everyone"],
    resumeBulletTeaser: "Studied AI ethics frameworks including bias detection and responsible deployment",
    timeToLearn: "2-3 weeks",
    demandLevel: "High",
  },
  {
    slug: "ai-for-design",
    name: "AI for Design",
    description: "Using AI tools like Canva AI and Adobe Firefly for visual content.",
    courses: ["Canva AI Design"],
    resumeBulletTeaser: "Created professional visual content using AI design tools for [project/audience]",
    timeToLearn: "1 week",
    demandLevel: "Medium",
  },
  {
    slug: "data-literacy",
    name: "Data Literacy",
    description: "Reading, interpreting, and communicating insights from data.",
    courses: ["Khan Academy AI", "Google AI Essentials"],
    resumeBulletTeaser: "Analyzed datasets to identify trends and present findings to stakeholders",
    timeToLearn: "2-4 weeks",
    demandLevel: "High",
  },
  {
    slug: "ai-writing-tools",
    name: "AI Writing Tools",
    description: "Using AI to draft, edit, and improve written content professionally.",
    courses: ["Google Prompting Essentials", "Microsoft AI Skills"],
    resumeBulletTeaser: "Used AI writing tools to produce and edit content, improving output speed by X%",
    timeToLearn: "3-5 days",
    demandLevel: "Very High",
  },
  {
    slug: "chatgpt-for-students",
    name: "ChatGPT for Students",
    description: "Using ChatGPT effectively for research, writing, and studying.",
    courses: ["Google Prompting Essentials", "Khan Academy AI"],
    resumeBulletTeaser: "Applied ChatGPT for research synthesis and content drafting across academic projects",
    timeToLearn: "3-5 days",
    demandLevel: "Very High",
  },
  {
    slug: "ai-in-business",
    name: "AI in Business",
    description: "How companies use AI for marketing, operations, and decision-making.",
    courses: ["Coursera AI For Everyone", "Microsoft AI Skills"],
    resumeBulletTeaser: "Completed business AI coursework covering automation, analytics, and strategy",
    timeToLearn: "2-3 weeks",
    demandLevel: "High",
  },
  {
    slug: "python-for-ai",
    name: "Python for AI",
    description: "Basic Python programming as a foundation for AI and data science.",
    courses: ["Harvard CS50 AI", "Khan Academy AI"],
    resumeBulletTeaser: "Wrote Python scripts for data processing and basic machine learning tasks",
    timeToLearn: "4-8 weeks",
    demandLevel: "Very High",
  },
];

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}
