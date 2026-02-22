export const COMPLETE_ROADMAP = [
  {
    id: 1,
    title: "Phase 1: Programming & Core Java Foundations",
    icon: "Terminal",
    deadline: "8-10 Weeks",
    color: "blue",
    topics: [
      {
        id: "p1-t1",
        title: "Programming Basics & Control Flows",
        completed: false,
        subtopics: [
          "Variables & Data Types (int, float, boolean, String)",
          "Operators (Arithmetic, Logical, Relational)",
          "Control Statements (if-else, switch)",
          "Loops (for, while, do-while, enhanced for)",
          "Break, Continue, Return statements"
        ],
        practiceQuestions: 15,
        resources: ["Oracle Java Tutorial", "Head First Java"]
      },
      {
        id: "p1-t2",
        title: "Object Oriented Programming (OOP)",
        completed: false,
        subtopics: [
          "Classes & Objects",
          "Encapsulation (private fields, getters/setters)",
          "Inheritance (extends, super keyword)",
          "Polymorphism (Method Overloading & Overriding)",
          "Abstraction (abstract classes, interfaces)",
          "this & super keywords",
          "Constructor overloading"
        ],
        practiceQuestions: 20,
        resources: ["Effective Java by Joshua Bloch"]
      },
      {
        id: "p1-t3",
        title: "Collections Framework & Generics",
        completed: false,
        subtopics: [
          "List (ArrayList, LinkedList, Vector)",
          "Set (HashSet, TreeSet, LinkedHashSet)",
          "Map (HashMap, TreeMap, LinkedHashMap)",
          "Queue & Deque",
          "Comparable & Comparator",
          "Collections utility methods",
          "Generics syntax and wildcards"
        ],
        practiceQuestions: 25,
        resources: ["Java Collections Framework Documentation"]
      },
      {
        id: "p1-t4",
        title: "Exception Handling & File I/O",
        completed: false,
        subtopics: [
          "try-catch-finally blocks",
          "throw vs throws",
          "Custom exceptions",
          "Checked vs Unchecked exceptions",
          "File reading (BufferedReader, Scanner)",
          "File writing (BufferedWriter, FileWriter)",
          "Try-with-resources"
        ],
        practiceQuestions: 12,
        resources: ["Exception Handling Best Practices"]
      },
      {
        id: "p1-t5",
        title: "Multithreading & Concurrency",
        completed: false,
        subtopics: [
          "Thread creation (extends Thread, implements Runnable)",
          "Thread lifecycle & states",
          "Synchronization (synchronized keyword)",
          "Inter-thread communication (wait, notify)",
          "ExecutorService & Thread Pools",
          "Callable & Future",
          "Race conditions & Deadlocks"
        ],
        practiceQuestions: 18,
        resources: ["Java Concurrency in Practice"]
      },
      {
        id: "p1-t6",
        title: "Java 8+ Features",
        completed: false,
        subtopics: [
          "Lambda Expressions",
          "Functional Interfaces (Predicate, Function, Consumer)",
          "Stream API (map, filter, reduce, collect)",
          "Method References",
          "Optional class",
          "Default & Static methods in interfaces",
          "Date/Time API (LocalDate, LocalDateTime)"
        ],
        practiceQuestions: 22,
        resources: ["Modern Java in Action"]
      }
    ],
    projects: [
      {
        id: "p1-proj1",
        name: "Console-based Student Management System",
        description: "CRUD operations with file persistence",
        difficulty: "Beginner",
        estimatedHours: 15,
        skills: ["OOP", "Collections", "File I/O", "Exception Handling"]
      },
      {
        id: "p1-proj2",
        name: "Library Management System",
        description: "Book checkout system with user authentication",
        difficulty: "Intermediate",
        estimatedHours: 20,
        skills: ["OOP", "Collections", "File I/O", "Search Algorithms"]
      },
      {
        id: "p1-proj3",
        name: "Multi-threaded File Processor",
        description: "Process multiple files concurrently with progress tracking",
        difficulty: "Intermediate",
        estimatedHours: 18,
        skills: ["Multithreading", "File I/O", "Synchronization"]
      }
    ]
  },
  {
    id: 2,
    title: "Phase 2: Database & Backend Foundations",
    icon: "Database",
    deadline: "10-12 Weeks",
    color: "green",
    topics: [
      {
        id: "p2-t1",
        title: "Relational Databases & SQL",
        completed: false,
        subtopics: [
          "SQL Basics (SELECT, INSERT, UPDATE, DELETE)",
          "Joins (INNER, LEFT, RIGHT, FULL OUTER)",
          "Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)",
          "GROUP BY & HAVING",
          "Subqueries & CTEs",
          "Indexing & Query Optimization",
          "Normalization (1NF, 2NF, 3NF)",
          "Transactions & ACID properties"
        ],
        practiceQuestions: 30,
        resources: ["PostgreSQL Documentation", "SQL Performance Explained"]
      },
      {
        id: "p2-t2",
        title: "JDBC & Database Connectivity",
        completed: false,
        subtopics: [
          "JDBC Architecture",
          "DriverManager & Connection",
          "Statement, PreparedStatement, CallableStatement",
          "ResultSet handling",
          "Transaction management",
          "Connection pooling",
          "SQL Injection prevention"
        ],
        practiceQuestions: 15,
        resources: ["JDBC Tutorial - Oracle"]
      },
      {
        id: "p2-t3",
        title: "Spring Core & Dependency Injection",
        completed: false,
        subtopics: [
          "IoC Container & Dependency Injection",
          "@Component, @Service, @Repository",
          "@Autowired, @Qualifier",
          "Bean lifecycle & scopes",
          "Configuration (@Configuration, @Bean)",
          "Property files & @Value",
          "Profiles (@Profile)"
        ],
        practiceQuestions: 18,
        resources: ["Spring Framework Documentation"]
      },
      {
        id: "p2-t4",
        title: "Spring Boot Essentials",
        completed: false,
        subtopics: [
          "Spring Boot Auto-configuration",
          "application.properties / application.yml",
          "Spring Boot Starters",
          "Embedded servers (Tomcat)",
          "Spring Boot DevTools",
          "Actuator for monitoring",
          "CommandLineRunner"
        ],
        practiceQuestions: 12,
        resources: ["Spring Boot Reference Guide"]
      },
      {
        id: "p2-t5",
        title: "REST API Development",
        completed: false,
        subtopics: [
          "@RestController, @RequestMapping",
          "@GetMapping, @PostMapping, @PutMapping, @DeleteMapping",
          "@PathVariable, @RequestParam, @RequestBody",
          "ResponseEntity & HTTP Status codes",
          "@Valid & Bean Validation",
          "Exception Handling (@ControllerAdvice, @ExceptionHandler)",
          "CORS configuration",
          "API versioning"
        ],
        practiceQuestions: 25,
        resources: ["REST API Design Best Practices"]
      },
      {
        id: "p2-t6",
        title: "Spring Data JPA & Hibernate",
        completed: false,
        subtopics: [
          "JPA annotations (@Entity, @Table, @Id)",
          "Entity relationships (@OneToMany, @ManyToOne, @ManyToMany)",
          "JpaRepository & CRUD operations",
          "Custom queries (@Query, JPQL)",
          "Pagination & Sorting",
          "Lazy vs Eager loading",
          "Transaction management (@Transactional)"
        ],
        practiceQuestions: 28,
        resources: ["Spring Data JPA Documentation"]
      },
      {
        id: "p2-t7",
        title: "Spring Security & JWT Authentication",
        completed: false,
        subtopics: [
          "Authentication vs Authorization",
          "Spring Security architecture",
          "UserDetailsService implementation",
          "Password encoding (BCryptPasswordEncoder)",
          "JWT token generation & validation",
          "SecurityFilterChain configuration",
          "Role-based access control (@PreAuthorize)",
          "CSRF protection"
        ],
        practiceQuestions: 20,
        resources: ["Spring Security Reference", "JWT.io"]
      }
    ],
    projects: [
      {
        id: "p2-proj1",
        name: "REST API for Task Manager",
        description: "Full CRUD with PostgreSQL, validation, and pagination",
        difficulty: "Intermediate",
        estimatedHours: 25,
        skills: ["Spring Boot", "REST API", "JPA", "PostgreSQL"]
      },
      {
        id: "p2-proj2",
        name: "JWT Authentication System",
        description: "User registration, login, role-based access",
        difficulty: "Advanced",
        estimatedHours: 30,
        skills: ["Spring Security", "JWT", "Authentication", "Authorization"]
      },
      {
        id: "p2-proj3",
        name: "Employee Management REST API",
        description: "Complete CRUD with search, filter, pagination",
        difficulty: "Intermediate",
        estimatedHours: 28,
        skills: ["Spring Boot", "JPA", "Query Methods", "Exception Handling"]
      }
    ]
  },
  {
    id: 3,
    title: "Phase 3: Frontend Development",
    icon: "Globe",
    deadline: "6-8 Weeks",
    color: "purple",
    topics: [
      {
        id: "p3-t1",
        title: "HTML5 & Semantic Markup",
        completed: false,
        subtopics: [
          "Semantic HTML elements (header, nav, main, section, article)",
          "Forms & Input types",
          "HTML5 APIs (localStorage, sessionStorage)",
          "Meta tags & SEO basics",
          "Accessibility (ARIA labels, alt text)"
        ],
        practiceQuestions: 10,
        resources: ["MDN HTML Documentation"]
      },
      {
        id: "p3-t2",
        title: "CSS3 & Modern Layouts",
        completed: false,
        subtopics: [
          "CSS Selectors & Specificity",
          "Box Model & Display properties",
          "Flexbox layout",
          "CSS Grid layout",
          "Responsive design & Media queries",
          "CSS Variables",
          "Animations & Transitions",
          "Pseudo-classes & Pseudo-elements"
        ],
        practiceQuestions: 15,
        resources: ["CSS-Tricks", "Flexbox Froggy", "Grid Garden"]
      },
      {
        id: "p3-t3",
        title: "JavaScript Fundamentals & ES6+",
        completed: false,
        subtopics: [
          "Variables (let, const) & Scope",
          "Data types & Type coercion",
          "Functions & Arrow functions",
          "Arrays & Array methods (map, filter, reduce)",
          "Objects & Destructuring",
          "Spread & Rest operators",
          "Template literals",
          "Promises & async/await",
          "Modules (import/export)"
        ],
        practiceQuestions: 25,
        resources: ["JavaScript.info", "You Don't Know JS"]
      },
      {
        id: "p3-t4",
        title: "DOM Manipulation & Events",
        completed: false,
        subtopics: [
          "Selecting elements (querySelector, getElementById)",
          "Creating & modifying elements",
          "Event listeners & Event delegation",
          "Form handling & validation",
          "Local Storage API",
          "Fetch API for HTTP requests"
        ],
        practiceQuestions: 18,
        resources: ["MDN DOM Documentation"]
      },
      {
        id: "p3-t5",
        title: "React Fundamentals",
        completed: false,
        subtopics: [
          "JSX syntax & expressions",
          "Components (Functional vs Class)",
          "Props & Props drilling",
          "State with useState",
          "Event handling in React",
          "Conditional rendering",
          "Lists & Keys",
          "Forms & Controlled components"
        ],
        practiceQuestions: 22,
        resources: ["React Official Documentation", "React Beta Docs"]
      },
      {
        id: "p3-t6",
        title: "React Hooks & Advanced Patterns",
        completed: false,
        subtopics: [
          "useEffect hook & lifecycle",
          "useContext for state sharing",
          "useReducer for complex state",
          "useRef for DOM access",
          "Custom hooks",
          "useMemo & useCallback optimization",
          "React Router (routing, navigation, params)",
          "Code splitting & Lazy loading"
        ],
        practiceQuestions: 20,
        resources: ["React Hooks Documentation", "React Router Docs"]
      },
      {
        id: "p3-t7",
        title: "State Management & API Integration",
        completed: false,
        subtopics: [
          "Zustand / Redux basics",
          "Actions, Reducers, Store",
          "Async actions with Redux Thunk",
          "Axios for HTTP requests",
          "API integration patterns",
          "Error handling & Loading states",
          "Optimistic updates",
          "Token-based authentication flow"
        ],
        practiceQuestions: 18,
        resources: ["Zustand Docs", "Redux Toolkit Docs"]
      },
      {
        id: "p3-t8",
        title: "Styling & UI Libraries",
        completed: false,
        subtopics: [
          "Tailwind CSS utility classes",
          "Responsive design with Tailwind",
          "Component libraries (shadcn/ui, Material-UI)",
          "CSS-in-JS (styled-components)",
          "Dark mode implementation"
        ],
        practiceQuestions: 10,
        resources: ["Tailwind CSS Docs", "shadcn/ui"]
      }
    ],
    projects: [
      {
        id: "p3-proj1",
        name: "Personal Portfolio Website",
        description: "Responsive portfolio with projects showcase",
        difficulty: "Beginner",
        estimatedHours: 20,
        skills: ["HTML", "CSS", "JavaScript", "Responsive Design"]
      },
      {
        id: "p3-proj2",
        name: "Task Tracker UI with React",
        description: "Complete task management with local storage",
        difficulty: "Intermediate",
        estimatedHours: 25,
        skills: ["React", "Hooks", "State Management", "Local Storage"]
      },
      {
        id: "p3-proj3",
        name: "Full-Stack Integration Project",
        description: "Connect React frontend to Spring Boot backend",
        difficulty: "Advanced",
        estimatedHours: 35,
        skills: ["React", "Axios", "JWT Auth", "REST API Integration"]
      }
    ]
  },
  {
    id: 4,
    title: "Phase 4: DevOps & Deployment",
    icon: "Cpu",
    deadline: "4-6 Weeks",
    color: "orange",
    topics: [
      {
        id: "p4-t1",
        title: "Git & Version Control",
        completed: false,
        subtopics: [
          "Git basics (init, add, commit, push, pull)",
          "Branching strategy (feature, develop, main)",
          "Merge vs Rebase",
          "Resolving merge conflicts",
          "Git workflow (Gitflow, GitHub Flow)",
          "Pull requests & Code reviews",
          ".gitignore best practices",
          "Git tags & releases"
        ],
        practiceQuestions: 15,
        resources: ["Pro Git Book", "GitHub Docs"]
      },
      {
        id: "p4-t2",
        title: "Docker Fundamentals",
        completed: false,
        subtopics: [
          "Docker architecture & containers",
          "Dockerfile syntax",
          "Building images (docker build)",
          "Running containers (docker run)",
          "Container lifecycle management",
          "Docker volumes & networking",
          "Multi-stage builds",
          "Docker Hub & image registries"
        ],
        practiceQuestions: 18,
        resources: ["Docker Official Docs", "Docker for Beginners"]
      },
      {
        id: "p4-t3",
        title: "Dockerizing Applications",
        completed: false,
        subtopics: [
          "Dockerizing Spring Boot applications",
          "Dockerizing React applications",
          "Environment variables in Docker",
          "Docker Compose basics",
          "Multi-container applications",
          "Docker Compose networking",
          "docker-compose.yml configuration"
        ],
        practiceQuestions: 12,
        resources: ["Docker Compose Documentation"]
      },
      {
        id: "p4-t4",
        title: "CI/CD with GitHub Actions",
        completed: false,
        subtopics: [
          "GitHub Actions workflow syntax",
          "Automated testing in CI",
          "Building Docker images in CI",
          "Deploying to cloud platforms",
          "Environment secrets management",
          "Workflow triggers (push, pull_request)",
          "Matrix builds for multiple versions"
        ],
        practiceQuestions: 10,
        resources: ["GitHub Actions Documentation"]
      },
      {
        id: "p4-t5",
        title: "Cloud Deployment",
        completed: false,
        subtopics: [
          "Deploying to Render (Backend)",
          "Deploying to Vercel (Frontend)",
          "AWS EC2 basics",
          "Environment configuration",
          "Database hosting (Supabase, Railway)",
          "Domain & DNS configuration",
          "SSL/TLS certificates",
          "Monitoring & logging"
        ],
        practiceQuestions: 12,
        resources: ["Render Docs", "Vercel Docs", "AWS Getting Started"]
      },
      {
        id: "p4-t6",
        title: "Nginx & Reverse Proxy",
        completed: false,
        subtopics: [
          "Nginx installation & configuration",
          "Reverse proxy setup",
          "Load balancing basics",
          "SSL configuration with Let's Encrypt",
          "Static file serving",
          "Nginx logs & monitoring"
        ],
        practiceQuestions: 8,
        resources: ["Nginx Documentation"]
      }
    ],
    projects: [
      {
        id: "p4-proj1",
        name: "Full-Stack Deployment Pipeline",
        description: "Deploy complete application with CI/CD",
        difficulty: "Advanced",
        estimatedHours: 30,
        skills: ["Docker", "GitHub Actions", "Render", "Vercel"]
      },
      {
        id: "p4-proj2",
        name: "Multi-Container Application",
        description: "Backend, Frontend, Database with Docker Compose",
        difficulty: "Advanced",
        estimatedHours: 25,
        skills: ["Docker Compose", "Container Networking", "Volumes"]
      }
    ]
  },
  {
    id: 5,
    title: "Phase 5: Advanced Engineering & Architecture",
    icon: "Award",
    deadline: "8 Weeks",
    color: "red",
    topics: [
      {
        id: "p5-t1",
        title: "System Design Fundamentals",
        completed: false,
        subtopics: [
          "Scalability concepts (vertical vs horizontal)",
          "Load balancing strategies",
          "Database sharding & replication",
          "Caching strategies",
          "CDN usage",
          "Message queues (RabbitMQ, Kafka basics)",
          "Microservices vs Monolith",
          "CAP theorem"
        ],
        practiceQuestions: 20,
        resources: ["System Design Interview", "Designing Data-Intensive Applications"]
      },
      {
        id: "p5-t2",
        title: "Caching with Redis",
        completed: false,
        subtopics: [
          "Redis data structures",
          "Spring Boot Redis integration",
          "Cache-aside pattern",
          "Cache invalidation strategies",
          "Redis as session store",
          "Redis pub/sub basics"
        ],
        practiceQuestions: 12,
        resources: ["Redis Documentation", "Spring Data Redis"]
      },
      {
        id: "p5-t3",
        title: "API Design & Best Practices",
        completed: false,
        subtopics: [
          "RESTful API principles",
          "API versioning strategies",
          "Pagination & filtering",
          "Rate limiting",
          "API documentation (Swagger/OpenAPI)",
          "HATEOAS principles",
          "GraphQL basics"
        ],
        practiceQuestions: 15,
        resources: ["REST API Design Rulebook", "OpenAPI Specification"]
      },
      {
        id: "p5-t4",
        title: "Security Best Practices",
        completed: false,
        subtopics: [
          "OWASP Top 10 vulnerabilities",
          "SQL Injection prevention",
          "XSS & CSRF protection",
          "Secure password storage",
          "API key management",
          "OAuth 2.0 & OpenID Connect",
          "Security headers",
          "Input validation & sanitization"
        ],
        practiceQuestions: 18,
        resources: ["OWASP Guide", "Spring Security Best Practices"]
      },
      {
        id: "p5-t5",
        title: "Testing & Quality Assurance",
        completed: false,
        subtopics: [
          "Unit testing with JUnit 5",
          "Mockito for mocking",
          "Integration testing",
          "Test-driven development (TDD)",
          "Testing REST APIs",
          "Test coverage with JaCoCo",
          "Frontend testing (Jest, React Testing Library)"
        ],
        practiceQuestions: 20,
        resources: ["JUnit 5 User Guide", "Mockito Documentation"]
      },
      {
        id: "p5-t6",
        title: "Clean Architecture & Design Patterns",
        completed: false,
        subtopics: [
          "SOLID principles",
          "Layered architecture",
          "Repository pattern",
          "Service layer pattern",
          "DTO pattern",
          "Factory pattern",
          "Singleton pattern",
          "Strategy pattern",
          "Clean Code principles"
        ],
        practiceQuestions: 15,
        resources: ["Clean Architecture by Robert Martin", "Design Patterns"]
      },
      {
        id: "p5-t7",
        title: "Microservices Architecture",
        completed: false,
        subtopics: [
          "Microservices principles",
          "Service discovery (Eureka)",
          "API Gateway pattern",
          "Inter-service communication",
          "Circuit breaker pattern (Resilience4j)",
          "Distributed tracing",
          "Saga pattern for transactions"
        ],
        practiceQuestions: 12,
        resources: ["Spring Cloud Documentation", "Microservices Patterns"]
      },
      {
        id: "p5-t8",
        title: "Performance Optimization",
        completed: false,
        subtopics: [
          "Database query optimization",
          "Connection pooling",
          "Lazy loading vs Eager loading",
          "N+1 query problem",
          "Frontend performance (code splitting, lazy loading)",
          "Profiling & monitoring tools",
          "Memory management"
        ],
        practiceQuestions: 10,
        resources: ["Java Performance Tuning", "Web Performance"]
      }
    ],
    projects: [
      {
        id: "p5-proj1",
        name: "Enterprise E-Commerce Platform",
        description: "Production-ready full-stack application with all best practices",
        difficulty: "Expert",
        estimatedHours: 80,
        skills: [
          "Spring Boot",
          "React",
          "PostgreSQL",
          "Redis",
          "JWT",
          "Docker",
          "CI/CD",
          "Testing",
          "Security"
        ]
      },
      {
        id: "p5-proj2",
        name: "Microservices-based Blog Platform",
        description: "Multiple services with API Gateway and service discovery",
        difficulty: "Expert",
        estimatedHours: 70,
        skills: [
          "Microservices",
          "Spring Cloud",
          "Docker Compose",
          "Message Queue",
          "Distributed Systems"
        ]
      }
    ]
  }
];

