export const defaultData = {
  contact: {
    email: 'luca.enea@example.com',
    phone: '+1 (555) 019-8472',
    location: 'San Francisco, CA',
    github: 'github.com/lucaenea',
    githubLink: '#'
  },
  projects: [
    {
      id: '1',
      title: 'AI Product Validator',
      period: '2024 - 2025',
      description: 'A comprehensive web application designed to validate product hypotheses leveraging the Claude API for deep market analysis and logical inference.',
      tags: 'React, Node.js, Claude API, MongoDB, Tailwind, Figma',
      colorClass: 'primary',
      imageUrl: '',
      link: 'https://ai-product-validator-drab.vercel.app/'
    },
    {
      id: '2',
      title: 'AI Travel Planner',
      period: '2024',
      description: 'Intelligent platform integrating the Gemini API to dynamically generate personalized, constraint-optimized travel itineraries based on natural language input.',
      tags: 'React, Firebase, Gemini API, MongoDB, Tailwind',
      colorClass: 'secondary',
      imageUrl: '',
      link: 'https://aitraveler.vercel.app/'
    },
    {
      id: '3',
      title: 'E-commerce Web App',
      period: '2023',
      description: 'A scalable full-stack application featuring complex state management for dynamic catalogs, secure cart processing, and a robust microservices backend.',
      tags: 'React, Node.js, Express, MongoDB, Tailwind',
      colorClass: 'outline',
      imageUrl: '',
      link: ''
    }
  ],
  experience: [
    {
      id: '1',
      title: 'Freelance Full Stack Developer',
      company: 'Self-Employed',
      period: '2023 - Present',
      points: 'Designed modern, user-centric interfaces using Figma.\nEngineered scalable architectures with Next.js, TypeScript.\nIntegrated advanced AI APIs (OpenAI, Anthropic) to build intelligent features.\nLeveraged Cursor and Claude to rapidly iterate.',
      tags: 'Next.js, TypeScript, AI Integration'
    }
  ],
  education: [
    {
      id: '1',
      title: 'ITI "Ettore Majorana"',
      subtitle: 'Diploma in Informatics',
      description: 'Foundational studies in computer science, algorithms, and software development methodologies.'
    },
    {
      id: '2',
      title: 'Harvard University',
      subtitle: 'CS50 Certification',
      description: 'Introduction to the intellectual enterprises of computer science and the art of programming.'
    },
    {
      id: '3',
      title: 'Microsales Academy',
      subtitle: 'E-commerce Specialization',
      description: 'Practical project-based learning focused on building and scaling e-commerce platforms.'
    }
  ],
  skills: [
    {
      id: '1',
      title: 'Frontend',
      icon: 'desktop_windows',
      colorClass: 'primary',
      items: 'HTML, CSS, React, Next.js, Tailwind'
    },
    {
      id: '2',
      title: 'Backend',
      icon: 'dns',
      colorClass: 'secondary',
      items: 'Node.js, PHP, Laravel, REST API'
    },
    {
      id: '3',
      title: 'Database',
      icon: 'database',
      colorClass: 'primary',
      items: 'MongoDB, MySQL, Firebase'
    },
    {
      id: '4',
      title: 'AI Tools',
      icon: 'smart_toy',
      colorClass: 'secondary',
      items: 'Claude API, OpenAI, Gemini, Prompt Eng.'
    },
    {
      id: '5',
      title: 'Design',
      icon: 'design_services',
      colorClass: 'primary',
      items: 'Figma, Photoshop'
    },
    {
      id: '6',
      title: 'DevOps',
      icon: 'terminal',
      colorClass: 'secondary',
      items: 'Git, GitHub, Vercel'
    }
  ]
};
