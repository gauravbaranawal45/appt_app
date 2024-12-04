import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "@/components/Inputs/Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useApplicationContext } from "@/context/ApplicationContext";
import Select from "@/components/common/Select";
import { Entypo } from "@expo/vector-icons";
import { genderData } from "@//constants/staticData";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import profileFactory from "@/actions/profileAction";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";
import * as ImagePicker from "expo-image-picker";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import { imgPath } from "../service/axiosInstance";
import Loader from "../components/Loader/Loader";

const BookAppointment = () => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      birth: "",
      mobile: "",
      gender: "",
      email: "",
    },
  });
  const navigation = useNavigation();
  const { defaultColor, profile, setProfile } = useApplicationContext();
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const showDatePicker = () => {
    Keyboard.dismiss();
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

  useEffect(() => {
    setValue("fullName", profile.fullName);
    setValue("email", profile.email);
    setValue("mobile", profile.mobile);
    setValue("birth", new Date(profile.birth));
    setValue("gender", profile.gender);
  }, []);

  const createFormData = (photo) => {
    let fileName = photo.uri.split("/")[photo.uri.split("/").length - 1];
    const data = new FormData();
    data.append("photo", {
      name: fileName,
      type: photo.mimeType,
      uri:
        Platform.OS === "android"
          ? photo.uri
          : photo.uri.replace("file://", ""),
    });
    return data;
  };

  const handleImgPicker = async () => {
    setLoader(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    try {
      let imgData = createFormData(result.assets[0]);
      const res = await profileFactory.uploadimg(imgData);
      const newprofile = { ...profile };
      newprofile.image = res.data.img;
      setProfile(newprofile);
    } catch (e) {
      console.log("e", e);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  };

  const onSubmit = async (data) => {
    try {
      const newState = { ...profile };
      const res = await profileFactory.updateProfile(data);
      newState.email = data.email;
      setProfile(newState);
      toast.show(res.data.data, {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
      setTimeout(() => {
        navigation.navigate("profile");
      }, 1000);
    } catch (e) {
      console.log("errrrprrr", e);
      setApiError({ error: true, ...e.response?.data });
    }
  };

  // console.log("profile", profile.image);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar barStyle={"dark-content"} animated={true} />
      {loader && <Loader />}
      <View
        style={{
          ...styles.headerWrapper,
          backgroundColor: defaultColor.background,
        }}
      >
        <View>
          <Text style={{ ...styles.headerTitle, color: defaultColor.heading }}>
            Edit Account
          </Text>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
          >
            <Text
              style={{
                color: defaultColor.defaultColor,
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: "#fff", marginTop: 8 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Card
            style={{
              margin: 15,
              padding: 15,
              backgroundColor: "#fff",
            }}
          >
            <View style={{}}>
              <View style={{ backgroundColor: "#fff", alignItems: "center" }}>
                <ImageBackground
                  style={{ width: 150, height: 150 }}
                  imageStyle={{ borderRadius: 100 }}
                  source={
                    profile?.image
                      ? { uri: `${imgPath}profileimages/${profile?.image}` }
                      : blankProfile
                  }
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleImgPicker}
                      style={{
                        padding: 5,
                        backgroundColor: defaultColor.inputBackground,
                        marginRight: 10,
                        borderRadius: 50,
                      }}
                    >
                      <Entypo
                        name="camera"
                        size={15}
                        color="black"
                        style={{ padding: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
              <View style={{ marginTop: 20 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState: { invalid, error } }) => {
                    return (
                      <Input
                        field={field}
                        invalid={invalid}
                        error={error}
                        placeholder="Full Name"
                        keyboardType="default"
                        lableText="Full Name"
                      />
                    );
                  }}
                  name="fullName"
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState: { invalid, error } }) => {
                    return (
                      <Input
                        field={field}
                        invalid={invalid}
                        error={error}
                        placeholder="Email address"
                        keyboardType="email-address"
                        lableText="Email address"
                      />
                    );
                  }}
                  name="email"
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState: { invalid, error } }) => {
                    return (
                      <Input
                        field={{ ...field, editable: false }}
                        invalid={invalid}
                        error={error}
                        placeholder="Mobile"
                        keyboardType="default"
                        lableText="Mobile"
                      />
                    );
                  }}
                  name="mobile"
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <Input
                        field={{
                          ...field,
                          editable: false,
                          onPressIn: showDatePicker,
                          onBlur: field.onBlur,
                          value: field.value
                            ? field.value.toLocaleDateString()
                            : null,
                        }}
                        placeholder={"Date of Birth"}
                        editable={false}
                        lableText="Date of Birth"
                      />
                    );
                  }}
                  name="birth"
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={{ marginVertical: 20 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <Select
                        field={field}
                        placeholder="Select Gender"
                        option={genderData}
                        isSearch={false}
                      />
                    );
                  }}
                  name="gender"
                />
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    backgroundColor: "#4C4DDC",
                    borderRadius: 10,
                    alignItems: "center",
                    borderWidth: 0.5,
                    width: 150,
                  }}
                  onPress={() => navigation.navigate("addressBook")}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#fff",
                    }}
                  >
                    Add/Edit Address
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: " #fff",
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
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              flex: 1,
              paddingVertical: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              alignItems: "center",
              borderWidth: 0.5,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4C4DDC",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookAppointment;

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
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
  },
});