export const LEARNING_TECHNIQUES = [
  {
    id: 1,
    title: "Active Learning Over Passive Watching",
    icon: "Code2",
    description: "Don't just watch tutorials. Code along, break things, fix them. The debugger is your teacher.",
    tips: [
      "After watching a concept, implement it from scratch without looking",
      "Intentionally introduce bugs and practice debugging",
      "Explain the concept to yourself out loud (rubber ducking)"
    ]
  },
  {
    id: 2,
    title: "The 70-20-10 Learning Model",
    icon: "BarChart3",
    description: "70% hands-on coding, 20% learning from others (code reviews, blogs), 10% formal study.",
    tips: [
      "Spend most time building projects, not watching videos",
      "Read open-source code on GitHub weekly",
      "Theory is important, but practice cements knowledge"
    ]
  },
  {
    id: 3,
    title: "Documentation-First Approach",
    icon: "BookText",
    description: "Before StackOverflow, read official docs. Oracle, Spring, React docs are your primary source.",
    tips: [
      "Bookmark official documentation sites",
      "Spend 15 minutes with docs before searching solutions",
      "Official docs teach patterns, not just solutions"
    ]
  },
  {
    id: 4,
    title: "Rubber Duck Debugging",
    icon: "Cpu",
    description: "Explain your code line-by-line to an object. You'll spot logic gaps before running the code.",
    tips: [
      "Keep a rubber duck or any object on your desk",
      "Explain each function's purpose and logic flow",
      "Often, the bug reveals itself during explanation"
    ]
  },
  {
    id: 5,
    title: "Build Before You're Ready",
    icon: "Rocket",
    description: "Don't wait to 'know everything'. Start projects early, Google as you go. Struggle = Learning.",
    tips: [
      "Pick a project slightly above your current level",
      "Break it into smallest possible tasks",
      "Each error message is a learning opportunity"
    ]
  },
  {
    id: 6,
    title: "Deep Trace, Don't Just Fix",
    icon: "Search",
    description: "Don't just fix errors. Use the debugger to trace WHY the memory state caused that error.",
    tips: [
      "Set breakpoints and inspect variable values",
      "Understand the call stack and execution flow",
      "Ask: 'What assumptions did I make that were wrong?'"
    ]
  },
  {
    id: 7,
    title: "Clean Code is a Habit, Not a Phase",
    icon: "Sparkles",
    description: "Refactor after it works. Meaningful names, small functions, no magic numbers.",
    tips: [
      "Variable names should explain 'why', not 'what type'",
      "Functions should do one thing and do it well",
      "Refactor immediately after getting code to work"
    ]
  },
  {
    id: 8,
    title: "Version Everything, Commit Often",
    icon: "GitBranch",
    description: "Git isn't just for teams. Commit after every working feature. Your future self will thank you.",
    tips: [
      "Commit every 30-60 minutes of work",
      "Write meaningful commit messages",
      "Use branches for experiments"
    ]
  },
  {
    id: 9,
    title: "Teach What You Learn",
    icon: "Users",
    description: "Write blog posts, create README files, or explain concepts in Discord. Teaching solidifies knowledge.",
    tips: [
      "Start a dev blog (even if no one reads it)",
      "Write detailed README files for your projects",
      "Answer questions on Stack Overflow or Reddit"
    ]
  },
  {
    id: 10,
    title: "Consistency Over Intensity",
    icon: "Calendar",
    description: "2 hours daily beats 14 hours on weekends. Spaced repetition builds neural pathways.",
    tips: [
      "Code every single day, even if just 30 minutes",
      "Track your streak (like this app does)",
      "Small daily progress compounds exponentially"
    ]
  }
];

export const INITIAL_STATS = {
  totalLearningHours: 0,
  skillsMastered: 0,
  totalSkills: 0,
  currentStreak: 0,
  longestStreak: 0,
  projectsCompleted: 0,
  totalProjects: 0
};

export const ACTIVITY_DATA = [
  { day: 'Mon', hrs: 0 },
  { day: 'Tue', hrs: 0 },
  { day: 'Wed', hrs: 0 },
  { day: 'Thu', hrs: 0 },
  { day: 'Fri', hrs: 0 },
  { day: 'Sat', hrs: 0 },
  { day: 'Sun', hrs: 0 }
];
