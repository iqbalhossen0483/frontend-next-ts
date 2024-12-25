import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiTheme } from "@mui/material/styles";
import theme from "./theme";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiTheme theme={theme}>
      <CssBaseline />
      {children}
    </MuiTheme>
  );
};

export default ThemeProvider;
