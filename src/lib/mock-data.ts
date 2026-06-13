export const stats = [
  { label: "Freelancers", value: 10000, suffix: "+", prefix: "" },
  { label: "Projects", value: 5000, suffix: "+", prefix: "" },
  { label: "Paid", value: 2, suffix: "M+", prefix: "$" },
  { label: "Success Rate", value: 95, suffix: "%", prefix: "" },
] as const;

export const howItWorksSteps = [
  {
    step: 1,
    title: "Post Project",
    description:
      "Describe your project, set a budget, and define the skills you need in minutes.",
  },
  {
    step: 2,
    title: "Match Skills",
    description:
      "Our AI analyzes requirements and surfaces the best-matched freelancers instantly.",
  },
  {
    step: 3,
    title: "Secure Escrow",
    description:
      "Funds are held safely in escrow until milestones are approved and work is delivered.",
  },
  {
    step: 4,
    title: "Deliver Work",
    description:
      "Collaborate seamlessly, track progress, and release payment when you're satisfied.",
  },
] as const;

export const features = [
  {
    title: "Project Posting",
    description:
      "Create detailed project listings with budgets, timelines, and skill requirements.",
    icon: "FileText" as const,
  },
  {
    title: "Skill Matching",
    description:
      "AI-powered matching connects you with freelancers who fit your exact needs.",
    icon: "Target" as const,
  },
  {
    title: "Escrow Payments",
    description:
      "Secure milestone-based payments protect both clients and freelancers.",
    icon: "Shield" as const,
  },
  {
    title: "Portfolio Management",
    description:
      "Showcase your best work with rich portfolios that attract top clients.",
    icon: "Briefcase" as const,
  },
  {
    title: "AI Proposal Generation",
    description:
      "Generate tailored proposals in seconds with AI that understands project context.",
    icon: "Sparkles" as const,
  },
] as const;

export const freelancers = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "SC",
    skills: ["React", "TypeScript", "UI/UX"],
    rating: 4.9,
    hourlyRate: 85,
    title: "Senior Frontend Developer",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "MJ",
    skills: ["Node.js", "Python", "AWS"],
    rating: 4.8,
    hourlyRate: 95,
    title: "Full Stack Engineer",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: "ER",
    skills: ["Figma", "Branding", "Motion"],
    rating: 5.0,
    hourlyRate: 75,
    title: "Product Designer",
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "DK",
    skills: ["Machine Learning", "PyTorch", "NLP"],
    rating: 4.9,
    hourlyRate: 120,
    title: "AI/ML Specialist",
  },
  {
    id: 5,
    name: "Amira Hassan",
    avatar: "AH",
    skills: ["Content Strategy", "SEO", "Copywriting"],
    rating: 4.7,
    hourlyRate: 60,
    title: "Content Strategist",
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "JW",
    skills: ["DevOps", "Kubernetes", "CI/CD"],
    rating: 4.8,
    hourlyRate: 110,
    title: "DevOps Engineer",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    budget: "$5,000 – $8,000",
    skills: ["React", "Next.js", "Tailwind"],
    description:
      "Redesign and rebuild a modern e-commerce storefront with improved UX and performance.",
  },
  {
    id: 2,
    title: "Mobile App MVP Development",
    budget: "$10,000 – $15,000",
    skills: ["React Native", "Firebase", "API"],
    description:
      "Build a cross-platform mobile app MVP for a fitness tracking startup.",
  },
  {
    id: 3,
    title: "Brand Identity & Logo Design",
    budget: "$2,000 – $3,500",
    skills: ["Branding", "Illustrator", "Figma"],
    description:
      "Create a complete brand identity including logo, color palette, and style guide.",
  },
  {
    id: 4,
    title: "AI Chatbot Integration",
    budget: "$4,000 – $6,000",
    skills: ["Python", "OpenAI", "LangChain"],
    description:
      "Integrate an AI-powered customer support chatbot into an existing web application.",
  },
  {
    id: 5,
    title: "SEO & Content Marketing",
    budget: "$1,500 – $2,500/mo",
    skills: ["SEO", "Content", "Analytics"],
    description:
      "Develop and execute an SEO strategy with monthly content creation and reporting.",
  },
  {
    id: 6,
    title: "Cloud Infrastructure Migration",
    budget: "$8,000 – $12,000",
    skills: ["AWS", "Terraform", "Docker"],
    description:
      "Migrate legacy infrastructure to AWS with zero-downtime deployment strategy.",
  },
] as const;

export const aiFeatures = [
  {
    title: "AI Proposal Generator",
    description:
      "Craft compelling, personalized proposals in seconds. Our AI analyzes project details and your profile to generate winning pitches.",
    icon: "Wand2" as const,
    highlight: true,
  },
  {
    title: "Smart Skill Matching",
    description:
      "Advanced algorithms match freelancers to projects based on skills, experience, availability, and past performance.",
    icon: "Brain" as const,
    highlight: false,
  },
  {
    title: "Project Recommendations",
    description:
      "Get personalized project suggestions tailored to your skills, rates, and career goals — delivered daily.",
    icon: "Lightbulb" as const,
    highlight: false,
  },
] as const;

export const testimonials = [
  {
    id: 1,
    quote:
      "FreelanceAI transformed how I find clients. The AI matching saved me hours of searching, and I've doubled my income in six months.",
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    avatar: "SC",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "As a startup founder, finding reliable talent was always a challenge. FreelanceAI's escrow system and skill matching made hiring effortless.",
    name: "Michael Torres",
    role: "CEO, TechStart Inc.",
    avatar: "MT",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The AI proposal generator is a game-changer. I went from spending 2 hours per proposal to 10 minutes — with better results.",
    name: "Elena Rodriguez",
    role: "Product Designer",
    avatar: "ER",
    rating: 5,
  },
] as const;

export const navLinks = [
  { label: "Find Projects", href: "/projects" },
  { label: "Freelancers", href: "/freelancers" },
  { label: "AI Features", href: "/#ai-features" },
  { label: "Pricing", href: "/#pricing" },
] as const;

export const footerLinks = {
  product: [
    { label: "Find Projects", href: "/projects" },
    { label: "Hire Freelancers", href: "/freelancers" },
    { label: "AI Features", href: "#ai-features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Escrow", href: "#" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Guides", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Community", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
} as const;
