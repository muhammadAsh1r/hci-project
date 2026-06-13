import type {
  AiSuggestion,
  GeneratedProposal,
  ProposalFormData,
  ProposalScore,
  ProposalTemplate,
  SavedProposal,
  SkillMatch,
  WinProbability,
} from "@/lib/types/proposal";
import type { MarketplaceProject } from "@/lib/types/project";

export const proposalTemplates: ProposalTemplate[] = [
  {
    id: "web-developer",
    name: "Web Developer",
    icon: "Code",
    description: "Full-stack web development proposals",
    defaults: {
      objective: "Deliver a high-performance, scalable web application that meets all project requirements on time and within budget.",
      experience: "5+ years building production web apps with React, Next.js, and Node.js. Led 12+ successful projects for startups and enterprises.",
      skills: "React, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL",
      notes: "Emphasize performance optimization and clean, maintainable code architecture.",
    },
  },
  {
    id: "ui-ux-designer",
    name: "UI/UX Designer",
    icon: "Palette",
    description: "Design-focused proposals with portfolio emphasis",
    defaults: {
      objective: "Create an intuitive, visually stunning user experience that drives engagement and conversion.",
      experience: "4+ years in product design with expertise in user research, wireframing, and high-fidelity prototyping.",
      skills: "Figma, UI/UX, Design Systems, Prototyping, User Research",
      notes: "Highlight design process and include links to relevant portfolio case studies.",
    },
  },
  {
    id: "ai-engineer",
    name: "AI Engineer",
    icon: "Brain",
    description: "AI/ML project proposals",
    defaults: {
      objective: "Build intelligent AI solutions that solve real business problems with measurable impact.",
      experience: "3+ years in ML engineering with production deployments of NLP, computer vision, and LLM applications.",
      skills: "Python, PyTorch, OpenAI, LangChain, Machine Learning, NLP",
      notes: "Focus on model accuracy, scalability, and integration with existing systems.",
    },
  },
  {
    id: "mobile-developer",
    name: "Mobile Developer",
    icon: "Smartphone",
    description: "Cross-platform mobile app proposals",
    defaults: {
      objective: "Deliver a polished, performant mobile app that provides an exceptional user experience on iOS and Android.",
      experience: "4+ years building cross-platform apps with React Native and native iOS/Android development.",
      skills: "React Native, TypeScript, Firebase, App Store Deployment",
      notes: "Mention app store submission experience and offline-first architecture.",
    },
  },
  {
    id: "content-writer",
    name: "Content Writer",
    icon: "PenLine",
    description: "Content and copywriting proposals",
    defaults: {
      objective: "Create compelling, SEO-optimized content that resonates with your target audience and drives results.",
      experience: "3+ years writing technical content, blog posts, and marketing copy for B2B SaaS companies.",
      skills: "Content Strategy, SEO, Copywriting, Technical Writing",
      notes: "Include writing samples and mention content performance metrics from past projects.",
    },
  },
];

export const savedProposals: SavedProposal[] = [
  {
    id: "sp-1",
    name: "E-commerce Redesign Proposal",
    createdDate: "Jun 10, 2026",
    lastEdited: "Jun 12, 2026",
    projectName: "E-commerce Platform Redesign",
    projectId: "ecommerce-redesign",
    status: "Draft",
  },
  {
    id: "sp-2",
    name: "SaaS Landing Page Bid",
    createdDate: "Jun 8, 2026",
    lastEdited: "Jun 9, 2026",
    projectName: "SaaS Landing Page Development",
    projectId: "landing-page",
    status: "Submitted",
  },
  {
    id: "sp-3",
    name: "AI Chatbot Integration",
    createdDate: "Jun 5, 2026",
    lastEdited: "Jun 6, 2026",
    projectName: "AI Customer Support Chatbot",
    projectId: "ai-chatbot",
    status: "Submitted",
  },
  {
    id: "sp-4",
    name: "FinTech Dashboard Proposal",
    createdDate: "May 28, 2026",
    lastEdited: "May 30, 2026",
    projectName: "Analytics Dashboard Build",
    projectId: "ecommerce-redesign",
    status: "Won",
  },
  {
    id: "sp-5",
    name: "Mobile App MVP Bid",
    createdDate: "May 20, 2026",
    lastEdited: "May 22, 2026",
    projectName: "Fitness Tracking Mobile App MVP",
    projectId: "mobile-app-mvp",
    status: "Lost",
  },
];

export const defaultSuggestions: AiSuggestion[] = [
  { id: "s1", text: "Mention your React expertise and recent e-commerce projects", applied: false },
  { id: "s2", text: "Add portfolio links to your FinTech Dashboard case study", applied: false },
  { id: "s3", text: "Highlight your 96% project success rate", applied: false },
  { id: "s4", text: "Improve timeline section with specific milestone dates", applied: false },
  { id: "s5", text: "Include a brief mention of post-launch support offering", applied: false },
];

