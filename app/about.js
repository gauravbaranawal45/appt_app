import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
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
import { MaterialIcons } from "@expo/vector-icons";
import { aboutusData } from "@/constants/staticData";

const About = () => {
  const { defaultColor } = useApplicationContext();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar barStyle={"dark-content"} animated={true} />
      <Header title={``} />

      <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginTop: 8 }}>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: defaultColor.heading,
              }}
            >
              About us
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Image
              source={require("@/assets//images/doctors.jpg")}
              style={{
                width: "100%",
                height: 180,
                borderRadius: 10,
              }}
            />
          </View>

          {aboutusData.map((item, i) => {
            return (
              <View style={{ marginTop: 20 }} key={i}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: defaultColor.heading,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: defaultColor.heading,
                      marginTop: 10,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
                {item.subTitle?.map((subItem, i) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 20,
                        marginTop: 20,
                        alignItems: "flex-start",
                      }}
                    >
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: defaultColor.heading,
                          borderRadius: 50,
                          marginTop: 5,
                        }}
                      />

                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: defaultColor.heading,
                          }}
                        >
                          {subItem.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: defaultColor.heading,
                            marginTop: 10,
                          }}
                        >
                          {subItem.desc}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
