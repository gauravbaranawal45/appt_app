import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { imgPath } from "../../service/axiosInstance";
import { tConvert, formattedDate, formatAMPM } from "../../utils/helper";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const DoctorCard = ({ data, defaultColor, params }) => {
  const router = useRouter();
  const [storedSchedule, setStoredSchedule] = useState();

  const renderSpecialist = (item) => {
    let text = "";
    if (params.specialist) {
      item?.specialization?.forEach((subitem, i) => {
        if (params.specialist === subitem._id) {
          text += (i ? ", " : "") + subitem.name;
        }
      });
    } else {
      item?.specialization?.forEach((subitem, i) => {
        text += (i ? ", " : "") + subitem.name;
      });
    }
    return text;
  };

  useEffect(() => {
    getStoredSchedule();
  }, []);

  const getStoredSchedule = async () => {
    const selectedDate = await AsyncStorage.getItem("__consultBookDetails");
    setStoredSchedule(JSON.parse(selectedDate));
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <View>
          <View style={{ marginTop: 0 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              key={Math.random()}
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <View>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70,
                  }}
                  source={
                    data?.image
                      ? { uri: `${imgPath}profileimages/${data?.image}` }
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
                  {data?.fullName}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: defaultColor.placeHolder,
                    marginTop: 3,
                  }}
                >
                  {renderSpecialist(data)} | {data?.workExperience} YRS Exp.
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: defaultColor.text,
                    marginTop: 3,
                    fontWeight: 600,
                  }}
                >
                  {data.clinicName}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Divider style={{ marginVertical: 20 }} />
          <View style={{ marginTop: 0 }}>
            <View style={{ marginTop: 0 }}>
              <View style={styles.listWrap}>
                <FontAwesome
                  name="building-o"
                  size={18}
                  style={{ color: defaultColor.heading, width: 50 }}
                />
                <Text style={styles.listText}>Clinic Visit</Text>
              </View>
              <View style={{ ...styles.listWrap, marginTop: 20 }}>
                <FontAwesome
                  name="map-marker"
                  size={24}
                  style={{ color: defaultColor.heading, width: 50 }}
                />
                <Text style={{ ...styles.listText, flex: 1 }}>
                  {`${data?.address?.address1}, ${data?.address?.address2}, ${data?.address?.landmark}, ${data?.address?.city}, ${data?.address?.state} - ${data?.address?.pincode}`}
                </Text>
              </View>
              <View style={{ ...styles.listWrap, marginTop: 20 }}>
                <Ionicons
                  name={"calendar-outline"}
                  size={18}
                  style={{ color: defaultColor.heading, width: 50 }}
                />

                <Text style={styles.listText}>
                  {storedSchedule && formattedDate(storedSchedule)}
                  {storedSchedule && data.apptType === "timeWise" && (
                    <>
                      {" | "}
                      formatAMPM(new Date(storedSchedule.date))
                    </>
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  listWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  listText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#11181C",
  },
});
