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
import React, { useEffect, useState } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import Header from "@/components/header";
import Button from "@/components/common/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { settingsData } from "@/constants/staticData";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();
  const { defaultColor } = useApplicationContext();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar barStyle={"dark-content"} animated={true} />
      <Header title={`Settings `} />

      <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginTop: 10 }}>
        <View
          style={{
            paddingVertical: 0,
            paddingHorizontal: 15,
          }}
        >
          {settingsData.map((item) => {
            return (
              <TouchableOpacity
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: defaultColor.defaultBorder,
                  paddingVertical: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={Math.random()}
                onPress={() =>
                  router.push({
                    pathname: "changePassword",
                  })
                }
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: defaultColor.collapseText,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>

                <View>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={18}
                    color={defaultColor.inputIcon}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
          <View
            style={{
              flex: 1,
              backgroundColor: defaultColor.background,
              marginVertical: 20,
            }}
          >
            <Button
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: defaultColor.defaultColor,
                paddingVertical: 10,
              }}
              textStyle={{
                fontSize: 14,
                fontWeight: 600,
                color: defaultColor.defaultColor,
                fontFamily: "Al Nile",
              }}
              title="Delete Account"
              //   onPress={logoutHandler}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

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
