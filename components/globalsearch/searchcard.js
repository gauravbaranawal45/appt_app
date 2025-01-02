import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { imgPath } from "@/service/axiosInstance";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import { useApplicationContext } from "@/context/ApplicationContext";

const Searchcard = ({ item, handleClick }) => {
  const { defaultColor } = useApplicationContext();
  const path = item.name ? `specializations` : `profileimages`;

  const renderSpecialization = (data) => {
    let text = "";
    data?.specialization?.forEach((subitem, i) => {
      text += (i ? ", " : "") + subitem.name;
    });
    return text;
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        gap: 10,
      }}
      onPress={() => handleClick(item)}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
          }}
          source={
            item.image
              ? { uri: `${imgPath + path}/${item.image}` }
              : blankProfile
          }
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              color: defaultColor.text,
              fontWeight: 600,
            }}
          >
            {item.name ? item.name : item.fullName}
          </Text>
          {!item.name && (
            <Text
              style={{
                fontSize: 12,
                color: defaultColor.text,
                fontWeight: 500,
              }}
            >
              {renderSpecialization(item)}
            </Text>
          )}
        </View>
      </View>

      <View style={{}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: defaultColor.text,
          }}
        >
          {item.name ? "Speciality" : "Doctor"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Searchcard;
