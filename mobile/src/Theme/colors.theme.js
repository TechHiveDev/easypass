const theme = "light";

// ----------------------------------------

const dark = {
  primary: "white",
  background: "black",
  card: "rgb(255, 255, 255)",
  text: "white",
  border: "rgb(199, 199, 204)",
  notification: "rgb(255, 69, 58)",
};

// ----------------------------------------

const light = {
  primary: "black",
  background: "white",
  card: "rgb(255, 255, 255)",
  text: "black",
  border: "rgb(199, 199, 204)",
  notification: "rgb(255, 69, 58)",
};

// ----------------------------------------

const themes = { light, dark };

// ----------------------------------------

export const colors = { ...themes[theme] };

// ----------------------------------------
