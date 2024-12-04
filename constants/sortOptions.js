import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

export const appointments = [
  {
    icon: (color) => <FontAwesome name="calendar" size={20} color={color} />,
    name: "All",
    value: "all",
  },
  {
    icon: (color) => (
      <FontAwesome name="calendar-minus-o" size={20} color={color} />
    ),
    name: "Upcoming",
    value: "pending",
  },
  {
    icon: (color) => (
      <FontAwesome name="calendar-plus-o" size={20} color={color} />
    ),
    name: "Previous",
    value: "completed",
  },
  {
    icon: (color) => (
      <FontAwesome name="calendar-times-o" size={20} color={color} />
    ),
    name: "Cancelled",
    value: "cancelled",
  },
];

export const reviewSort = [
  // {
  //   icon: (color) => <FontAwesome name="calendar" size={20} color={color} />,
  //   name: "All",
  //   value: "all",
  // },
  {
    icon: (color) => <AntDesign name="like2" size={24} color={color} />,
    name: "Most Helpful",
    value: "mostHelpful",
  },
  {
    icon: (color) => <Ionicons name="alarm-outline" size={24} color={color} />,
    name: "Recent Review",
    value: "recentReview",
  },
  // {
  //   icon: (color) => <Ionicons name="trending-down" size={20} color={color} />,
  //   name: "High to low ratings",
  // },
  // {
  //   icon: (color) => <Ionicons name="trending-up" size={20} color={color} />,
  //   name: "Low to high ratings",
  // },
];

export const docListSort = [
  {
    icon: (color) => (
      <MaterialCommunityIcons name="bullseye-arrow" size={22} color={color} />
    ),
    name: "Relevance",
    value: "relevance",
  },
  {
    icon: (color) => <FontAwesome name="calendar" size={20} color={color} />,
    name: "Availability",
    value: "availability",
  },
  {
    icon: (color) => <MaterialIcons name="near-me" size={22} color={color} />,
    name: "Nearby",
    value: "nearby",
  },
  {
    icon: (color) => <Ionicons name="trending-down" size={20} color={color} />,
    name: "Price - Low to high",
    value: "lowtohigh",
  },
  {
    icon: (color) => <Ionicons name="trending-up" size={20} color={color} />,
    name: "Price - High to low",
    value: "hightolow",
  },
  {
    icon: (color) => (
      <MaterialCommunityIcons name="chart-line" size={20} color={color} />
    ),
    name: "Year of Experience",
    value: "yearOfExperience",
  },
  {
    icon: (color) => <AntDesign name="like2" size={22} color={color} />,
    name: "Most Liked",
    value: "mostLiked",
  },
];
