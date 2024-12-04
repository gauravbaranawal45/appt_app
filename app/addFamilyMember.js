import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import TextField from "@/components/Inputs/TextField";
import Select from "../components/Inputs/Select";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { genderData } from "../constants/staticData";
import { appointmentSchema } from "../schema/appointmentSchema";
import { useApplicationContext } from "@/context/ApplicationContext";
import appointmentFactory from "../actions/appointmentAction";
import { useToast } from "react-native-toast-notifications";

const defaultValues = {
  patientName: "",
  mobile: "",
  age: "",
  address: "",
  gender: "",
  patientEmail: "",
};

const AddFamilyMember = () => {
  const toast = useToast();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();
  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues: defaultValues,
  });

  const fetchCities = async () => {
    try {
      // const response = await homeFactory.doctorDetail(params.id);
      // setData(response.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const onFormSubmit = async (formData) => {
    try {
      const res = await appointmentFactory.addMember(formData);
      toast.show(res.data.data, {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
      setTimeout(() => {
        if (params.source === "appointment") {
          navigation.navigate("bookAppointment", {
            id: params.docId,
          });
        } else {
          navigation.goBack();
        }
      }, 1000);
    } catch (e) {
      console.log("eeeeeeee", e);
      setApiError({ error: true, ...e.response?.data });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View
            style={{
              marginHorizontal: 10,
              // backgroundColor: "red",
              paddingBottom: 100,
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { invalid, error } }) => {
                  return (
                    <TextField
                      field={field}
                      invalid={invalid}
                      error={error}
                      placeholder="Patient name"
                      keyboardType="default"
                      extraStyle={{ backgroundColor: "#fff" }}
                    />
                  );
                }}
                name="patientName"
              />
            </View>
            <View style={{ flex: 1, marginTop: 20, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState: { invalid, error } }) => {
                    return (
                      <TextField
                        field={{ ...field, maxLength: 10 }}
                        invalid={invalid}
                        error={error}
                        placeholder="Phone"
                        keyboardType="numeric"
                        extraStyle={{ backgroundColor: "#fff" }}
                      />
                    );
                  }}
                  name="mobile"
                />
              </View>
              <View style={{ width: "25%", marginLeft: 10 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState: { invalid, error } }) => {
                    return (
                      <TextField
                        field={{ ...field, maxLength: 2 }}
                        invalid={invalid}
                        error={error}
                        placeholder="Age"
                        keyboardType="numeric"
                        extraStyle={{ backgroundColor: "#fff" }}
                      />
                    );
                  }}
                  name="age"
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { invalid, error } }) => {
                  return (
                    <TextField
                      field={{ ...field, multiline: true }}
                      invalid={invalid}
                      error={error}
                      placeholder="Address"
                      keyboardType="default"
                      extraStyle={{ backgroundColor: "#fff" }}
                    />
                  );
                }}
                name="address"
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
                    <Select
                      field={field}
                      invalid={invalid}
                      error={error}
                      placeholder="Gender"
                      labelText="Gender"
                      option={genderData}
                      isSearch={false}
                    />
                  );
                }}
                name="gender"
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
                    <TextField
                      field={field}
                      invalid={invalid}
                      error={error}
                      placeholder="Email Address (Optional)"
                      keyboardType="default"
                      extraStyle={{ backgroundColor: "#fff" }}
                    />
                  );
                }}
                name="patientEmail"
              />
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
            <View
              style={{
                marginTop: 50,
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: defaultColor.defaultColor,
                  borderRadius: 5,
                  alignItems: "center",
                  flex: 1,
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
                  backgroundColor: defaultColor.defaultColor,
                  borderRadius: 5,
                  alignItems: "center",
                  flex: 1,
                }}
                onPress={handleSubmit(onFormSubmit)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  Add Member
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddFamilyMember;
