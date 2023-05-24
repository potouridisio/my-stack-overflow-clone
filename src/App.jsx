import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Public from "./routes/Public";
import Questions from "./routes/Questions";
import Root from "./routes/Root";
import Tags from "./routes/Tags";
import Users from "./routes/Users";

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
          },
          {
            path: "tags",
            element: <Tags />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
