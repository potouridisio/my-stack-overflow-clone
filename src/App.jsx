import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Ask from "./routes/Ask";
import LeftSidebar from "./routes/LeftSidebar";
import Question, { loader as questionLoader } from "./routes/Question";
import Questions, { loader as questionsLoader } from "./routes/Questions";
import Root from "./routes/Root";
import Tags, { loader as tagsLoader } from "./routes/Tags";
import Users, { loader as usersLoader } from "./routes/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <LeftSidebar />,
        children: [
          {
            path: "/search?",
            element: <Questions />,
            loader: questionsLoader,
          },
          {
            path: "tags",
            element: <Tags />,
            loader: tagsLoader,
          },
          {
            path: "users",
            element: <Users />,
            loader: usersLoader,
          },
          {
            path: "questions/:questionId",
            element: <Question />,
            loader: questionLoader,
          },
          {
            path: "questions/:questionId/answers",
            element: <Question />,
            loader: questionLoader,
          },
        ],
      },
      {
        path: "questions/ask",
        element: <Ask />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
