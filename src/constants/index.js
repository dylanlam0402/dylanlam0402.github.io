const navLinks = [
  { name: "Work", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
];

const words = [
  { text: "Data", imgPath: "/images/ideas.svg" },
  { text: "Pipelines", imgPath: "/images/concepts.svg" },
  { text: "Insights", imgPath: "/images/designs.svg" },
  { text: "Analytics", imgPath: "/images/code.svg" },
  { text: "Data", imgPath: "/images/ideas.svg" },
  { text: "Pipelines", imgPath: "/images/concepts.svg" },
  { text: "Insights", imgPath: "/images/designs.svg" },
  { text: "Analytics", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 8, suffix: "+", label: "Years of Experience" },
  { value: 3, suffix: "+", label: "Companies Worked" },
  { value: 10, suffix: "+", label: "Completed Projects" },
  { value: 100, suffix: "M+", label: "Records Processed" },
];

const logoIconsList = [
  { imgPath: "/images/logos/company-logo-1.png" },
  { imgPath: "/images/logos/company-logo-2.png" },
  { imgPath: "/images/logos/company-logo-3.png" },
  { imgPath: "/images/logos/company-logo-4.png" },
  { imgPath: "/images/logos/company-logo-5.png" },
  { imgPath: "/images/logos/company-logo-6.png" },
  { imgPath: "/images/logos/company-logo-7.png" },
  { imgPath: "/images/logos/company-logo-8.png" },
  { imgPath: "/images/logos/company-logo-9.png" },
  { imgPath: "/images/logos/company-logo-10.png" },
  { imgPath: "/images/logos/company-logo-11.png" },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Data Quality",
    desc: "Designing reliable pipelines with data validation and monitoring at every step.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Clear Communication",
    desc: "Translating complex data problems into business language for stakeholders.",
  },
  {
    imgPath: "/images/time.png",
    title: "Scalable Architecture",
    desc: "Building end-to-end data solutions that grow with your business needs.",
  },
];

const techStackIcons = [
  {
    name: "Data Pipelines",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Cloud Platforms",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Analytics & BI",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Version Control",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "Kiet delivered outstanding data architecture and lakehouse solutions for our enterprise clients, demonstrating deep expertise in modern data platforms.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Senior Data Engineer",
    date: "Jul 2023 - Present",
    responsibilities: [
      "Served as a Data Architect, providing consultation and implementing Data Warehouse, Data Lake, and Data Lakehouse solutions for Thai SMEs.",
      "Designed and deployed a Data Lakehouse solution for Thailand's largest telecommunications provider.",
      "Consulted and executed data migration involving over 50,000 clients and 100 million transactions in the financial services industry.",
    ],
  },
  {
    review:
      "Kiet consistently built scalable, maintainable data pipelines and contributed significantly to our data warehouse architecture.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Senior Data Engineer",
    date: "Jun 2019 - Apr 2023",
    responsibilities: [
      "Consulted, built, and maintained end-to-end data solutions and robust, scalable data pipelines.",
      "Participated in data warehouse design and contributed to report/dashboard ideation to support business decisions.",
      "Provided customer support, communicating directly with US and EU customers about technical solutions.",
    ],
  },
  {
    review:
      "Kiet showed strong software engineering fundamentals and played a key role in data migration and integration projects.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Software Engineer",
    date: "Jul 2017 - Jun 2019",
    responsibilities: [
      "Built and maintained data migration tools to move data and reports from legacy systems to new platforms.",
      "Provided Application Integration solutions, including developing SSO connections and embedded reports.",
      "Utilized a technical stack including Java, SQL Server, PostgreSQL, SSRS, and Pentaho.",
    ],
  },
];

const expLogos = [
  { name: "logo1", imgPath: "/images/logo1.png" },
  { name: "logo2", imgPath: "/images/logo2.png" },
  { name: "logo3", imgPath: "/images/logo3.png" },
];

const testimonials = [];

const socialImgs = [
  { name: "linkedin", imgPath: "/images/linkedin.png" },
  { name: "github", imgPath: "/images/x.png" },
];

const projects = [
  {
    title: "Visa Destination Insights",
    description:
      "A comprehensive analytics dashboard for tracking spending with VisaVue products.",
    techStack: ["GoodData", "Vertica", "Ruby", "SQL"],
    imgPath: "/images/project1.png",
    liveUrl: "https://corporate.visa.com/en/products/visa-destination-insights.html",
  },
  {
    title: "Fraud Detection Data Solution",
    description: "End-to-end data solution for credit-card fraud detection.",
    techStack: ["Vertica", "Python", "TensorFlow"],
    imgPath: "/images/project2.png",
    liveUrl: null,
  },
  {
    title: "AI For Inventory",
    description:
      "Datamart for an AI-powered supply chain management (SCM) solution.",
    techStack: ["BigQuery", "Dataform", "GCP", "KubeFlow"],
    imgPath: "/images/project3.png",
    liveUrl: null,
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  navLinks,
  projects,
};
