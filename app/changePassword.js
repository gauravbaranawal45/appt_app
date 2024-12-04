import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import profileFactory from "@/actions/profileAction";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApplicationContext } from "@/context/ApplicationContext";
import PasswordInput from "../components/Inputs/PasswordInput";

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required field"),
  newPassword: yup.string().required("New password is required field"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required field")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const { defaultColor } = useApplicationContext();
  const navigation = useNavigation();
  const toast = useToast();
  const [issubmitted, setIssubmitted] = useState(false);
  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIssubmitted(true);
      const res = await profileFactory.changePassword(data);
      toast.show(res.data.data, {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
      reset();
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (e) {
      console.log(e.response);
      setApiError({ error: true, ...e.response?.data });
    } finally {
      setIssubmitted(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar barStyle={"light-content"} animated={true} />

      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingHorizontal: 15 }}>
          <View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 5, fontSize: 13, fontWeight: 600 }}>
                Current Password
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { invalid, error } }) => {
                  return (
                    <PasswordInput
                      {...field}
                      invalid={invalid}
                      error={error}
                      placeholder="Current Password"
                    />
                  );
                }}
                name="currentPassword"
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 5, fontSize: 13, fontWeight: 600 }}>
                New Password
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { invalid, error } }) => {
                  return (
                    <PasswordInput
                      {...field}
                      invalid={invalid}
                      error={error}
                      placeholder="New Password"
                    />
                  );
                }}
                name="newPassword"
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 5, fontSize: 13, fontWeight: 600 }}>
                Confirm Password
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { invalid, error } }) => {
                  return (
                    <PasswordInput
                      {...field}
                      invalid={invalid}
                      error={error}
                      placeholder="Confirm Password"
                    />
                  );
                }}
                name="confirmPassword"
              />
            </View>
            {apiError.error && (
              <View>
                <Text
                  style={{
                    color: "red",
                    fontSize: 13,
                    marginTop: 8,
                  }}
                >
                  {apiError.message}
                </Text>
              </View>
            )}

            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  flex: 1,
                  paddingVertical: 15,
                  backgroundColor: defaultColor.defaultColor,
                  borderRadius: 8,
                  alignItems: "center",
                  borderWidth: 0.5,
                }}
                onPress={handleSubmit(onSubmit)}
                disabled={issubmitted}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#fff",
                  }}
                >
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
