export interface JobType {
  slug: string;
  name: string;
  intro: string;
  tips: string[];
  emphases: string[];
  mistakes: string[];
}

export const JOB_TYPES: JobType[] = [
  {
    slug: "internship",
    name: "Internship",
    intro:
      "A strong internship resume shows recruiters that you're ready to contribute from day one — even with limited professional experience. Internship applications are extremely competitive, so clarity, tailoring, and a clean format give you a real edge.",
    tips: [
      "Tailor your resume to each internship by mirroring keywords from the job posting",
      "Put your most relevant projects and coursework near the top",
      "Quantify anything you can — even academic work (class size, survey respondents, lines of code)",
      "Keep it to one page, focused entirely on the most relevant experience",
      "Include a skills section with specific tools, languages, or platforms relevant to the role",
    ],
    emphases: [
      "Relevant coursework that maps directly to the internship's responsibilities",
      "Academic or personal projects that demonstrate the core skills needed",
      "Any prior internship or work experience, even in unrelated fields",
      "Campus leadership or activities that show initiative and reliability",
      "Technical or software skills required in the job posting",
    ],
    mistakes: [
      "Submitting a generic resume without tailoring it to the specific company",
      "Listing responsibilities instead of accomplishments with outcomes",
      "Including high school activities if you're beyond your sophomore year of college",
      "Burying your skills section at the bottom of the page",
      "Using a cluttered template that makes the resume hard to scan",
    ],
  },
  {
    slug: "part-time-job",
    name: "Part-Time Job",
    intro:
      "Part-time job resumes should be concise and practical. Employers hiring for part-time roles care about reliability, availability, and relevant experience — not a comprehensive career history. Show you'll show up, work well, and learn quickly.",
    tips: [
      "Lead with your most recent experience and keep the format simple and clean",
      "Highlight your availability clearly — include it in a cover letter if you can't put it on the resume",
      "Match the tone of the resume to the job — a casual cafe doesn't need the same format as a financial firm",
      "Include references from teachers, coaches, or prior employers if you have them ready",
      "Keep it to one page — most part-time hiring managers spend 30 seconds or less reviewing a resume",
    ],
    emphases: [
      "Reliability and consistency — show you've stuck with prior commitments",
      "Customer service, teamwork, or communication experience from any context",
      "Cash handling, scheduling, or operational skills if relevant",
      "Positive attitude and flexibility as supported by examples",
      "Availability and scheduling flexibility if it's relevant to the role",
    ],
    mistakes: [
      "Over-explaining every job with lengthy bullet points when a brief description suffices",
      "Using an overly formal template for a casual service role",
      "Forgetting to include your phone number and email clearly at the top",
      "Leaving off relevant informal experience like babysitting or lawn care",
      "Not following up with a thank-you note after an interview",
    ],
  },
  {
    slug: "first-job",
    name: "First Job",
    intro:
      "Your first real job resume has one job: convince an employer that you're worth a chance. You won't have a polished work history — but you have coursework, projects, activities, and a track record of showing up and learning. Present those things well.",
    tips: [
      "Lead with education and put your GPA if it's 3.5 or above",
      "Create a Projects section and treat class projects like work experience",
      "Turn every extracurricular into a formatted experience entry with bullet points",
      "Write a brief, specific summary at the top that says who you are and what you're looking for",
      "Add a Skills section listing any technical tools, software, or languages you know",
    ],
    emphases: [
      "Academic achievement and relevant coursework",
      "Independent or class projects where you had ownership of an outcome",
      "Campus activities where you held a position or produced a result",
      "Any informal employment, even babysitting, freelance work, or lawn care",
      "Soft skills demonstrated through examples, not just claimed in a list",
    ],
    mistakes: [
      "Apologizing for lack of experience in the cover letter or resume",
      "Listing 'references available upon request' — it wastes space",
      "Using a functional resume to hide the lack of work history (it reads as suspicious)",
      "Padding the resume with generic skills like 'good communicator'",
      "Sending the same resume to every employer without customizing it",
    ],
  },
  {
    slug: "summer-job",
    name: "Summer Job",
    intro:
      "Summer job applications are often fast-moving. Employers want to know you'll show up, work hard, and fit the team. A clean, simple one-page resume that focuses on availability, relevant past experience, and a positive track record is all you need.",
    tips: [
      "Apply early — summer roles fill up in the spring, often before April",
      "Keep the resume to one page with simple formatting",
      "State your availability clearly, including start and end dates",
      "Mention any relevant experience from previous summers or school year jobs",
      "Get a reference letter from a teacher or coach ready before applying",
    ],
    emphases: [
      "Past summer or part-time work experience in any field",
      "Physical stamina and outdoor tolerance if applying for outdoor or labor roles",
      "Customer service experience for hospitality and retail roles",
      "Teamwork and communication for camp, sports, or group-oriented positions",
      "Any certifications relevant to the role (lifeguard, food handler, first aid)",
    ],
    mistakes: [
      "Waiting until May or June to apply — most positions are filled much earlier",
      "Forgetting to include your return-to-school date (employers plan around it)",
      "Over-complicating the format for a simple seasonal role",
      "Not listing physical or outdoor capabilities if the job requires them",
      "Ignoring referrals — asking someone who works there is often the most effective approach",
    ],
  },
  {
    slug: "research-position",
    name: "Research Position",
    intro:
      "Faculty and research coordinators hiring undergraduates for research positions look for intellectual curiosity, methodological awareness, attention to detail, and a genuine interest in the subject matter. A focused, academic-tone resume is appropriate here.",
    tips: [
      "Write a brief email expressing interest before formally applying — many research positions aren't posted",
      "Highlight specific methodological skills that match the lab's work",
      "Show you've read the professor's recent work by referencing it specifically",
      "Include any prior research experience, even from coursework",
      "Lead with academic achievement — GPA, honors, and relevant coursework matter more here than for industry jobs",
    ],
    emphases: [
      "Relevant coursework with strong grades, especially methods courses",
      "Any prior lab, fieldwork, or analytical experience",
      "Specific technical skills (software, equipment, analysis methods) relevant to the research area",
      "Academic writing and ability to handle dense literature",
      "Reliability and ability to follow precise procedures",
    ],
    mistakes: [
      "Sending a generic cover letter without addressing the specific research focus of the lab",
      "Overstating your expertise in methods you've only been exposed to in class",
      "Forgetting to mention your availability and credit-versus-pay preference",
      "Not following up after submitting — professors are busy and a brief follow-up is appropriate",
      "Including unrelated work experience at the top of the resume instead of leading with academics",
    ],
  },
  {
    slug: "campus-job",
    name: "Campus Job",
    intro:
      "Campus employers — dining halls, libraries, recreation centers, IT help desks, and administrative offices — want reliable, punctual students who can fit the role around their class schedule. Campus jobs are also excellent resume entries for post-graduation applications.",
    tips: [
      "Apply through your school's student employment portal early in the semester",
      "Reference your academic schedule to show flexibility around it",
      "Mention financial aid or work-study eligibility in your application if applicable",
      "Frame the job as a long-term commitment — supervisors prefer students who'll stay for the year",
      "Ask your campus career center or financial aid office about work-study opportunities",
    ],
    emphases: [
      "Dependability and schedule reliability",
      "Familiarity with the campus community and how the office or department works",
      "Customer service, administrative, or technical skills depending on the role",
      "Academic standing (many campus jobs require maintaining a minimum GPA)",
      "Long-term availability — showing you can commit for a full semester or year",
    ],
    mistakes: [
      "Treating the application as less serious because it's on campus",
      "Missing the application window — popular campus jobs fill at the start of the semester",
      "Not asking professors or RAs for a reference early",
      "Failing to mention work-study eligibility when it's relevant",
      "Applying for roles that conflict heavily with your course schedule",
    ],
  },
  {
    slug: "remote-internship",
    name: "Remote Internship",
    intro:
      "Remote internships require a different skill emphasis than in-person roles. Employers need to know you can manage yourself, communicate asynchronously, and produce results without daily in-person supervision. Show evidence of those capabilities explicitly.",
    tips: [
      "Highlight any prior remote work or independent project experience",
      "Show familiarity with remote collaboration tools (Slack, Notion, Zoom, Asana, Figma)",
      "Demonstrate self-direction through academic or personal projects you completed independently",
      "Emphasize written communication skills — much more of remote work is text-based",
      "Show timezone flexibility if applying to companies in other regions",
    ],
    emphases: [
      "Independent projects completed outside of class requirements",
      "Digital tool proficiency (project management, communication, design, or coding tools)",
      "Prior async or distributed work experience, even informal",
      "Strong written communication — proposals, reports, documentation",
      "Time management and ability to hit deadlines without direct supervision",
    ],
    mistakes: [
      "Assuming remote internships are less rigorous — they often have higher accountability",
      "Not mentioning tool proficiency that the team's job posting lists",
      "Failing to show evidence of independent initiative in your resume",
      "Underestimating time zone differences when scheduling interviews or stating availability",
      "Not preparing your home setup (camera, microphone, stable internet) before interviews begin",
    ],
  },
  {
    slug: "startup-internship",
    name: "Startup Internship",
    intro:
      "Startup internships are high-ownership, fast-paced, and ambiguous by nature. Founders and early-stage hiring managers look for generalists who take initiative, tolerate uncertainty, and move fast. Your resume should signal scrappiness and results, not polish and prestige.",
    tips: [
      "Emphasize side projects, self-taught skills, and anything you built independently",
      "Show a bias toward action — startups want people who do things without being asked",
      "Research the company thoroughly before applying and reference their product in your cover letter",
      "Offer to do a short take-home task — startups often respond better to 'try before you hire' signals",
      "Be direct about what you want to learn and what you can contribute from day one",
    ],
    emphases: [
      "Projects you initiated or completed without being assigned to them",
      "Breadth of skills — startups need people who can stretch across functions",
      "Comfort with ambiguity and changing priorities",
      "Speed of learning and evidence of picking up new skills quickly",
      "Any entrepreneurial experience — a business you ran, a product you shipped, a service you sold",
    ],
    mistakes: [
      "Using a formal, stiff resume format — startups respond better to clean and direct",
      "Applying to startup internships without researching what the startup actually does",
      "Listing only school-assigned work without independent projects",
      "Overemphasizing process and underemphasizing outcomes",
      "Not showing genuine excitement for the company's mission in your cover letter",
    ],
  },
  {
    slug: "government-internship",
    name: "Government Internship",
    intro:
      "Government and public sector internships — at federal agencies, state offices, city halls, and legislative offices — favor resumes that demonstrate civic engagement, policy knowledge, writing ability, and professionalism. The application process is often more formal and may require specific document formats.",
    tips: [
      "Follow application instructions precisely — government applications often have strict formatting requirements",
      "Highlight policy coursework, research experience, and public service activities prominently",
      "Emphasize writing skills — memos, reports, and policy briefs are common intern tasks",
      "Get letters of recommendation early — government applications often require them",
      "Apply well in advance — government hiring cycles run months ahead of start dates",
    ],
    emphases: [
      "Public service and civic engagement through volunteering or advocacy",
      "Policy research and analytical writing from coursework",
      "Knowledge of government processes, legislative procedures, or regulatory frameworks",
      "Attention to detail and ability to follow procedures precisely",
      "Communication skills for constituents, officials, or the public",
    ],
    mistakes: [
      "Missing the application deadline — government hiring has strict cutoffs",
      "Using a casual or creative resume format inappropriate for a government office",
      "Not including a formal cover letter when one is required",
      "Failing to highlight security clearance eligibility if relevant",
      "Underestimating the formality of the interview process",
    ],
  },
  {
    slug: "nonprofit-internship",
    name: "Nonprofit Internship",
    intro:
      "Nonprofits hiring student interns look for mission alignment, community experience, and evidence that you understand what the organization actually does. A cover letter that demonstrates genuine passion for the cause — backed by specific examples — is often more important than your GPA.",
    tips: [
      "Research the organization's mission, programs, and recent impact reports before applying",
      "Lead your cover letter with why this mission resonates with you personally",
      "Show volunteer or service experience prominently — it signals mission fit",
      "Demonstrate program or event coordination skills if the role involves operations",
      "Be upfront about stipend expectations — many nonprofit internships are unpaid or low-stipend",
    ],
    emphases: [
      "Volunteer work and community service with specific responsibilities and outcomes",
      "Alignment with the nonprofit's mission and population served",
      "Event planning, communications, fundraising, or outreach skills",
      "Comfort working in resource-constrained environments",
      "Cross-cultural competency or multilingual ability if working with diverse communities",
    ],
    mistakes: [
      "Applying without demonstrating genuine interest in the cause",
      "Treating a nonprofit internship as less serious than a corporate one",
      "Failing to include volunteer experience that directly relates to the mission",
      "Not following up — nonprofits often have slow hiring processes and a follow-up note helps",
      "Assuming the experience will be low-responsibility — many nonprofits give interns significant ownership",
    ],
  },
  {
    slug: "freelance",
    name: "Freelance Work",
    intro:
      "Freelance experience on a student resume signals entrepreneurial initiative, real-world professional skills, and the ability to manage client relationships. Even small freelance projects can strengthen a resume significantly when described with specifics.",
    tips: [
      "List freelance work as a formal experience entry with title, client description, and dates",
      "Describe the scope and outcomes of each project with specific numbers",
      "Group small projects under a single freelance entry (e.g., 'Freelance Designer, Various Clients')",
      "Show how you managed client communication, deadlines, and revisions",
      "Link to a portfolio if your freelance work is visual or creative",
    ],
    emphases: [
      "Client deliverables and outcomes (websites built, content produced, revenue generated)",
      "Client management and professional communication",
      "Time management across multiple projects without a supervisor",
      "Business skills: invoicing, scoping, pricing, contracts",
      "Breadth of skills developed across different client needs",
    ],
    mistakes: [
      "Not listing freelance work at all because it 'feels informal'",
      "Describing freelance projects vaguely without client context or outcomes",
      "Forgetting to include links to work that can be shared publicly",
      "Listing every small project individually instead of grouping them",
      "Downplaying the self-direction and client management involved",
    ],
  },
  {
    slug: "tutoring",
    name: "Tutoring",
    intro:
      "Tutoring is an underrated resume entry that signals subject mastery, communication ability, and patience. Whether it's formal peer tutoring at school or independent private tutoring, it demonstrates real responsibility and measurable impact on students you've helped.",
    tips: [
      "Quantify your tutoring: number of students, duration, and grade improvement where known",
      "Specify the subjects you taught and the age range or level of students",
      "Note any formal tutoring program affiliation (Varsity Tutors, campus tutoring center, etc.)",
      "Describe your teaching approach briefly — it shows communication strategy",
      "Get a testimonial or reference from a parent or student if applying for teaching roles",
    ],
    emphases: [
      "Subject expertise and depth of knowledge in the areas you teach",
      "Ability to explain complex concepts in clear, accessible terms",
      "Student progress and outcomes when measurable",
      "Reliability and scheduling management with multiple students",
      "Patience and adaptability across different learning styles",
    ],
    mistakes: [
      "Leaving tutoring off the resume entirely because it seems minor",
      "Describing tutoring as just 'helped students' without specifying how or with what outcomes",
      "Not listing the subjects you tutored — specificity matters to hiring managers",
      "Forgetting to mention any formal program or organizational affiliation",
      "Missing the leadership and communication angle when applying for education-adjacent roles",
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    intro:
      "Retail jobs develop real, transferable skills — customer service, cash handling, inventory management, high-volume communication, and performing under pressure. On a student resume, retail experience shows reliability, work ethic, and people skills that many employers value across industries.",
    tips: [
      "Translate retail skills into professional language appropriate to your target role",
      "Quantify where possible: daily customer volume, sales targets met, inventory items managed",
      "Highlight any supervisory or training responsibilities you had",
      "Show reliability by noting tenure — a year in a retail role signals commitment",
      "Link retail skills (problem-solving, communication, pressure management) to transferable professional skills",
    ],
    emphases: [
      "Customer service quality and satisfaction metrics if tracked",
      "Sales performance or goal attainment if applicable",
      "Cash handling and transaction accuracy",
      "Team coordination and shift management",
      "Product knowledge and ability to communicate value to customers",
    ],
    mistakes: [
      "Writing 'worked the register' without describing the scope or volume",
      "Treating retail experience as less valuable than other work",
      "Listing duties without showing outcomes or initiative",
      "Not mentioning promotions, raises, or recognition you received",
      "Failing to connect retail experience to transferable skills for office or professional roles",
    ],
  },
  {
    slug: "restaurant",
    name: "Restaurant",
    intro:
      "Restaurant and food service experience demonstrates high-pressure performance, teamwork, multitasking, and customer service — skills that translate across many industries. Whether you've served, hosted, bussed, or cooked, frame the experience in terms of the skills and results it produced.",
    tips: [
      "Describe the type of establishment and volume — a high-volume dinner service shows more than a slow café",
      "Quantify: tables per shift, covers per night, average check size",
      "Highlight any certifications: ServSafe, TIPS, food handler's card",
      "Show teamwork — restaurant jobs are inherently collaborative under pressure",
      "Note any advancement: from busser to server, or from prep cook to line cook",
    ],
    emphases: [
      "High-volume customer service and conflict resolution",
      "Speed, accuracy, and performance under pressure",
      "Team communication and coordination during rushes",
      "Upselling and customer recommendation skills for server roles",
      "Food safety and sanitation compliance",
    ],
    mistakes: [
      "Describing the role too informally (e.g., 'waited on tables') — use professional titles",
      "Not mentioning the pace or scale of the environment",
      "Leaving off certifications that demonstrate food safety knowledge",
      "Treating restaurant experience as irrelevant for non-food-service applications",
      "Not noting how the experience built transferable professional skills",
    ],
  },
  {
    slug: "volunteer-position",
    name: "Volunteer Position",
    intro:
      "Volunteer experience can carry as much weight as paid work — sometimes more — when it demonstrates sustained commitment, specific responsibilities, and real impact. The key is writing it with the same rigor you'd bring to a job entry: role, organization, dates, and outcome-focused bullet points.",
    tips: [
      "Give yourself a title that reflects what you actually did — 'Volunteer Coordinator' or 'Program Assistant' is more descriptive than just 'Volunteer'",
      "Write 2–3 bullet points for each volunteer role, focused on actions and outcomes",
      "Include the number of people served, hours contributed, or programs supported",
      "Show consistency — volunteering for two years with one organization shows more commitment than one day at ten",
      "Connect the skills developed in volunteering to the job you're applying for",
    ],
    emphases: [
      "Specific responsibilities and tasks, not just presence",
      "Scale of the program (clients served, events supported, funds raised)",
      "Skills developed: leadership, administration, coordination, communication",
      "Mission alignment with the organization if applying for related roles",
      "Duration and consistency of commitment",
    ],
    mistakes: [
      "Listing volunteer work without any bullet points or detail",
      "Using vague language like 'helped out' instead of describing your role",
      "Understating the scope — if you led a team of 10 volunteers, say so",
      "Only including one-day events instead of sustained involvement",
      "Not including volunteer work at all because it was unpaid",
    ],
  },
];
