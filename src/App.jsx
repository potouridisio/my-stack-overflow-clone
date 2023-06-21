import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { create } from "zustand";

import { blue } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import AllSaves from "./routes/AllSaves";
import Ask, { action as askAction, loader as askLoader } from "./routes/Ask";
import EditUser from "./routes/EditUser";
import LeftSidebar from "./routes/LeftSidebar";
import List, { loader as listLoader } from "./routes/List";
import Preferences, { action as preferencesAction } from "./routes/Preferences";
import Question, {
  action as questionAction,
  loader as questionLoader,
} from "./routes/Question";
import Questions, {
  action as questionsAction,
  handle as questionsHandle,
  loader as questionsLoader,
} from "./routes/Questions";
import Root, { loader as rootLoader } from "./routes/Root";
import Saves, {
  action as savesAction,
  loader as savesLoader,
} from "./routes/Saves";
import {
  action as saveWatchedTagsAction,
  loader as saveWatchedTagsLoader,
} from "./routes/SaveWatchedTags";
import Settings from "./routes/Settings";
import Sidebar from "./routes/Sidebar";
import Tags, { loader as tagsLoader } from "./routes/Tags";
import User from "./routes/User";
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
          {
            path: "users/:userId",
            element: <User />,
            children: [
              {
                element: <Settings />,
                children: [
                  {
                    path: "preferences",
                    element: <Preferences />,
                    action: preferencesAction,
                  },
                  {
                    path: "edit",
                    element: <EditUser />,
                  },
                ],
              },
              {
                path: "saves",
                element: <Saves />,
                children: [
                  {
                    index: true,
                    element: <AllSaves />,
                  },
                  {
                    path: ":listId",
                    element: <List />,
                    loader: listLoader,
                  },
                ],
                loader: savesLoader,
                action: savesAction,
              },
            ],
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
    loader: rootLoader,
  },
  {
    path: "/save-watched-tags",
    action: saveWatchedTagsAction,
    loader: saveWatchedTagsLoader,
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
export const useColorModeStore = create((set) => ({
  mode: "light",
  setMode: (mode) => set({ mode }),
}));

export default function App() {
  const mode = useColorModeStore((state) => state.mode);

  const theme = useMemo(() => {
    let theme = createTheme({
      palette: {
        mode,
      },
    });

    theme = createTheme(theme, {
      components: {
        MuiAutocomplete: {
          defaultProps: {
            ChipProps: {
              size: "small",
            },
            size: "small",
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
          },
        },
        MuiCard: {
          defaultProps: {
            variant: "outlined",
          },
        },
        MuiCardHeader: {
          defaultProps: {
            titleTypographyProps: {
              variant: "subtitle1",
            },
          },
        },
        MuiCheckbox: {
          defaultProps: {
            size: "small",
          },
        },
        MuiChip: {
          defaultProps: {
            size: "small",
          },
          styleOverrides: {
            root: {
              borderRadius: theme.shape.borderRadius,
            },
          },
        },
        MuiLink: {
          defaultProps: {
            underline: "none",
          },
          styleOverrides: {
            root: {
              "&:hover": {
                color: theme.palette.mode === "dark" ? blue[400] : blue[800],
              },
            },
          },
        },
        MuiRadio: {
          defaultProps: {
            size: "small",
          },
        },
        MuiTextField: {
          defaultProps: {
            size: "small",
          },
        },
      },
    });

    return theme;
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
