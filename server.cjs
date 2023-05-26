/* eslint-disable no-undef */
const express = require("express");

const app = express();

app.use(express.json());

app.get("/users", (_req, res) => {
  res.json([
    {
      id: 1,
      name: "John Doe",
      location: "New York, USA",
      reputation: 1000,
      tagIds: [1, 3, 4],
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "London, UK",
      reputation: 2500,
      tagIds: [2, 5],
    },
    {
      id: 3,
      name: "Bob Johnson",
      location: "San Francisco, USA",
      reputation: 500,
      tagIds: [1, 2, 3, 6],
    },
    {
      id: 4,
      name: "Alice Brown",
      location: "Sydney, Australia",
      reputation: 1500,
      tagIds: [3, 4],
    },
    {
      id: 5,
      name: "Michael Lee",
      location: "Tokyo, Japan",
      reputation: 3000,
      tagIds: [1, 5, 6],
    },
    {
      id: 6,
      name: "Sarah Davis",
      location: "Toronto, Canada",
      reputation: 700,
      tagIds: [2, 4],
    },
    {
      id: 7,
      name: "David Wilson",
      location: "Berlin, Germany",
      reputation: 1200,
      tagIds: [3, 5, 6],
    },
    {
      id: 8,
      name: "Emily Taylor",
      location: "Paris, France",
      reputation: 900,
      tagIds: [1, 4],
    },
    {
      id: 9,
      name: "Ryan Anderson",
      location: "Melbourne, Australia",
      reputation: 1800,
      tagIds: [2, 3, 5],
    },
    {
      id: 10,
      name: "Olivia Wilson",
      location: "Vancouver, Canada",
      reputation: 2200,
      tagIds: [1, 2, 6],
    },
  ]);
});

app.get("/tags", (_req, res) => {
  res.json([
    {
      id: 1,
      name: "javascript",
      description:
        "A programming language commonly used for client-side and server-side web development.",
      occurrenceCount: 2,
      createdAt: "2023-05-20T11:30:00Z",
    },
    {
      id: 2,
      name: "html",
      description:
        "The standard markup language for creating web pages and web applications.",
      occurrenceCount: 2,
      createdAt: "2023-05-21T14:30:00Z",
    },
    {
      id: 3,
      name: "css",
      description:
        "A style sheet language used for describing the look and formatting of a document written in HTML.",
      occurrenceCount: 3,
      createdAt: "2023-05-20T11:30:00Z",
    },
    {
      id: 4,
      name: "python",
      description:
        "A high-level programming language known for its readability and versatility.",
      occurrenceCount: 1,
      createdAt: "2023-05-24T15:30:00Z",
    },
    {
      id: 5,
      name: "java",
      description:
        "A widely-used programming language commonly used for building enterprise-scale applications.",
      occurrenceCount: 1,
      createdAt: "2023-05-22T18:45:00Z",
    },
    {
      id: 6,
      name: "php",
      description:
        "A server-side scripting language primarily used for web development.",
      occurrenceCount: 1,
      createdAt: "2023-05-24T15:30:00Z",
    },
    {
      id: 7,
      name: "c++",
      description:
        "A powerful general-purpose programming language often used for system-level programming and game development.",
      occurrenceCount: 1,
      createdAt: "2023-05-23T09:20:00Z",
    },
    {
      id: 8,
      name: "ruby",
      description:
        "A dynamic, object-oriented programming language known for its simplicity and productivity.",
      occurrenceCount: 0,
      createdAt: null,
    },
    {
      id: 9,
      name: "swift",
      description:
        "A programming language used for developing iOS, macOS, watchOS, and tvOS applications.",
      occurrenceCount: 0,
      createdAt: null,
    },
    {
      id: 10,
      name: "typescript",
      description:
        "A strongly typed superset of JavaScript that compiles to plain JavaScript.",
      occurrenceCount: 0,
      createdAt: null,
    },
  ]);
});

