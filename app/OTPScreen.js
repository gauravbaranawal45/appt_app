import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Buttons from "@/components/common/Button";
import { Link, useRouter } from "expo-router";
import { companyName } from "@/constants/constants";
import { useApplicationContext } from "@/context/ApplicationContext";
import InputLabel from "@/components/common/InputLabel";
import OTPView from "@/components/common/OTPView";
import { Ionicons, Octicons } from "@expo/vector-icons";
import authFactory from "../actions/authAction";
import { useNavigation, useRoute } from "@react-navigation/native";

const OTPScreen = () => {
  const { defaultColor } = useApplicationContext();
  const navigation = useNavigation();
  const { params } = useRoute();

  const [isReSentOTP, setReIsSentOTP] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(interval);
        setReIsSentOTP(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const resendOTPHandler = () => {
    setReIsSentOTP(false);
    setSeconds(30);
    setApiError({ error: false });
  };

  const validateOTP = async () => {
    try {
      // setLoading(true);
      const res = await authFactory.validateOTP({
        otp: parseInt(otpInput),
        mobile: params.mobile,
      });
      // console.log("resssssssss", res.data);
      navigation.navigate("signupPersonalInfo", {
        mobile: params.mobile,
      });
    } catch (e) {
      setApiError({ error: true, ...e.response.data });
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (otpInput.length === 6) {
      validateOTP();
    }
  }, [otpInput]);

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
            onPress={() => navigation.goBack()}
          >
            <Octicons name="arrow-left" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={require("@/assets//images/logo.png")} style={{}} />
        </View>
        <View></View>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: defaultColor.background,
            padding: 15,
            marginTop: 8,
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Enter OTP
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  Please enter the OTP to access all of {companyName} Services!
                </Text>
              </View>
              <View style={{ marginTop: 40 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  OTP sent on SMS to +919898989898
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <OTPView setOtpInput={setOtpInput} />
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
              {isReSentOTP ? (
                <View style={{ marginVertical: 20 }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      Didn't get OTP ?
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 30,
                    }}
                  >
                    <Buttons
                      style={{
                        borderRadius: 10,
                        backgroundColor: defaultColor.defaultColor,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                      }}
                      textStyle={{
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                      title="Resend on Call"
                      onPress={resendOTPHandler}
                    />
                    <Buttons
                      style={{
                        borderRadius: 10,
                        backgroundColor: defaultColor.defaultColor,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                      }}
                      textStyle={{
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                      title="Resend on SMS"
                      onPress={resendOTPHandler}
                    />
                  </View>
                </View>
              ) : (
                <View style={{ marginVertical: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Resend the OTP in</Text>
                    <Text>
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds} secs
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
  },
});

export default OTPScreen;
