import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  LogBox,
  Button,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useApplicationContext } from "@/context/ApplicationContext";
import appointmentFactory from "../../actions/appointmentAction";
import NumberWiseSlot from "./NumberWiseSlot";
import { formattedDate, setDateSequence } from "../../utils/helper";
import { useToast } from "react-native-toast-notifications";

const RescheduleSheet = ({
  title,
  modalTitle,
  apptType,
  docId,
  apptId,
  paymentStatus,
  officialMobile,
  doctorName,
  fetchApptDetails,
}) => {
  const toast = useToast();
  const { defaultColor } = useApplicationContext();
  const refStandard = useRef();
  const [open, setOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [scheduledDate, setScheduledDate] = useState({});
  const [issucess, setIssuccess] = useState(false);

  const onPress = () => {
    if (!open) {
      refStandard.current.open();
    } else {
      refStandard.current.close();
    }
  };

  const handleCancel = () => {
    setIssuccess(false);
    setScheduledDate({});
    refStandard.current.close();
  };

  const fetchDetails = async () => {
    try {
      const res = await appointmentFactory.getschedulelist(docId);
      const data = setDateSequence(res.data.data);
      setSchedules(data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    fetchDetails();
  }, []);

  const getScheduleTime = () => {
    let newState = [...schedules];
    newState = newState.filter((item) => item.active);
    const scheduledTime = newState[0];
    if (!scheduledTime?.times) return [[]];

    let slots = scheduledTime?.times.map((item) => {
      return createSlots(
        new Date(item.fromTime).getTime(),
        new Date(item.toTime).getTime()
      );
    });
    return slots;
  };

  function createSlots(start, end) {
    let slots = [];
    let mins = 0;
    const date = (dt) => new Date(dt);

    while (start <= end - 30 * 60 * 1000) {
      start += mins;
      const minutes =
        date(start).getMinutes() === 0 ? "00" : date(start).getMinutes();
      let hrs = date(start).getHours();
      hrs = hrs >= 10 ? hrs : "0" + hrs;
      slots.push(`${hrs}:${minutes}`);
      mins = 15 * 60 * 1000; // 15 mins
    }
    return slots;
  }

  const headerComponent = (val) => {
    return val.length ? (
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginVertical: 15,
          marginTop: 20,
          marginHorizontal: 5,
        }}
      >
        <Text
          style={{ fontSize: 14, fontWeight: 600, color: "#165d59" }}
        >{`${tConvert(val[0])} - ${tConvert(val[val.length - 1])}`}</Text>
        <Text style={{ fontSize: 14, fontWeight: 600, color: "#165d59" }}>
          ({val.length} Slot)
        </Text>
      </View>
    ) : (
      ""
    );
  };

  const EmptyListMessage = () => {
    return (
      <View
        style={{ backgroundColor: "#fff", alignItems: "center", margin: 20 }}
      >
        <Text style={{ fontSize: 18, fontWeight: 600 }}>
          No slots available
        </Text>
      </View>
    );
  };

  const handleClick = async (item) => {
    const date = new Date(item.date);
    date.setHours(0, 0, 0, 0);
    const selectedDate = {
      date: date,
      days: item.days,
    };
    setScheduledDate(selectedDate);
  };

  const confirmHandler = async () => {
    try {
      await appointmentFactory.rescheduleAppt(
        { scheduledAppt: scheduledDate, isRescheduleBy: "self" },
        apptId
      );
      fetchApptDetails();
      setIssuccess(true);
    } catch (e) {
      console.log("error", e.response.data, e?.message);
      toast.show(e.response?.data?.message || e?.message, {
        type: "danger",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
    }
  };

  const handlerCall = () => {};

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <FontAwesome
          name="calendar"
          size={22}
          style={{ color: defaultColor.heading, width: 40 }}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#11181C",
            textTransform: "capitalize",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
      {/* List Menu */}
      <RBSheet
        ref={refStandard}
        draggable={true}
        dragOnContent={false}
        height={paymentStatus === "pending" ? 520 : 260}
        onOpen={() => setOpen(true)}
        onClose={() => {
          setOpen(false);
          setScheduledDate({});
          setIssuccess(false);
        }}
      >
        <ScrollView style={{ flex: 1, marginBottom: 50 }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: defaultColor.heading,
                }}
              >
                {modalTitle}
              </Text>
            </View>
            <View
              style={{
                height: 0.5,
                backgroundColor: "#ccc",
                marginVertical: 10,
              }}
            />
            {paymentStatus === "pending" && !issucess && (
              <View
                style={{
                  borderWidth: 0.5,
                  borderRadius: 5,
                  paddingTop: 10,
                  paddingBottom: apptType === "timeWise" ? 10 : 0,
                  borderColor: "gray",
                  backgroundColor: "#fff",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: defaultColor.heading,
                      fontWeight: 700,
                    }}
                  >
                    Select Date
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  {apptType === "numberWise" ? (
                    <NumberWiseSlot
                      schedules={schedules}
                      defaultColor={defaultColor}
                      handleClick={handleClick}
                      scheduledDate={scheduledDate}
                    />
                  ) : (
                    <TimeWiseSlot
                      schedules={schedules}
                      defaultColor={defaultColor}
                      getScheduleTime={getScheduleTime}
                      headerComponent={headerComponent}
                      horizontal={horizontal}
                      numColumns={numColumns}
                      EmptyListMessag={EmptyListMessage}
                      docId={docId}
                      params={params}
                      setSchedules={setSchedules}
                    />
                  )}
                </View>
              </View>
            )}

            {paymentStatus === "received" && !issucess && (
              <View>
                <Text style={{ color: defaultColor.placeHolder }}>
                  For reschedule support, please cantact our team at{" "}
                  {officialMobile} or you can visit Clinic/Hospital
                </Text>
              </View>
            )}

            {!issucess && (
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  justifyContent: "flex-end",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    paddingVertical: 10,
                    borderRadius: 5,
                    paddingHorizontal: 30,
                  }}
                  onPress={handleCancel}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      textAlign: "center",
                      color: "#4C4DDC",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    borderRadius: 5,
                    backgroundColor: defaultColor.defaultColor,
                    paddingHorizontal: 30,
                  }}
                  onPress={
                    paymentStatus === "received" ? handlerCall : confirmHandler
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
                    {paymentStatus === "pending" ? "Confirm" : "Call"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {issucess && (
              <View>
                <Text>
                  Your appointment with{" "}
                  <Text style={{ fontWeight: "bold" }}>{doctorName}</Text> has
                  been rescheduled to:
                </Text>
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
                    style={{ color: defaultColor.inputIcon, width: 30 }}
                  />
                  <Text
                    style={{
                      color: defaultColor.lightGreen,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {scheduledDate.date && formattedDate(scheduledDate)}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: defaultColor.defaultColor,
                    borderRadius: 5,
                    marginTop: 20,
                  }}
                  onPress={handleCancel}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default RescheduleSheet;
