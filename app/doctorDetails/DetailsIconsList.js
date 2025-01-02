import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useApplicationContext } from "@/context/ApplicationContext";

const DetailsIconsList = ({ details }) => {
  const { defaultColor } = useApplicationContext();
  return (
    <View style={styles.wrapper}>
      <View style={{ alignItems: "center" }}>
        <MaterialIcons
          name="people-alt"
          size={25}
          color={defaultColor.defaultColor}
        />
        <View style={styles.mt5}>
          <Text style={styles.iconInfoText}>
            {details?.appointments?.length}
          </Text>
          <Text style={styles.iconInfoText}>Patients</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <MaterialCommunityIcons
          name="chart-line"
          size={25}
          color={defaultColor.defaultColor}
        />
        <View style={styles.mt5}>
          <Text style={styles.iconInfoText}>{details?.workExperience}+</Text>
          <Text style={styles.iconInfoText}>Years Exp</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <MaterialIcons
          name="star-border"
          size={25}
          color={defaultColor.defaultColor}
        />
        <View style={styles.mt5}>
          <Text style={styles.iconInfoText}>4.5</Text>
          <Text style={styles.iconInfoText}>Rating</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <MaterialIcons
          name="message"
          size={25}
          color={defaultColor.defaultColor}
        />
        <View style={styles.mt5}>
          <Text style={styles.iconInfoText}>132</Text>
          <Text style={styles.iconInfoText}>Reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailsIconsList;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginTop: 0,
    justifyContent: "space-between",
  },
  mt5: {
    marginTop: 5,
  },
  iconInfoText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 13,
  },
});
