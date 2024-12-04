import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  Share,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import Buttons from "@/components/common/Button";
import { useApplicationContext } from "@/context/ApplicationContext";
import Header from "@/components/header";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { companyName } from "@/constants/constants";
import { useToast } from "react-native-toast-notifications";

const InviteEarn = () => {
  const toast = useToast();
  const [copiedText, setCopiedText] = useState("");
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();
  const url = "https://play.google.com";

  const shareData = async () => {
    try {
      const result = await Share.share({
        message: `Download ${companyName} App and get rewarded.` + "\n" + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
      <Header title="Refer & Earn" />

      <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginTop: 8 }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: defaultColor.heading,
            }}
          >
            Invite & Earn
          </Text>

          <View style={{ marginTop: 20 }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Get rewards worth ₹500 from your referrals!
              </Text>
            </View>
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <Image
                source={require("@/assets//images/invite.png")}
                style={{
                  width: 300,
                  height: 300,
                }}
              />
            </View>
            <View style={{ marginTop: 0 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Steps:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  marginVertical: 5,
                }}
              >
                1. You refer {companyName} app to your friend and they sign up
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                2. When they book appointment for 1st time
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  marginVertical: 5,
                }}
              >
                3. You get 300 {companyName} Rupee and Your friend get 200{" "}
                {companyName} Rupee
              </Text>
            </View>

            <View>
              <Buttons
                style={{
                  paddingVertical: 12,
                  marginTop: 20,
                  borderStyle: "dashed",
                  borderWidth: 1,
                  borderColor: defaultColor.defaultColor,
                }}
                textStyle={{
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                }}
                title="dasdads"
                onPress={copyToClipboard}
              />
            </View>
            <View>
              <Buttons
                style={{
                  borderRadius: 5,
                  backgroundColor: defaultColor.defaultColor,
                  paddingVertical: 15,
                  marginTop: 20,
                }}
                textStyle={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                }}
                title="SEND INVITE"
                onPress={shareData}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InviteEarn;