export function generateMockProposal(
  project: MarketplaceProject,
  form: ProposalFormData
): GeneratedProposal {
  const clientName = project.client.name.split(" ")[0];

  return {
    greeting: `Dear ${clientName},\n\nThank you for posting "${project.title}." I'm excited about the opportunity to contribute my expertise to your project.`,
    projectUnderstanding: `I understand you're looking for a professional to ${project.description.toLowerCase().replace(/\.$/, "")}. Your project requires ${project.skills.join(", ")} skills at an ${project.experienceLevel.toLowerCase()} level, with a budget of ${project.budget} and a timeline of ${project.duration}.\n\n${form.objective || "My goal is to deliver exceptional results that exceed your expectations while maintaining clear communication throughout the project."}`,
    relevantExperience: form.experience || `With over 5 years of experience in ${project.category.toLowerCase()}, I have successfully completed 24+ projects with a 96% success rate. My relevant skills include ${form.skills || project.skills.join(", ")}.\n\nNotable recent projects:\n• FinTech Analytics Dashboard — Real-time data visualization with React and D3.js\n• Premium E-commerce Storefront — Next.js rebuild with 35% conversion increase\n• Enterprise Design System — 80+ components adopted by 12 product teams`,
    proposedSolution: `Here's my approach to delivering "${project.title}":\n\n1. Discovery & Planning — Review requirements, establish milestones, and align on design direction\n2. Development — Iterative build with weekly demos and feedback incorporation\n3. Testing & Optimization — Performance audits, cross-browser testing, and accessibility checks\n4. Launch & Support — Deployment, documentation, and ${form.notes ? "ongoing support as discussed" : "30 days of post-launch bug fixes"}\n\n${form.notes ? `Additional note: ${form.notes}` : ""}`,
    timeline: `Based on the project scope and ${project.duration} timeline:\n\n• Week 1-2: Discovery, wireframes, and technical architecture\n• Week 3-6: Core development and weekly milestone reviews\n• Week 7-8: Testing, optimization, and final polish\n• Week 9: Launch, documentation, and handoff\n\nI'm available to start immediately and can adjust the timeline based on your preferred start date.`,
    closing: `I'd love to discuss your project in more detail and share relevant portfolio examples. I'm confident my experience with ${project.skills.slice(0, 2).join(" and ")} makes me an excellent fit for this role.\n\nLooking forward to hearing from you!\n\nBest regards,\nSarah Chen\nSenior Frontend Developer`,
  };
}

export function proposalToHtml(proposal: GeneratedProposal): string {
  return [
    `<h2>Greeting</h2><p>${proposal.greeting.replace(/\n/g, "<br>")}</p>`,
    `<h2>Project Understanding</h2><p>${proposal.projectUnderstanding.replace(/\n/g, "<br>")}</p>`,
    `<h2>Relevant Experience</h2><p>${proposal.relevantExperience.replace(/\n/g, "<br>")}</p>`,
    `<h2>Proposed Solution</h2><p>${proposal.proposedSolution.replace(/\n/g, "<br>")}</p>`,
    `<h2>Timeline</h2><p>${proposal.timeline.replace(/\n/g, "<br>")}</p>`,
    `<h2>Closing Statement</h2><p>${proposal.closing.replace(/\n/g, "<br>")}</p>`,
  ].join("");
}

export function htmlToPlainText(html: string): string {
  if (typeof document === "undefined") return html.replace(/<[^>]+>/g, "");
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export function calculateProposalScore(
  form: ProposalFormData,
  project: MarketplaceProject
): ProposalScore {
  let completeness = 60;
  if (form.objective.trim()) completeness += 10;
  if (form.experience.trim()) completeness += 10;
  if (form.skills.trim()) completeness += 10;
  if (form.notes.trim()) completeness += 10;

  const formSkills = form.skills.toLowerCase().split(",").map((s) => s.trim());
  const matchCount = project.skills.filter((s) =>
    formSkills.some((fs) => fs.includes(s.toLowerCase()) || s.toLowerCase().includes(fs))
  ).length;
  const skillsMatch = Math.min(98, 75 + matchCount * 8);

  return {
    overall: Math.round((completeness + skillsMatch + 94 + 95) / 4),
    clarity: 95,
    skillsMatch,
    professionalism: 94,
    completeness,
  };
}

export function calculateSkillMatches(
  project: MarketplaceProject,
  formSkills: string
): SkillMatch[] {
  const userSkills = formSkills.split(",").map((s) => s.trim()).filter(Boolean);
  const allSkills = [...new Set([...project.skills, ...userSkills.slice(0, 2)])];

  return allSkills.slice(0, 4).map((skill, index) => ({
    skill,
    percentage: userSkills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
      ? 92 + (index % 4) * 2
      : 78 + (index % 3) * 4,
  }));
}

export function calculateWinProbability(score: ProposalScore): WinProbability {
  const pct = Math.min(95, Math.round(score.overall * 0.9));
  return {
    percentage: pct,
    factors: [
      { label: "Strong skills match", positive: score.skillsMatch >= 85 },
      { label: "Good experience level", positive: true },
      { label: "Competitive pricing", positive: score.overall >= 80 },
      { label: "Complete proposal", positive: score.completeness >= 80 },
    ],
  };
}

export function getDeadlineFromProject(project: MarketplaceProject): string {
  const step = project.timelineSteps.find((s) => s.label === "Applications Open");
  return step?.date.split(" – ")[1] || project.duration;
}
