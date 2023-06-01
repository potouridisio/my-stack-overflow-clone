import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

import Ask, { action as askAction } from "./routes/Ask";
import LeftSidebar from "./routes/LeftSidebar";
import Question, {
  action as questionAction,
  loader as questionLoader,
} from "./routes/Question";
import Questions, {
  handle as questionsHandle,
  loader as questionsLoader,
} from "./routes/Questions";
import Root from "./routes/Root";
import Sidebar, { loader as tagsSidebarLoader } from "./routes/Sidebar";
import Tags, {
  action as filteredTagsAction,
  loader as tagsLoader,
} from "./routes/Tags";
import Users, {
  action as filteredUsersAction,
  loader as usersLoader,
} from "./routes/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <LeftSidebar />,
        children: [
          {
            element: <Sidebar />,
            loader: tagsSidebarLoader,
            children: [
              {
                path: "/",
                element: <Questions />,
                loader: questionsLoader,
                handle: questionsHandle,
              },

              {
                path: "search",
                element: <Questions />,
                loader: questionsLoader,
              },

              {
                path: "filter",
                element: <Questions />,
                loader: questionsLoader,
              },
            ],
          },
          {
            path: "tags",
            element: <Tags />,
            loader: tagsLoader,
            action: filteredTagsAction,
          },
          {
            path: "users",
            element: <Users />,
            loader: usersLoader,
            action: filteredUsersAction,
          },
          {
            path: "questions/:questionId",
            element: <Question />,
            loader: questionLoader,
            action: questionAction,
          },
        ],
      },
      {
        element: <Sidebar />,
        children: [
          {
            path: "questions/ask",
            element: <Ask />,
            action: askAction,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <ScopedCssBaseline>
      <RouterProvider router={router} />
    </ScopedCssBaseline>
  );
}
