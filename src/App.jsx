import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./lib/theme";
import Ask, { action as askAction, loader as askLoader } from "./routes/Ask";
import LeftSidebar from "./routes/LeftSidebar";
import Question, {
  action as questionAction,
  loader as questionLoader,
} from "./routes/Question";
import Questions, {
  action as questionsAction,
  handle as questionsHandle,
  loader as questionsLoader,
  action as filterAction,
} from "./routes/Questions";
import Root from "./routes/Root";
import Sidebar from "./routes/Sidebar";
import Tags, { loader as tagsLoader } from "./routes/Tags";
import Users, { loader as usersLoader } from "./routes/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: filterAction,
    children: [
      {
        element: <LeftSidebar />,
        children: [
          {
            element: <Sidebar />,
            children: [
              {
                index: true,
                element: <Questions />,
                loader: questionsLoader,
                handle: questionsHandle,
                action: questionsAction,
              },
              {
                path: "search",
                element: <Questions />,
                loader: questionsLoader,
              },
            ],
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
            loader: askLoader,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
