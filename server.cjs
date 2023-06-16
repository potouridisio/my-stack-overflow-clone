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

// Endpoint to retrieve a specific user by ID
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL parameter

  // Fetch the user from the database
  db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send("User not found");
    }
  });
});

// Update a specific user by ID
app.put("/users/:userId", (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL parameter
  const { name, location } = req.body; // Assuming the fields to be updated are provided in the request body

  // Update the user in the database
  db.run(
    "UPDATE users SET name = ?, location = ? WHERE id = ?",
    [name, location, userId],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Check if any rows were affected
        if (this.changes === 0) {
          // No matching user found
          res.status(404).json({ error: "User not found" });
        } else {
          // User successfully updated
          res.sendStatus(204);
        }
      }
    }
  );
});

// Get all filters for a user
app.get("/users/:userId/filters", (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL parameter

  // Retrieve all filters associated with the given userId from the database
  db.all("SELECT * FROM filters WHERE userId = ?", [userId], (err, filters) => {
    if (err) {
      // Handle any errors
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Return the filters as a response
      res.json(filters);
    }
  });
});

// Create a filter for a user
app.post("/users/:userId/filters", (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL parameter
  const { filterIds, sortId, tagModeId, name } = req.body; // Assuming the required fields are provided in the request body

  // Check if a filter with the same name already exists
  db.get(
    "SELECT * FROM filters WHERE userId = ? AND name = ?",
    [userId, name],
    (err, existingFilter) => {
      if (err) {
        // Handle any errors
        res.status(500).json({ error: "Internal server error" });
      } else if (existingFilter) {
        // A filter with the same name already exists
        res
          .status(400)
          .json({ error: "A filter with that name already exists." });
      } else {
        // Check if a filter with the same values already exists
        db.get(
          "SELECT * FROM filters WHERE userId = ? AND filterIds = ? AND sortId = ? AND tagModeId = ?",
          [userId, filterIds, sortId, tagModeId],
          (err, duplicateFilter) => {
            if (err) {
              // Handle any errors
              res.status(500).json({ error: "Internal server error" });
            } else if (duplicateFilter) {
              // A filter with the same values already exists
              res.status(400).json({
                error: `Cannot create an exact duplicate of your existing filter named ${duplicateFilter.name}.`,
              });
            } else {
              // Insert the new filter associated with the given userId into the database
              db.run(
                "INSERT INTO filters (userId, filterIds, sortId, tagModeId, name) VALUES (?, ?, ?, ?, ?)",
                [userId, filterIds, sortId, tagModeId, name],
                function (err) {
                  if (err) {
                    // Handle any errors
                    res.status(500).json({ error: "Internal server error" });
                  } else {
                    // Return the ID of the newly created filter
                    res.json({ id: this.lastID });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

// Delete a filter for a user
app.delete("/users/:userId/filters/:filterId", (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL parameter
  const filterId = req.params.filterId; // Extract the filterId from the URL parameter

  // Delete the filter with the given filterId and userId from the database
  db.run(
    "DELETE FROM filters WHERE id = ? AND userId = ?",
    [filterId, userId],
    function (err) {
      if (err) {
        // Handle any errors
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Check if any rows were affected
        if (this.changes === 0) {
          // No matching filter found
          res.status(404).json({ error: "Filter not found" });
        } else {
          // Filter successfully deleted
          res.sendStatus(204);
        }
      }
    }
  );
});

// Edit a filter for a user
app.put("/users/:userId/filters/:filterId", (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL parameter
  const filterId = req.params.filterId; // Extract the filterId from the URL parameter
  const { filterIds, sortId, tagModeId, name } = req.body; // Assuming the fields to be updated are provided in the request body

  // Update the filter with the given filterId and userId in the database
  db.run(
    "UPDATE filters SET filterIds = ?, sortId = ?, tagModeId = ?, name = ? WHERE id = ? AND userId = ?",
    [filterIds, sortId, tagModeId, name, filterId, userId],
    function (err) {
      if (err) {
        // Handle any errors
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Check if any rows were affected
        if (this.changes === 0) {
          // No matching filter found
          res.status(404).json({ error: "Filter not found" });
        } else {
          // Filter successfully updated
          res.sendStatus(204);
        }
      }
    }
  );
});

// Get user preferences for a specific user
app.get("/users/:userId/preferences", (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL parameter

  // Fetch the user preferences from the database
  db.get(
    "SELECT theme, hideLeftNavigation FROM user_preferences WHERE userId = ?",
    [userId],
    (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else if (row) {
        const preferences = {
          theme: row.theme,
          hideLeftNavigation: row.hideLeftNavigation === 1,
        };
        res.json(preferences);
      } else {
        res.status(404).send("User preferences not found");
      }
    }
  );
});

// Update user preferences for a specific user
app.put("/users/:userId/preferences", (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL parameter
  const { theme, hideLeftNavigation } = req.body; // Assuming theme and hideLeftNavigation are provided in the request body

  // Update the user preferences in the database
  db.run(
    "UPDATE user_preferences SET theme = ?, hideLeftNavigation = ? WHERE userId = ?",
    [theme, hideLeftNavigation, userId],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Check if any rows were affected
        if (this.changes === 0) {
          // No matching user preferences found
          res.status(404).json({ error: "User preferences not found" });
        } else {
          res.sendStatus(204);
        }
      }
    }
  );
});

const PORT = 3000; // Choose the desired port for your server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
