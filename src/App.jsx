import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Public from "./routes/Public";
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
            index: true,
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
            path: "search",
            element: <Questions />,
            loader: questionsLoader,
          },

          {
            path: "questions/tagged/:tagName",
            element: <Questions />,
            loader: questionsLoader,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
