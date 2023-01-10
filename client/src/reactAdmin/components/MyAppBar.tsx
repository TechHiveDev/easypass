import { Box, Typography } from "@mui/material";
import * as React from "react";
import { AppBar, Logout, UserMenu } from "react-admin";
import SwitchLanguage from "./SwitchLanguage";
import ThemeToggler from "./ThemeToggler";

// ------------------------------------------------

const MyUserMenu = (props: any) => (
  <UserMenu {...props}>
    <SwitchLanguage />
    <ThemeToggler />
    <Logout />
  </UserMenu>
);

// ------------------------------------------------

const MyAppBar = (props: any) => (
  <AppBar {...props} userMenu={<MyUserMenu />} style={{ paddingLeft: 10 }}>
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>
  </AppBar>
);

export default MyAppBar;
