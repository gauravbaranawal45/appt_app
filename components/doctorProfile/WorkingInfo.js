import { StyleSheet, Text, View } from "react-native";
import React from "react";
const layoutMarginVerticle = 20;
const layoutMarginHorizontal = 10;
const seeAllColor = "#4C4DDC";
const WorkingInfo = ({ item, index }) => {
  return (
    <>
      {index !== 0 ? (
        <View
          style={{
            marginTop: 5,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
      ) : null}
      <View
        style={{
          marginTop: layoutMarginHorizontal,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {item.day}
        </Text>
        <View style={{ marginRight: 50 }}>
          {item.times.map((subitem, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: seeAllColor,
                  borderRadius: 50,
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {subitem}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default WorkingInfo;

const styles = StyleSheet.create({});
