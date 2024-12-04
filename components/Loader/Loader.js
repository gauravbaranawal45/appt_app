import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFill,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#11111150",
        zIndex: 999,
        elevation: 999,
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Loader;
