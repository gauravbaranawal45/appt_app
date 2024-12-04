import { Tabs } from "expo-router";
import React from "react";

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
const commonColor = "#4C4DDC";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  // console.log("colorScheme", colorScheme);
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          unmountOnBlur: true,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? commonColor : "black"}
            />
          ),
          tabBarActiveTintColor: commonColor,
        }}
      />
      <Tabs.Screen
        name="findDoctor"
        options={{
          unmountOnBlur: true,
          title: "Doctors",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="stethoscope"
              size={24}
              color={focused ? commonColor : "black"}
            />
          ),
          tabBarActiveTintColor: commonColor,
        }}
      />

      <Tabs.Screen
        name="globalSearch"
        options={{
          unmountOnBlur: true,
          title: "Search",
          headerStyle: {
            backgroundColor: "red",
          },
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                {
                  // backgroundColor: "#4C4DDC",
                  // padding: 10,
                  // alignItems: "center",
                  // justifyContent: "center",
                  // borderRadius: 30,
                  // width: 60,
                  // height: 60,
                }
              }
            >
              <Ionicons
                name={focused ? "search-sharp" : "search-outline"}
                size={24}
                color={focused ? commonColor : "black"}
              />
            </View>
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          unmountOnBlur: true,
          title: "Appointments",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={focused ? commonColor : "black"}
            />
          ),
          tabBarActiveTintColor: commonColor,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          unmountOnBlur: true,
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "user-circle-o" : "user-circle"}
              size={24}
              color={focused ? commonColor : "black"}
            />
          ),
          tabBarActiveTintColor: commonColor,
        }}
      />
    </Tabs>
  );
}
