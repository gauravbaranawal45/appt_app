import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import HeadingTitle from "../common/headingTitle";
import { imgPath } from "../../service/axiosInstance";
import { useNavigation, useRoute } from "@react-navigation/native";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import Octicons from "@expo/vector-icons/Octicons";
import { useApplicationContext } from "@/context/ApplicationContext";
import { renderSpecialist } from "@/utils/helper";
const textColor = "black";
const seeAllColor = "#4C4DDC";

const HomeCard = ({
  title,
  handleSeeAll,
  data,
  showSectionsTitle,
  showSort,
}) => {
  const { params } = useRoute();
  const router = useRouter();
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();

  const handlerClick = (item) => {
    let setparam = {
      docId: item.doctorId,
      source: "homePage",
    };
    if (params.specialist !== "doctorList") {
      setparam.specialist = params.specialist;
    }
    navigation.navigate("appointmentSlot", setparam);
  };

  const redirectDetailPage = (item) => {
    let pathname = `doctorDetails/${item.doctorId}`;
    if (params?.specialist) {
      pathname = pathname + "?specialist=" + params.specialist;
    }
    router.push({
      pathname: pathname,
    });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {showSectionsTitle ? (
        <HeadingTitle
          title={title}
          handleSeeAll={handleSeeAll}
          onClickHandler={() => {}}
          showSort={showSort}
        />
      ) : null}

      {data.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              borderWidth: 1,
              padding: 5,
              borderColor: "#D9D9D9",
              borderRadius: 10,
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => redirectDetailPage(item)}
              key={Math.random()}
              style={{ flexDirection: "row" }}
            >
              <View>
                <Image
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 10,
                  }}
                  source={
                    item.image
                      ? { uri: `${imgPath}profileimages/${item.image}` }
                      : blankProfile
                  }
                />
              </View>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    {item.firstName + " " + item.lastName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="star"
                      size={18}
                      color={"#ffa534"}
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: seeAllColor,
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      4.5
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: defaultColor.text,
                    marginTop: 3,
                  }}
                >
                  {renderSpecialist(item, params?.specialist)}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: defaultColor.text,
                    marginTop: 5,
                  }}
                >
                  {item.workExperience} yrs overall experience
                </Text>
                <Text
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: textColor,
                      marginRight: 10,
                    }}
                  >
                    {item.clinicName}
                    {"   "}
                  </Text>
                  <Octicons
                    name="dot-fill"
                    size={12}
                    color="black"
                    style={{}}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: defaultColor.text,
                      marginLeft: "10px",
                    }}
                  >
                    {" "}
                    {item.address?.city}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: " #fff",
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      marginTop: 2,
                      color: "#4C4DDC",
                    }}
                  >
                    Fee: ₹{item.normalFee}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#eef0ff",
                    paddingHorizontal: 30,
                  }}
                  onPress={() => handlerClick(item)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      textAlign: "center",
                      color: "#4C4DDC",
                    }}
                  >
                    Book Appointments
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default HomeCard;
