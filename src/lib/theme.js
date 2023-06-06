import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

let theme = createTheme();

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

export default theme;
