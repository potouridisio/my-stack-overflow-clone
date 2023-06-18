const answers = [
  {
    body: "One of the recommended ways to loop through an array in JavaScript is to use the 'forEach' method. It provides a more concise syntax and handles the iteration automatically. Here's an example:",
    createdAt: "2023-05-21T12:15:00Z",
    id: 1,
    questionId: 1,
    updatedAt: "2023-05-22T09:45:00Z",
    userId: 2,
  },
  {
    body: "When it comes to responsive web design, using CSS media queries is a common approach. You can define different CSS rules based on the screen size or device type. Here's an example of a media query:",
    createdAt: "2023-05-22T10:30:00Z",
    id: 2,
    questionId: 2,
    updatedAt: "2023-05-23T08:20:00Z",
    userId: 3,
  },
  {
    body: "In addition to CSS media queries, you can leverage CSS frameworks like Bootstrap or Foundation that provide responsive design components and grid systems. These frameworks offer pre-defined CSS classes that you can use to build responsive layouts more easily.",
    createdAt: "2023-05-22T15:45:00Z",
    id: 3,
    questionId: 2,
    updatedAt: "2023-05-23T09:50:00Z",
    userId: 1,
  },
  {
    body: "Another tip for responsive web design is to use relative units like percentages or 'em' instead of fixed pixel values for sizing elements. This allows the content to adapt to different screen sizes more effectively.",
    createdAt: "2023-05-23T11:20:00Z",
    id: 4,
    questionId: 2,
    updatedAt: "2023-05-24T07:55:00Z",
    userId: 2,
  },
  {
    body: "Both JWT and OAuth are widely used authentication methods. JWT (JSON Web Tokens) is a compact and self-contained token format that can securely transmit information between parties. OAuth is an open standard for authorization that allows users to grant third-party applications limited access to their resources.",
    createdAt: "2023-05-23T16:10:00Z",
    id: 5,
    questionId: 3,
    updatedAt: "2023-05-24T09:30:00Z",
    userId: 3,
  },
  {
    body: "The choice between JWT and OAuth depends on the specific requirements of your project. JWT is simpler to implement and is suitable for scenarios where you have full control over the authentication process. OAuth, on the other hand, is more complex but provides additional features like delegated authorization and centralized user management.",
    createdAt: "2023-05-23T18:25:00Z",
    id: 6,
    questionId: 3,
    updatedAt: "2023-05-24T11:45:00Z",
    userId: 1,
  },
  {
    body: "When it comes to database normalization, it's essential to follow a set of best practices. Here are a few guidelines:",
    createdAt: "2023-05-24T10:05:00Z",
    id: 7,
    questionId: 4,
    updatedAt: "2023-05-24T15:20:00Z",
    userId: 2,
  },
  {
    body: "1. Identify the entities and their relationships: Start by identifying the entities in your system and how they relate to each other.",
    createdAt: "2023-05-24T12:30:00Z",
    id: 8,
    questionId: 4,
    updatedAt: "2023-05-25T08:40:00Z",
    userId: 1,
  },
  {
    body: "2. Eliminate data redundancy: Ensure that each piece of data is stored only once to avoid data inconsistencies and save storage space.",
    createdAt: "2023-05-24T14:15:00Z",
    id: 9,
    questionId: 4,
    updatedAt: "2023-05-25T09:20:00Z",
    userId: 3,
  },
  {
    body: "3. Use primary keys and foreign keys: Establish relationships between tables using primary keys and foreign keys to maintain data integrity.",
    createdAt: "2023-05-24T16:40:00Z",
    id: 10,
    questionId: 4,
    updatedAt: "2023-05-25T10:05:00Z",
    userId: 2,
  },
  {
    body: "JavaScript Promises provide a way to handle asynchronous operations. They represent a value that may not be available yet, but will be resolved in the future. Here's an example of using a Promise:",
    createdAt: "2023-05-26T12:30:00Z",
    id: 11,
    questionId: 5,
    updatedAt: "2023-05-26T15:45:00Z",
    userId: 2,
  },
  {
    body: "Async/await is a modern JavaScript feature that simplifies asynchronous code. It allows you to write asynchronous code that looks and behaves more like synchronous code, making it easier to understand and maintain. Here's an example:",
    createdAt: "2023-05-26T16:00:00Z",
    id: 12,
    questionId: 5,
    updatedAt: "2023-05-26T18:20:00Z",
    userId: 1,
  },
];

