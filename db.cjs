/* eslint-disable no-undef */
const sqlite3 = require("sqlite3").verbose();

const {
  answers,
  questions,
  questionsTags,
  tags,
  users,
  usersTags,
} = require("./data.cjs");

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    `CREATE TABLE answers (
      body TEXT,
      createdAt TEXT,
      id INTEGER PRIMARY KEY,
      questionId INTEGER,
      updatedAt TEXT,
      userId INTEGER,
      FOREIGN KEY (questionId) REFERENCES questions(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    )`
  );

  db.run(
    `CREATE TABLE filters (
      filterIds TEXT,
      id INTEGER PRIMARY KEY,
      name TEXT,
      sortId TEXT,
      tagModeId TEXT,
      userId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id)
    )`
  );

  db.run(
    `CREATE TABLE questions (
      answerCount INTEGER,
      body TEXT,
      createdAt TEXT,
      id INTEGER PRIMARY KEY,
      title TEXT,
      updatedAt TEXT,
      userId INTEGER,
      voteCount INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id)
    )`
  );

  db.run(
    `CREATE TABLE questions_tags (
      id INTEGER PRIMARY KEY,
      questionId INTEGER,
      tagId INTEGER,
      FOREIGN KEY (questionId) REFERENCES questions(id),
      FOREIGN KEY (tagId) REFERENCES tags(id)
    )`
  );

  db.run(
    `CREATE TABLE tags (
      createdAt TEXT,
      description TEXT,
      id INTEGER PRIMARY KEY,
      name TEXT,
      occurrenceCount INTEGER
    )`
  );

  db.run(
    `CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      location TEXT,
      name TEXT,
      reputation INTEGER
    )`
  );

  // Create the user_preferences table
  db.run(`
    CREATE TABLE IF NOT EXISTS user_preferences (
      hideLeftNavigation BOOLEAN NOT NULL DEFAULT 0,
      id INTEGER PRIMARY KEY,
      theme INTEGER NOT NULL DEFAULT 0,
      userId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
 `);

  db.run(
    `CREATE TABLE users_tags (
      id INTEGER PRIMARY KEY,
      tagId INTEGER,
      userId INTEGER,
      FOREIGN KEY (tagId) REFERENCES tags(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    )`
  );

  const insertAnswers = db.prepare(
    `INSERT INTO answers (body, createdAt, id, questionId, updatedAt, userId) VALUES (?, ?, ?, ?, ?, ?)`
  );

  const insertQuestions = db.prepare(
    `INSERT INTO questions (answerCount, body, createdAt, id, title, updatedAt, userId, voteCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const insertQuestionsTags = db.prepare(
    `INSERT INTO questions_tags (id, questionId, tagId)
    VALUES (?, ?, ?)`
  );

  const insertTags = db.prepare(
    `INSERT INTO tags (createdAt, description, id, name, occurrenceCount)
    VALUES (?, ?, ?, ?, ?)`
  );

  const insertUsers = db.prepare(
    `INSERT INTO users (id, location, name, reputation)
    VALUES (?, ?, ?, ?)`
  );

  const insertUsersTags = db.prepare(
    `INSERT INTO users_tags (id, tagId, userId)
    VALUES (?, ?, ?)`
  );

  answers.forEach((answer) => {
    insertAnswers.run(
      answer.body,
      answer.createdAt,
      answer.id,
      answer.questionId,
      answer.updatedAt,
      answer.userId
    );
  });

  questions.forEach((question) => {
    insertQuestions.run(
      question.answerCount,
      question.body,
      question.createdAt,
      question.id,
      question.title,
      question.updatedAt,
      question.userId,
      question.voteCount
    );
  });

  questionsTags.forEach((questionTag) => {
    insertQuestionsTags.run(
      questionTag.id,
      questionTag.questionId,
      questionTag.tagId
    );
  });

  tags.forEach((tag) => {
    insertTags.run(
      tag.createdAt,
      tag.description,
      tag.id,
      tag.name,
      tag.occurrenceCount
    );
  });

  users.forEach((user) => {
    insertUsers.run(user.id, user.location, user.name, user.reputation);
  });

  db.run(`
   INSERT INTO user_preferences (userId) 
   SELECT id FROM users
 `);

  usersTags.forEach((userTag) => {
    insertUsersTags.run(userTag.id, userTag.tagId, userTag.userId);
  });

  insertAnswers.finalize();
  insertQuestions.finalize();
  insertQuestionsTags.finalize();
  insertTags.finalize();
  insertUsers.finalize();
  insertUsersTags.finalize();
});

module.exports = db;
