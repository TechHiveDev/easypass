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
    Compound: "Compounds",
    UserCompound: "Properties",
    Invitation: "Invitations",
    Scan: "Scans",
    Device: "Devices",
    Announcement: "Announcements",
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
  reports: "Reports",
  properties: "Properties",
  from: "From",
  to: "To",
  interval: "Interval",
  compound: "Compound",
  chart: "Chart",
  bar: "Bar",
  pie: "Pie",
  day: "Day",
  week: "Week",
  month: "Month",
  selectA: "Select a",
  Visitor: "Visitor",
  Delivery: "Delivery",
  All: "All",
  announcement: "Announcement",
  user: "User",
  property: "Property",
  invite: "Invite",
  device: "Device",
  scan: "Scan",
};
export default allEnglishMessages;
