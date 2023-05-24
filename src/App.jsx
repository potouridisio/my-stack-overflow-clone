import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Public from "./routes/Public";
import Questions, { loader as questionsLoader } from "./routes/Questions";
import Root from "./routes/Root";
import Tags from "./routes/Tags";
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
          },
          {
            path: "users",
            element: <Users />,
            loader: usersLoader,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
