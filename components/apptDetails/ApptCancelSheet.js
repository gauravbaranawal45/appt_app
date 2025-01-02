import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useToast } from "react-native-toast-notifications";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import TextField from "@/components/Inputs/TextField";
import appointmentFactory from "../../actions/appointmentAction";

const cancelList = [
  {
    label: "Booked with wrong user details.",
    value: "Booked with wrong user details.",
    checked: false,
  },
  { label: "I am busy.", value: "I am busy.", checked: false },
  {
    label: "Forgot about the appointment",
    value: "Forgot about the appointment",
    checked: false,
  },
  { label: "Changed my Mind", value: "Changed my Mind", checked: false },
  {
    label: "Visited another doctor",
    value: "Visited another doctor",
    checked: false,
  },
  {
    label: "Clinic/Hospital is far",
    value: "Clinic/Hospital is far",
    checked: false,
  },
  {
    label: "Doctor asked me to cancel",
    value: "Doctor asked me to cancel",
    checked: false,
  },
  { label: "Others", value: "Others", checked: false },
];

const ApptCancelSheet = ({
  title,
  modalTitle,
  apptId,
  setData,
  onPressTouch,
  paymentStatus,
  officialMobile,
}) => {
  const toast = useToast();
  const { defaultColor, setApptdata } = useApplicationContext();
  const refStandard = useRef();
  const [options, setOptions] = useState(cancelList);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const onPress = () => {
    if (!open) {
      refStandard.current.open();
    } else {
      refStandard.current.close();
    }
  };

  const onChangeHandler = (value) => {
    let newstate = [...cancelList];
    newstate = newstate.map((item) => {
      if (item.value === value) {
        return { ...item, checked: true };
      } else {
        return { ...item, checked: false };
      }
    });
    setOptions(newstate);
  };

  const handleCancel = () => {
    refStandard.current.close();
    setOptions(cancelList);
    setComment("");
  };

  const getselectedvalue = () => {
    if (paymentStatus === "pending") {
      let newstate = [...options];
      newstate = newstate.filter((item) => item.checked);
      return newstate;
    } else {
      return [1];
    }
  };

  const handleConfirm = async () => {
    if (paymentStatus === "completed") {
      Linking.openURL(`tel:${officialMobile}`);
      return false;
    }
    const payload = {
      comment,
      reason: getselectedvalue()[0],
    };
    try {
      const res = await appointmentFactory.cancelAppointment(payload, apptId);
      const response = await appointmentFactory.appointmentDetail(apptId);
      setData(response.data.data);
      const res1 = await appointmentFactory.getAppointments({
        limit: 10,
        apptType: "all",
      });
      setApptdata(res1.data.data);
      toast.show(res.data.data, {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
      setTimeout(() => {
        setOpen(false);
        setOptions(cancelList);
        setComment("");
        onPressTouch();
      }, 1000);
    } catch (e) {}
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
        <AntDesign
          name="closecircleo"
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
        height={paymentStatus === "pending" ? 650 : 220}
        onOpen={() => setOpen(true)}
        onClose={() => {
          setOpen(false);
          setOptions(cancelList);
          setComment("");
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
            <View style={{}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
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
            {paymentStatus === "pending" ? (
              <>
                <RadioForm
                  formHorizontal={false}
                  labelHorizontal={true}
                  animation={true}
                >
                  {options.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={obj.checked}
                        onPress={onChangeHandler}
                        borderWidth={1}
                        buttonInnerColor={defaultColor.defaultColor}
                        buttonOuterColor={"#000"}
                        buttonSize={12}
                        buttonOuterSize={20}
                        buttonStyle={{}}
                        buttonWrapStyle={{ marginVertical: 5 }}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={onChangeHandler}
                        labelStyle={{ fontSize: 14, color: defaultColor.text }}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))}
                </RadioForm>
                <TextField
                  field={{
                    value: comment,
                    onChange: setComment,
                    multiline: true,
                  }}
                  invalid={false}
                  error={{}}
                  placeholder="Add your comments here"
                  keyboardType="default"
                  extraStyle={{
                    backgroundColor: "#fff",
                    height: 120,
                    marginVertical: 10,
                  }}
                />
              </>
            ) : (
              <View>
                <Text style={{ color: defaultColor.placeHolder }}>
                  For cancellation support, please cantact our team at{" "}
                  {officialMobile} or you can visit Clinic/Hospital
                </Text>
              </View>
            )}

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
                disabled={getselectedvalue().length === 0}
                activeOpacity={0.5}
                style={{
                  paddingVertical: 10,
                  borderRadius: 5,
                  backgroundColor:
                    getselectedvalue().length === 0
                      ? defaultColor.inputBackground
                      : defaultColor.defaultColor,
                  paddingHorizontal: 30,
                }}
                onPress={
                  paymentStatus === "received" ? handlerCall : handleConfirm
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
          </View>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ApptCancelSheet;
