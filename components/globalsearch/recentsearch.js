import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import { useNavigation } from "@react-navigation/native";
import { imgPath } from "@/service/axiosInstance";

const Recentsearch = ({ item, width, height, wrapperView, handleClick }) => {
  console.log("item", item);
  const navigation = useNavigation();
  const colorScheme = "light";
  const path = item.name ? `specializations` : `profileimages`;

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
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleClick(item)}>
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
                  ? { uri: `${imgPath + path}/${item.image}` }
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
            {item.name ? item.name : item.fullName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recentsearch;
