import React from "react";
import { Layout } from "react-admin";
import MySideMenu from "./MySideMenu";
import MyAppBar from "./MyAppBar";

// -----------------------------------------------------------

export default function MyLayout(props) {
  return <Layout {...props} sidebar={MySideMenu} appBar={MyAppBar} />;
}
