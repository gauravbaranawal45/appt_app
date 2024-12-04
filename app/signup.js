import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Buttons from "@/components/common/Button";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApplicationContext } from "@/context/ApplicationContext";
import TextField from "@/components/Inputs/TextField";
import { phoneRegExp } from "@/constants/regex";
import { useNavigation } from "@react-navigation/native";
import authFactory from "../actions/authAction";

const mobileSchema = yup.object().shape({
  mobile: yup
    .string()
    .required("Please enter mobile number")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number is not valid")
    .max(10, "Phone number is not valid"),
});

const Signup = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(mobileSchema),
    defaultValues: {
      mobile: "",
    },
  });
  const { defaultColor } = useApplicationContext();
  const navigation = useNavigation();

  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  const onFormSubmit = async (data) => {
    try {
      await authFactory.signupOTP(data);
      navigation.navigate("OTPScreen", {
        mobile: data.mobile,
      });
    } catch (e) {
      setApiError({ error: true, ...e.response.data });
    } finally {
    }
  };

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
          <Image source={require("@/assets//images/logo.png")} style={{}} />
        </View>
      </View>
      <ScrollView>
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
              Create an account
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ marginTop: 25 }}>
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
                      placeholder="Enter Mobile Number"
                      keyboardType="numeric"
                      lableText="Mobile Number"
                      maxLength={10}
                    />
                  );
                }}
                name="mobile"
              />
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
            <View style={{ marginTop: 25 }}>
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
                title="CONTINUE"
                // onPress={sendOTPhandler}
                onPress={handleSubmit(onFormSubmit)}
              />
            </View>
            <View style={styles.lineStyle}>
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    width: 30,
                    textAlign: "center",
                  }}
                >
                  Or
                </Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            </View>
            <View style={{ width: "100%", marginVertical: 0 }}>
              <Buttons
                style={{
                  borderRadius: 5,
                  paddingVertical: 15,
                  borderWidth: 1,
                  borderColor: defaultColor.inputBorder,
                }}
                textStyle={{
                  color: defaultColor.defaultColor,
                  fontSize: 16,
                  fontWeight: 600,
                  textAlign: "center",
                }}
                title="Signup in with Google"
                onPress={() => navigation.navigate("login")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          paddingHorizontal: 15,
          justifyContent: "center",
        }}
      >
        <Text style={{}}>Already have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("login")}
          style={{
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "blue",
            }}
          >
            {" "}
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lineStyle: {
    marginHorizontal: 0,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
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

export default Signup;