const questions = [
  {
    id: 1,
    title: "How to loop through an array in JavaScript?",
    body: "I have an array of items and need to iterate over them. Currently, I'm using a simple for loop, but I'm wondering if there are any other methods or techniques that can provide better performance or more concise syntax. What are the recommended ways to loop through an array in JavaScript?",
    voteCount: 10,
    userId: 1,
    tagIds: [1, 3],
    createdAt: "2023-05-20T11:30:00Z",
    updatedAt: "2023-05-21T09:30:00Z",
    answerCount: 1,
  },
  {
    id: 2,
    title: "What are the best practices for responsive web design?",
    body: "I want to make my website responsive to different screen sizes and devices. Are there any recommended practices or frameworks that can help me achieve responsive design efficiently? I have heard about CSS media queries, but I'm not sure how to use them effectively. Any tips or examples would be appreciated!",
    voteCount: 5,
    userId: 2,
    tagIds: [2, 3],
    createdAt: "2023-05-21T14:30:00Z",
    updatedAt: "2023-05-22T10:15:00Z",
    answerCount: 3,
  },
  {
    id: 3,
    title: "How to secure an API with authentication?",
    body: "I'm developing an API for my web application, and I want to add authentication to restrict access to authorized users only. I have looked into different authentication methods like JWT and OAuth, but I'm not sure which one to choose. What are the pros and cons of each method, and which one would be more suitable for my project?",
    voteCount: 7,
    userId: 3,
    tagIds: [1, 5],
    createdAt: "2023-05-22T18:45:00Z",
    updatedAt: "2023-05-23T09:05:00Z",
    answerCount: 2,
  },
  {
    id: 4,
    title: "What are the best practices for database normalization?",
    body: "I'm designing a database schema for a complex application, and I want to ensure proper normalization to avoid data redundancy and improve query performance. Are there any specific best practices or guidelines that I should follow?",
    voteCount: 12,
    userId: 1,
    tagIds: [3, 7],
    createdAt: "2023-05-23T09:20:00Z",
    updatedAt: "2023-05-23T14:35:00Z",
    answerCount: 4,
  },
  {
    id: 5,
    title: "How to optimize website performance?",
    body: "My website is running slow, and I want to improve its performance. I have already implemented some basic optimizations, but I'm looking for more advanced techniques or tools that can help me achieve better results. Any suggestions?",
    voteCount: 8,
    userId: 2,
    tagIds: [2, 4, 6],
    createdAt: "2023-05-24T15:30:00Z",
    updatedAt: "2023-05-24T17:45:00Z",
    answerCount: 2,
  },
];

app.get("/questions", (req, res) => {
  const { q } = req.query;

  if (q) {
    const filteredQuestions = questions.filter((question) =>
      question.title.toLowerCase().includes(q.toLowerCase())
    );
    res.json(filteredQuestions);
  } else {
    res.json(questions);
  }
});

app.post("/questions", (req, res) => {
  const { title, body } = req.body;

  const newQuestion = {
    id: 6,
    title,
    body,
    voteCount: 0,
    userId: 1,
    tagIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    answerCount: 0,
  };

  res.json(newQuestion);
});

app.get("/questions/:id", (req, res) => {
  const { id } = req.params;
  const question = questions.find((q) => q.id === parseInt(id));

  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: "Question not found" });
  }
});

