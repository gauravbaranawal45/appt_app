import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { companyName } from "./constants";

const getDateWithMonth = (val) => {
  const date = new Date().getDate() + val;
  const month = new Date().toLocaleString("default", { month: "long" });
  let today = date + " " + month;
  if (val === 0) {
    today = "Today";
  } else if (val === 1) {
    today = "Tomorrow";
  }
  return { currentDate: today };
};

export const dateSlotData = [
  {
    date: getDateWithMonth(0).currentDate,
    actualDate: getDateWithMonth(0),
    active: true,
  },
  {
    date: getDateWithMonth(1).currentDate,
    actualDate: getDateWithMonth(1),
    active: false,
  },
  {
    date: getDateWithMonth(2).currentDate,
    actualDate: getDateWithMonth(2),
    active: false,
  },
  {
    date: getDateWithMonth(3).currentDate,
    actualDate: getDateWithMonth(3),
    active: false,
  },
  {
    date: getDateWithMonth(4).currentDate,
    actualDate: getDateWithMonth(4),
    active: false,
  },
];

export const paymentMode = [
  { label: "Cash", value: "cash" },
  { label: "Online", value: "online" },
];

export const suggestedCitiesName = [
  {
    city: "Delhi",
    lat: "",
    long: "",
  },
  {
    city: "Gurgaon",
    lat: "",
    long: "",
  },
  {
    city: "Chennai",
    lat: "",
    long: "",
  },
  {
    city: "Mumbai",
    lat: "",
    long: "",
  },
  {
    city: "Bangalore",
    lat: "",
    long: "",
  },
  {
    city: "Hyderabad",
    lat: "",
    long: "",
  },
  {
    city: "Kolkata",
    lat: "",
    long: "",
  },
];

export const profileMenu = [
  {
    name: "Manage Members",
    desc: "Edit, add and manage your members",
    link: "manageMember",
    icon: (props) => <Feather name="users" size={26} {...props} />,
    backIcon: (props) => (
      <MaterialIcons name="arrow-forward-ios" size={18} {...props} />
    ),
  },
  {
    name: "Manage Address",
    desc: "Edit, add and manage your address",
    link: "addressBook",
    icon: (props) => <Feather name="map-pin" size={26} {...props} />,
    backIcon: (props) => (
      <MaterialIcons name="arrow-forward-ios" size={18} {...props} />
    ),
  },
  {
    name: "Invite & Earn",
    desc: `Refer ${companyName} app and earn ${companyName} Repee`,
    link: "inviteEarn",
    icon: (props) => (
      <MaterialCommunityIcons name="wallet-outline" size={28} {...props} />
    ),
    backIcon: (props) => (
      <MaterialIcons name="arrow-forward-ios" size={18} {...props} />
    ),
  },
  {
    name: `${companyName} Credit Wallet`,
    desc: "Your rewards and earnings",
    link: "creditWallet",
    icon: (props) => <Ionicons name="wallet-outline" size={28} {...props} />,
    backIcon: (props) => (
      <MaterialIcons name="arrow-forward-ios" size={18} {...props} />
    ),
  },
  {
    name: `Reviews`,
    desc: "Your Reviews",
    link: "ownReviews",
    icon: (props) => <AntDesign name="message1" size={28} {...props} />,
    backIcon: (props) => (
      <MaterialIcons name="arrow-forward-ios" size={18} {...props} />
    ),
  },
  {
    name: "Help & Support",
    desc: "FAQs, get help or raise a query",
    link: "helpSupport",
    icon: (props) => (
      <Ionicons name="help-circle-outline" size={30} {...props} />
    ),
    backIcon: (props) => (
      <MaterialIcons name="arrow-forward-ios" size={18} {...props} />
    ),
  },
  {
    name: "About QuickAppt",
    desc: "About us, T&Cs and Policies",
    link: "about",
    icon: (props) => <Ionicons name="alarm-outline" size={28} {...props} />,
    backIcon: (props) => (
      <MaterialIcons name="arrow-forward-ios" size={18} {...props} />
    ),
  },
  {
    name: "Settings",
    desc: "This is demo purpose",
    link: "settings",
    icon: (props) => <Ionicons name="settings-outline" size={28} {...props} />,
    backIcon: (props) => (
      <MaterialIcons name="arrow-forward-ios" size={18} {...props} />
    ),
  },
];

export const genderData = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Others",
    value: "Others",
  },
];

export const aboutusData = [
  {
    title: "Who we are?",
    desc: `We are India’s largest omnichannel digital healthcare platform with the core belief that ‘Expertise is for Everyone’. We combine ${companyName}’s legacy of clinical excellence, affordable cost, and forward-looking research with cutting-edge technology to make the best quality healthcare easily accessible to every Indian, online.`,
    subTitle: [],
  },
  {
    title: "What we do?",
    desc: `With the launch of Apollo 24|7, the vision of our founder Dr. Prathap C. Reddy of removing mobility barriers from healthcare has become a reality. On a single online platform, you can avail an entire gamut of services, including online  doctor consultation, online pharmacy and diagnostic tests at home. We also offer expert-curated solutions for COVID-care and chronic condition management, along with a digital vault where you can upload all your medical history.`,
    subTitle: [
      {
        title: "Online Doctor Consultations",
        desc: `Apollo Hospitals was established in 1983 by Dr. Prathap C Reddy, renowned as the architect of modern healthcare in India. As the nation’s first corporate hospital, Apollo Hospitals is acclaimed for pioneering the private healthcare revolution in the country. The group has emerged as Asia’s foremost integrated healthcare services provider and has a robust presence across the healthcare ecosystem, including Hospitals, Pharmacies, Primary Care & Diagnostic Clinics and several retail health models. The Group also has Telemedicine facilities across several countries, Health Insurance Services, Global Projects Consultancy, Medical Colleges, Medvarsity for E-Learning, Colleges of Nursing and Management of Hospitals and a Research Foundation. Since its inception, Apollo Hospitals has been honoured by the trust of over 150  million individuals from 140 countries.`,
      },
    ],
  },
  {
    title: `About ${companyName}`,
    desc: `Apollo Hospitals was established in 1983 by Dr. Prathap C Reddy, renowned as the architect of modern healthcare in India. As the nation’s first corporate hospital, Apollo Hospitals is acclaimed for pioneering the private healthcare revolution in the country. The group has emerged as Asia’s foremost integrated healthcare services provider and has a robust presence across the healthcare ecosystem, including Hospitals, Pharmacies, Primary Care & Diagnostic Clinics and several retail health models. The Group also has Telemedicine facilities across several countries, Health Insurance Services, Global Projects Consultancy, Medical Colleges, Medvarsity for E-Learning, Colleges of Nursing and Management of Hospitals and a Research Foundation. Since its inception, Apollo Hospitals has been honoured by the trust of over 150 million individuals from 140 countries.`,
    subTitle: [],
  },
];

export const settingsData = [
  {
    name: "Change Password",
    link: "changePassword",
  },
];

export const weekdays = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 0 },
];

export const shortweekdays = [
  { label: "Mon", value: 1 },
  { label: "Tues", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 0 },
];

export const monthNames = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
