import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Buttons from "@/components/common/Button";
import { useApplicationContext } from "@/context/ApplicationContext";
import InputLabel from "@/components/common/InputLabel";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Octicons } from "@expo/vector-icons";
import { genderData } from "@/constants/staticData";
import { Dropdown } from "react-native-element-dropdown";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import TextField from "@/components/Inputs/TextField";
import authFactory from "../actions/authAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const signupPersonalInfo = () => {
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      dob: "",
      gender: "",
      password: "",
    },
  });
  const { params } = useRoute();
  const navigation = useNavigation();
  const router = useRouter();
  const { defaultColor, location, getPermissions } = useApplicationContext();
  const [isFocus, setIsFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  console.log("location", location);

  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    getPermissions();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setValue("dob", date);
    clearErrors("dob");
    hideDatePicker();
  };

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      mobile: params.mobile,
      gender: data.gender.value,
      latlong: location,
    };
    try {
      const res = await authFactory.createAccount(newData);
      await AsyncStorage.setItem("__token", res.data.token);
      router.push("home");
    } catch (e) {
      setApiError({ error: true, ...e.response?.data });
    }
  };

  if (Object.keys(errors).length > 0) {
    Keyboard.dismiss();
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultColor.background }}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          ...styles.headerWrapper,
          backgroundColor: defaultColor.background,
        }}
      >
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("signup")}
          >
            <Octicons name="arrow-left" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={require("@/assets//images/logo.png")} style={{}} />
        </View>
        <View></View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View
            style={{
              marginTop: 8,
              backgroundColor: defaultColor.background,
              paddingHorizontal: 15,
              marginBottom: 0,
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                Enter Personal Info
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ marginTop: 20 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <TextField
                      field={field}
                      placeholder="Full Name"
                      keyboardType="default"
                      lableText="Full Name"
                    />
                  )}
                  name="fullName"
                />
                {errors.fullName && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 13,
                      marginTop: 8,
                    }}
                  >
                    Full name is required field
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 20 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLabel
                      placeholder={"Date of Birth"}
                      value={value ? value.toLocaleDateString() : null}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      editable={false}
                      onPressIn={showDatePicker}
                      lableText="Date of Birth"
                    />
                  )}
                  name="dob"
                />
                {errors.dob && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 13,
                      marginTop: 8,
                    }}
                  >
                    Date of Birth is required field
                  </Text>
                )}

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && { borderColor: "blue" },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={genderData}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={"Select Gender"}
                      searchPlaceholder="Search..."
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                  name="gender"
                />
                {errors.gender && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 13,
                      marginTop: 8,
                    }}
                  >
                    Gender is required field
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 20 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLabel
                      placeholder="Password"
                      keyboardType="default"
                      lableText="Password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 13,
                      marginTop: 8,
                    }}
                  >
                    Password is required field
                  </Text>
                )}
                {apiError.error && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 13,
                      marginTop: 8,
                    }}
                  >
                    {apiError.message}
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 50 }}>
                <Buttons
                  style={{
                    borderRadius: 5,
                    backgroundColor: defaultColor.defaultColor,
                    paddingVertical: 15,
                  }}
                  textStyle={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                  title="Submit"
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#cbcbcb",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#63635E",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default signupPersonalInfo;
