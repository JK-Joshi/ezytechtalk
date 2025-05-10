export interface Author {
  name: string;
  avatarUrl?: string;
}

export interface Blog {
  id: string;
  title: string;
  image: string; // URL to the image
  description: string; // Short summary
  blogContent: string; // Full content, can be markdown or HTML string
  author: Author;
  date: string; // ISO date string or human-readable
  category: "Technology" | "Programming" | "Automobiles" | "AI"; // Standardized categories
  displayPlacement?: "primary" | "secondary" | "general"; // New property
  // The 'section' property might be derived or handled by filtering based on category/date
  // For now, I'll include it if you want to manually assign posts to sections
  // section?: 'left' | 'center' | 'right'; 
}

export const blogsData: Blog[] = [
  {
    id: "blog-1",
    title: "The Next Leap in AI: GPT-5 and Beyond",
    image: "/Assets/BlogsImages/future_of_ai.jpg",
    description: "Exploring the potential of upcoming AI models and their impact on various industries.",
    blogContent: "<h2>The AI Frontier</h2><p>Content about the future of AI, GPT models, and ethical considerations...</p>",
    author: { name: "Dr. Ada Lovelace", avatarUrl: "https://source.unsplash.com/random/100x100?woman,scientist" },
    date: "2024-08-01",
    category: "AI",
    displayPlacement: "primary",
  },
  {
    id: "blog-2",
    title: "Understanding Quantum Computing: A Primer",
    image: "/Assets/BlogsImages/Quontom_Computing.webp",
    description: "Quantum computing explained in simple terms, covering qbits, superposition, and entanglement.",
    blogContent: "<h3>Quantum Basics</h3><p>Delving into the strange world of quantum mechanics and its computational power...</p>",
    author: { name: "Prof. Max Planck", avatarUrl: "https://source.unsplash.com/random/100x100?man,professor" },
    date: "2024-07-28",
    category: "Technology",
    displayPlacement: "primary",
  },
  {
    id: "blog-3",
    title: "Modern JavaScript Frameworks: 2024 Edition",
    image: "/Assets/BlogsImages/JSFrameworks.jpg",
    description: "A comprehensive review of the latest trends in JavaScript frameworks like React, Vue, and Svelte.",
    blogContent: "<h3>Frontend Evolution</h3><p>Comparing performance, learning curve, and community support for popular JS frameworks...</p>",
    author: { name: "Brendan Eich Jr.", avatarUrl: "https://source.unsplash.com/random/100x100?man,coder" },
    date: "2024-07-25",
    category: "Programming",
    displayPlacement: "primary",
  },
  {
    id: "blog-4",
    title: "The Rise of Electric Hypercars",
    image: "/Assets/BlogsImages/EVS_Raise.jpg", // Assuming this is a relevant image for hypercars
    description: "A look into the world of electric hypercars, pushing the boundaries of speed and technology.",
    blogContent: "<h3>Electric Speed Demons</h3><p>Showcasing the latest electric hypercars and their groundbreaking features...</p>",
    author: { name: "Enzo Tesla", avatarUrl: "https://source.unsplash.com/random/100x100?man,car" },
    date: "2024-07-22",
    category: "Automobiles",
    displayPlacement: "secondary",
  },
  {
    id: "blog-5",
    title: "Ethical AI: Navigating the Moral Landscape",
    image: "/Assets/BlogsImages/ethical_ai.jpg", // Placeholder, create if needed
    description: "Discussing the ethical challenges and considerations in the development and deployment of AI.",
    blogContent: "<h3>The Moral Compass of AI</h3><p>Debates on AI bias, job displacement, and responsible innovation...</p>",
    author: { name: "Dr. Sophia Ethics", avatarUrl: "https://source.unsplash.com/random/100x100?woman,philosopher" },
    date: "2024-07-20",
    category: "AI",
    displayPlacement: "secondary",
  },
  {
    id: "blog-6",
    title: "Sustainable Tech Solutions for a Better Future",
    image: "/Assets/BlogsImages/stastainable_tech.webp",
    description: "Highlighting innovative and sustainable technologies aimed at environmental protection.",
    blogContent: "<h3>Green Technology</h3><p>Exploring advancements in renewable energy, carbon capture, and sustainable materials...</p>",
    author: { name: "Eco Warrior", avatarUrl: "https://source.unsplash.com/random/100x100?person,nature" },
    date: "2024-07-18",
    category: "Technology",
    displayPlacement: "general",
  },
  {
    id: "blog-7",
    title: "Introduction to Python for Data Science",
    image: "/Assets/BlogsImages/Python.jpg", // Placeholder, create if needed
    description: "A beginner-friendly guide to using Python for data analysis and machine learning.",
    blogContent: "<h3>Python in Data</h3><p>Covering essential libraries like Pandas, NumPy, and Scikit-learn...</p>",
    author: { name: "Guido van Rossum II", avatarUrl: "https://source.unsplash.com/random/100x100?man,python" },
    date: "2024-07-15",
    category: "Programming",
    displayPlacement: "general",
  },
  {
    id: "blog-8",
    title: "The Evolution of Autonomous Driving",
    image: "/Assets/BlogsImages/autonomous_driving.webp", // Placeholder, create if needed
    description: "Tracing the history and future prospects of self-driving car technology.",
    blogContent: "<h3>Self-Driving Cars</h3><p>Levels of autonomy, key players, and societal impact...</p>",
    author: { name: "Karl Benz Reimagined", avatarUrl: "https://source.unsplash.com/random/100x100?person,autonomous" },
    date: "2024-07-12",
    category: "Automobiles",
    displayPlacement: "general",
  },
  {
    id: "blog-9",
    title: "AI in Healthcare: Revolutionizing Patient Care",
    image: "/Assets/BlogsImages/ai_healthcare.jpg", // Placeholder, create if needed
    description: "How artificial intelligence is transforming diagnostics, treatment, and medical research.",
    blogContent: "<h3>AI in Medicine</h3><p>Applications of AI in drug discovery, medical imaging, and personalized medicine...</p>",
    author: { name: "Dr. Hippocrates AI", avatarUrl: "https://source.unsplash.com/random/100x100?doctor,ai" },
    date: "2024-07-10",
    category: "AI",
    displayPlacement: "general",
  },
   {
    id: "blog-10",
    title: "Exploring the New M-Series Chipset",
    image: "/Assets/BlogsImages/m4_chip.jpg", // Assuming this is a general tech image
    description: "A deep dive into the architecture and performance of the latest M-series chipsets.",
    blogContent: "<p>Detailed analysis of the new M-series processors, benchmarks, and real-world performance...</p>",
    author: { name: "Chip Innovator", avatarUrl: "https://source.unsplash.com/random/100x100?person,chip" },
    date: "2024-07-05",
    category: "Technology",
    displayPlacement: "secondary", 
  }
];