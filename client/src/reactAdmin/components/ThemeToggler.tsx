import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { defaultTheme, useTheme, useTranslate, useUserMenu } from "react-admin";

// ------------------------------------------------

const lightTheme = defaultTheme;
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
darkTheme.palette.background.default = "#000";

// ------------------------------------------------

const ThemeToggler = React.forwardRef((props: any, ref: any) => {
  const [theme, setTheme]: any = useTheme();
  const translate = useTranslate();
  const { onClose } = useUserMenu();
  return (
    <MenuItem
      ref={ref}
      {...props}
      sx={{ color: "text.secondary" }}
      onClick={() => {
        setTheme(theme?.palette?.mode === "dark" ? lightTheme : darkTheme);
        document.body.style.backgroundColor =
          theme?.palette.mode === "dark" ? "#fafafb" : "#000";
        onClose(); // Close the menu
      }}
    >
      <ListItemIcon sx={{ minWidth: 5 }}>
        {theme?.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </ListItemIcon>
      <ListItemText>
        {theme?.palette.mode === "dark"
          ? translate("userMenu.light")
          : translate("userMenu.dark")}
      </ListItemText>
    </MenuItem>
  );
});

export default ThemeToggler;
