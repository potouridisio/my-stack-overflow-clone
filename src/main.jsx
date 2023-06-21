import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { closeSnackbar, SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import App from "./App.jsx";

const action = (
  <IconButton
    aria-label="close"
    color="inherit"
    onClick={() => closeSnackbar()}
    size="small"
  >
    <CloseIcon fontSize="small" />
  </IconButton>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider
      action={action}
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      hideIconVariant
      maxSnack={1}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
