import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const TabView = ({ selectTab, taboption }) => {
  // const colorScheme = useColorScheme();
  const colorScheme = "light";
  return (
    <View style={{ ...styles.tabWrapper, backgroundColor: "#e4e1e1" }}>
      {taboption?.map((item, i) => (
        <Pressable
          key={i}
          style={item.active ? styles.activeTab : styles.inactiveTab}
          onPress={() => selectTab(item)}
        >
          <Text
            style={item.active ? styles.activeTabText : styles.inactiveTabText}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default TabView;

const styles = StyleSheet.create({
  inactiveTab: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    // backgroundColor: "#4C4DDC",
  },
  inactiveTabText: {
    fontSize: 16,
  },
  activeTab: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: "#4C4DDC",
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  tabWrapper: {
    // marginHorizontal: 10,
    // marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    // borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
