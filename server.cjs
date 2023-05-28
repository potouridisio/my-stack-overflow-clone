/* eslint-disable no-undef */
const express = require("express");

const db = require("./db.cjs");

const app = express();

app.use(express.json());

app.get("/questions/:questionId/answers", (req, res) => {
  const questionId = req.params.questionId;

  // Retrieve answers from the database based on the questionId
  db.all(
    "SELECT * FROM answers WHERE questionId = ?",
    questionId,
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(rows);
      }
    }
  );
});

// Add an answer to a question
app.post("/questions/:questionId/answers", (req, res) => {
  const questionId = req.params.questionId;
  const { body, userId } = req.body;

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const answerQuery =
    "INSERT INTO answers (body, createdAt, questionId, updatedAt, userId) VALUES (?, ?, ?, ?, ?)";

  db.run(
    answerQuery,
    [body, createdAt, questionId, updatedAt, userId],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const updateQuestionQuery =
          "UPDATE questions SET answerCount = answerCount + 1 WHERE id = ?";

        db.run(updateQuestionQuery, [questionId], (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.json({ message: "Answer added successfully" });
          }
        });
      }
    }
  );
});

// Endpoint to retrieve a specific question by ID
app.get("/questions/:questionId", (req, res) => {
  const questionId = req.params.questionId; // Get the question ID from the URL parameter

  // Fetch the question from the database
  const query = `
    SELECT questions.*, GROUP_CONCAT(questions_tags.tagId) AS tagIds
    FROM questions
    LEFT JOIN questions_tags ON questions.id = questions_tags.questionId
    WHERE questions.id = ?
    GROUP BY questions.id
  `;

  db.get(query, [questionId], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else if (row) {
      const question = {
        ...row,
        tagIds: row.tagIds ? row.tagIds.split(",").map(Number) : [], // Convert tagIds to an array of numbers
      };
      res.json(question);
    } else {
      res.status(404).send("Question not found");
    }
  });
});

// Endpoint to retrieve all questions with optional filtering
app.get("/questions", (req, res) => {
  const searchText = req.query.q; // Get the value of the 'q' search parameter

  let query =
    "SELECT questions.*, GROUP_CONCAT(questions_tags.tagId) AS tagIds FROM questions LEFT JOIN questions_tags ON questions.id = questions_tags.questionId";

  if (searchText) {
    const searchValue = `%${searchText}%`;
    query += " WHERE questions.body LIKE ? OR questions.title LIKE ?";
    query += " GROUP BY questions.id";
    db.all(query, [searchValue, searchValue], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        const formattedRows = rows.map((row) => ({
          ...row,
          tagIds: row.tagIds ? row.tagIds.split(",").map(Number) : [],
        }));
        res.json(formattedRows.length > 0 ? formattedRows : []);
      }
    });
  } else {
    query += " GROUP BY questions.id";
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        const formattedRows = rows.map((row) => ({
          ...row,
          tagIds: row.tagIds ? row.tagIds.split(",").map(Number) : [],
        }));
        res.json(formattedRows);
      }
    });
  }
});

// Add a question
app.post("/questions", (req, res) => {
  const { body, title, tagIds, userId } = req.body;

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const questionQuery =
    "INSERT INTO questions (answerCount, body, createdAt, updatedAt, title, userId, voteCount) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.run(
    questionQuery,
    [0, body, createdAt, updatedAt, title, userId, 0],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const questionId = this.lastID;

        const questionsTagsQuery =
          "INSERT INTO questions_tags (questionId, tagId) VALUES (?, ?)";

        const updateTagsQuery =
          "UPDATE tags SET occurrenceCount = occurrenceCount + 1 WHERE id = ?";

        const insertPromises = tagIds.map((tagId) => {
          return new Promise((resolve, reject) => {
            db.run(questionsTagsQuery, [questionId, tagId], (err) => {
              if (err) {
                reject(err);
              } else {
                db.run(updateTagsQuery, [tagId], (err) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              }
            });
          });
        });

        Promise.all(insertPromises)
          .then(() => {
            res.json({ id: questionId });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          });
      }
    }
  );
});

// Endpoint to retrieve all tags and sort them based on sortBy query parameter
app.get("/tags", (req, res) => {
  const sortBy = req.query.sortBy || "popularity";
  const searchText = req.query.q; // Get the value of the 'q' search parameter

  let orderBy;
  switch (sortBy) {
    case "name":
      orderBy = "name ASC";
      break;
    case "latest":
      orderBy = "createdAt DESC";
      break;
    case "popularity":
    default:
      orderBy = "occurrenceCount DESC";
  }

  let query = "SELECT * FROM tags";
  const params = [];

  if (searchText) {
    query += " WHERE name LIKE ?";
    params.push(`%${searchText}%`);
  }

  query += ` ORDER BY ${orderBy}`;

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

// Endpoint to retrieve all users with optional filtering
app.get("/users", (req, res) => {
  const searchText = req.query.q; // Get the value of the 'q' search parameter

  let query =
    "SELECT users.*, GROUP_CONCAT(users_tags.tagId) AS tagIds FROM users LEFT JOIN users_tags ON users.id = users_tags.userId";

  if (searchText) {
    const searchValue = `%${searchText}%`;
    query += " WHERE users.name LIKE ?";
    query += " GROUP BY users.id";
    db.all(query, [searchValue], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        const formattedRows = rows.map((row) => ({
          ...row,
          tagIds: row.tagIds ? row.tagIds.split(",").map(Number) : [],
        }));
        res.json(formattedRows.length > 0 ? formattedRows : []);
      }
    });
  } else {
    query += " GROUP BY users.id";
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        const formattedRows = rows.map((row) => ({
          ...row,
          tagIds: row.tagIds ? row.tagIds.split(",").map(Number) : [],
        }));
        res.json(formattedRows);
      }
    });
  }
});

const PORT = 3000; // Choose the desired port for your server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