const answers = [
  {
    id: 1,
    questionId: 1,
    body: "One of the recommended ways to loop through an array in JavaScript is to use the 'forEach' method. It provides a more concise syntax and handles the iteration automatically. Here's an example:",
    userId: 2,
    createdAt: "2023-05-21T12:15:00Z",
    updatedAt: "2023-05-22T09:45:00Z",
  },
  {
    id: 2,
    questionId: 2,
    body: "When it comes to responsive web design, using CSS media queries is a common approach. You can define different CSS rules based on the screen size or device type. Here's an example of a media query:",
    userId: 3,
    createdAt: "2023-05-22T10:30:00Z",
    updatedAt: "2023-05-23T08:20:00Z",
  },
  {
    id: 3,
    questionId: 2,
    body: "In addition to CSS media queries, you can leverage CSS frameworks like Bootstrap or Foundation that provide responsive design components and grid systems. These frameworks offer pre-defined CSS classes that you can use to build responsive layouts more easily.",
    userId: 1,
    createdAt: "2023-05-22T15:45:00Z",
    updatedAt: "2023-05-23T09:50:00Z",
  },
  {
    id: 4,
    questionId: 2,
    body: "Another tip for responsive web design is to use relative units like percentages or 'em' instead of fixed pixel values for sizing elements. This allows the content to adapt to different screen sizes more effectively.",
    userId: 2,
    createdAt: "2023-05-23T11:20:00Z",
    updatedAt: "2023-05-24T07:55:00Z",
  },
  {
    id: 5,
    questionId: 3,
    body: "Both JWT and OAuth are widely used authentication methods. JWT (JSON Web Tokens) is a compact and self-contained token format that can securely transmit information between parties. OAuth is an open standard for authorization that allows users to grant third-party applications limited access to their resources.",
    userId: 3,
    createdAt: "2023-05-23T16:10:00Z",
    updatedAt: "2023-05-24T09:30:00Z",
  },
  {
    id: 6,
    questionId: 3,
    body: "The choice between JWT and OAuth depends on the specific requirements of your project. JWT is simpler to implement and is suitable for scenarios where you have full control over the authentication process. OAuth, on the other hand, is more complex but provides additional features like delegated authorization and centralized user management.",
    userId: 1,
    createdAt: "2023-05-23T18:25:00Z",
    updatedAt: "2023-05-24T11:45:00Z",
  },
  {
    id: 7,
    questionId: 4,
    body: "When it comes to database normalization, it's essential to follow a set of best practices. Here are a few guidelines:",
    userId: 2,
    createdAt: "2023-05-24T10:05:00Z",
    updatedAt: "2023-05-24T15:20:00Z",
  },
  {
    id: 8,
    questionId: 4,
    body: "1. Identify the entities and their relationships: Start by identifying the entities in your system and how they relate to each other.",
    userId: 1,
    createdAt: "2023-05-24T12:30:00Z",
    updatedAt: "2023-05-25T08:40:00Z",
  },
  {
    id: 9,
    questionId: 4,
    body: "2. Eliminate data redundancy: Ensure that each piece of data is stored only once to avoid data inconsistencies and save storage space.",
    userId: 3,
    createdAt: "2023-05-24T14:15:00Z",
    updatedAt: "2023-05-25T09:20:00Z",
  },
  {
    id: 10,
    questionId: 4,
    body: "3. Use primary keys and foreign keys: Establish relationships between tables using primary keys and foreign keys to maintain data integrity.",
    userId: 2,
    createdAt: "2023-05-24T16:40:00Z",
    updatedAt: "2023-05-25T10:05:00Z",
  },
  {
    id: 11,
    questionId: 5,
    body: "JavaScript Promises provide a way to handle asynchronous operations. They represent a value that may not be available yet, but will be resolved in the future. Here's an example of using a Promise:",
    userId: 2,
    createdAt: "2023-05-26T12:30:00Z",
    updatedAt: "2023-05-26T15:45:00Z",
  },
  {
    id: 12,
    questionId: 5,
    body: "Async/await is a modern JavaScript feature that simplifies asynchronous code. It allows you to write asynchronous code that looks and behaves more like synchronous code, making it easier to understand and maintain. Here's an example:",
    userId: 1,
    createdAt: "2023-05-26T16:00:00Z",
    updatedAt: "2023-05-26T18:20:00Z",
  },
];

app.get("/questions/:id/answers", (req, res) => {
  const { id } = req.params;
  const question = questions.find((q) => q.id === parseInt(id));

  if (question) {
    const questionAnswers = answers.filter(
      (answer) => answer.questionId === question.id
    );
    res.json(questionAnswers);
  } else {
    res.status(404).json({ error: "Question not found" });
  }
});

app.post("/questions/:questionId/answers", (req, res) => {
  const { questionId } = req.params;
  const { body } = req.body;

  const newAnswer = {
    id: 13,
    questionId: parseInt(questionId),
    body,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  res.json(newAnswer);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
