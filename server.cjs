/* eslint-disable no-undef */
const express = require("express");

const app = express();

app.get("/users", (_req, res) => {
  res.json([
    {
      id: 1,
      name: "John Doe",
      location: "New York, USA",
      reputation: 1000,
      tags: [1, 3],
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "London, UK",
      reputation: 2500,
      tags: [2],
    },
    {
      id: 3,
      name: "Bob Johnson",
      location: "San Francisco, USA",
      reputation: 500,
      tags: [1, 2, 3],
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
    },
    {
      id: 2,
      name: "html",
      description:
        "The standard markup language for creating web pages and web applications.",
    },
    {
      id: 3,
      name: "css",
      description:
        "A style sheet language used for describing the look and formatting of a document written in HTML.",
    },
  ]);
});

app.get("/questions", (_req, res) => {
  res.json([
    {
      id: 1,
      title: "How to loop through an array in JavaScript?",
      body: "I have an array of items and need to iterate over them. What is the best way to achieve this?",
      votes: 10,
      userId: 1,
      tagIds: [1, 3],
      createdAt: "2022-01-01T12:00:00Z",
      updatedAt: "2022-01-02T10:30:00Z",
      answers: [
        {
          id: 1,
          body: "You can use a for loop or array.forEach() to iterate over the array.",
          votes: 5,
          userId: 2,
          createdAt: "2022-01-01T13:30:00Z",
          updatedAt: "2022-01-01T14:45:00Z",
          comments: [
            {
              id: 1,
              body: "Great solution!",
              userId: 3,
              createdAt: "2022-01-01T14:00:00Z",
            },
            {
              id: 2,
              body: "I prefer using array.map() for better readability.",
              userId: 1,
              createdAt: "2022-01-01T14:15:00Z",
            },
          ],
        },
      ],
    },
  ]);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
