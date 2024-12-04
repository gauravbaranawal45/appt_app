import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import PersonalDetail from "@/components/doctorProfile/PersonalDetail";
import Reviews from "@/components/doctorProfile/Reviews";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createOpenLink } from "react-native-open-maps";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import homeFactory from "../../actions/homeAction";
import RenderHtml from "react-native-render-html";
import ApptSlot from "./ApptSlot";
import SortBottomSheet from "@/components/SortBottomSheet";
import { reviewSort } from "@/constants/sortOptions";

const DoctorDetails = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { params } = useRoute();
  const { defaultColor } = useApplicationContext();
  const [details, setDetails] = useState(null);
  const [reviewList, setReviewList] = useState({ data: [] });
  const [textlimit, setTextlimit] = useState(30);
  const [isredmore, setIsredmore] = useState(false);

  const mapView = createOpenLink({
    provider: "apple",
    query: "Santha, Sant Kabir Nagar",
    latitude: 26.908808,
    longitude: 83.069369,
    zoom: 1,
  });

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

  const handleAbout = (about) => {
    let newword = "";
    const words = about?.split(" ") ?? [];
    words?.slice(0, textlimit).forEach((item) => {
      newword += item + " ";
    });
    return newword;
  };

  const readMore = () => {
    if (isredmore) {
      setTextlimit(30);
      setIsredmore(false);
    } else {
      const words = details.about.split(" ");
      setTextlimit(words.length);
      setIsredmore(true);
    }
  };

  const renderAddress = (address) => {
    return (
      <>
        <Text
          style={{
            flex: 1,
            marginTop: 2,
            color: defaultColor.placeHolder,
          }}
        >
          {address.address1 + ", "}
          {address.address2 + ", "}
          {address.landmark !== "" && address.landmark + ", "}
          {address.city}
        </Text>
        <Text
          style={{
            flex: 1,
            marginTop: 2,
            color: defaultColor.placeHolder,
          }}
        >
          {address.state + " - "}
          {address.pincode}
        </Text>
      </>
    );
  };

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
            <View
              style={{
                flexDirection: "row",
                marginTop: 0,
                justifyContent: "space-between",
                // borderWidth: 1,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <MaterialIcons
                  name="people-alt"
                  size={25}
                  color={defaultColor.defaultColor}
                />
                <View style={styles.mt5}>
                  <Text style={styles.iconInfoText}>
                    {details?.appointments?.length}
                  </Text>
                  <Text style={styles.iconInfoText}>Patients</Text>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="chart-line"
                  size={25}
                  color={defaultColor.defaultColor}
                />
                <View style={styles.mt5}>
                  <Text style={styles.iconInfoText}>
                    {details?.workExperience}+
                  </Text>
                  <Text style={styles.iconInfoText}>Years Exp</Text>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <MaterialIcons
                  name="star-border"
                  size={25}
                  color={defaultColor.defaultColor}
                />
                <View style={styles.mt5}>
                  <Text style={styles.iconInfoText}>4.5</Text>
                  <Text style={styles.iconInfoText}>Rating</Text>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <MaterialIcons
                  name="message"
                  size={25}
                  color={defaultColor.defaultColor}
                />
                <View style={styles.mt5}>
                  <Text style={styles.iconInfoText}>132</Text>
                  <Text style={styles.iconInfoText}>Reviews</Text>
                </View>
              </View>
            </View>

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

            {/* Start Clinic detail component */}
            <View
              style={{
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: defaultColor.heading,
                  fontWeight: "bold",
                }}
              >
                Clinic Detail
              </Text>

              <View
                style={{
                  // flexDirection: "row",
                  marginTop: 15,
                  // alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: 600, color: defaultColor.text }}>
                  {details?.clinicName}
                </Text>
                {details && renderAddress(details.address)}
              </View>
              <TouchableOpacity onPress={mapView}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    // textAlign: "center",
                    color: defaultColor.defaultColor,
                    marginTop: 10,
                  }}
                >
                  View on Map
                </Text>
              </TouchableOpacity>
            </View>
            {/* End Clinic detail component */}

            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: defaultColor.heading,
                  fontWeight: "bold",
                }}
              >
                About me
              </Text>
              <View>
                <RenderHtml
                  baseStyle={{ color: defaultColor.placeHolder }}
                  contentWidth={width}
                  source={{ html: handleAbout(details?.about) }}
                />
                <Text
                  style={{
                    color: defaultColor.defaultColor,
                    fontWeight: 600,
                    marginTop: 0,
                  }}
                  onPress={readMore}
                >
                  {isredmore ? "Show Less" : "Read More"}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: defaultColor.heading,
                  fontWeight: "bold",
                }}
              >
                Specializations
              </Text>
              {details?.specialization.map((item, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginTop: 20,
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="checkcircleo"
                      size={18}
                      color={defaultColor.defaultColor}
                    />
                    <Text style={styles.iconInfoText}>{item.name}</Text>
                  </View>
                );
              })}
            </View>

            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: defaultColor.heading,
                  fontWeight: "bold",
                }}
              >
                Education
              </Text>
              {details?.educations.map((item, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginTop: 20,
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="checkcircleo"
                      size={18}
                      color={defaultColor.defaultColor}
                    />
                    <Text style={{}}>
                      {item.degree}
                      {" - "}
                      {item.school}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: defaultColor.heading,
                  fontWeight: "bold",
                }}
              >
                Experience
              </Text>
              {details?.experiences.map((item, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginTop: 20,
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="checkcircleo"
                      size={18}
                      color={defaultColor.defaultColor}
                    />
                    <Text style={{ flex: 1 }}>
                      {item.title}
                      {" - "}
                      {item.clinicName}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: defaultColor.heading,
                  fontWeight: "bold",
                }}
              >
                Registrations
              </Text>
              {details?.experiences.map((item, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginTop: 20,
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="checkcircleo"
                      size={18}
                      color={defaultColor.defaultColor}
                    />
                    <Text style={{ flex: 1 }}>
                      {item.title}
                      {" - "}
                      {item.clinicName}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: defaultColor.heading,
                  fontWeight: "bold",
                }}
              >
                Cancellation Policy
              </Text>
              {details?.cancellationCharges === "no" ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="alert-triangle"
                    size={22}
                    color={defaultColor.defaultColor}
                  />
                  <Text style={styles.iconInfoText}>
                    This appointment is fully refundable.
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="alert-triangle"
                    size={22}
                    color={defaultColor.defaultColor}
                  />
                  <Text style={{ fontWeight: "500", fontSize: 13, flex: 1 }}>
                    This appointment is completely non-refundable. If you cancel
                    this appointment you will only get{" "}
                    {details?.cancellationAmt}% amount.
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <SimpleLineIcons
                  name="lock"
                  size={22}
                  color={defaultColor.defaultColor}
                />

                <Text style={{ fontWeight: "500", fontSize: 13 }}>
                  Free cancellation available until payment is completed.
                </Text>
              </View>
            </View>

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
                    marginTop: 0,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
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
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: "center",
                        color: defaultColor.defaultColor,
                      }}
                    >
                      Share your story
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
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
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: "center",
                        color: defaultColor.defaultColor,
                      }}
                    >
                      View all {reviewList?.count} reviews
                    </Text>
                  </TouchableOpacity>
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
          <TouchableOpacity
            activeOpacity={0.5}
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
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mt5: {
    marginTop: 5,
  },
  mt25: {
    marginTop: 25,
  },
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconInfoText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 13,
  },
  reviewBtns: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default DoctorDetails;
