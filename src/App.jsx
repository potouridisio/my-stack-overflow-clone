import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { blue } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import Ask, { action as askAction, loader as askLoader } from "./routes/Ask";
import LeftSidebar from "./routes/LeftSidebar";
import Preferences, { usePreferencesStore } from "./routes/Preferences";
import Question, {
  action as questionAction,
  loader as questionLoader,
} from "./routes/Question";
import Questions, {
  action as questionsAction,
  handle as questionsHandle,
  loader as questionsLoader,
} from "./routes/Questions";
import Root from "./routes/Root";
import Sidebar from "./routes/Sidebar";
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
            path: "users/:userId/preferences",
            element: <Preferences />,
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
  const colorMode = usePreferencesStore((state) => state.colorMode);

  const theme = useMemo(() => {
    let theme = createTheme({
      palette: {
        mode: colorMode,
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
  }, [colorMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
