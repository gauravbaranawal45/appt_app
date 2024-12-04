import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
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

const CreditWallet = () => {
  const toast = useToast();
  const [copiedText, setCopiedText] = useState("");
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();
  const url = "https://play.google.com";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("dasdads");

    toast.show("Invite code copied", {
      type: "success",
      placement: "top",
      duration: 2000,
      animationType: "zoom-in",
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar barStyle={"dark-content"} animated={true} />
      <Header title={`${companyNameCap} CREDIT`} />

      <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginTop: 8 }}>
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          <View style={{ marginLeft: 15 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: defaultColor.heading,
              }}
            >
              Wallets
            </Text>
          </View>

          <Card
            style={{
              paddingVertical: 25,
              marginTop: 30,
              backgroundColor: "#fff",
              borderRadius: 0,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: defaultColor.heading,
                }}
              >
                TOP-UP YOUR {companyNameCap} CREDIT NOW!
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: defaultColor.heading,
                  marginTop: 30,
                }}
              >
                ₹0.00
              </Text>
            </View>
          </Card>
          <Card
            style={{
              marginTop: 30,
              backgroundColor: "#fff",
              borderRadius: 0,
            }}
          >
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: defaultColor.heading,
                  textTransform: "uppercase",
                }}
              >
                Transation log
              </Text>
            </View>
            {[...Array(6)].map((item) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 15,
                    borderTopWidth: 0.5,
                    borderTopColor: defaultColor.defaultBorder,
                    paddingVertical: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={Math.random()}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("@/assets//images/rupee.png")}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: defaultColor.heading,
                          textTransform: "uppercase",
                        }}
                      >
                        Referral Reward
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          marginTop: 5,
                          color: defaultColor.subText,
                          textTransform: "uppercase",
                        }}
                      >
                        Signup 17 Jul 2023
                      </Text>
                    </View>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: defaultColor.defaultColor,
                          textTransform: "uppercase",
                          marginRight: 8,
                        }}
                      >
                        + ₹500
                      </Text>
                      <MaterialIcons
                        name="arrow-forward-ios"
                        size={14}
                        color={defaultColor.defaultColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreditWallet;
