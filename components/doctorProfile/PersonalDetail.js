import { View, Text, Image, Linking } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useApplicationContext } from "@/context/ApplicationContext";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import { imgPath } from "@/service/axiosInstance";

const PersonalDetail = ({ details, params }) => {
  const { defaultColor } = useApplicationContext();

  const renderEducation = () => {
    let text = "";
    details?.educations?.forEach((item, i) => {
      text += (i ? ", " : "") + item.degree;
    });
    return text;
  };

  const renderSpecialization = () => {
    let text = "";
    if (params.specialist && params.specialist !== "doctorList") {
      details?.specialization?.forEach((subitem, i) => {
        if (params.specialist === subitem._id) {
          text += (i ? ", " : "") + subitem.name;
        }
      });
    } else {
      details?.specialization?.forEach((subitem, i) => {
        text += (i ? ", " : "") + subitem.name;
      });
    }
    return text;
  };

  const handlePhone = () => {
    Linking.openURL(`tel:${details?.officialMobile}`);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <View
        style={{
          flexDirection: "row",
          borderColor: "#D9D9D9",
          gap: 10,
        }}
      >
        <View>
          <Image
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
            }}
            source={
              details?.image
                ? { uri: `${imgPath}profileimages/${details.image}` }
                : blankProfile
            }
          />
        </View>
        <View style={{ flex: 1, marginTop: 5 }}>
          <View style={{}}>
            <Text
              style={{
                color: defaultColor.heading,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {details?.firstName + " " + details?.lastName}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: defaultColor.defaultColor,
              marginTop: 8,
            }}
          >
            {renderEducation()}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 3,
              color: defaultColor.placeHolder,
            }}
          >
            {renderSpecialization()}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "flex-end", flex: 1 }}
          >
            <Ionicons
              onPress={handlePhone}
              name="call"
              size={24}
              color={defaultColor.defaultColor}
            />
            <Ionicons
              name="mail-sharp"
              size={24}
              color={defaultColor.defaultColor}
              style={{ marginLeft: 30 }}
              onPress={() =>
                Linking.openURL(`mailto:${details?.officialEmail}`)
              }
            />
            <Ionicons
              name="logo-whatsapp"
              size={24}
              color={defaultColor.defaultColor}
              style={{ marginLeft: 30 }}
              onPress={() => Linking.openURL("whatsapp://app")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PersonalDetail;
