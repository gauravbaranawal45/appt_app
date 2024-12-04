import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { tConvert } from "@/utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const TimeWiseSlot = ({
  schedules,
  defaultColor,
  getScheduleTime,
  headerComponent,
  horizontal,
  numColumns,
  EmptyListMessage,
  docId,
  params,
  setSchedules,
}) => {
  const navigation = useNavigation();
  const handleTime = async (time) => {
    const gethrs = time.split(":")[0];
    const getmin = time.split(":")[1];
    let newState = [...schedules];
    newState = newState.filter((item) => item.active)[0];
    const date = new Date(newState.date);
    date.setHours(gethrs, getmin, 0);
    const selectedDate = {
      date: date,
      days: newState.days,
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

  const clickDateHandler = (item) => {
    let newState = [...schedules];
    newState = newState.map((newItem) => {
      if (item.value === newItem.value) {
        return { ...newItem, active: true };
      } else {
        return { ...newItem, active: false };
      }
    });
    setSchedules(newState);
  };

  return (
    <View>
      <View>
        <FlatList
          horizontal={true}
          data={schedules}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: "gray",
              }}
            >
              <Pressable
                style={{
                  borderBottomWidth: item.active ? 3 : 0,
                  borderColor: "#4C4DDC",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignItems: "center",
                }}
                onPress={() => clickDateHandler(item)}
              >
                <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 12,
                    marginTop: 10,
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

      <View style={{ paddingHorizontal: 5 }}>
        {getScheduleTime().map((item, i) => {
          return (
            <React.Fragment key={i}>
              {headerComponent(item)}
              <FlatList
                key={i}
                keyExtractor={(item, index) => index}
                data={item}
                renderItem={({ item, i }) => (
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 5,
                      marginBottom: 8,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 5,
                        borderColor: "#4C4DDC",
                        paddingVertical: 10,
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        handleTime(item, i);
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 500,
                          textAlign: "center",
                        }}
                      >
                        {tConvert(item)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                horizontal={horizontal}
                numColumns={numColumns}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={EmptyListMessage}
              />
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

export default TimeWiseSlot;
