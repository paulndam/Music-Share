import { createMuiTheme } from "@material-ui/core/styles";
import { lightBlue, lime } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: lightBlue,
    secondary: lime,
  },
});

export default theme;
