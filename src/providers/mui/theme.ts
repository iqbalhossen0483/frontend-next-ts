// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A16AE8", // Your primary color
    },
    secondary: {
      main: "#dc004e", // Your secondary color
    },
    background: {
      default: "#f5f5f5", // Background color
    },
    text: {
      primary: "#333", // Primary text color
      secondary: "#555", // Secondary text color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
          boxShadow: "none",
          paddingTop: 7,
          paddingBottom: 7,
          fontSize: "1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
