import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { profileMenu } from "@/constants/staticData";
import Button from "@/components/common/Button";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileFactory from "@/actions/profileAction";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import { imgPath } from "../../service/axiosInstance";
import { List } from "react-native-paper";

const Profile = () => {
  const router = useRouter();
  const { defaultColor, profile, setProfile } = useApplicationContext();
  const [refreshing, setRefreshing] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = (item) => {
    if (item.link === "about") {
      setExpanded(!expanded);
    } else {
      router.push(item.link);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfile();
    setRefreshing(false);
  }, []);

  const getProfile = async () => {
    try {
      const res = await profileFactory.getProfile();
      setProfile(res.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("__token");
    router.push("splash");
  };

  console.log("expanded", expanded);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultColor.background }}>
      <StatusBar barStyle={"dark-content"} animated={true} />
      <View
        style={{
          ...styles.headerWrapper,
          backgroundColor: defaultColor.background,
        }}
      >
        <View>
          <Text style={{ ...styles.headerTitle, color: defaultColor.heading }}>
            My Account
          </Text>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("editProfile")}
          >
            <View
              style={{
                flexDirection: "row",
                marginRight: 10,
              }}
            >
              <AntDesign
                name="edit"
                size={26}
                color={defaultColor.defaultColor}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: defaultColor.background,
          marginTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingTop: 10 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View>
                <Image
                  style={styles.profleImg}
                  source={
                    profile?.image
                      ? { uri: `${imgPath}profileimages/${profile?.image}` }
                      : blankProfile
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    ...styles.font16fw6,
                    color: defaultColor.heading,
                  }}
                >
                  {profile?.fullName}
                </Text>
                <Text
                  style={{
                    ...styles.font14,
                    color: defaultColor.placeHolder,
                    marginTop: 5,
                  }}
                >
                  {profile?.mobile}
                </Text>
                {profile?.email && (
                  <Text
                    style={{
                      ...styles.font14,
                      color: defaultColor.placeHolder,
                      marginTop: 5,
                    }}
                  >
                    {profile.email}
                  </Text>
                )}

                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      ...styles.font14,
                      color: defaultColor.placeHolder,
                    }}
                  >
                    {profile?.gender} | 28 Years |{" "}
                    {profile?.appointments?.length} Appointment
                  </Text>
                  <Text
                    style={{
                      ...styles.font14,
                      color: defaultColor.placeHolder,
                      marginTop: 5,
                    }}
                  >
                    {profile?.appointments?.length} Appointment
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.contactWrap}>
              <Ionicons
                name="call"
                size={20}
                color={defaultColor.placeHolder}
              />
              <Text
                style={{
                  color: defaultColor.placeHolder,
                  fontSize: 14,
                  marginLeft: 15,
                  fontWeight: 600,
                }}
              >
                +91-{profile?.mobile}
              </Text>
            </View>
            {profile?.email && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Ionicons
                  name="mail-sharp"
                  size={20}
                  color={defaultColor.placeHolder}
                />
                <Text
                  style={{
                    color: defaultColor.placeHolder,
                    fontSize: 14,
                    marginLeft: 15,
                    fontWeight: 600,
                  }}
                >
                  {profile?.email}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: defaultColor.defaultBorder,
              paddingVertical: 25,
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  color: defaultColor.text,
                }}
              >
                ₹5000
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                  marginTop: 8,
                  color: defaultColor.subText,
                }}
              >
                Wallet
              </Text>
            </View>
            <View
              style={{
                width: 0.5,
                backgroundColor: defaultColor.defaultBorder,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  color: defaultColor.text,
                }}
              >
                {profile?.appointments?.length}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                  marginTop: 8,
                  color: defaultColor.subText,
                }}
              >
                Appointments
              </Text>
            </View>
          </View>
          <View
            style={{
              ...styles.menuListWrapper,
              backgroundColor: defaultColor.profileLightBackGround,
            }}
          >
            {profileMenu.map((item, i) => (
              <List.Section
                title=""
                key={i}
                style={{
                  backgroundColor: defaultColor.background,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                <List.Accordion
                  style={{
                    backgroundColor: defaultColor.background,
                  }}
                  expanded={item.link === "about" ? expanded : false}
                  onPress={() => handlePress(item)}
                  title={item.name}
                  titleStyle={{ fontWeight: 600, color: defaultColor.text }}
                  descriptionStyle={{
                    fontSize: 12,
                    color: defaultColor.subText,
                  }}
                  description={item.desc}
                  left={(props) =>
                    item.icon({ ...props, color: defaultColor.heading })
                  }
                  right={(props) =>
                    item.link === "about" && expanded ? (
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={24}
                        color="black"
                      />
                    ) : (
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        {...props}
                      />
                    )
                  }
                >
                  <List.Item
                    titleStyle={{ color: defaultColor.heading }}
                    title="About Us"
                    onPress={() =>
                      router.push({
                        pathname: "renderStaticPage",
                        params: {
                          name: "aboutUs",
                        },
                      })
                    }
                  />
                  <List.Item
                    titleStyle={{ color: defaultColor.heading }}
                    title="Contact Us"
                  />
                  <List.Item
                    onPress={() => router.push("renderStaticPage")}
                    titleStyle={{ color: defaultColor.heading }}
                    title="FAQs"
                  />
                  <List.Item
                    onPress={() =>
                      router.push({
                        pathname: "renderStaticPage",
                        params: {
                          name: "termOfConditions",
                        },
                      })
                    }
                    titleStyle={{ color: defaultColor.heading }}
                    title="Term of Conditions"
                  />
                  <List.Item
                    onPress={() =>
                      router.push({
                        pathname: "renderStaticPage",
                        params: {
                          name: "privacyPolicy",
                        },
                      })
                    }
                    titleStyle={{ color: defaultColor.heading }}
                    title="Privacy Policy"
                  />
                </List.Accordion>
              </List.Section>
            ))}

            <View
              style={{
                flex: 1,
                padding: 15,
                backgroundColor: defaultColor.background,
                marginVertical: 8,
              }}
            >
              <Button
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: defaultColor.defaultColor,
                  paddingVertical: 12,
                }}
                textStyle={{
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                  color: defaultColor.defaultColor,
                  fontFamily: "Al Nile",
                }}
                title="Logout"
                iconRight={
                  <MaterialIcons
                    name="logout"
                    size={18}
                    color={defaultColor.defaultColor}
                    style={{ marginLeft: 8 }}
                  />
                }
                onPress={logoutHandler}
              />
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
    // backgroundColor: "#fff",
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
  profleImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  font16fw6: {
    fontSize: 16,
    fontWeight: "600",
  },
  font14: {
    fontSize: 14,
    // marginTop: 10,
  },
  contactWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  // listValue: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   // backgroundColor: "#fff",
  //   paddingVertical: 15,
  //   marginTop: 8,
  //   paddingHorizontal: 15,
  // },
  listValue: {
    // flexDirection: "row",,ngyt
    // justifyContent: "space-between",
    // alignItems: "center",
    // backgroundColor: "#fff",
    // paddingVertical: 15,
    // marginTop: 8,
    // paddingHorizontal: 15,

    margin: 0,
    padding: 0,
  },
  menulist: {
    fontSize: 16,
  },
  menuListWrapper: {
    // backgroundColor: "#f1f1f1",
    // paddingHorizontal: 10,
    marginTop: 0,
  },
});

export default Profile;
