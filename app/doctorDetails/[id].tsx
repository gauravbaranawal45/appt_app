import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import PersonalDetail from "@/components/doctorProfile/PersonalDetail";
import Reviews from "@/components/doctorProfile/Reviews";
import { AntDesign } from "@expo/vector-icons";
import { createOpenLink } from "react-native-open-maps";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import homeFactory from "../../actions/homeAction";
import ApptSlot from "./ApptSlot";
import SortBottomSheet from "@/components/SortBottomSheet";
import DetailsIconsList from "./DetailsIconsList";
import ProfessionalDetails from "./ProfessionalDetails";
import { reviewSort } from "@/constants/sortOptions";

const DoctorDetails = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { defaultColor } = useApplicationContext();
  const [details, setDetails] = useState(null);
  const [reviewList, setReviewList] = useState({ data: [] });

  const fetchHome = async () => {
    try {
      const res = await homeFactory.doctorDetail(params.id);
      setDetails(res.data.data);
      const rlist = await homeFactory.getDoctorReview({
        id: params.id,
        filter: "mostHelpful",
        limit: 5,
        page: 0,
      });
      setReviewList(rlist.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  const onClickHandler = async (val) => {
    const rlist = await homeFactory.getPatientReview({
      id: params.id,
      filter: val.value,
      limit: 5,
      page: 0,
    });
    setReviewList(rlist.data);
  };
  // var str = JSON.stringify(details, null, 2);
  // console.log(str);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 10 }}>
          <PersonalDetail details={details ?? {}} params={params} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 50,
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <DetailsIconsList details={details} />

            <View style={{ marginTop: 20 }}>
              {details && (
                <ApptSlot
                  details={details}
                  normalFee={details.normalFee}
                  docId={params.id}
                  horizontal={true}
                  numColumns={0}
                  params={params}
                />
              )}
            </View>

            <ProfessionalDetails details={details} />

            <View style={{ marginTop: 30 }}>
              <View
                style={{
                  ...styles.flexBetween,
                  marginBottom: 10,
                  // backgroundColor: "red",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: defaultColor.heading,
                    fontWeight: "bold",
                  }}
                >
                  Patients Reviews
                </Text>
              </View>
              <Text
                style={{ color: defaultColor.placeHolder, fontWeight: 500 }}
              >
                These stories represent patient opinions and experiences. They
                do not reflect the doctor's medical capabilities.
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "#f0f0f5",
                  paddingVertical: 20,
                  marginTop: 20,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign
                    name="like1"
                    size={25}
                    color={defaultColor.defaultColor}
                  />
                  <Text
                    style={{ fontSize: 30, fontWeight: 600, marginLeft: 10 }}
                  >
                    90%
                  </Text>
                </View>
                <View
                  style={{
                    width: 1,
                    backgroundColor: "#f0f0f5",
                    marginHorizontal: 20,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text>
                    Out of all patients who were surveyed, 90% of them recommend
                    visiting this doctor
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 20,
                }}
              >
                <Text>{reviewList?.count} stories</Text>
                <SortBottomSheet
                  title={"Most Helpful"}
                  modalTitle="Sort By"
                  onClickHandler={onClickHandler}
                  options={reviewSort}
                />
              </View>

              <View style={{ marginTop: 0 }}>
                {reviewList?.data.map((item, i) => (
                  <Reviews key={i} item={item} defaultColor={defaultColor} />
                ))}
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <Pressable
                    style={[
                      styles.reviewBtns,
                      { borderColor: defaultColor.defaultColor },
                    ]}
                    onPress={() =>
                      navigation.navigate("writeReview", {
                        id: params.id,
                      })
                    }
                  >
                    <Text
                      style={{
                        ...styles.btnText,
                        color: defaultColor.defaultColor,
                      }}
                    >
                      Share your story
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.reviewBtns,
                      { borderColor: defaultColor.defaultColor },
                    ]}
                    onPress={() =>
                      navigation.navigate("reviewlist", {
                        id: params.id,
                      })
                    }
                  >
                    <Text
                      style={{
                        ...styles.btnText,
                        color: defaultColor.defaultColor,
                      }}
                    >
                      View all {reviewList?.count} reviews
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#fff",
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 2,
            padding: 10,
          }}
        >
          <View>
            <Text style={{ fontWeight: 500, fontSize: 14 }}>
              Consult Fees :{" "}
              <Text
                style={{ color: defaultColor.defaultColor, fontWeight: 700 }}
              >
                {" "}
                ₹{details?.normalFee}
              </Text>
            </Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 14,
                marginTop: 2,
              }}
            >
              Taxs & Services :{" "}
              <Text
                style={{ color: defaultColor.defaultColor, fontWeight: 700 }}
              >
                {" "}
                ₹0
              </Text>
            </Text>
          </View>
          <Pressable
            style={{
              flex: 1,
              paddingVertical: 10,
              // paddingHorizontal: 10,
              backgroundColor: defaultColor.defaultColor,
              borderRadius: 10,
              alignItems: "center",
              marginLeft: 30,
            }}
            onPress={() =>
              navigation.navigate("appointmentSlot", {
                docId: params.id,
                specialist: params.specialist,
                source: "detailPage",
              })
            }
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Book Appointment
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewBtns: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 15,
    fontWeight: 500,
    textAlign: "center",
  },
});

export default DoctorDetails;
