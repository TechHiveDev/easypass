import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useLocaleState, useUserMenu } from "react-admin";

// ==========================================================

const SwitchLanguage = React.forwardRef((props: any, ref: any) => {
  const [locale, setLocale] = useLocaleState();
  const { onClose } = useUserMenu();
  return (
    <MenuItem
      ref={ref}
      {...props}
      sx={{ color: "text.secondary" }}
      onClick={() => {
        setLocale(locale === "en" ? "ar" : "en");
        document.dir = locale === "en" ? "rtl" : "ltr";
        onClose(); // Close the menu
      }}
    >
      <ListItemIcon sx={{ minWidth: 5 }}>
        <LanguageIcon />
      </ListItemIcon>
      <ListItemText>{locale === "en" ? "عربي" : "English"}</ListItemText>
    </MenuItem>
  );
});

export default SwitchLanguage;
