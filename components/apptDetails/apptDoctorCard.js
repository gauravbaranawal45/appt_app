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

  const renderConditionalValue = (item) => {
    let itemval = {};
    if (item.apptStatus === "pending") {
      itemval = {
        text: "Pending",
        color: defaultColor.defaultColor,
        backgroundColor: "#eef0ff",
      };
    } else if (item.apptStatus === "completed") {
      itemval = {
        text: "Completed",
        color: defaultColor.background,
        backgroundColor: "#28a745",
      };
    } else if (item.apptStatus === "cancelled") {
      itemval = {
        text: "Cancelled",
        color: "#890000",
        backgroundColor: "#fcf2f1",
      };
    } else if (item.apptStatus === "rescheduled") {
      itemval = {
        text: "Rescheduled",
        color: defaultColor.background,
        backgroundColor: "#dc2b2b",
      };
    }
    return itemval;
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `doctorDetails/${data.doctorId}`,
        })
      }
      style={{
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderColor: defaultColor.cardBorderColor,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View style={{}}>
          <Text
            style={{
              color: "gray",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Appointment ID : #{data.apptID ?? data.old_apptID}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: renderConditionalValue(data).backgroundColor,
            padding: 5,
            borderRadius: 3,
          }}
        >
          <Text
            style={{
              color: renderConditionalValue(data).color,
              fontSize: 12,
            }}
          >
            {renderConditionalValue(data).text}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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
            {data?.doctorData.fullName}
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
      </View>
    </TouchableOpacity>
  );
};

export default AapptDoctorCard;
