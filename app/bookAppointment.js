import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import homeFactory from "../actions/homeAction";
import { useApplicationContext } from "@/context/ApplicationContext";
import appointmentFactory from "../actions/appointmentAction";
import { useToast } from "react-native-toast-notifications";
import { Divider } from "react-native-paper";
import ApptFooter from "../components/bookAppointment/apptFooter";
import DoctorCard from "../components/bookAppointment/doctorCard";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookAppointment = () => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const { params } = useRoute();
  const route = useRoute();
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();
  const [data, setData] = useState(null);
  const [memberData, setMemberData] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  const fetchDetails = async () => {
    try {
      const response = await homeFactory.doctorDetail(params.id);
      setData(response.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchMembers = async () => {
    const res = await appointmentFactory.getMember();
    let newData = [...res.data.data];
    newData = newData.map((item) => {
      if (item.isDefault) {
        return { ...item, active: true };
      } else {
        return { ...item, active: false };
      }
    });
    setMemberData(newData);
  };

  useEffect(() => {
    if (isFocused) {
      fetchDetails();
      fetchMembers();
    }
  }, [isFocused]);

  const handleAppt = async () => {
    let newState = [...memberData];
    newState = newState.filter((item) => item.active)[0];
    const selectedDate = await AsyncStorage.getItem("__consultBookDetails");
    const parseData = JSON.parse(selectedDate);
    delete parseData["docId"];

    const payload = {
      scheduledAppt: parseData,
      patientInfo: newState,
      doctorId: params.id,
      specialist: params.specialist,
      couponCode,
      createdBy: "user",
      paymentMode: "cash",
      paymentSource: "cash",
      apptType: data.apptType,
    };

    // return;
    try {
      const res = await appointmentFactory.createAppointment(payload);
      toast.show(res.data.data, {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
      setTimeout(() => {
        // navigation.navigate("appointments");
      }, 1000);
    } catch (e) {
      console.log("eeee", e);
      toast.show(e?.message, {
        type: "danger",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
    } finally {
    }
  };

  // var str = JSON.stringify(data, null, 2);
  // console.log(str);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 50 }}>
          {data && (
            <DoctorCard
              data={data}
              defaultColor={defaultColor}
              params={params}
            />
          )}
          <View style={{ marginTop: 30, marginBottom: 10 }}>
            <Text
              style={{
                color: defaultColor.heading,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Offers and discounts
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 15,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("coupons");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="brightness-percent"
                    size={24}
                    color="black"
                  />
                  <Text style={{ fontWeight: 500 }}>
                    Apply Offers and Coupons
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={18}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 30, marginBottom: 10 }}>
            <Text
              style={{
                color: defaultColor.heading,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Total Charges
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 15,
              borderRadius: 10,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Consultation Fees</Text>
                <Text>₹{data?.normalFee}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <View>
                  <Text>Service Fee & Tax</Text>
                  <Text
                    style={{
                      color: defaultColor.lightGreen,
                      fontSize: 12,
                      marginTop: 5,
                      fontWeight: 600,
                    }}
                  >
                    We care for you & provide a free booking
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text style={{ textDecorationLine: "line-through" }}>
                    ₹108
                  </Text>
                  <Text>Free</Text>
                </View>
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: defaultColor.heading,
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Pay Now
                </Text>
                <Text
                  style={{
                    color: defaultColor.heading,
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  ₹{data?.normalFee}
                </Text>
              </View>
            </View>
          </View>
          {apiError.error && (
            <Text
              style={{
                color: "red",
                fontSize: 13,
                marginTop: 20,
              }}
            >
              {apiError.message}
            </Text>
          )}
        </View>
      </ScrollView>
      <ApptFooter
        fees={data?.normalFee}
        defaultColor={defaultColor}
        memberData={memberData}
        setMemberData={setMemberData}
        handleAppt={handleAppt}
      />
    </SafeAreaView>
  );
};

export default BookAppointment;
