import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useApplicationContext } from "@/context/ApplicationContext";

const Header = ({ title }) => {
  const router = useRouter();
  const { defaultColor } = useApplicationContext();
  return (
    <View
      style={{
        ...styles.headerWrapper,
        backgroundColor: defaultColor.background,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="#63635E"
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={{ marginRight: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>{title}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  backIcon: {
    paddingRight: 10,
  },
});
