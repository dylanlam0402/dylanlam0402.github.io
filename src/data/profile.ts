export interface SocialLink {
  platform: 'linkedin' | 'github' | 'email';
  url: string;
  displayText: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  repoUrl: string | null;
  liveUrl: string | null;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  expires: string;
  credentialId?: string;
}

export interface Achievement {
  value: number;
  suffix: string;
  label: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  avatarUrl: string;
  contactEmail: string;
  about: string;
  aboutExtra: string;
  location: string;
  socials: SocialLink[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: Project[];
  education: EducationItem[];
  certifications: Certification[];
  achievements: Achievement[];
}

export const PROFILE_DATA: ProfileData = {
  name: "Kiet Lam",
  title: "Senior Data Engineer",
  tagline: "Turn your data into actionable insights!",
  avatarUrl: "profile.webp",
  contactEmail: "dylanlam0402@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  about:
    "With a background in software engineering and a passion for data analytics, I design and deploy scalable end-to-end data solutions that drive measurable value for clients.",
  aboutExtra:
    "I believe in the power of continuous learning and staying updated with the latest industry trends. My approach combines technical expertise with a keen eye for design, ensuring every product I build is not only functional but also delightful to use.",
  socials: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/kietlam96",
      displayText: "linkedin.com/in/kietlam96",
    },
    {
      platform: "github",
      url: "https://github.com/dylanlam0402",
      displayText: "github.com/dylanlam0402",
    },
    {
      platform: "email",
      url: "mailto:dylanlam0402@gmail.com",
      displayText: "dylanlam0402@gmail.com",
    },
  ],
  skills: [
    {
      category: "Data Engineering & Architecture",
      items: [
        "Data Engineering",
        "Data Modeling",
        "Data Architecture",
        "Data Lakehouse",
        "Data Warehousing",
        "ETL",
        "Data Migration",
      ],
    },
    {
      category: "Cloud & Platforms",
      items: [
        "Snowflake",
        "Azure Databricks",
        "Microsoft Azure",
        "AWS",
        "Apache Airflow",
      ],
    },
    {
      category: "Databases",
      items: ["SQL", "SQL Server", "PostgreSQL", "MySQL", "Vertica"],
    },
    {
      category: "Programming Languages",
      items: ["Python", "Java", "Ruby", "JavaScript", "SQL"],
    },
    {
      category: "BI & Analytics",
      items: ["Power BI", "Sisense", "GoodData", "Pentaho", "SSRS", "Data Analysis"],
    },
  ],
  experience: [
    {
      company: "Seven Peaks",
      role: "Senior Data Engineer",
      period: "Jul 2023 – Present",
      description: [
        "Served as a Data Architect, providing consultation and implementing Data Warehouse, Data Lake, and Data Lakehouse solutions for Thai SMEs.",
        "Designed and deployed a Data Lakehouse solution for Thailand's largest telecommunications provider.",
        "Consulted and executed data migration involving over 50,000 clients and 100 million transactions in the financial services industry.",
      ],
    },
    {
      company: "KMS Solutions, Inc.",
      role: "Senior Data Engineer",
      period: "Jun 2019 – Apr 2023",
      description: [
        "Consulted, built, and maintained end-to-end data solutions and robust, scalable data pipelines.",
        "Participated in data warehouse design and contributed to report/dashboard ideation to support business decisions.",
        "Provided customer support, communicating directly with US and EU customers about technical solutions.",
      ],
    },
    {
      company: "KMS Solutions, Inc.",
      role: "Software Engineer",
      period: "Jul 2017 – Jun 2019",
      description: [
        "Built and maintained data migration tools to move data and reports from legacy systems to new platforms.",
        "Provided Application Integration solutions including SSO connections and embedded reports.",
        "Tech stack: Java, SQL Server, PostgreSQL, SSRS, and Pentaho.",
      ],
    },
  ],
  projects: [
    {
      title: "Visa Destination Insights",
      description:
        "A comprehensive analytics dashboard for tracking spending with VisaVue products.",
      techStack: ["GoodData", "Vertica", "Ruby", "SQL"],
      imageUrl:
        "https://placehold.co/800x500/0a0a1a/7C3AED?text=Visa+Destination+Insights",
      repoUrl: null,
      liveUrl:
        "https://corporate.visa.com/en/products/visa-destination-insights.html",
    },
    {
      title: "Fraud Detection Data Solution",
      description: "End-to-end data solution for credit-card fraud detection.",
      techStack: ["Vertica", "Python", "TensorFlow"],
      imageUrl: "https://placehold.co/800x500/0a0a1a/7C3AED?text=Fraud+Detection",
      repoUrl: null,
      liveUrl: null,
    },
    {
      title: "AI For Inventory",
      description:
        "Datamart for an AI-powered supply chain management (SCM) solution.",
      techStack: ["BigQuery", "Dataform", "GCP", "KubeFlow"],
      imageUrl: "https://placehold.co/800x500/0a0a1a/7C3AED?text=AI+For+Inventory",
      repoUrl: null,
      liveUrl: null,
    },
  ],
  education: [
    {
      degree: "Bachelor's Degree, Computer Software Engineering",
      institution: "HCM Education University",
      period: "2014 – 2018",
    },
  ],
  certifications: [
    {
      name: "SnowPro Core Certification",
      issuer: "Snowflake",
      issued: "Jun 2025",
      expires: "Jun 2027",
    },
    {
      name: "Microsoft Certified: Fabric Data Engineer Associate",
      issuer: "Microsoft",
      issued: "Feb 2025",
      expires: "Feb 2027",
      credentialId: "716BE394B8C2043B",
    },
  ],
  achievements: [
    { value: 8, suffix: "+", label: "Years of Experience" },
    { value: 100, suffix: "M+", label: "Transactions Migrated" },
    { value: 50, suffix: "K+", label: "Clients Migrated" },
  ],
};
