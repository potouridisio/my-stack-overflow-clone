import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { blue } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import Activity from "./routes/Activity";
import AllSaves from "./routes/AllSaves";
import Ask, { action as askAction, loader as askLoader } from "./routes/Ask";
import AuthorizedApplications from "./routes/AuthorizedApplications";
import CommunityDigests from "./routes/CommunityDigests";
import DeleteUser from "./routes/DeleteUser";
import EditUser from "./routes/EditUser";
import EditEmailSettings from "./routes/EditEmailSettings";
import Flair from "./routes/Flair";
import HideCommunities from "./routes/HideCommunities";
import LeftSidebar from "./routes/LeftSidebar";
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
import Profile, { loader as ProfileLoader } from "./routes/Profile";
import Root, { loader as rootLoader } from "./routes/Root";

import {
  action as saveWatchedTagsAction,
  loader as saveWatchedTagsLoader,
} from "./routes/SaveWatchedTags";
import Saves, {
  action as savesAction,
  loader as savesLoader,
} from "./routes/Saves";
import Settings from "./routes/Settings";
import Sidebar from "./routes/Sidebar";
import Tags, { loader as tagsLoader } from "./routes/Tags";
import TagWatching, {
  loader as watchingTagsLoader,
} from "./routes/TagWatching";
import Users, { loader as usersLoader } from "./routes/Users";
import User from "./routes/User";
import UserCollectives from "./routes/UserCollectives";
import UserLogins from "./routes/UserLogins";

import { create } from "zustand";

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
            element: <User />,
            children: [
              {
                path: "users/:userId/:userName/Profile",
                element: <Profile />,
                loader: ProfileLoader,
              },

              {
                path: "users/:userId/:userName",
                element: <Activity />,
              },

              {
                path: "users/1/saves/all",
                element: <Saves />,
                children: [
                  {
                    index: true,
                    element: <AllSaves />,
                  },
                ],
                loader: savesLoader,
                action: savesAction,
              },

              {
                path: "users/:userId",
                element: <Settings />,
                children: [
                  {
                    path: "edit",
                    element: <EditUser />,
                  },
                  {
                    path: "delete",
                    element: <DeleteUser />,
                  },
                  {
                    path: "email/settings",
                    element: <EditEmailSettings />,
                  },
                  {
                    path: "tag-notifications",
                    element: <TagWatching />,
                    loader: watchingTagsLoader,
                  },
                  {
                    path: "email/digests",
                    element: <CommunityDigests />,
                  },
                  {
                    path: "preferences",
                    element: <Preferences />,
                    action: preferencesAction,
                  },
                  {
                    path: ":userName/flair",
                    element: <Flair />,
                  },
                  {
                    path: "hidecommunities",
                    element: <HideCommunities />,
                  },

                  {
                    path: "my-collectives",
                    element: <UserCollectives />,
                  },
                  {
                    path: "mylogins",
                    element: <UserLogins />,
                  },
                  {
                    path: "apps",
                    element: <AuthorizedApplications />,
                  },
                ],
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
