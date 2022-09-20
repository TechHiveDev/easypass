import englishMessages from "ra-language-english";

const allEnglishMessages = {
  ...englishMessages,

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  signCommon: {
    invalid: "Invalid email or password",
  },
  signUp: {
    error: "Error while registering",
    name: {
      label: "Name",
      required: "Name is required",
      minLength: "Name can't be less than %{count} characters",
    },
    email: {
      label: "Email",
      required: "Email is required",
      pattern: "Email doesn't match email pattern(eg. example@example.com)",
    },
    phone: {
      label: "Phone",
      required: "Phone is required",
    },
    password: {
      label: "Password",
      required: "Password is required",
      minLength: "Password must be %{count} characters or more",
      maxLength: "Password must be %{count} characters or less",
    },
    confirmPassword: {
      label: "Confirm Password",
      match: "Your passwords do no match",
    },
    type: {
      label: "Type",
      required: "Type is required",
    },
    register: "Register",
    label: "Sign-up",
  },
  menu: {
    User: "Users",
    Post: "Posts",
    inventory: "Inventory",
    Consumption: "Consumption",
    Compound: "Compound",
    UserCompound: "User Compound",
    Invitation: "Invitation",
    Scan: "Scan",
    Device: "Device",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  userMenu: {
    dark: "Dark Mode",
    light: "Light Mode",
    notifications: "Notifications",
    invalid: "Invalid",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  resources: {},
  no: "No",
  records: "Records",
};
export default allEnglishMessages;
