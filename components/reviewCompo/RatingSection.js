import { StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
const seeAllColor = "#4C4DDC";
const RatingSection = () => {
  return (
    <>
      <View
        style={{
          ...styles.flexBetween,
          alignItems: "center",
        }}
      >
        <View>
          <Rating ratingCount={5} imageSize={30} startingValue={3.6} readonly />
          <Text style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>
            Very Good
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 28, fontWeight: 600 }}>4.2</Text>
          <Text style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>
            1158 ratings
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#f0f0f5",
          paddingVertical: 20,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="like1" size={25} color={seeAllColor} />
          <Text
            style={{
              fontSize: 30,
              fontWeight: 600,
              marginLeft: 10,
            }}
          >
            90%
          </Text>
        </View>
        <View
          style={{
            width: 1,
            backgroundColor: "#f0f0f5",
            marginHorizontal: 20,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text>
            Out of all patients who were surveyed, 90% of them recommend
            visiting this doctor
          </Text>
        </View>
      </View>
    </>
  );
};

export default RatingSection;

const styles = StyleSheet.create({
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
