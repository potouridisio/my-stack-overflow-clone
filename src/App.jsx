import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Ask from "./routes/Ask";
import Public from "./routes/Public";
import Question from "./routes/Question";
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
        element: <Public />,
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
