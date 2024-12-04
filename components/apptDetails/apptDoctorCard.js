import { View, TouchableOpacity, Text, Image } from "react-native";
import blankProfile from "@/assets/images/blank-profile-picture.png";
import { imgPath } from "../../service/axiosInstance";
import React from "react";

const AapptDoctorCard = ({ data, defaultColor, router }) => {
  const renderEducation = (details) => {
    let text = "";
    details?.doctorData.educations?.forEach((item, i) => {
      text += (i ? ", " : "") + item.degree;
    });
    return text;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: `doctorDetails/${data.doctorId}`,
        })
      }
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderColor: defaultColor.cardBorderColor,
      }}
    >
      <View>
        <Image
          style={{
            width: 75,
            height: 75,
            borderRadius: 100,
          }}
          source={
            data?.doctorData.image
              ? {
                  uri: `${imgPath}profileimages/${data?.doctorData.image}`,
                }
              : blankProfile
          }
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: defaultColor.heading,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {data?.doctorData.firstName + " " + data?.doctorData.lastName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: defaultColor.placeHolder,
            marginTop: 3,
          }}
        >
          {renderEducation(data)}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: defaultColor.placeHolder,
            marginTop: 3,
            textTransform: "capitalize",
          }}
        >
          {data?.doctorData?.gender}
          {" | "}
          {data?.doctorData.workExperience} YRS Exp.
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: defaultColor.lightGreen,
            fontWeight: 500,
            marginTop: 3,
          }}
        >
          Consultation Fee: ₹{data?.apptFees}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AapptDoctorCard;
