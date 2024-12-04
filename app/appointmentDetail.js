import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { useApplicationContext } from "@/context/ApplicationContext";
import appointmentFactory from "../actions/appointmentAction";
import { Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import ApptDoctorCard from "../components/apptDetails/apptDoctorCard";
import Apptdetail from "../components/apptDetails/apptdetail";
import Petientdetail from "../components/apptDetails/petientdetail";
import ApptCancelSheet from "../components/apptDetails/ApptCancelSheet";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const AppointmentDetail = () => {
  const scrollRef = useRef();
  const { params } = useRoute();
  const router = useRouter();
  const { defaultColor } = useApplicationContext();
  const [data, setData] = useState(null);

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const fetchDetails = async () => {
    try {
      const response = await appointmentFactory.appointmentDetail(params.id);
      setData(response.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // var str = JSON.stringify(data, null, 2);
  // console.log(data);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        ref={scrollRef}
        nestedScrollEnabled={true}
        style={{
          flex: 1,
          // backgroundColor: "#e8e6e6"
        }}
      >
        <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 50 }}>
          <View style={{ marginTop: 0 }}>
            {data?.apptStatus === "cancelled" && (
              <View
                style={{
                  backgroundColor: "#f4dede",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <FontAwesome
                    name="calendar-times-o"
                    size={24}
                    color={defaultColor.dangerColor}
                  />
                  <Text
                    style={{
                      color: defaultColor.dangerColor,
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    Appointment Cancelled
                  </Text>
                </View>
                <Text>
                  Looks like you have cancelled your appointment with{" "}
                  {data?.doctorData.firstName + " " + data?.doctorData.lastName}
                  . You may rebook the appointment.
                </Text>
              </View>
            )}
            {data?.apptStatus === "completed" ||
            data?.apptStatus === "rescheduled" ? (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      color: defaultColor.lightGreen,
                      fontSize: 16,
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    Appointment {data?.apptStatus}
                  </Text>
                  <AntDesign
                    name="checkcircleo"
                    size={18}
                    color={defaultColor.lightGreen}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: defaultColor.placeHolder,
                      fontSize: 14,
                      fontWeight: 500,
                      textTransform: "capitalize",
                      textAlign: "center",
                    }}
                  >
                    Appointment ID : #{data?.apptID}
                  </Text>
                </View>
              </View>
            ) : null}
            <ApptDoctorCard
              data={data}
              defaultColor={defaultColor}
              router={router}
            />
          </View>
          <Apptdetail data={data} defaultColor={defaultColor} />
          <Petientdetail data={data} defaultColor={defaultColor} />

          <View
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              borderColor: defaultColor.cardBorderColor,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 5,
              }}
            >
              Payment details
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text style={styles.listText}>Consultation Fee</Text>
              <Text style={styles.listText}>₹{data?.apptFees}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text style={styles.listText}>Service Fee & Tax</Text>
              {data?.applicable_charges ? (
                <Text style={styles.listText}>
                  ₹
                  {parseInt(data?.tax_service_charge) +
                    parseInt(data?.apptFees)}
                </Text>
              ) : (
                <Text style={styles.listText}>
                  ₹{data?.tax_service_charge} Free
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text style={styles.listText}>Total Charge</Text>
              <Text style={styles.listText}>₹{data?.totalCharges}</Text>
            </View>
          </View>

          {data?.apptStatus === "pending" && (
            <>
              <Divider style={{ marginVertical: 20 }} />
              <View>
                <TouchableOpacity
                  style={[styles.listWrap]}
                  onPress={onPressTouch}
                >
                  <FontAwesome
                    name="calendar"
                    size={26}
                    style={{ color: defaultColor.heading, width: 40 }}
                  />
                  <Text style={[styles.listText, { fontWeight: 600 }]}>
                    Re-schedule
                  </Text>
                </TouchableOpacity>
                <ApptCancelSheet
                  title="Cancel"
                  modalTitle={
                    data?.paymentStatus === "pending"
                      ? "Reason for Cancelling"
                      : "Cancel Appointment"
                  }
                  apptId={data._id}
                  setData={setData}
                  onPressTouch={onPressTouch}
                  paymentStatus={data?.paymentStatus}
                  officialMobile={data?.doctorData.officialMobile}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentDetail;

const styles = StyleSheet.create({
  listWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  listText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#11181C",
    textTransform: "capitalize",
  },
});
