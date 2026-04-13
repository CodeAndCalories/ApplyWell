export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
  numbered?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "first-resume-college-student",
    title: "How to Write Your First Resume as a College Student (2026 Guide)",
    description:
      "A step-by-step guide to building your first resume from scratch — even if you have no work experience yet.",
    date: "March 2026",
    tags: ["resume", "college", "beginner"],
    sections: [
      {
        paragraphs: [
          "Writing your first resume feels intimidating when you stare at a blank page and wonder what goes on it. The good news: every recruiter was once a student with an empty work history, and they know exactly what to look for — and what to forgive.",
          "A strong student resume doesn't need years of experience. It needs clarity, relevant detail, and a format that makes it easy to read in under ten seconds.",
        ],
      },
      {
        heading: "Start with a One-Page Format",
        paragraphs: [
          "As a college student, one page is the right length. Hiring managers scan dozens of resumes per role, and a tightly written single page shows you respect their time and can prioritize what matters.",
          "Use clear section headers: Education, Experience (or Activities if you have no jobs), Skills, and Projects. Keep margins between 0.5 and 1 inch and use a readable font at 10–12pt.",
        ],
      },
      {
        heading: "Lead with Education",
        paragraphs: [
          "Unlike professionals who bury their education at the bottom, students should lead with it. Include your school name, degree, expected graduation date, and GPA if it's 3.5 or above.",
          "Add a 'Relevant Coursework' line if you've taken classes that directly relate to the job. This signals preparation even without hands-on experience.",
        ],
      },
      {
        heading: "Turn Activities into Experience",
        paragraphs: [
          "Clubs, sports, volunteer work, and campus organizations all count as experience. Write them the same way you'd write a job: position title, organization name, dates, and 2–3 bullet points describing what you did and what impact it had.",
          "Use action verbs: led, organized, raised, built, managed. Quantify wherever possible — 'organized a 200-person campus event' beats 'helped with event planning'.",
        ],
      },
      {
        heading: "Include a Skills Section",
        paragraphs: [
          "List technical and software skills relevant to the role — programming languages, tools, platforms, or certifications. Keep soft skills off the list; phrases like 'great communicator' take up space without adding proof.",
        ],
      },
      {
        heading: "Common Mistakes to Avoid",
        items: [
          "Using a template so cluttered that the content gets lost",
          "Including a photo (standard US/Canada resumes don't use photos)",
          "Listing references as 'available upon request' — skip this entirely",
          "Using the same resume for every application without tailoring it",
          "Leaving unexplained gaps without any activity to show",
        ],
      },
      {
        heading: "Ready to Build?",
        paragraphs: [
          "ApplyWell is a free resume builder designed specifically for students. It organizes your activities, coursework, and experience into a clean, professional resume you can export in one click — no subscription needed.",
        ],
      },
    ],
  },
  {
    slug: "resume-action-verbs",
    title: "10 Resume Action Verbs That Actually Impress Recruiters",
    description:
      "The words at the start of your bullet points matter more than you think. Here are the action verbs that signal competence and results.",
    date: "March 2026",
    tags: ["resume", "writing", "tips"],
    sections: [
      {
        paragraphs: [
          "Weak resume bullets start with 'Responsible for' or 'Helped with.' Strong resume bullets start with action verbs that show ownership, initiative, and results.",
          "Recruiters skim resumes in under ten seconds. The first word of each bullet determines whether they keep reading or move on. Here are ten action verbs — and how to use them — that consistently stand out.",
        ],
      },
      {
        heading: "1. Spearheaded",
        paragraphs: [
          "Use this when you initiated something from scratch. 'Spearheaded a campus sustainability committee that reduced paper waste by 30%' signals leadership and ownership, not just participation.",
        ],
      },
      {
        heading: "2. Streamlined",
        paragraphs: [
          "Efficiency matters in every role. 'Streamlined club treasury reporting by building an automated Google Sheets tracker, cutting monthly close time from 4 hours to 45 minutes' shows process thinking.",
        ],
      },
      {
        heading: "3. Engineered",
        paragraphs: [
          "Better than 'built' or 'created' for technical work. 'Engineered a Python script to automate data entry for a research lab' sounds precise and intentional.",
        ],
      },
      {
        heading: "4. Cultivated",
        paragraphs: [
          "Great for relationship-building roles. 'Cultivated partnerships with 12 local businesses for a nonprofit fundraiser' shows interpersonal skill and strategic thinking.",
        ],
      },
      {
        heading: "5. Drove",
        paragraphs: [
          "'Drove a 25% increase in club membership through targeted social media outreach' takes credit for an outcome rather than listing a task.",
        ],
      },
      {
        heading: "6. Championed",
        paragraphs: [
          "Use when you advocated for something over time. 'Championed an accessibility review of campus events, resulting in policy changes adopted by student government' shows conviction and follow-through.",
        ],
      },
      {
        heading: "7. Synthesized",
        paragraphs: [
          "Strong for academic and research contexts. 'Synthesized findings from 40 peer-reviewed studies into a 15-page literature review' shows analytical depth.",
        ],
      },
      {
        heading: "8. Executed",
        paragraphs: [
          "When you were the one who made something actually happen. 'Executed a three-day orientation program for 150 incoming students' is direct and results-focused.",
        ],
      },
      {
        heading: "9. Mentored",
        paragraphs: [
          "Mentoring signals maturity. 'Mentored five underclassmen through a peer tutoring program, averaging a one-letter-grade improvement per student' shows impact on others.",
        ],
      },
      {
        heading: "10. Quantified",
        paragraphs: [
          "Not a standalone verb, but a principle: every bullet should end with a number wherever possible. Percentages, dollar amounts, headcounts, time saved — numbers make vague claims concrete.",
        ],
      },
      {
        heading: "Verbs to Avoid",
        items: [
          "Assisted — implies you weren't in charge of anything",
          "Worked on — describes presence, not contribution",
          "Responsible for — passive; replace with what you actually did",
          "Helped — vague; specify your specific role",
          "Participated in — tells recruiters nothing actionable",
        ],
      },
      {
        heading: "Put it Together",
        paragraphs: [
          "ApplyWell includes a built-in verb guide and bullet-point editor to help you write strong, specific bullet points for every activity and experience on your resume.",
        ],
      },
    ],
  },
  {
    slug: "extracurriculars-on-resume",
    title: "How to List Extracurriculars on Your Resume",
    description:
      "Clubs, sports, volunteer work — here's how to write them in a way that actually gets attention from recruiters and admissions officers.",
    date: "March 2026",
    tags: ["resume", "extracurriculars", "college"],
    sections: [
      {
        paragraphs: [
          "Extracurriculars aren't filler — they're proof that you show up, take initiative, and contribute beyond the classroom. But writing them correctly makes all the difference between a resume that reads like a participation list and one that reads like a track record.",
        ],
      },
      {
        heading: "Use the Same Format as Work Experience",
        paragraphs: [
          "Create a section called 'Activities,' 'Leadership,' or 'Extracurriculars' and format each entry the same way you'd format a job: role/title, organization name, dates, and 2–3 bullet points.",
          "If you held a leadership position, lead with that title. 'President, Environmental Club' is stronger than just 'Environmental Club Member.'",
        ],
      },
      {
        heading: "Write Bullets, Not Descriptions",
        paragraphs: [
          "Don't write: 'Was a member of the robotics team and helped with competitions.' Write: 'Programmed autonomous navigation module for a competition robot that placed 2nd at the regional championship.'",
          "Each bullet should answer: What did you do? How did you do it? What was the result?",
        ],
      },
      {
        heading: "Prioritize Depth Over Breadth",
        paragraphs: [
          "Three to five activities with real bullet points and measurable outcomes will always beat ten activities with one-line descriptions. Quality signals commitment; quantity can signal dilettantism.",
          "Choose activities where you had a specific role, grew a skill, or produced a visible result.",
        ],
      },
      {
        heading: "Show Progression",
        paragraphs: [
          "If you started as a member and became an officer, show both: 'Vice President (2025–2026), Member (2024–2025).' Progression over time is one of the strongest signals on a student resume.",
        ],
      },
      {
        heading: "Sports and Athletics",
        paragraphs: [
          "Varsity and competitive sports belong on your resume — especially if you played through college. Emphasize time management, teamwork, and performance under pressure. A D1 athlete managing practice, travel, and a full course load is an impressive hire.",
        ],
      },
      {
        heading: "Volunteer Work",
        paragraphs: [
          "Volunteer roles can carry as much weight as paid jobs. Describe your responsibilities with the same rigor: 'Coordinated weekly food distribution for 80+ families at a local food bank, managing volunteer scheduling and inventory tracking.'",
        ],
      },
      {
        heading: "How ApplyWell Helps",
        paragraphs: [
          "ApplyWell has a dedicated Activities section where you can log each extracurricular, track your hours and descriptions, and export everything into a polished resume format. It's designed specifically for students who want to present their full profile — not just their job history.",
        ],
      },
    ],
  },
  {
    slug: "resume-no-experience",
    title: "Resume Tips for Students With No Work Experience",
    description:
      "You don't need a job to build a strong resume. Here's what to put on it instead — and how to make it compelling.",
    date: "March 2026",
    tags: ["resume", "no experience", "students"],
    sections: [
      {
        paragraphs: [
          "The most common student resume mistake is thinking a resume needs paid work experience to be worth sending. It doesn't. Employers hiring students and new grads know what a first resume looks like. What they're actually evaluating is: Can this person learn quickly? Do they take initiative? Will they show up?",
          "Here's what to put on your resume when you have no work experience.",
        ],
      },
      {
        heading: "Lead with Education (and Make It Detailed)",
        paragraphs: [
          "Your education section can carry more weight than you think. Include: school name, degree and major, expected graduation date, GPA (if 3.5+), and a 'Relevant Coursework' line listing 4–6 classes tied to the role you're applying for.",
          "If you've done well academically, don't bury it. Dean's List, honors programs, and merit scholarships all belong here.",
        ],
      },
      {
        heading: "Projects Are Experience",
        paragraphs: [
          "Class projects, independent projects, and personal builds all count. Create a 'Projects' section and write each one with the same bullet-point format as a job entry.",
          "Example: 'Built a web app using React and Firebase that helps students track assignment deadlines. Deployed to 45 beta users and iterated based on feedback.' That's real experience — it just doesn't have a paycheck attached.",
        ],
      },
      {
        heading: "Campus Involvement Is Experience",
        paragraphs: [
          "Clubs, student government, sports, and organizations are legitimate work. Write them with role titles and bullet points describing your responsibilities and results. Leading a club of 40 people is leadership experience regardless of whether it was paid.",
        ],
      },
      {
        heading: "Babysitting, Yard Work, and Informal Jobs Count",
        paragraphs: [
          "Regular babysitting over several years demonstrates reliability and responsibility. Mowing lawns for neighbors shows entrepreneurial initiative. List these as informal positions with dates and a brief description — they fill in a work history and show character.",
        ],
      },
      {
        heading: "Certifications and Online Courses",
        paragraphs: [
          "Google's free certifications, LinkedIn Learning courses, Coursera, and similar platforms offer credentials that show initiative. A student who completed Google's Data Analytics Certificate without being required to has demonstrated self-motivation — which matters.",
        ],
      },
      {
        heading: "What Not to Do",
        items: [
          "Don't pad the resume with vague generic skills like 'hardworking' or 'team player'",
          "Don't use a functional resume format to hide the lack of experience — it reads as evasive",
          "Don't list high school activities if you're a sophomore or beyond in college",
          "Don't apologize for the resume in your cover letter",
        ],
      },
      {
        heading: "Build It with ApplyWell",
        paragraphs: [
          "ApplyWell is built for students at exactly this stage — helping you organize projects, activities, coursework, and skills into a professional resume even when work experience is thin. Start free and have something polished in under 20 minutes.",
        ],
      },
    ],
  },
  {
    slug: "common-app-activities-guide",
    title: "Common App Activities Section: How to Stand Out",
    description:
      "The Common App gives you 150 characters per activity. Here's how to make every character count and present your extracurriculars compellingly.",
    date: "March 2026",
    tags: ["common app", "activities", "college applications"],
    sections: [
      {
        paragraphs: [
          "The Common App Activities section gives you 10 slots and 150 characters per description. Most students waste this space on vague summaries. The students who stand out use it to tell admissions officers exactly what they did, how much they did it, and what they achieved.",
        ],
      },
      {
        heading: "Order Matters",
        paragraphs: [
          "The Activities section is read top to bottom. Put your most meaningful, sustained, or leadership-heavy activities first. This isn't necessarily your most impressive-sounding activity — it's the one that best represents who you are.",
          "Admissions officers form impressions quickly. Your top three activities carry the most weight.",
        ],
      },
      {
        heading: "Use the Description Field Strategically",
        paragraphs: [
          "You get 150 characters for the description. That's about one tweet. Use specifics, not generalities.",
          "Weak: 'I participate in Model UN and help organize conferences for my school.'",
          "Strong: 'Secretary-General; organized 3-day 400-delegate conference; wrote all committee documentation.'",
          "The second version fits in 100 characters and tells a much richer story.",
        ],
      },
      {
        heading: "Use the Position/Leadership Field",
        paragraphs: [
          "Don't put your role in the description if it fits in the Position/Leadership field. Use that field for your title (President, Founder, Lead Programmer) and reserve the description for what you actually did.",
        ],
      },
      {
        heading: "Include Hours and Weeks",
        paragraphs: [
          "The hours per week and weeks per year fields are part of your activity entry. Be honest but thoughtful. An activity you spent 15 hours per week on for 40 weeks signals deep commitment.",
        ],
      },
      {
        heading: "Activity Types to Include",
        items: [
          "Sports (varsity, club, intramural) with your role and any results",
          "Leadership positions in clubs, student government, or religious organizations",
          "Independent projects, freelance work, or creative pursuits",
          "Volunteer work and community service with specific responsibilities",
          "Employment including informal work like tutoring or babysitting",
          "Research, internships, or academic competitions",
        ],
      },
      {
        heading: "What Admissions Officers Actually Want to See",
        paragraphs: [
          "They want to see consistency over time, growth within an activity, and impact — not just presence. A student who spent four years in one club and rose to lead it is more compelling than a student with ten clubs and no depth.",
        ],
      },
      {
        heading: "Track and Draft Your Activities in ApplyWell",
        paragraphs: [
          "ApplyWell has a dedicated Common App Activities tracker that counts characters in real time, helps you draft and compare description versions, and formats your activity list for easy reference when filling out the actual form. Try it free at applywell.io.",
        ],
      },
    ],
  },
  {
    slug: "best-free-resume-builders-students",
    title: "Best Free Resume Builders for Students in 2026",
    description:
      "A comparison of the top free resume builders for college students — what they're good at, where they fall short, and which one to use.",
    date: "March 2026",
    tags: ["resume builders", "tools", "comparison"],
    sections: [
      {
        paragraphs: [
          "Dozens of resume builders claim to be free — until they aren't. Most have a bait-and-switch: free to build, but you can't download without paying. Here's an honest look at the real options available to students in 2026.",
        ],
      },
      {
        heading: "What Students Actually Need",
        paragraphs: [
          "Before comparing tools, here's what matters for a student resume builder: clean templates, the ability to export to PDF for free, support for Activities and Projects sections (not just Work History), and no mandatory subscription to access your own resume.",
        ],
      },
      {
        heading: "ApplyWell — Best for Students (Free)",
        paragraphs: [
          "ApplyWell is built from the ground up for students. Unlike tools designed for professionals, it has dedicated sections for Activities, Extracurriculars, Common App entries, and Projects. Everything is free — you can build and export your resume without entering a credit card.",
          "It's particularly strong for students with no work experience who need to present their full academic and extracurricular profile in a clean format. If you're a high school or college student, this should be your first stop.",
        ],
      },
      {
        heading: "Google Docs — Best for Simplicity",
        paragraphs: [
          "A classic resume template in Google Docs is still a solid option. It's completely free, exports cleanly to PDF, and is universally accessible. The downside: you're doing all the formatting manually, and the standard templates are generic.",
        ],
      },
      {
        heading: "Canva — Best for Design-Forward Resumes",
        paragraphs: [
          "Canva has some beautiful resume templates and is free for most features. The catch: heavily designed resumes can fail Applicant Tracking System (ATS) scans, which many larger employers use. Stick to clean, text-heavy templates if you use Canva.",
        ],
      },
      {
        heading: "Zety — Watch the Fine Print",
        paragraphs: [
          "Zety is polished and easy to use, but the free tier only lets you view your resume — you have to subscribe to download it. For students on a budget, this is a meaningful limitation.",
        ],
      },
      {
        heading: "Resume.io — Similar Caveat",
        paragraphs: [
          "Resume.io follows the same model as Zety: good UX, paywall on export. Worth knowing before you spend an hour building a resume only to discover you can't download it.",
        ],
      },
      {
        heading: "The Bottom Line",
        paragraphs: [
          "For most students, ApplyWell is the right choice — it's genuinely free, student-specific, and handles the sections that matter most (activities, projects, extracurriculars). If you need a quick one-off resume and already know Google Docs well, that works too.",
          "Avoid tools that paywall the download. Your resume is your work — you shouldn't have to pay to access it.",
        ],
      },
    ],
  },
  {
    slug: "cover-letter-first-internship",
    title: "How to Write a Cover Letter for Your First Internship",
    description:
      "A practical guide to writing a cover letter that actually gets read — even when you have no professional experience to reference.",
    date: "April 2026",
    tags: ["cover letter", "internship", "writing"],
    sections: [
      {
        paragraphs: [
          "Most internship cover letters make the same mistake: they apologize for a lack of experience, repeat the resume, and end with a generic sign-off. A great first-internship cover letter does something different — it shows enthusiasm, specific interest, and clear thinking about the role.",
        ],
      },
      {
        heading: "The Structure That Works",
        paragraphs: [
          "Keep your cover letter to three short paragraphs. Hiring managers at companies that receive hundreds of applications won't read a five-paragraph essay.",
        ],
        numbered: true,
        items: [
          "Paragraph 1: Open with a specific, genuine reason you want this role at this company — not just 'I am excited to apply.'",
          "Paragraph 2: Connect 1–2 things you've done (class project, campus activity, personal project) directly to what the role requires.",
          "Paragraph 3: Express confidence, mention that your resume is attached, and keep the close brief.",
        ],
      },
      {
        heading: "Opening Lines That Work",
        paragraphs: [
          "Weak: 'I am writing to express my interest in the Marketing Internship position.'",
          "Strong: 'Your UX team's recent redesign of the onboarding flow — which cut drop-off by 30% according to your product blog — is exactly the kind of problem I want to work on this summer.'",
          "Specific openers show the reader that you've done your research and that you're genuinely interested in this company, not just any internship.",
        ],
      },
      {
        heading: "Bridging Class to Work",
        paragraphs: [
          "You don't need professional experience to write a compelling second paragraph. A class project where you analyzed a real dataset, a club where you managed a budget, or a personal app you built all demonstrate relevant ability.",
          "The key is the bridge: don't just describe what you did — explain how it prepared you for the internship. 'In my statistics course I analyzed a 10,000-row dataset in Python to identify pricing inefficiencies, which maps directly to the data work described in your job posting.'",
        ],
      },
      {
        heading: "Common Mistakes",
        items: [
          "Starting with 'My name is...' — the hiring manager can see your name",
          "Copying and pasting the same letter to every company without changing the company name",
          "Writing more than one page — three short paragraphs is enough",
          "Saying 'I am a hardworking team player' — show it, don't claim it",
          "Ending with 'I hope to hear from you' — try 'I'd welcome the chance to discuss...' instead",
        ],
      },
      {
        heading: "One More Thing",
        paragraphs: [
          "A cover letter matters more for smaller companies, startups, and roles where culture fit is explicit. For large corporations using ATS systems, the cover letter is often skimmed or skipped — in those cases, a strong resume matters more.",
          "Write one good, specific letter per application rather than ten generic ones. It's more work, but the response rate is measurably better.",
        ],
      },
      {
        heading: "Build Your Resume First",
        paragraphs: [
          "Before writing the cover letter, make sure your resume is solid. ApplyWell helps students build a clean, professional resume for free — giving you the foundation to point back to in your letter.",
        ],
      },
    ],
  },
  {
    slug: "linkedin-tips-college-students",
    title: "LinkedIn Profile Tips for College Students",
    description:
      "How to set up a LinkedIn profile that gets noticed by recruiters before you even have a full-time job.",
    date: "April 2026",
    tags: ["linkedin", "networking", "career"],
    sections: [
      {
        paragraphs: [
          "LinkedIn is no longer optional for students entering the job market. Recruiters actively search for candidates on the platform, and a well-built student profile can lead to internship opportunities, informational interviews, and referrals before you graduate.",
          "Here's what actually moves the needle on a student LinkedIn profile.",
        ],
      },
      {
        heading: "Headshot and Headline",
        paragraphs: [
          "Your photo should be a clear, well-lit headshot with a neutral background — not a cropped party photo. You don't need a professional shoot; a phone camera in good lighting works fine.",
          "Your headline defaults to your current school and major, but you can customize it. 'Computer Science Student at UC Berkeley | Seeking Summer 2026 SWE Internship' is more useful than just 'Student at UC Berkeley.'",
        ],
      },
      {
        heading: "The About Section",
        paragraphs: [
          "Write two to three sentences in first person. What are you studying, what are you interested in, and what are you looking for? Keep it conversational, not corporate.",
          "Example: 'Junior studying environmental engineering at Purdue. I'm interested in sustainable infrastructure and water systems. Currently looking for summer internships in environmental consulting or municipal engineering.'",
        ],
      },
      {
        heading: "Add Your Education with Detail",
        paragraphs: [
          "Include your school, degree, major, graduation date, and GPA if strong. Use the 'Activities and Societies' field to list clubs, teams, and organizations — this makes your profile more searchable.",
        ],
      },
      {
        heading: "List Experience, Including Non-Traditional",
        paragraphs: [
          "Every club leadership role, volunteer position, research assistant role, and campus job belongs in your Experience section. Format each with a short description and 2–3 accomplishments — the same way you'd write resume bullets.",
        ],
      },
      {
        heading: "Skills and Endorsements",
        paragraphs: [
          "Add 5–10 relevant technical and professional skills. Ask classmates or professors who can genuinely vouch for you to endorse specific skills — even a handful of endorsements signals credibility.",
        ],
      },
      {
        heading: "Connect Strategically",
        paragraphs: [
          "Connect with professors, TAs, classmates, and anyone you meet at career fairs or networking events. A 500+ connection count looks more credible, but quality matters more: alumni at your target companies are the most valuable connections.",
          "When connecting with someone you don't know well, include a short note: 'Hi [name], I'm a junior studying X at Y and came across your work on Z. I'd love to connect and potentially ask about your path into [field].' Short, specific, and respectful.",
        ],
      },
      {
        heading: "Post Occasionally",
        paragraphs: [
          "You don't need to post constantly, but occasional updates — sharing a project you completed, commenting thoughtfully on an industry article, or announcing an internship — keep you visible to your network and signal engagement.",
        ],
      },
      {
        heading: "Your Resume and LinkedIn Should Match",
        paragraphs: [
          "Make sure the dates, titles, and accomplishments on your LinkedIn match your resume. Recruiters often check both, and inconsistencies raise questions. ApplyWell helps you keep your resume organized and up to date so syncing the two is easy.",
        ],
      },
    ],
  },
];
