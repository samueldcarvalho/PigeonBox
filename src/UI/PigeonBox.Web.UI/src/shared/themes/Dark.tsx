import { createTheme } from "@mui/material";

const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#3B4FC3",
      light: "#5066EB",
      dark: "#2C388E",
      "800": "#192041",
      contrastText: "#EEE",
    },
    secondary: {
      main: "#00B783",
      light: "#0ce8a9",
      dark: "#00825d",
      contrastText: "#FFF",
    },
  },
});

export default DarkTheme;
