import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  // ActivityIndicator,
} from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import React, { useState } from "react";
import Buttons from "@/components/common/Button";
import { useRouter } from "expo-router";
import { useApplicationContext } from "@/context/ApplicationContext";
import InputLabel from "@/components/common/InputLabel";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "expo-checkbox";
import authFactory from "../actions/authAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const { defaultColor } = useApplicationContext();
  const navigation = useNavigation();
  const router = useRouter();
  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await authFactory.signin(data);
      // console.log("okkkk", res.data);
      await AsyncStorage.setItem("__token", res.data.token);
      router.push("/home");
    } catch (e: any) {
      setApiError({ error: true, ...e?.response?.data });
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
        {/* <ActivityIndicator
          size="large"
          animating={true}
          color={defaultColor.defaultColor}
        /> */}
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
              Welcome Back!
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ marginTop: 25 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputLabel
                    placeholder="Mobile / Email ID"
                    keyboardType="default"
                    lableText="Mobile / Email ID"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="userName"
              />
              {errors.userName && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 13,
                    marginTop: 8,
                  }}
                >
                  Please enter your Mobile / Email ID.
                </Text>
              )}
            </View>
            <View style={{ marginTop: 25 }}>
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
                  Please enter your password.
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
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  textAlign: "left",
                  marginVertical: 10,
                  color: defaultColor.defaultColor,
                  fontWeight: 600,
                }}
              >
                Forget Password?
              </Text>
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
                title="SIGNIN"
                onPress={handleSubmit(onSubmit)}
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
                title="Sign in with Google"
                onPress={() => router.push("login")}
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
        <Text style={{}}>Don't have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("signup")}
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
            Sign up
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
  checkbox: {
    marginVertical: 8,
  },
});

export default Signup;
