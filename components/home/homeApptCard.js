import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { imgPath } from "../../service/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import { useApplicationContext } from "@/context/ApplicationContext";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import {
  formatAMPM,
  formattedDate,
  renderSpecialist,
  tConvert,
  textLimit,
} from "../../utils/helper";
import HeadingTitle from "../common/headingTitle";
import SortWithFilter from "../common/sortWithFilter";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";

const textColor = "black";

const HomeApptCard = ({ data, showSectionsTitle, handleSeeAll }) => {
  const { defaultColor } = useApplicationContext();
  const navigation = useNavigation();
  const router = useRouter();

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
    <View>
      {showSectionsTitle ? (
        <HeadingTitle
          title="Recent Appointments"
          onClickHandler={() => {}}
          showSort={false}
          handleSeeAll={handleSeeAll}
        />
      ) : null}
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              padding: 10,
              borderColor: "#D9D9D9",
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("appointmentDetail", {
                  id: item._id,
                })
              }
              key={Math.random()}
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
                    Appointment ID : #{item.apptID ?? item.old_apptID}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor:
                      renderConditionalValue(item).backgroundColor,
                    padding: 5,
                    borderRadius: 3,
                  }}
                >
                  <Text
                    style={{
                      color: renderConditionalValue(item).color,
                      fontSize: 12,
                    }}
                  >
                    {renderConditionalValue(item).text}
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <View>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 100,
                    }}
                    source={
                      item.doctorData.image
                        ? {
                            uri: `${imgPath}profileimages/${item.doctorData.image}`,
                          }
                        : blankProfile
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {item.doctorData.fullName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "gray",
                      marginTop: 3,
                    }}
                  >
                    {renderSpecialist(item.doctorData, item.specialist)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      flexDirection: "row",
                      marginTop: 3,
                      color: "gray",
                    }}
                  >
                    <Text style={{ marginRight: 10 }}>
                      {textLimit(
                        item.doctorData.clinicName +
                          ", " +
                          item.doctorData.address.city,
                        30
                      )}
                    </Text>
                    <Text style={{ marginLeft: "10px" }}></Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ marginVertical: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="user"
                  size={18}
                  style={{ color: defaultColor.inputIcon, width: 40 }}
                />
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {item.patientInfo.patientName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={"calendar-outline"}
                  size={18}
                  style={{ color: defaultColor.inputIcon, width: 40 }}
                />
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {formattedDate(item.scheduledAppt)}
                  {" | "}
                  {item.apptType === "numberWise"
                    ? "WL " + item.waitingList
                    : formatAMPM(new Date(item?.scheduledAppt.date))}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: defaultColor.defaultColor,
                paddingHorizontal: 30,
                flex: 1,
              }}
              onPress={() =>
                router.push({
                  pathname: `doctorDetails/${item.doctorId}`,
                })
              }
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {item.apptStatus === "pending" ? "Direction" : "Rebook"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5 }}
      />
    </View>
  );
};

export default HomeApptCard;
