import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import { useNavigation } from "@react-navigation/native";
import { imgPath } from "@/service/axiosInstance";

const HomeSpecialist = ({ index, item, width, height, wrapperView }) => {
  const navigation = useNavigation();
  // const colorScheme = useColorScheme();
  const colorScheme = "light";
  console.log("indexxxxxxx", index);
  return (
    <View
      style={{
        flex: 1,
        width: wrapperView,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("doctorList", {
              specialist: item._id,
            })
          }
        >
          <View
            style={{
              backgroundColor: "#eef0ff",
              width: 50,
              height: 50,
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Image
              source={
                item.image
                  ? { uri: `${imgPath}specializations/${item.image}` }
                  : blankProfile
              }
              style={{
                width: width,
                height: height,
                borderRadius: 50,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              marginTop: 8,
              color: Colors[colorScheme].text,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeSpecialist;
