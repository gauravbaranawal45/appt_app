import { View, Text, LogBox, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import appointmentFactory from "../../actions/appointmentAction";
import { tConvert } from "@/utils/helper";
import { weekdays, monthNames } from "../../constants/staticData";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import NumberWiseSlot from "./NumberWiseSlot";
import TimeWiseSlot from "./TimeWiseSlot";
const ApptSlot = ({
  details,
  normalFee,
  horizontal,
  numColumns,
  docId,
  params,
}) => {
  const toast = useToast();
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();
  const [schedules, setSchedules] = useState([]);
  const [scheduledDate, setScheduledDate] = useState([]);

  useEffect(() => {
    setDateSequence(details?.schedules);
  }, [details]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const setDateSequence = (response) => {
    const res = [...response];
    const dayKey = res.map((item) => item.days);

    const modifiedDays = weekdays.map((item, i) => {
      if (item.label === res[i]?.days) {
        return { ...res[i], value: item.value };
      } else {
        const findIndex = dayKey.indexOf(item.label);
        if (findIndex !== -1) {
          const prevdata = res[findIndex];
          res.splice(findIndex, 0);
          return { ...prevdata, value: item.value };
        } else {
          return { days: item.label, value: item.value };
        }
      }
    });
    // console.log("modifiedDays", modifiedDays);

    const newState = [...modifiedDays];
    const currentDate = new Date();
    const currentday = currentDate.getDay();

    for (let i = 0; i < modifiedDays.length; i++) {
      if (modifiedDays[i].value === currentday) {
        break;
      } else {
        const prevItem = modifiedDays[i];
        newState.splice(0, 1);
        newState.push(prevItem);
      }
    }

    // console.log("newState", newState);

    let finaledData = newState.map((item) => {
      return getScheduleDays(item);
    });
    // console.log("aaaaaaa", finaledData);
    setSchedules(finaledData);
  };

  const getScheduleDays = (item) => {
    let dataObj = {};
    const currentDate = new Date();
    const currentday = currentDate.getDay();

    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);

    if (item.value === currentday) {
      dataObj = { ...item, label: "Today", active: true, date: currentDate };
    } else if (item.value === currentday + 1) {
      dataObj = {
        ...item,
        label: "Tomorrow",
        active: false,
        date: tmr,
      };
    } else {
      weekdays.forEach((newitem, i) => {
        const d = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
        const getday = d.getDay();
        if (getday === item.value) {
          dataObj = {
            ...item,
            label: d.getDate() + " " + monthNames[d.getMonth()],
            active: false,
            date: d,
          };
        }
      });
    }
    return dataObj;
  };

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
      const res = await appointmentFactory.rescheduleAppt(
        { scheduledAppt: scheduledDate, isRescheduleBy: "self" },
        params.apptId
      );
      toast.show(res.data.data, {
        type: "success",
        placement: "top",
        duration: 5000,
        animationType: "zoom-in",
      });
      setTimeout(() => {
        navigation.navigate("appointmentDetail", {
          id: params.apptId,
        });
      }, 1000);
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

  return (
    <View>
      <View
        style={{
          borderWidth: 0.5,
          borderRadius: 5,
          paddingTop: 10,
          paddingBottom: details.apptType === "timeWise" ? 10 : 0,
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
            Clinic Appointment
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: defaultColor.defaultColor,
              fontWeight: 600,
            }}
          >
            ₹{normalFee} Fees
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          {details.apptType === "numberWise" ? (
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
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          gap: 10,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: defaultColor.defaultColor,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: defaultColor.defaultColor,
            borderRadius: 5,
          }}
          onPress={confirmHandler}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ApptSlot;
