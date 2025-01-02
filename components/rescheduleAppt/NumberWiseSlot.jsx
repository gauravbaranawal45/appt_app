import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";

const NumberWiseSlot = ({
  schedules,
  handleClick,
  defaultColor,
  scheduledDate,
}) => {
  return (
    <View>
      <FlatList
        horizontal={false}
        data={schedules}
        renderItem={({ item }) => (
          <View
            style={{
              borderColor: "gray",
              marginVertical: 10,
              flex: 1,
              maxWidth: "33.33%",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                borderColor: item.times ? "#4C4DDC" : defaultColor.placeHolder,
                paddingHorizontal: 10,
                paddingVertical: 5,
                alignItems: "center",
                borderWidth: item.times ? 2 : 1,
                borderRadius: 10,
                backgroundColor:
                  item.days === scheduledDate.days ? "#4C4DDC" : "#fff",
              }}
              onPress={() => handleClick(item)}
              disabled={!item.times}
            >
              <Text
                style={{
                  fontWeight: 600,
                  color: item.days === scheduledDate.days ? "#fff" : "black",
                }}
              >
                {item.label}
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 12,
                  marginTop: 5,
                  color: item.times
                    ? item.days === scheduledDate.days
                      ? "#fff"
                      : defaultColor.defaultColor
                    : defaultColor.placeHolder,
                }}
              >
                {item.times ? "Available" : "Unavailable"}
              </Text>
            </Pressable>
          </View>
        )}
        numColumns={3}
      />
    </View>
  );
};

export default NumberWiseSlot;
