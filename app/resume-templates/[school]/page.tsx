import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { schools, getSchool } from "@/data/schools";

/* ── Static params ───────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return schools.map((s) => ({ school: s.slug }));
}

/* ── Metadata ────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ school: string }>;
}): Promise<Metadata> {
  const { school: slug } = await params;
  const school = getSchool(slug);
  if (!school) return {};
  return {
    title: `Resume Template for ${school.name} Students | ApplyWell`,
    description: `Free resume template for ${school.name} students. Tips on what ${school.city} recruiters look for, key skills, and how to stand out as a ${school.name} grad.`,
    alternates: {
      canonical: `https://applywell.io/resume-templates/${school.slug}`,
    },
    openGraph: {
      title: `Resume Template for ${school.name} Students | ApplyWell`,
      description: `Build a resume that highlights what makes a ${school.name} grad stand out — focused on ${school.known_for[0]}, ${school.known_for[1]}, and more.`,
      url: `https://applywell.io/resume-templates/${school.slug}`,
      type: "article",
    },
  };
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function schoolArticle(name: string): string {
  const vowelSlugs = ["emory", "indiana", "ohio-state", "asu", "uiuc", "uva", "umd", "umn", "uf", "ucf", "usc", "ucla", "uc-berkeley", "uw-madison", "uw-seattle", "upenn"];
  return vowelSlugs.includes(name) ? "an" : "a";
}

function CTAButton({ schoolName }: { schoolName: string }) {
  return (
    <Link
      href="/"
      className="flex items-center justify-center w-full min-h-[52px] bg-emerald-400 hover:bg-emerald-300 hover:-translate-y-0.5 text-zinc-900 font-bold text-sm rounded-2xl transition-all px-6"
      style={{ boxShadow: "0 4px 16px rgb(52 211 153 / 0.35)" }}
    >
      Build your {schoolName} resume in minutes — free for students
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default async function SchoolResumeTemplatePage({
  params,
}: {
  params: Promise<{ school: string }>;
}) {
  const { school: slug } = await params;
  const school = getSchool(slug);
  if (!school) notFound();

  const [strength1, strength2, strength3] = school.known_for;
  const article = schoolArticle(slug);

  const resumeTips = getSchoolTips(school.slug, school.name, strength1, strength2, strength3);
  const keySkills = getKeySkills(school.slug, school.known_for);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Write a Resume as ${article} ${school.name} Student`,
    description: `Step-by-step tips for ${school.name} students to build a resume that stands out to recruiters in ${strength1} and ${strength2}.`,
    step: resumeTips.map((tip, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: tip.title,
      text: tip.body,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-8 pb-16 max-w-xl">

        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Back to ApplyWell
          </Link>
        </div>

        {/* Hero */}
        <section aria-labelledby="page-title" className="mb-10">
          <div className="mb-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Resume Template · {school.city}, {school.state}
            </span>
          </div>
          <h1
            id="page-title"
            className="font-serif text-3xl tracking-tight text-zinc-100 mb-3 leading-tight"
          >
            Resume Template for {school.name} Students
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed mb-8">
            {school.name} is known for{" "}
            <span className="text-zinc-300">{strength1}</span>,{" "}
            <span className="text-zinc-300">{strength2}</span>, and{" "}
            <span className="text-zinc-300">{strength3}</span>. Recruiters
            targeting {school.name} grads know what to expect — and your resume
            should reinforce exactly those strengths.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-card mb-8">
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              <strong className="text-zinc-100">What this page covers:</strong>{" "}
              What recruiters look for from {school.name} grads, how to
              structure your resume, which skills to highlight, and a free
              template you can build in minutes.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {school.type === "private"
                ? `${school.name} graduates are expected to bring both academic rigor and real-world impact to every application. Recruiters screening ${school.name} resumes look for evidence of initiative, depth of knowledge, and the ability to translate coursework into outcomes.`
                : `As one of the top public universities in the country, ${school.name} produces graduates who combine strong technical or analytical foundations with practical experience. Recruiters know the caliber of the program — your job is to show them you made the most of it.`}
            </p>
          </div>
        </section>

        {/* What recruiters look for */}
        <section className="mb-10" aria-labelledby="recruiters-section">
          <h2
            id="recruiters-section"
            className="font-serif text-xl text-zinc-100 leading-snug tracking-tight mb-4"
          >
            What Recruiters Look for in {school.name} Grads
          </h2>
          <ul className="flex flex-col gap-3">
            <li className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-zinc-200 mb-1">
                Depth in {strength1}
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Recruiters at firms that target {school.name} specifically
                expect fluency in {strength1}. List relevant coursework,
                projects, and tools — not just the fact that you studied it.
              </p>
            </li>
            <li className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-zinc-200 mb-1">
                Measurable contributions
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Every bullet on your resume should answer "so what?" Replace
                "assisted with research" with "analyzed 3,000-row dataset and
                identified two cost-saving trends." Numbers close the gap
                between a description and a result.
              </p>
            </li>
            <li className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-zinc-200 mb-1">
                Leadership and initiative outside class
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Clubs, research labs, internships, and student orgs all
                demonstrate initiative. {school.name} students are expected to
                be active participants — show that you were, and what changed
                because of it.
              </p>
            </li>
            <li className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-zinc-200 mb-1">
                Cross-disciplinary thinking
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {school.name}&apos;s strengths in {strength2} and {strength3}{" "}
                attract employers who value candidates who can bridge
                disciplines. Frame your experiences to show range, not just
                depth.
              </p>
            </li>
          </ul>
        </section>

        {/* School-specific tips */}
        <section className="mb-10" aria-labelledby="standout-section">
          <h2
            id="standout-section"
            className="font-serif text-xl text-zinc-100 leading-snug tracking-tight mb-4"
          >
            What Makes {article.charAt(0).toUpperCase() + article.slice(1)}{" "}
            {school.name} Resume Stand Out
          </h2>
          <div className="flex flex-col gap-4">
            {resumeTips.map((tip) => (
              <div
                key={tip.title}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4"
              >
                <p className="text-sm font-semibold text-emerald-400 mb-1">
                  {tip.title}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {tip.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key skills */}
        <section className="mb-10" aria-labelledby="skills-section">
          <h2
            id="skills-section"
            className="font-serif text-xl text-zinc-100 leading-snug tracking-tight mb-4"
          >
            Key Skills to Include on Your {school.name} Resume
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            These skills appear frequently in job postings that target{" "}
            {school.name} graduates — especially in {strength1} and{" "}
            {strength2}. Only list skills you can speak to in an interview.
          </p>
          <div className="flex flex-wrap gap-2">
            {keySkills.map((skill) => (
              <span
                key={skill}
                className="text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Resume structure */}
        <section className="mb-10" aria-labelledby="structure-section">
          <h2
            id="structure-section"
            className="font-serif text-xl text-zinc-100 leading-snug tracking-tight mb-4"
          >
            Recommended Resume Structure for {school.name} Students
          </h2>
          <div className="flex flex-col gap-3">
            {[
              {
                order: "1",
                label: "Header",
                detail: `Name, email, phone, LinkedIn, and a portfolio or GitHub link if relevant to your target role. Include your ${school.name} graduation year and GPA if it's above 3.5.`,
              },
              {
                order: "2",
                label: "Education",
                detail: `${school.name}, degree, major, graduation date. List relevant coursework in ${strength1} and ${strength2} if you have fewer than two internships.`,
              },
              {
                order: "3",
                label: "Experience",
                detail:
                  "Internships, research positions, part-time jobs. Use 2–4 bullet points per role. Lead each bullet with a strong action verb and end with a result or metric.",
              },
              {
                order: "4",
                label: "Projects",
                detail:
                  "Especially valuable for students with limited work experience. Include the tech stack or methods used, your specific contribution, and the outcome.",
              },
              {
                order: "5",
                label: "Activities & Leadership",
                detail: `Clubs, student government, research labs, case competitions. ${school.name} applicants who are active on campus stand out — list what you led or built, not just that you attended.`,
              },
              {
                order: "6",
                label: "Skills",
                detail: `Technical tools, programming languages, certifications, and languages spoken. Tailor this section to match the skills common in ${strength1} roles.`,
              },
            ].map((item) => (
              <div
                key={item.order}
                className="flex gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4"
              >
                <span className="text-sm font-bold text-emerald-400 shrink-0 w-5">
                  {item.order}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-200 mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10" aria-labelledby="cta-section">
          <div className="bg-zinc-900 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
              Free for Students
            </p>
            <h2
              id="cta-section"
              className="font-serif text-xl text-zinc-100 mb-3 tracking-tight"
            >
              Build your {school.name} resume in minutes
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              ApplyWell is a resume builder made for students — no subscription,
              no bloat. Add your experiences, export as PDF or Word, and apply
              with confidence.
            </p>
            <CTAButton schoolName={school.name} />
          </div>
        </section>

        {/* Related links */}
        <section aria-labelledby="related-section">
          <h2
            id="related-section"
            className="text-sm font-semibold text-zinc-100 mb-3"
          >
            Related Guides
          </h2>
          <div className="flex flex-col gap-3">
            {[
              {
                href: "/guides/college-application-resume-example",
                badge: "Guide",
                title: "College Application Resume Example",
              },
              {
                href: "/guides/how-to-describe-leadership-experience",
                badge: "Guide",
                title: "How to Describe Leadership Experience",
              },
              {
                href: "/guides/student-resume-verbs",
                badge: "Guide",
                title: "Strong Action Verbs for Student Resumes",
              },
            ].map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="bg-zinc-900 border border-emerald-500/25 rounded-2xl p-4 shadow-card hover:border-emerald-500/50 transition-colors group block"
              >
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 block">
                  {g.badge}
                </span>
                <p className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 leading-snug">
                  {g.title} →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}

/* ── School-specific tips ────────────────────────────────────────────────── */
function getSchoolTips(
  slug: string,
  name: string,
  s1: string,
  s2: string,
  s3: string
): { title: string; body: string }[] {
  const tipsBySlug: Record<string, { title: string; body: string }[]> = {
    harvard: [
      { title: "Lead with impact, not prestige", body: "Recruiters already know Harvard's reputation. What they want to see is what you personally built, changed, or contributed. Replace title-heavy bullets with outcome-heavy ones." },
      { title: "Quantify your policy and research work", body: "Harvard applicants often have research or policy experience. Show the scale: number of subjects analyzed, budget managed, pages authored, or stakeholders reached." },
      { title: "Highlight cross-sector thinking", body: "Harvard's strengths in business, law, and medicine create graduates who can bridge sectors. Frame experience that shows you can think across disciplines." },
    ],
    stanford: [
      { title: "Show the product, not just the process", body: "Stanford's startup culture means recruiters expect to see what you shipped — an app, a prototype, a product feature. Link to your portfolio or GitHub whenever possible." },
      { title: "Use startup and research language intentionally", body: "Words like 'launched,' 'built,' 'scaled,' and 'shipped' signal the action-orientation Stanford is known for. Avoid passive constructions." },
      { title: "Demonstrate technical depth + user empathy", body: "Stanford's HCI and CS programs produce engineers who also think about users. Show both: what you built and who it was for." },
    ],
    mit: [
      { title: "Lead with technical specificity", body: "Vague technical claims don't work for MIT grads. Name the languages, frameworks, and methods you used. 'Python (pandas, scikit-learn)' is better than 'data analysis.'" },
      { title: "Show research productivity", body: "Papers published, conferences attended, lab contributions, and research outcomes are all fair game. MIT recruiters expect substantive intellectual output." },
      { title: "Don't bury the engineering detail", body: "MIT resumes should be dense with specifics: system architectures, dataset sizes, algorithm choices, and engineering tradeoffs. That's what separates MIT candidates." },
    ],
    yale: [
      { title: "Frame public service as professional experience", body: "Yale's culture of service means many students have meaningful volunteer and policy work. Treat it with the same rigor as a paid role — title, scope, outcome." },
      { title: "Highlight writing and communication", body: "Yale's humanities strength signals strong written communication. If you've written policy briefs, op-eds, or research papers, note their scope and audience." },
      { title: "Show global perspective", body: "Yale's international programs attract globally-minded employers. Highlight language skills, study abroad, international research, or global organizations." },
    ],
    princeton: [
      { title: "Lead with your senior thesis", body: "Princeton's thesis requirement is a known differentiator. Name it, describe the methodology, and note the outcome — especially for research, policy, or academic roles." },
      { title: "Quantify your economics and policy work", body: "Princeton's economics and public affairs programs attract finance, consulting, and policy employers. Show the numbers: models built, data analyzed, policy impact." },
      { title: "Signal intellectual independence", body: "Princeton grads are expected to think independently. Describe work where you set the direction, not just executed on instructions." },
    ],
    columbia: [
      { title: "Lean into your New York advantage", body: "Columbia's location means many students have finance, media, or policy internships in the city. Lead with the most prestigious or outcome-rich of these." },
      { title: "Highlight journalism and media work", body: "Columbia's Journalism School is world-class. If you've published, reported, produced, or edited — name the outlets, topics covered, and audience reach." },
      { title: "Show international and multicultural experience", body: "Columbia's international affairs and global city culture attract employers looking for multilingual, globally-aware candidates. List languages and international roles explicitly." },
    ],
    upenn: [
      { title: "Lead with Wharton-style metrics", body: "Whether or not you're a Wharton student, Penn recruiters expect financial and quantitative precision. Include deal sizes, budget figures, or ROI where applicable." },
      { title: "Show interdisciplinary work", body: "Penn's dual-degree programs are well-known. If you've bridged nursing+business, engineering+finance, or similar combinations, make that explicit — it's a differentiator." },
      { title: "Highlight real-world client or patient experience", body: "Penn's healthcare and business programs expect practical exposure. Name the organizations, patient populations, or client industries you worked with." },
    ],
    duke: [
      { title: "Highlight Bass Connections or research lab experience", body: "Duke's team-based research projects signal collaborative, multidisciplinary thinking — exactly what consulting and health-sector employers want to see." },
      { title: "Show environmental and social impact", body: "Duke's Nicholas School reputation means sustainability work carries weight. Frame your impact in measurable terms: acreage, emissions, funding, or policy scope." },
      { title: "Don't undersell finance experience", body: "Duke sends many graduates to finance and consulting. Include specific deal exposure, valuation models, financial analyses, and the names of any employers or transactions." },
    ],
    northwestern: [
      { title: "Showcase media production work", body: "Medill's reputation means journalism and media experience is expected. List publications, platforms, audiences reached, and stories produced — with bylines if possible." },
      { title: "Highlight Kellogg case competition or consulting experience", body: "Northwestern's business strength means employers expect strategic thinking. Name case competitions, consulting projects, or client engagements with outcomes." },
      { title: "Use performance experience as leadership proof", body: "Northwestern's performing arts programs develop communication and collaboration skills. Frame ensemble, production, or directing roles in terms of leadership outcomes." },
    ],
    uchicago: [
      { title: "Lead with analytical rigor", body: "UChicago's reputation for serious scholarship means quantitative depth is expected. List statistical methods, datasets, research frameworks, or models with precision." },
      { title: "Show intellectual ownership", body: "UChicago hires value original thinking. Describe papers, theses, or independent projects where you developed your own framework or argument — not just applied an existing one." },
      { title: "Quantify finance and consulting work", body: "UChicago's economics and finance pipeline is well-known. Include specific models, deal exposure, or consulting deliverables with named outcomes." },
    ],
    "johns-hopkins": [
      { title: "Lead with research and lab experience", body: "Johns Hopkins graduates are expected to have hands-on research experience. Name the lab, PI, techniques used (PCR, regression, etc.), and what the research produced." },
      { title: "Quantify public health impact", body: "Hopkins' Bloomberg School of Public Health is world-ranked. If you have public health, epidemiology, or global health experience, show the population, scale, and intervention type." },
      { title: "Show clinical or fieldwork experience", body: "Clinical hours, patient contact, and field research are all valued. List the setting, patient population, procedures observed, and duration." },
    ],
    caltech: [
      { title: "Be maximally specific about technical work", body: "Caltech recruiters — mostly in national labs, aerospace, and deep tech — expect precise technical descriptions. Write out the physics, math, or engineering problem you solved." },
      { title: "Lead with publications and conference papers", body: "Caltech undergrads frequently co-author published research. List all papers with author order, journal, and year — this is a major differentiator in technical hiring." },
      { title: "Show computational and experimental range", body: "Employers value Caltech grads who can move between theory, simulation, and experiment. Describe all three if your work spanned them." },
    ],
    brown: [
      { title: "Frame your open curriculum choices", body: "Brown's concentration flexibility is a known differentiator. Briefly explain what you chose to study and why — it signals intellectual agency and self-direction." },
      { title: "Show self-directed projects", body: "Brown students are expected to initiate, not just complete assigned work. Highlight independent projects, student-founded organizations, and self-designed courses." },
      { title: "Lead with public health or social impact metrics", body: "Brown's public health and policy strengths attract mission-driven employers. Frame your impact in terms of populations served, policies influenced, or programs launched." },
    ],
    dartmouth: [
      { title: "Highlight D-Plan internship experience", body: "Dartmouth's off-term internship structure means many students have more work experience than peers at other schools. Name every employer, even if brief, and quantify what you did." },
      { title: "Show Tuck or consulting pipeline experience", body: "Dartmouth's consulting culture means recruiters expect case-style thinking. Describe structured problem-solving, client engagements, or recommendations with outcomes." },
      { title: "Lean into environmental and outdoor leadership", body: "Dartmouth's outdoors culture and environmental science program signal sustainability values. Frame environmental coursework or wilderness leadership as professional development." },
    ],
    cornell: [
      { title: "Leverage your school affiliation", body: "Cornell's seven undergraduate colleges signal specialization. Mention your specific college (Engineering, ILR, SHA, CALS, etc.) — recruiters treat these as distinct credentials." },
      { title: "Show hospitality and operations metrics for SHA grads", body: "SHA alumni are expected to quantify service, revenue, and operations. Include RevPAR, occupancy, guest satisfaction scores, or revenue managed." },
      { title: "Lead with engineering project outcomes", body: "Cornell Engineering graduates should lead with what they built or designed. Name the system, the constraints, the methodology, and the result — not just the class it came from." },
    ],
    vanderbilt: [
      { title: "Highlight medical research and clinical exposure", body: "Vanderbilt Medical Center's proximity means many undergrads have research or clinical experience. Name the lab, PI, and any publications or procedures involved." },
      { title: "Show Owen Business School frameworks", body: "Vanderbilt's MBA-adjacent culture means even undergrads often think in business terms. Use financial modeling, market sizing, or consulting project language where applicable." },
      { title: "Frame Nashville's music and entertainment experience", body: "Vanderbilt's Nashville location creates unique media and entertainment opportunities. If you have music industry, production, or content experience, treat it as professional work." },
    ],
    rice: [
      { title: "Lead with engineering project specifics", body: "Rice's small, research-intensive engineering program produces graduates with deep technical ownership. Describe what you designed, tested, and built — with the constraints you worked within." },
      { title: "Show O-Week or Student Association leadership", body: "Rice's college system and student governance are well-known. Leadership within the college system signals organizational and interpersonal skills in a unique way." },
      { title: "Highlight energy sector experience", body: "Rice's Houston location and engineering focus create strong pipelines to energy and oil-and-gas. Show any energy sector internships, research, or coursework with specifics." },
    ],
    georgetown: [
      { title: "Lead with policy and government experience", body: "Georgetown's location in DC means many students have Hill internships, agency experience, or think-tank work. Name the office, committee, or agency and the policy issues you worked on." },
      { title: "Show multilingual and international work", body: "Georgetown's School of Foreign Service produces globally-oriented graduates. List all languages, international rotations, and global policy or NGO experience." },
      { title: "Quantify finance and investment work", body: "Georgetown's Wall Street presence is significant. Include deal exposure, financial models, funds managed, or client industries for any finance roles." },
    ],
    "notre-dame": [
      { title: "Lean into Mendoza and finance pipeline experience", body: "Notre Dame's Mendoza School is consistently top-ranked. Show investment analysis, case competition results, and consulting frameworks — not just that you studied finance." },
      { title: "Show service and community impact", body: "Notre Dame's service culture means community engagement is expected. Treat volunteer leadership as professional experience — title, scope, populations served, outcomes." },
      { title: "Highlight alumni network leveraged opportunities", body: "Notre Dame's alumni loyalty is legendary. If you've connected with alumni for internships, mentorship, or projects, it signals relationship-building — a valued Notre Dame trait." },
    ],
    emory: [
      { title: "Lead with public health and CDC proximity", body: "Emory's location near the CDC creates unique public health research opportunities. Name the program, population, methods, and any publications or policy impact." },
      { title: "Show Goizueta business frameworks", body: "Emory's Goizueta School attracts Southeast finance and consulting employers. Include case competition results, consulting engagements, and any client-facing project outcomes." },
      { title: "Highlight global health and international experience", body: "Emory's global health emphasis creates strong pipelines to international NGOs and health agencies. Name the countries, populations, interventions, and outcomes you were involved in." },
    ],
    "uc-berkeley": [
      { title: "Show EECS project depth", body: "Berkeley's EECS program is globally recognized. Recruiters at Google, Meta, and top startups expect to see specific systems, repos, or research output — not just coursework names." },
      { title: "Lead with Haas leadership and metrics", body: "Berkeley Haas is known for 'confidence without attitude.' Show your leadership outcomes — revenue, team size, growth metrics — not just your job titles." },
      { title: "Highlight startup and innovation ecosystem exposure", body: "Berkeley's proximity to Silicon Valley creates unique startup opportunities. Name companies, accelerators, or incubators you worked with and what you contributed." },
    ],
    ucla: [
      { title: "Lead with entertainment and media work", body: "UCLA's film, television, and entertainment ecosystem is unmatched. Name the production, studio, platform, or outlet and your specific contribution — writing, producing, editing, or directing." },
      { title: "Show life sciences research depth", body: "UCLA's medical school and life sciences programs attract biotech and pharma recruiters. Name the lab, PI, techniques, and any publications or clinical connections." },
      { title: "Highlight interdisciplinary breadth", body: "UCLA's size creates unusual cross-disciplinary combinations. If your work bridges engineering with entertainment, or medicine with policy, make that explicitly visible." },
    ],
    umich: [
      { title: "Lead with Ross consulting and finance experience", body: "Michigan Ross sends many graduates to consulting and finance. Include MAP project outcomes, case competition results, and any client-facing deliverables with specific numbers." },
      { title: "Show engineering project specifics", body: "Michigan Engineering's project-based curriculum means many students have real design work. Describe the system, constraints, team size, and outcomes — not just the class." },
      { title: "Highlight Michigan's athletics and student culture leadership", body: "Michigan's strong student life means many graduates lead large organizations. Show membership numbers, budget size, or events organized for student leadership roles." },
    ],
    "ut-austin": [
      { title: "Lean into energy and petroleum experience", body: "UT Austin's engineering and geology programs create strong pipelines to energy companies. Show any exploration, reservoir, or process engineering experience with specific technical detail." },
      { title: "Show McCombs metrics", body: "UT's business school expects financial precision. Include revenue managed, deal exposure, model outputs, and client industries for any McCombs-relevant experience." },
      { title: "Highlight Austin's tech ecosystem exposure", body: "UT's Austin location creates strong connections to tech companies. Name any startups, accelerators, or company partnerships you worked with and what you shipped." },
    ],
    "unc-chapel-hill": [
      { title: "Lead with public health research", body: "UNC's Gillings School of Global Public Health is one of the best in the country. Name the research project, methodology, population, and any publications or policy outputs." },
      { title: "Show Hussman journalism work", body: "UNC's journalism school has a strong legacy. List bylines, beats covered, newsroom tools used, and audience metrics for any media experience." },
      { title: "Highlight Kenan-Flagler business and consulting experience", body: "UNC Kenan-Flagler attracts Southeast consulting and finance employers. Show consulting projects, case competition results, and specific deliverables with outcomes." },
    ],
    uva: [
      { title: "Show McIntire commerce rigor", body: "UVA's McIntire School is one of the top undergraduate business programs. Lead with deal exposure, financial models, or consulting frameworks — not just job titles." },
      { title: "Highlight systems engineering project work", body: "UVA's engineering program is known for systems-level thinking. Describe projects by their architecture, constraints, integrations, and final performance metrics." },
      { title: "Frame student honor community experience", body: "UVA's honor code and student self-governance create real leadership experience. Describe any Honor Committee or student governance roles with scope and impact." },
    ],
    "georgia-tech": [
      { title: "Lead with engineering project specifics", body: "Georgia Tech employers expect to see what you built or designed. Describe the system architecture, tools used, and performance benchmarks — not just the project name." },
      { title: "Quantify cybersecurity and data science work", body: "Georgia Tech's cybersecurity and ML programs are nationally ranked. Name the tools, datasets, models, and outcomes for any security or data science experience." },
      { title: "Show co-op and internship depth", body: "Georgia Tech's co-op culture means many students have multiple real-world work experiences. Lead with the most technical or outcome-rich role and quantify what you delivered." },
    ],
    uf: [
      { title: "Highlight agriculture, life sciences, and biotech research", body: "UF's IFAS and life sciences programs create strong connections to agribusiness and biotech. Name the crops, organisms, techniques, and outcomes for any lab or field research." },
      { title: "Show Warrington business experience", body: "UF's business school sends many graduates to Southeast finance and corporate roles. Include internship deliverables, financial metrics, and client industries." },
      { title: "Lead with Florida industry connections", body: "UF's location creates strong connections to agriculture, tourism, healthcare, and tech. Name the industry, company, and your measurable contribution in each relevant role." },
    ],
    "ohio-state": [
      { title: "Show Fisher School business metrics", body: "Ohio State Fisher sends graduates to major Midwest corporations and consulting firms. Include revenue, cost savings, or business impact for any business experience." },
      { title: "Lead with engineering and CS project depth", body: "OSU's engineering programs are strong feeders to manufacturing, defense, and tech. Describe your projects in terms of the system, tools, and measurable outcomes." },
      { title: "Highlight student organization leadership at scale", body: "Ohio State's large campus means student organizations often operate at serious scale. Show membership numbers, events, budgets, or revenue to contextualize your leadership." },
    ],
    "penn-state": [
      { title: "Show Smeal business and supply chain experience", body: "Penn State's Smeal College is known for supply chain and operations. Include metrics like inventory reduction, cost savings, vendor relationships, or lead time improvements." },
      { title: "Lead with engineering specifics", body: "Penn State sends many engineers to aerospace, defense, and materials companies. Describe your projects with the technical system, methods used, and measurable results." },
      { title: "Highlight meteorology and earth science research", body: "Penn State's meteorology program is nationally ranked. For any atmospheric or earth science work, name the data sources, models used, and forecast accuracy or research outcomes." },
    ],
    "uw-madison": [
      { title: "Lead with agriculture and life sciences research", body: "UW Madison's CALS program is one of the best in the country. Name the crop, organism, or system you worked on, the experimental method, and the research outcome." },
      { title: "Show Wisconsin School of Business rigor", body: "Madison's business program attracts Midwest and national finance employers. Lead with the financial metrics, models, or client outcomes from any business experience." },
      { title: "Highlight Wisconsin's research ecosystem", body: "UW Madison is a major research university. Even for non-research roles, showing that you engaged with the university's research infrastructure demonstrates intellectual initiative." },
    ],
    uiuc: [
      { title: "Be maximally specific about CS and engineering stack", body: "UIUC's CS program is top-five nationally. Recruiters at top tech companies expect to see specific languages, frameworks, algorithms, and project outcomes — not just 'software development.'" },
      { title: "Show Gies business school metrics", body: "UIUC's Gies School of Business attracts finance and consulting employers. Include deal exposure, financial model outputs, or consulting project deliverables with specific results." },
      { title: "Lead with Siebel Scholars or CS research work", body: "UIUC's research culture means many undergrads have real publication or lab experience. Name the project, PI, and what you contributed — including any papers or systems built." },
    ],
    purdue: [
      { title: "Lead with aerospace and mechanical project work", body: "Purdue's aerospace heritage is unmatched. For any engineering project, describe the design problem, constraints, tools (CAD, FEA, MATLAB), and performance outcomes." },
      { title: "Show CS and AI depth", body: "Purdue's growing CS program attracts tech employers. Name specific languages, ML frameworks, and project systems — not just 'computer science experience.'" },
      { title: "Highlight Purdue's agriculture and food science research", body: "Purdue's agriculture programs attract agribusiness and food tech employers. Describe research or lab experience with the crop, organism, intervention, and outcome." },
    ],
    "uw-seattle": [
      { title: "Show software engineering project specifics", body: "UW's CS program is a major feeder to Amazon, Microsoft, and top Seattle tech. Describe specific systems you built: the stack, scale, performance metrics, and user impact." },
      { title: "Highlight medical and health informatics research", body: "UW's health sciences and medicine programs are nationally ranked. Name the lab, clinical setting, patient population, and any publications or clinical outcomes." },
      { title: "Lead with environmental and ocean science fieldwork", body: "UW's environmental programs attract conservation and sustainability employers. Name the ecosystem, methods used, and environmental outcomes for any fieldwork or research." },
    ],
    asu: [
      { title: "Lead with sustainability and innovation projects", body: "ASU's sustainability rankings are among the best in the world. For any sustainability or social impact project, name the intervention type, stakeholders, and measurable outcomes." },
      { title: "Show W. P. Carey business experience", body: "ASU's W. P. Carey School attracts Southwest and national business employers. Include financial metrics, client outcomes, or entrepreneurial project deliverables." },
      { title: "Highlight global and online program experience", body: "ASU's online programs and global partnerships create unique experiences. If you've worked across time zones, led distributed teams, or contributed to global programs, make it explicit." },
    ],
    rutgers: [
      { title: "Lead with pharmaceutical sciences research", body: "Rutgers' pharmacy and pharma research programs attract major pharmaceutical employers. Name the compound class, assay techniques, and any publications or drug development outcomes." },
      { title: "Show Rutgers Business School metrics", body: "RBS attracts finance, accounting, and supply chain employers in the Northeast. Include deal exposure, audit scope, or supply chain metrics for any business experience." },
      { title: "Highlight proximity to New York City", body: "Rutgers' location near New York creates strong connections to finance, pharma, and media. Name any NYC-based internships or projects and quantify what you contributed." },
    ],
    umd: [
      { title: "Lead with cybersecurity and CS project specifics", body: "UMD's cybersecurity and CS programs attract federal agencies and tech companies. Describe security tools, vulnerabilities addressed, systems hardened, or compliance frameworks applied." },
      { title: "Show Smith School business metrics", body: "UMD's Smith School has a strong finance and consulting pipeline. Include financial models, deal exposure, or consulting project outcomes with specific numbers." },
      { title: "Highlight federal government and defense connections", body: "UMD's proximity to Washington, D.C. creates unique government and defense opportunities. Name the agency, clearance level (if applicable), and the scope of work." },
    ],
    umn: [
      { title: "Lead with medical and health sciences research", body: "UMN's medical school and health sciences programs are nationally ranked. Name the lab, PI, techniques, patient population, and any publications or clinical outcomes." },
      { title: "Show Carlson business school rigor", body: "Carlson attracts Twin Cities finance and consulting employers. Include financial metrics, deal exposure, or consulting deliverables with specific outcomes." },
      { title: "Highlight agriculture and food science work", body: "UMN's agriculture programs attract food technology and agribusiness employers. Name the crop, organism, or food system, the experimental approach, and the outcome." },
    ],
    msu: [
      { title: "Lead with agriculture and food science specifics", body: "MSU's agriculture programs are among the best in the country. Name the crop or organism, experimental design, and research outcome for any lab or field experience." },
      { title: "Show communications and journalism portfolio work", body: "MSU's communications school attracts media and PR employers. List publications, campaigns, platforms used, audience metrics, or client outcomes for any communications work." },
      { title: "Highlight business and supply chain metrics", body: "MSU's business programs attract Midwest corporate employers. Include supply chain metrics, business impact, or consulting outcomes for any business experience." },
    ],
    indiana: [
      { title: "Lead with Kelley School business metrics", body: "Indiana Kelley is one of the top undergraduate business programs. Recruiters at McKinsey, Goldman, and major corporations expect to see financial precision: models, deal exposure, ROI." },
      { title: "Show information and data science project work", body: "IU's Luddy School of Informatics attracts tech and analytics employers. Name the datasets, tools, and models you worked with and what decisions or outcomes your analysis supported." },
      { title: "Highlight Jacobs School of Music or arts leadership", body: "IU's music and arts programs are world-class. Treat performance, composition, or production credits as professional experience — with audiences, venues, and outcomes." },
    ],
    nyu: [
      { title: "Lead with Stern finance and quantitative rigor", body: "NYU Stern is one of the top finance programs in the country. Show deal exposure, financial models, valuation work, or trading experience with specific metrics and firm names." },
      { title: "Show Tisch film or media production portfolio", body: "Tisch alumni are expected to have a portfolio. Link to your work and name the productions, platforms, festivals, or outlets where your work appeared." },
      { title: "Leverage your New York City location", body: "NYU's Manhattan location creates unmatched access to finance, media, and fashion employers. Lead with the most prestigious city-based experience and quantify what you contributed." },
    ],
    usc: [
      { title: "Lead with Cinematic Arts production credentials", body: "USC's School of Cinematic Arts is the most connected film school in the world. Name every production, your role, the platform or festival, and any audience metrics." },
      { title: "Show Viterbi engineering project specifics", body: "USC Viterbi attracts aerospace, defense, and tech employers in Los Angeles. Describe your engineering projects with the system, tools, constraints, and performance outcomes." },
      { title: "Highlight Marshall business and entertainment crossover", body: "USC's Marshall School attracts entertainment business and West Coast corporate employers. Frame any entertainment-adjacent business experience with revenue, deal, or audience metrics." },
    ],
    "boston-university": [
      { title: "Lead with communications and media portfolio work", body: "BU's College of Communication is one of the top in the country. For journalism, PR, or advertising experience, list bylines, campaigns, clients, and audience metrics." },
      { title: "Show biomedical engineering project depth", body: "BU's BME program attracts medtech and pharma employers. Describe your device, model, or system with the clinical problem it addressed, methods used, and testing outcomes." },
      { title: "Highlight Questrom business and entrepreneurship experience", body: "BU Questrom attracts Boston and national business employers. Include consulting project outcomes, startup experience, or financial metrics for any business role." },
    ],
    northeastern: [
      { title: "Lead with co-op employer names and outcomes", body: "Northeastern's co-op is the program's biggest differentiator. Name every co-op employer, your title, and at least one specific outcome per rotation — recruiters will compare multiple co-ops." },
      { title: "Show cybersecurity and CS project specifics", body: "Northeastern's CS and cybersecurity programs attract tech employers in Boston and beyond. Describe systems, security tools, and specific vulnerabilities addressed or features shipped." },
      { title: "Highlight health sciences and Khoury research", body: "Northeastern's Khoury College and health programs attract biotech and digital health employers. Name the lab, PI, and any publications, datasets, or clinical outcomes." },
    ],
    gmu: [
      { title: "Lead with cybersecurity and IT certifications", body: "George Mason's cybersecurity program is near the federal government's largest IT employers. List certifications (CompTIA, CISSP, CEH), security tools mastered, and systems hardened." },
      { title: "Show federal government and defense work", body: "GMU's Northern Virginia location creates strong connections to DoD, intelligence agencies, and government contractors. Name the agency or contractor, clearance level, and scope of work." },
      { title: "Highlight economics and policy research", body: "GMU's economics and public policy programs attract think tanks and government employers. Name the research project, methodology, and any publications or policy briefs produced." },
    ],
    fiu: [
      { title: "Lead with international trade and business experience", body: "FIU's Miami location creates unique international business connections to Latin America and the Caribbean. Name the markets, languages, and business outcomes for any international role." },
      { title: "Show hospitality and tourism metrics", body: "FIU's Chaplin School of Hospitality attracts hotel, cruise, and tourism employers. Include revenue managed, occupancy rates, guest scores, or events organized." },
      { title: "Highlight multilingual and multicultural skills", body: "FIU's diverse student body and Miami location make multilingual candidates highly valuable. List languages spoken and any experience working across cultural contexts." },
    ],
    ucf: [
      { title: "Lead with engineering and CS project specifics", body: "UCF's engineering programs attract aerospace, defense, and tech employers in Central Florida. Describe your projects with the system, tools, and performance outcomes." },
      { title: "Show hospitality and event management experience", body: "UCF's Rosen College of Hospitality is top-ranked. Include revenue managed, event attendance, guest satisfaction scores, or operational metrics for any hospitality role." },
      { title: "Highlight innovation and entrepreneurship work", body: "UCF's innovation ecosystem and proximity to tech and defense employers creates strong startup and innovation opportunities. Name any accelerators, competitions, or products launched." },
    ],
    "texas-am": [
      { title: "Lead with engineering and agriculture project specifics", body: "Texas A&M's engineering and agriculture programs attract energy, defense, and agribusiness employers. Describe your projects with the system, tools, and measurable outcomes." },
      { title: "Show Mays business school metrics", body: "Texas A&M's Mays Business School attracts Texas and national business employers. Include financial metrics, consulting outcomes, or supply chain metrics for any business experience." },
      { title: "Highlight Aggie Network and corps leadership", body: "Texas A&M's Corps of Cadets and Aggie Network are well-known. Treat any corps or leadership experience with the same rigor as a professional role — scope, decisions made, outcomes." },
    ],
    "virginia-tech": [
      { title: "Lead with engineering and architecture project specifics", body: "Virginia Tech's engineering and architecture programs attract defense, aerospace, and construction employers. Describe what you designed, the constraints you worked within, and the outcomes." },
      { title: "Show CS and cybersecurity depth", body: "Virginia Tech's CS and cybersecurity programs attract federal and defense employers. Name specific systems, security frameworks, and any vulnerabilities addressed or tools built." },
      { title: "Highlight agriculture and life sciences research", body: "Virginia Tech's CALS program attracts agribusiness and biotech employers. Name the crop, organism, experimental design, and outcomes for any research experience." },
    ],
    "cu-boulder": [
      { title: "Lead with aerospace and astrophysics research", body: "CU Boulder's aerospace program has direct connections to NASA, NOAA, and space companies. Describe your research with the specific instrument, mission, dataset, or satellite system involved." },
      { title: "Show environmental and sustainability project work", body: "CU Boulder's environmental science programs attract conservation, energy, and policy employers. Name the ecosystem, intervention type, and measurable environmental outcomes." },
      { title: "Highlight Leeds business and entrepreneurship experience", body: "CU's Leeds School attracts Colorado and national business employers. Include startup experience, consulting outcomes, or financial metrics for any business or entrepreneurship role." },
    ],
  };

  return (
    tipsBySlug[slug] ?? [
      { title: `Highlight your strengths in ${s1}`, body: `${name} is known for ${s1}. Recruiters targeting ${name} grads expect depth — show specific projects, tools, and outcomes in this area.` },
      { title: "Quantify every bullet point", body: "Replace vague descriptions with specific numbers: users reached, revenue impacted, team size, or research scale. Numbers are the fastest way to prove impact." },
      { title: `Show breadth across ${s2} and ${s3}`, body: `${name}'s strength in both ${s2} and ${s3} attracts employers who value cross-disciplinary thinking. Frame experiences that bridge multiple areas of expertise.` },
    ]
  );
}

/* ── Key skills by school ────────────────────────────────────────────────── */
function getKeySkills(slug: string, known_for: [string, string, string]): string[] {
  const skillsBySlug: Record<string, string[]> = {
    harvard: ["Strategic analysis", "Financial modeling", "Policy writing", "Research design", "Public speaking", "Data analysis", "Stakeholder management", "Case methodology"],
    stanford: ["Python", "Machine learning", "Product management", "React", "User research", "Venture analysis", "A/B testing", "System design"],
    mit: ["Python", "MATLAB", "C++", "Linear algebra", "Algorithms", "Signal processing", "Robotics", "Research methods"],
    yale: ["Policy analysis", "Academic writing", "Qualitative research", "Public speaking", "Grant writing", "International relations", "French / Mandarin / Spanish"],
    princeton: ["Econometrics", "R", "Python", "Policy writing", "Financial modeling", "Quantitative research", "LaTeX", "Statistical modeling"],
    columbia: ["Financial modeling", "Bloomberg Terminal", "Journalism ethics", "Adobe Premiere", "Python", "International relations", "SQL", "CMS (WordPress, Arc)"],
    upenn: ["Financial modeling", "Excel (advanced)", "Python", "Healthcare operations", "Case interviews", "SPSS", "Clinical research", "Supply chain management"],
    duke: ["Environmental modeling", "Financial analysis", "Health policy", "R", "ArcGIS", "Clinical research", "Consulting frameworks", "Python"],
    northwestern: ["AP Style writing", "Broadcast journalism", "Adobe Creative Suite", "Strategic consulting", "Python", "Excel", "CRM tools", "Presentation design"],
    uchicago: ["Econometrics", "STATA", "R", "Game theory", "Financial modeling", "Philosophy of science", "LaTeX", "SQL"],
    "johns-hopkins": ["Clinical research", "Public health methods", "Biostatistics", "R", "Epidemiology", "PCR/molecular biology", "SAS", "IRB protocols"],
    caltech: ["Python", "MATLAB", "C++", "Quantum mechanics", "Electrodynamics", "Machine learning", "LaTeX", "UNIX/Linux"],
    brown: ["Interdisciplinary research", "Public health methods", "Python", "UX design", "Documentary writing", "Social entrepreneurship", "Qualitative analysis", "Grant writing"],
    dartmouth: ["Financial modeling", "Case interviews", "Environmental data analysis", "Python", "R", "Wilderness leadership", "Excel (advanced)", "Strategic communication"],
    cornell: ["Engineering design (CAD/SolidWorks)", "Hotel PMS software", "Financial modeling", "Python", "MATLAB", "Agricultural science", "Labor relations", "Operations management"],
    vanderbilt: ["Clinical research", "Financial modeling", "Biostatistics", "R", "Music industry contracts", "Healthcare operations", "SPSS", "Python"],
    rice: ["MATLAB", "Python", "CAD (SolidWorks)", "Energy modeling", "Biosciences lab techniques", "FEA analysis", "Statistical analysis", "Oil & gas domain knowledge"],
    georgetown: ["Policy analysis", "Financial modeling", "Arabic / Mandarin / French / Spanish", "Congressional research", "Bloomberg Terminal", "International trade law", "SQL", "Public speaking"],
    "notre-dame": ["Financial modeling", "Excel (advanced)", "Case methodology", "Service project management", "Python", "Supply chain", "Accounting (GAAP)", "Presentation design"],
    emory: ["Public health methods", "R", "Financial modeling", "Epidemiology", "Spanish", "Global health frameworks", "Stata", "IRB protocols"],
    "uc-berkeley": ["Python", "React", "Machine learning (TensorFlow/PyTorch)", "SQL", "Java", "Financial modeling (Haas)", "Git", "Distributed systems"],
    ucla: ["Adobe Premiere Pro", "Final Cut Pro", "Python", "Life sciences lab techniques", "Film production", "Data analysis", "Healthcare operations", "UX/UI design"],
    umich: ["Excel (advanced)", "Python", "Engineering design", "AutoCAD", "SQL", "Financial modeling", "Tableau", "Consulting frameworks"],
    "ut-austin": ["Reservoir simulation", "Python", "Financial modeling (McCombs)", "MATLAB", "AutoCAD", "Oil & gas domain knowledge", "SQL", "Data analysis"],
    "unc-chapel-hill": ["Epidemiology", "SAS", "R", "Journalism CMS tools", "Financial modeling", "Public health methods", "AP Style", "Health policy analysis"],
    uva: ["Financial modeling", "Excel (advanced)", "Systems engineering (MATLAB/Simulink)", "Python", "Consulting frameworks", "C++", "Policy writing", "SQL"],
    "georgia-tech": ["Python", "C++", "Java", "Machine learning", "Cybersecurity tools (Wireshark, Metasploit)", "MATLAB", "AutoCAD", "SQL"],
    uf: ["Agricultural science", "Python", "Financial modeling", "Lab techniques (PCR, ELISA)", "GIS/ArcGIS", "SQL", "Veterinary protocols", "Data analysis"],
    "ohio-state": ["Financial modeling", "Python", "AutoCAD", "SQL", "Supply chain management", "Tableau", "Clinical research", "Excel (advanced)"],
    "penn-state": ["AutoCAD", "MATLAB", "Materials science methods", "Python", "Supply chain management", "Meteorological modeling", "Financial modeling", "SQL"],
    "uw-madison": ["R", "Python", "Agricultural science", "Financial modeling", "Lab techniques", "GIS/ArcGIS", "STATA", "SQL"],
    uiuc: ["Python", "C++", "Java", "Machine learning (TensorFlow)", "SQL", "Financial modeling (Gies)", "Git", "Data structures and algorithms"],
    purdue: ["MATLAB", "SolidWorks", "CAD/CAM", "Python", "C++", "Agricultural science", "Machine learning", "Control systems"],
    "uw-seattle": ["Python", "Java", "Machine learning", "SQL", "Clinical research methods", "Environmental modeling", "Azure/AWS", "Git"],
    asu: ["Sustainability analysis", "Python", "Financial modeling", "GIS/ArcGIS", "Social media analytics", "Supply chain management", "Data visualization (Tableau)", "SQL"],
    rutgers: ["Pharmaceutical sciences", "Lab techniques (HPLC, NMR)", "Financial modeling", "SQL", "Python", "Supply chain", "Regulatory compliance (FDA)", "Data analysis"],
    umd: ["Cybersecurity tools (Wireshark, Splunk)", "Python", "SQL", "Network security", "Financial modeling", "Data analysis", "AWS", "Java"],
    umn: ["Clinical research", "R", "Python", "Financial modeling", "Lab techniques", "Supply chain", "SQL", "Biostatistics"],
    msu: ["Agricultural science", "AP Style writing", "PR/media tools", "Supply chain management", "Python", "Financial modeling", "Social media analytics", "SQL"],
    indiana: ["Financial modeling (Kelley)", "Python", "SQL", "Data visualization (Tableau)", "Music production software", "Excel (advanced)", "Machine learning", "Business intelligence"],
    nyu: ["Financial modeling", "Bloomberg Terminal", "Python", "SQL", "Adobe Premiere Pro", "Final Cut Pro", "JavaScript", "Excel (advanced)"],
    usc: ["Final Cut Pro", "Adobe Premiere Pro", "Python", "JavaScript", "Financial modeling", "Entertainment industry contracts", "C++", "Screenwriting software (Final Draft)"],
    "boston-university": ["AP Style writing", "Adobe Creative Suite", "Biomedical device design", "Python", "Financial modeling", "Lab techniques", "SQL", "CMS tools"],
    northeastern: ["Python", "Java", "Cybersecurity tools", "SQL", "Machine learning", "Health informatics", "Git", "AWS"],
    gmu: ["Cybersecurity (CompTIA, CISSP)", "Python", "Network security", "SQL", "SIEM tools (Splunk)", "Policy analysis", "AWS", "MATLAB"],
    fiu: ["Spanish / Portuguese", "International trade compliance", "Hospitality PMS software", "Financial modeling", "Excel", "SQL", "Event management", "Supply chain"],
    ucf: ["AutoCAD", "Python", "SQL", "Event management tools", "Hospitality PMS software", "Machine learning", "Java", "GIS/ArcGIS"],
    "texas-am": ["MATLAB", "AutoCAD", "Agricultural science", "Financial modeling (Mays)", "Python", "SQL", "Supply chain", "Data analysis"],
    "virginia-tech": ["AutoCAD", "MATLAB", "Python", "Cybersecurity tools", "C++", "Agricultural science", "BIM (Revit)", "SQL"],
    "cu-boulder": ["Python", "MATLAB", "Orbital mechanics (STK)", "Environmental modeling", "GIS/ArcGIS", "Financial modeling (Leeds)", "R", "SQL"],
  };

  return (
    skillsBySlug[slug] ?? [
      known_for[0].split(" ")[0] + " fundamentals",
      "Python",
      "Data analysis",
      "Excel (advanced)",
      "Project management",
      "SQL",
      "Research methods",
      "Presentation design",
    ]
  );
}