const questions = [
  {
    answerCount: 1,
    body: "I have an array of items and need to iterate over them. Currently, I'm using a simple for loop, but I'm wondering if there are any other methods or techniques that can provide better performance or more concise syntax. What are the recommended ways to loop through an array in JavaScript?",
    createdAt: "2023-05-20T11:30:00Z",
    id: 1,
    title: "How to loop through an array in JavaScript?",
    updatedAt: "2023-05-21T09:30:00Z",
    userId: 1,
    voteCount: 10,
  },
  {
    answerCount: 3,
    body: "I want to make my website responsive to different screen sizes and devices. Are there any recommended practices or frameworks that can help me achieve responsive design efficiently? I have heard about CSS media queries, but I'm not sure how to use them effectively. Any tips or examples would be appreciated!",
    createdAt: "2023-05-21T14:30:00Z",
    id: 2,
    title: "What are the best practices for responsive web design?",
    updatedAt: "2023-05-22T10:15:00Z",
    userId: 2,
    voteCount: 5,
  },
  {
    answerCount: 2,
    body: "I'm developing an API for my web application, and I want to add authentication to restrict access to authorized users only. I have looked into different authentication methods like JWT and OAuth, but I'm not sure which one to choose. What are the pros and cons of each method, and which one would be more suitable for my project?",
    createdAt: "2023-05-22T18:45:00Z",
    id: 3,
    title: "How to secure an API with authentication?",
    updatedAt: "2023-05-23T09:05:00Z",
    userId: 3,
    voteCount: 7,
  },
  {
    answerCount: 4,
    body: "I'm designing a database schema for a complex application, and I want to ensure proper normalization to avoid data redundancy and improve query performance. Are there any specific best practices or guidelines that I should follow?",
    createdAt: "2023-05-23T09:20:00Z",
    id: 4,
    title: "What are the best practices for database normalization?",
    updatedAt: "2023-05-23T14:35:00Z",
    userId: 1,
    voteCount: 12,
  },
  {
    answerCount: 2,
    body: "My website is running slow, and I want to improve its performance. I have already implemented some basic optimizations, but I'm looking for more advanced techniques or tools that can help me achieve better results. Any suggestions?",
    createdAt: "2023-05-24T15:30:00Z",
    id: 5,
    title: "How to optimize website performance?",
    updatedAt: "2023-05-24T17:45:00Z",
    userId: 2,
    voteCount: 8,
  },
];

const questionsTags = [
  {
    id: 1,
    questionId: 1,
    tagId: 1,
  },
  {
    id: 2,
    questionId: 1,
    tagId: 3,
  },
  {
    id: 3,
    questionId: 2,
    tagId: 2,
  },
  {
    id: 4,
    questionId: 2,
    tagId: 3,
  },
  {
    id: 5,
    questionId: 3,
    tagId: 1,
  },
  {
    id: 6,
    questionId: 3,
    tagId: 5,
  },
  {
    id: 7,
    questionId: 4,
    tagId: 3,
  },
  {
    id: 8,
    questionId: 4,
    tagId: 7,
  },
  {
    id: 9,
    questionId: 5,
    tagId: 2,
  },
  {
    id: 10,
    questionId: 5,
    tagId: 4,
  },
  {
    id: 11,
    questionId: 5,
    tagId: 6,
  },
];

