import englishMessages from 'ra-language-english';

const allEnglishMessages = {
  ...englishMessages,

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  resources: {
    request: {
      fields: {
        availableDateFrom: 'Available From To',
      },
    },
  },
  signCommon: {
    invalid: 'Invalid email or password',
  },
  signUp: {
    error: 'Error while registering',
    name: {
      label: 'Name',
      required: 'Name is required',
      minLength: "Name can't be less than %{count} characters",
    },
    email: {
      label: 'Email',
      required: 'Email is required',
      pattern: "Email doesn't match email pattern(eg. example@example.com)",
    },
    phone: {
      label: 'Phone',
      required: 'Phone is required',
    },
    password: {
      label: 'Password',
      required: 'Password is required',
      minLength: 'Password must be %{count} characters or more',
      maxLength: 'Password must be %{count} characters or less',
    },
    confirmPassword: {
      label: 'Confirm Password',
      match: 'Your passwords do no match',
    },
    type: {
      label: 'Type',
      required: 'Type is required',
    },
    register: 'Register',
    label: 'Sign-up',
  },
  menu: {
    Facility: 'Facilities',
    User: 'Users',
    Post: 'Posts',
    inventory: 'Inventory',
    Consumption: 'Consumption',
    Compound: 'Compounds',
    UserCompound: 'Properties',
    Invitation: 'Invitations',
    Scan: 'Scans',
    Request: 'Requests',
    Device: 'Devices',
    Announcement: 'Announcements',
    Discover: 'Discoveries',
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  userMenu: {
    dark: 'Dark Mode',
    light: 'Light Mode',
    notifications: 'Notifications',
    invalid: 'Invalid',
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  no: 'No',
  records: 'Records',
  reports: 'Reports',
  properties: 'Properties',
  from: 'From',
  to: 'To',
  type: 'Type',
  interval: 'Interval',
  compound: 'Compound',
  compounds: 'Compounds',
  chart: 'Chart',
  bar: 'Bar',
  pie: 'Pie',
  day: 'Day',
  week: 'Week',
  month: 'Month',
  selectA: 'Select a',
  Visitor: 'Visitor',
  Delivery: 'Delivery',
  All: 'All',
  announcement: 'Announcement',
  announcements: 'Announcements',
  user: 'User',
  users: 'Users',
  property: 'Property',
  invite: 'Invite',
  invitation: 'Invitation',
  device: 'Device',
  scan: 'Scan',
  add: 'Add',
  create: 'Create',
  userType: {
    Security: 'Security',
    Admin: 'Admin',
    SuperAdmin: 'SuperAdmin',
    Resident: 'Resident',
    Visitor: 'Visitor',
    Delivery: 'Delivery',
  },
  requiredUser: 'User is required',
  requiredCompound: 'Compound is required',
  requiredCategory: 'Category is required',
  facility: 'Facility',
  facilityType: {
    Facility: 'Facility',
    Issue: 'Issue',
  },
  status: {
    Pending: 'Pending',
    Refused: 'Refused',
    InProgress: 'In Progress',
    Completed: 'Completed',
  },
  streetBlockUnit: 'Street - Block - Unit',
};
export default allEnglishMessages;
