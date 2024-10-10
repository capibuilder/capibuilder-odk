import TickIcon from "./TickIcon";
interface Product {
  name: string;
  tooltipMessage?: string;
  free?: string | JSX.Element;
  standard?: string | JSX.Element;
  premium?: string | JSX.Element;
  soon?: boolean;
}
export const products1: Product[] = [
  {
    name: "Web Users",
    free: "Up to 10",
    standard: "Unlimited",
    premium: "Unlimited",
    tooltipMessage: "Users of the CAPIBuilder web application.",
  },
  {
    name: "Mobile Users",
    free: "Up to 10",
    standard: "Unlimited",
    premium: "Unlimited",
    tooltipMessage: "Users of the ODK mobile application for data collection.",
  },
  {
    name: "Geographic user groups",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "User groups can be created based on geographic locations, e.g. regions, country, state, county, district, village, etc.",
  },
  {
    name: "Location-based access",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Geographic user groups can be assigned permissions to the forms for data submission, access, and review.",
  },
  {
    name: "Time Limited access",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Users can be given access to forms and data for given time period.",
  },
  {
    name: "Multifactor authentication (MFA)",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "MFA enables the user to login using combination of password and OTP.",
  },

  {
    name: "Single Sign On (SSO) integration",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Integrate SSO including Auth0, Google, Microsoft 365, LDAP, and others.",
  },
  {
    name: "Access log",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage: "Access log of the users.",
  },
];

export const products2: Product[] = [
  {
    name: "Drag and drop questions",
    free: <TickIcon />,
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Drag and drop question types, information note, and question groups on the canvas to create form.",
  },
  {
    name: "Nested question groups",
    free: "1",
    standard: "Unlimited",
    premium: "Unlimited",
    tooltipMessage: "Add question group within a question group.",
  },
  {
    name: "Automatic CSV to cascading select",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Upload an Excel sheet to convert the options into cascading select question type automatically. Cascading select is a question group that allows populate options based on the value selected from the previous question's drop-down options. ",
  },
  {
    name: "Build form importing ODK XLS/XML",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage: "Import an ODK compliant XLS/XML to create a new form.",
  },
  {
    name: "Response logic editor",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Response logic editor allows you to add one more logic to the current question - a) Activation: Show/ hide question based on user response to earlier question, b) Validaton: Show messages based on the responses, and c) Calculation: Create numerical operations and get the results.",
  },

  {
    name: "Formula editor",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Define advanced numerical operations - e.g., multi-step numerical calculations, setting precedence of the numerical operations, etc.",
  },
  {
    name: "Update form",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Update questions and options based on the feedback and testing in a form.",
  },
];

export const products3: Product[] = [
  {
    name: "Number of Projects",
    free: "1",
    standard: "5",
    premium: "Unlimited",
    tooltipMessage: "Number of projects you can create in your login.",
  },
  {
    name: "Monthly limit for data submission",
    free: "1000",
    standard: "10000",
    premium: "Unlimited",
    tooltipMessage: "Number of forms users can submit in a month.",
  },
  {
    name: "File attachment limit in single question",
    free: "5 MB",
    standard: "20 MB",
    premium: "100 MB",
    tooltipMessage:
      "A question can allow submission of image, audio, video, and other file types. This sets the limit of the file size the user can upload for a given question.",
  },
];

export const products4: Product[] = [
  {
    name: "Number of languages",
    free: "1",
    standard: "All",
    premium: "All",
    tooltipMessage:
      "Provides support for machine translation for 133 languages. ",
  },
  {
    name: "Question Option Translation",
    free: <TickIcon />,
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Besides the questions, the options will also be translated automatically.",
  },
  {
    name: "Help text translation",
    free: <TickIcon />,
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Help text provided in the question shall also be auto-translated in the selected language(s).",
  },
];

export const products5: Product[] = [
  {
    name: "Public form templates library",
    free: <TickIcon />,
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Public templates library consists of templates developed by other organizations and forms used by public authorities and social impact organizations. Doesn't require log in to the CAPIBuilder to go through the template.",
  },
  {
    name: "Private form templates library",
    free: <TickIcon />,
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Private template library consists of templates developed and used by the organization and teams. Requires the user to log in to view and use the templates in private template library.",
  },
  {
    name: "Premium templates",
    free: "",
    standard: "",
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Experts and consultants design, test, and use premium templates for data collection in comparable projects.",
  },

  {
    name: "Build form from multiple templates",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Copy sections and questions (including the options, tags, and response logic) from multiple templates to past into a new form to create a new template.",
  },

  {
    name: "Build templates importing ODK XLS/XML",
    free: <TickIcon />,
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Import ODK-compliant XLS/XML forms to create a new template in CAPIBuilder.",
  },
];

