import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import Buttons from "@/components/common/Button";
import { useApplicationContext } from "@/context/ApplicationContext";
import Header from "@/components/header";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { companyName, companyNameCap } from "@/constants/constants";
import { useToast } from "react-native-toast-notifications";
import { Card } from "react-native-paper";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { aboutusData } from "@/constants/staticData";

const HelpSupport = () => {
  const { defaultColor } = useApplicationContext();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar barStyle={"dark-content"} animated={true} />
      <Header title={`Help & Support`} />

      <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginTop: 10 }}>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: defaultColor.heading,
              }}
            >
              How can we help you today ?
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: defaultColor.heading,
                marginTop: 10,
              }}
            >
              Get answer to the most frequently asked questions.
            </Text> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 5,
              marginTop: 20,
              borderWidth: 1,
              borderColor: defaultColor.defaultBorder,
            }}
          >
            <Ionicons
              style={{ padding: 10 }}
              name="search"
              size={24}
              color={defaultColor.placeHolder}
            />
            <TextInput
              style={{
                flex: 1,
                paddingVertical: 10,
                paddingRight: 15,
                paddingLeft: 0,
                backgroundColor: "#fff",
                color: defaultColor.subText,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                fontSize: 14,
              }}
              placeholder="How can we help?"
              placeholderTextColor={defaultColor.placeHolder}
              //   onPressIn={() => router.push("globalSearch")}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: defaultColor.heading,
              }}
            >
              Recommended topics
            </Text>
          </View>
          <View style={styles.wrapper}>
            <View
              style={{
                ...styles.cards,
                marginRight: 7.5,
                borderColor: defaultColor.defaultBorder,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="lightbulb-on-outline"
                  size={28}
                  color="black"
                />
                <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>
                  Basic
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...styles.cards,
                marginLeft: 7.5,
                borderColor: defaultColor.defaultBorder,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons name="calendar-outline" size={28} color="black" />
                <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>
                  Clinic Consultation
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapper}>
            <View
              style={{
                ...styles.cards,
                marginRight: 7.5,
                borderColor: defaultColor.defaultBorder,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <FontAwesome5 name="user" size={28} color="black" />
                <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>
                  Account
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...styles.cards,
                marginLeft: 7.5,
                borderColor: defaultColor.defaultBorder,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <MaterialIcons name="payment" size={28} color="black" />
                <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>
                  Payment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 30, marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: defaultColor.heading,
              }}
            >
              FAQs
            </Text>
          </View>

          {[...Array(6)].map((item) => {
            return (
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: defaultColor.defaultBorder,
                  paddingVertical: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={Math.random()}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: defaultColor.collapseText,
                    }}
                  >
                    How do I login to my {companyName} account?
                  </Text>
                </View>

                <View>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={18}
                    color={defaultColor.inputIcon}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginTop: 15,
  },
  cards: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 5,
    paddingVertical: 25,
  },
});
