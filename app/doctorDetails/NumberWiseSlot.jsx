import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const NumberWiseSlot = ({ schedules, docId, defaultColor, params }) => {
  const navigation = useNavigation();

  const handleClick = async (item) => {
    const date = new Date(item.date);
    date.setHours(0, 0, 0);
    const selectedDate = {
      date: date,
      days: item.days,
      docId,
    };

    await AsyncStorage.setItem(
      "__consultBookDetails",
      JSON.stringify(selectedDate)
    );
    navigation.navigate("bookAppointment", {
      id: docId,
      specialist: params.specialist,
      source: "appointment",
    });
  };

  return (
    <View>
      <FlatList
        horizontal={true}
        data={schedules}
        renderItem={({ item }) => (
          <View
            style={{
              borderColor: "gray",
              marginHorizontal: 10,
              marginVertical: 10,
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
              }}
              onPress={() => handleClick(item)}
            >
              <Text style={{ fontWeight: 600 }}>{item.label}</Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 12,
                  marginTop: 5,
                  color: item.times
                    ? defaultColor.defaultColor
                    : defaultColor.placeHolder,
                }}
              >
                {item.times ? "Available" : "Unavailable"}
              </Text>
            </Pressable>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default NumberWiseSlot;