export const products6: Product[] = [
  {
    name: "Public Tag library",
    free: <TickIcon />,
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "List of tags used by an organization available for any user in the internet. Doesn't require a login to view the tags.",
  },
  {
    name: "Private tag library",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "List of tags used by an organization available only to the users of the organization. Requires the user to login to view the tags.",
  },
  {
    name: "Search tags",
    free: <TickIcon />,
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage: "Provides search option for the tags.",
  },

  {
    name: "tag Translations",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Provides automatic translation of the tag in the key languages of the organization.",
  },
  {
    name: "Link to forms used by the tag",
    free: "",
    standard: "",
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Forms that used the tag provide an useful indication on the usage of the tags and helps the teams decide if the tag needs to be continued.",
  },
];

export const products7: Product[] = [
  {
    name: "Data review table",
    free: "Simple table (AG-Grid Community)",
    standard: "Simple table (AG-Grid Community)",
    premium: "Pivot table (AG-Grid Enterprise)",
    tooltipMessage:
      "Data table listing the values for each data submission in a row and question in column. Provides search and filter options.",
  },
  {
    name: "Submission review",
    free: <TickIcon />,
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Provides option for the reviewer to review the data submission, edit, approve or return the submission.",
  },
  {
    name: "Additional validation schema for data review",
    free: "",
    standard: "",
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Sometimes, a few validations may not be applied during the data collection stage. In the data review stage, you can create a validation schema, for example, a location list, date range, age range, etc.",
  },

  {
    name: "Anomaly detection using validation schema",
    free: "",
    standard: "",
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Run the validation schema through the data submission table to highlight the cells that don't match the validation schema.",
  },

  {
    name: "Review and notifications for teams",
    free: "",
    standard: "",
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Create and send notes for teams for specific data points over web and mobile apps.",
  },
];

export const products8: Product[] = [
  {
    name: "Hierarchical locations in form builder ",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    tooltipMessage:
      "Standardized locations from region to village or ward level for countries published location dataset.",
  },
  {
    name: "Geo-fencing for surveyors",
    free: "",
    standard: "",
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Geo-fencing for data collection based on IP (web) or GPS (mobile) data.",
  },
  {
    name: "Location based access",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Enable user access to form and data submission based on user's current location.",
  },
];

export const products9: Product[] = [
  {
    name: "Regional data hosting (1)",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Hosting of database and storage in data center in the nearest available hosting region or data center provided by the organization to comply with the national data privacy legislation.",
  },
  {
    name: "PII labeling using tags",
    free: "",
    standard: <TickIcon />,
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Label data fields (tags) that convey explicitly or implicitly user's Personally Identifiable Information.",
  },
  {
    name: "PII data anonymization",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Based on PII labels, anonymizes the data for viewing by the audiences without access to PII data.",
  },
];

export const products10: Product[] = [
  {
    name: "Daily data Backup",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Daily data backup of the entire database and storage at a given schedule.",
  },
  {
    name: "Auto-submission of daily data backup",
    free: "",
    standard: "",
    premium: <TickIcon />,
    soon: true,
    tooltipMessage:
      "Automated transfer of the database and storage in organization's designated server or Google Drive or OneDrive, every day at a given schedule.",
  },
];

export const products11: Product[] = [
  {
    name: "Organization’s domain",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Access the web application using organization's domain address.",
  },
  {
    name: "Web app branding",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Organization's branding is applied in the web application.",
  },

  {
    name: "Mobile app branding",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Organization's branding is applied in the mobile application.",
  },
];

export const products12: Product[] = [
  {
    name: "Exclusive analytics database",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Separate analytics database to improve query and create analytics that uses multiple datasets. Analytics database contains date and location data to create advanced queries and filters.",
  },
  {
    name: "Fast analytics API",
    free: "",
    standard: "",
    premium: <TickIcon />,
    tooltipMessage:
      "Provides cache memory support for ensuring faster response for analytics.",
  },
];
