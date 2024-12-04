import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import homeFactory from "../actions/homeAction";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useToast } from "react-native-toast-notifications";

const Coupons = () => {
  const toast = useToast();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();
  const [data, setData] = useState(null);
  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  const fetchCities = async () => {
    try {
      const response = await homeFactory.doctorDetail(params.id);
      setData(response.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const changeHandler = () => {};

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 0 }}>
          <View style={styles.couponInputWrapper}>
            <TextInput
              style={{
                ...styles.input,
                // color: defaultColor.subText,
              }}
              placeholder="Enter coupon code"
              placeholderTextColor={defaultColor.subText}
              onChangeText={changeHandler}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 40, marginBottom: 20 }}>
            <Text
              style={{
                color: defaultColor.heading,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Top Coupons for you
            </Text>
          </View>
          <View style={styles.couponList}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>FIRST100</Text>
              <Text style={{ fontWeight: 500, fontSize: 12, marginTop: 15 }}>
                Get flat 10% cashback on your doctor fee. * TCA
              </Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.couponList}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 500, fontSize: 12 }}>FIRST100</Text>
              <Text style={{ fontWeight: 500, fontSize: 12, marginTop: 15 }}>
                Get flat 10% cashback on your doctor fee. * TCA
              </Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Coupons;

const styles = StyleSheet.create({
  couponInputWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e4e3e3",
  },
  applyBtn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    color: "#424242",
    fontWeight: "500",
    fontSize: 16,
    paddingHorizontal: 15,
  },
  couponList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    borderLeftWidth: 8,
    borderLeftColor: "#49a09e",
    marginBottom: 20,
  },
  applyText: { fontWeight: "600", color: "#228a87" },
});