const tags = [
  {
    createdAt: "2023-05-20T11:30:00Z",
    description:
      "A programming language commonly used for client-side and server-side web development.",
    id: 1,
    name: "javascript",
    occurrenceCount: 2,
  },
  {
    createdAt: "2023-05-21T14:30:00Z",
    description:
      "The standard markup language for creating web pages and web applications.",
    id: 2,
    name: "html",
    occurrenceCount: 2,
  },
  {
    createdAt: "2023-05-20T11:30:00Z",
    description:
      "A style sheet language used for describing the look and formatting of a document written in HTML.",
    id: 3,
    name: "css",
    occurrenceCount: 3,
  },
  {
    createdAt: "2023-05-24T15:30:00Z",
    description:
      "A high-level programming language known for its readability and versatility.",
    id: 4,
    name: "python",
    occurrenceCount: 1,
  },
  {
    createdAt: "2023-05-22T18:45:00Z",
    description:
      "A widely-used programming language commonly used for building enterprise-scale applications.",
    id: 5,
    name: "java",
    occurrenceCount: 1,
  },
  {
    createdAt: "2023-05-24T15:30:00Z",
    description:
      "A server-side scripting language primarily used for web development.",
    id: 6,
    name: "php",
    occurrenceCount: 1,
  },
  {
    createdAt: "2023-05-23T09:20:00Z",
    description:
      "A powerful general-purpose programming language often used for system-level programming and game development.",
    id: 7,
    name: "c++",
    occurrenceCount: 1,
  },
  {
    createdAt: null,
    description:
      "A dynamic, object-oriented programming language known for its simplicity and productivity.",
    id: 8,
    name: "ruby",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A programming language used for developing iOS, macOS, watchOS, and tvOS applications.",
    id: 9,
    name: "swift",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A strongly typed superset of JavaScript that compiles to plain JavaScript.",
    id: 10,
    name: "typescript",
    occurrenceCount: 0,
  },
  // New tags (without duplicates)
  {
    createdAt: null,
    description:
      "A versatile programming language commonly used for data analysis and machine learning.",
    id: 11,
    name: "python3",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A declarative language used for querying and manipulating data in databases.",
    id: 12,
    name: "sql",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A lightweight markup language used for creating structured documents and web content.",
    id: 13,
    name: "markdown",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A version control system used for tracking changes in source code.",
    id: 14,
    name: "git",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A popular web framework for building scalable and maintainable applications.",
    id: 15,
    name: "react",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A framework for building cross-platform mobile applications using JavaScript.",
    id: 16,
    name: "react-native",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A widely-used framework for building dynamic web applications.",
    id: 17,
    name: "angular",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A powerful and flexible programming language often used for data analysis and scientific computing.",
    id: 18,
    name: "r",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description: "A popular JavaScript library for building user interfaces.",
    id: 19,
    name: "jquery",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A lightweight framework for building fast and efficient web applications.",
    id: 20,
    name: "vue",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A scripting language commonly used for server-side web development.",
    id: 21,
    name: "node.js",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description: "A powerful and scalable database management system.",
    id: 22,
    name: "mongodb",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A relational database management system known for its performance and reliability.",
    id: 23,
    name: "mysql",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A flexible and scalable framework for building web applications.",
    id: 24,
    name: "django",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A lightweight and efficient web server for serving static files.",
    id: 25,
    name: "nginx",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A scripting language commonly used for task automation and system administration.",
    id: 26,
    name: "bash",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A widely-used open-source operating system based on the Linux kernel.",
    id: 27,
    name: "ubuntu",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A powerful and expressive language for building scalable and concurrent applications.",
    id: 28,
    name: "go",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description: "A lightweight and efficient framework for building web APIs.",
    id: 29,
    name: "express",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A popular CSS framework for building responsive and mobile-first websites.",
    id: 30,
    name: "bootstrap",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A powerful and flexible language for building scalable and concurrent applications.",
    id: 31,
    name: "elixir",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A lightweight and modular front-end framework for building web interfaces.",
    id: 32,
    name: "tailwindcss",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description: "A popular framework for building serverless applications.",
    id: 33,
    name: "aws-lambda",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A flexible and scalable framework for building web applications.",
    id: 34,
    name: "laravel",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A powerful and flexible framework for building web applications.",
    id: 35,
    name: "spring",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A popular library for handling and manipulating dates and times.",
    id: 36,
    name: "moment.js",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A widely-used cloud computing platform for building, deploying, and managing applications.",
    id: 37,
    name: "aws",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A powerful and scalable relational database management system.",
    id: 38,
    name: "postgresql",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description: "A popular front-end framework for building user interfaces.",
    id: 39,
    name: "vue.js",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description: "A flexible and powerful library for data visualization.",
    id: 40,
    name: "d3.js",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description: "A widely-used framework for building RESTful APIs.",
    id: 41,
    name: "flask",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A popular content management system for building websites and web applications.",
    id: 42,
    name: "wordpress",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description: "A powerful and scalable NoSQL database management system.",
    id: 43,
    name: "cassandra",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A popular framework for building interactive web applications.",
    id: 45,
    name: "ember.js",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A modern and efficient front-end framework for building user interfaces.",
    id: 47,
    name: "svelte",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A lightweight framework for building fast and efficient web applications.",
    id: 48,
    name: "next.js",
    occurrenceCount: 0,
  },
  {
    createdAt: null,
    description:
      "A markup language used for creating structured documents on the web.",
    id: 50,
    name: "xml",
    occurrenceCount: 0,
  },
];

