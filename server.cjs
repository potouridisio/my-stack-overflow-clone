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
    },
    {
      id: 2,
      name: "html",
      description:
        "The standard markup language for creating web pages and web applications.",
      occurrenceCount: 2,
    },
    {
      id: 3,
      name: "css",
      description:
        "A style sheet language used for describing the look and formatting of a document written in HTML.",
      occurrenceCount: 3,
    },
    {
      id: 4,
      name: "python",
      description:
        "A high-level programming language known for its readability and versatility.",
      occurrenceCount: 1,
    },
    {
      id: 5,
      name: "java",
      description:
        "A widely-used programming language commonly used for building enterprise-scale applications.",
      occurrenceCount: 1,
    },
    {
      id: 6,
      name: "php",
      description:
        "A server-side scripting language primarily used for web development.",
      occurrenceCount: 1,
    },
    {
      id: 7,
      name: "c++",
      description:
        "A powerful general-purpose programming language often used for system-level programming and game development.",
      occurrenceCount: 1,
    },
    {
      id: 8,
      name: "ruby",
      description:
        "A dynamic, object-oriented programming language known for its simplicity and productivity.",
      occurrenceCount: 0,
    },
    {
      id: 9,
      name: "swift",
      description:
        "A programming language used for developing iOS, macOS, watchOS, and tvOS applications.",
      occurrenceCount: 0,
    },
    {
      id: 10,
      name: "typescript",
      description:
        "A strongly typed superset of JavaScript that compiles to plain JavaScript.",
      occurrenceCount: 0,
    },
  ]);
});

app.get("/questions", (_req, res) => {
  res.json([
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
  ]);
});

app.post("/questions", (req, res) => {
  const { title, body } = req.body;

  console.log(req.body);

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