const users = [
  {
    id: 1,
    location: "New York, USA",
    name: "John Doe",
    reputation: 1000,
  },
  {
    id: 2,
    location: "London, UK",
    name: "Jane Smith",
    reputation: 2500,
  },
  {
    id: 3,
    location: "San Francisco, USA",
    name: "Bob Johnson",
    reputation: 500,
  },
  {
    id: 4,
    location: "Sydney, Australia",
    name: "Alice Brown",
    reputation: 1500,
  },
  {
    id: 5,
    location: "Tokyo, Japan",
    name: "Michael Lee",
    reputation: 3000,
  },
  {
    id: 6,
    location: "Toronto, Canada",
    name: "Sarah Davis",
    reputation: 700,
  },
  {
    id: 7,
    location: "Berlin, Germany",
    name: "David Wilson",
    reputation: 1200,
  },
  {
    id: 8,
    location: "Paris, France",
    name: "Emily Taylor",
    reputation: 900,
  },
  {
    id: 9,
    location: "Melbourne, Australia",
    name: "Ryan Anderson",
    reputation: 1800,
  },
  {
    id: 10,
    location: "Vancouver, Canada",
    name: "Olivia Wilson",
    reputation: 2200,
  },
];

const usersTags = [
  {
    id: 1,
    tagId: 1,
    userId: 1,
  },
  {
    id: 2,
    tagId: 3,
    userId: 1,
  },
  {
    id: 3,
    tagId: 4,
    userId: 1,
  },
  {
    id: 4,
    tagId: 2,
    userId: 2,
  },
  {
    id: 5,
    tagId: 5,
    userId: 2,
  },
  {
    id: 6,
    tagId: 1,
    userId: 3,
  },
  {
    id: 7,
    tagId: 2,
    userId: 3,
  },
  {
    id: 8,
    tagId: 3,
    userId: 3,
  },
  {
    id: 9,
    tagId: 6,
    userId: 3,
  },
  {
    id: 10,
    tagId: 3,
    userId: 4,
  },
  {
    id: 11,
    tagId: 4,
    userId: 4,
  },
  {
    id: 12,
    tagId: 1,
    userId: 5,
  },
  {
    id: 13,
    tagId: 5,
    userId: 5,
  },
  {
    id: 14,
    tagId: 6,
    userId: 5,
  },
  {
    id: 15,
    tagId: 2,
    userId: 6,
  },
  {
    id: 16,
    tagId: 4,
    userId: 6,
  },
  {
    id: 17,
    tagId: 3,
    userId: 7,
  },
  {
    id: 18,
    tagId: 5,
    userId: 7,
  },
  {
    id: 19,
    tagId: 6,
    userId: 7,
  },
  {
    id: 20,
    tagId: 1,
    userId: 8,
  },
  {
    id: 21,
    tagId: 4,
    userId: 8,
  },
  {
    id: 22,
    tagId: 2,
    userId: 9,
  },
  {
    id: 23,
    tagId: 3,
    userId: 9,
  },
  {
    id: 24,
    tagId: 5,
    userId: 9,
  },
  {
    id: 25,
    tagId: 1,
    userId: 10,
  },
  {
    id: 26,
    tagId: 2,
    userId: 10,
  },
  {
    id: 27,
    tagId: 6,
    userId: 10,
  },
];

// eslint-disable-next-line no-undef
module.exports = {
  answers,
  questions,
  questionsTags,
  tags,
  users,
  usersTags,
};
