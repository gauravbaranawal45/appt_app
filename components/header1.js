import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome6,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LocationModal from "@/components/common/LocationModal";
import NotificationModal from "@/components/modal/Notification/NotificationModal";
import { useApplicationContext } from "@/context/ApplicationContext";

const headaerTextColor = "#fff";
const layoutMarginVerticle = 20;
const layoutMarginHorizontal = 10;
const seeAllColor = "#4C4DDC";

const Header = () => {
  const { getPermissions, address } = useApplicationContext();
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const router = useRouter();

  const close = () => {
    setOpen(false);
  };

  const closeNotification = () => {
    setNotificationOpen(false);
  };

  const getCurrentLocation = () => {
    getPermissions();
    close();
  };

  return (
    <>
      <View style={{ backgroundColor: "#4C4DDC" }}>
        <View
          style={{
            marginHorizontal: layoutMarginHorizontal,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(true)}>
              <Text
                style={{
                  ...styles.headerWelcome,
                  fontFamily: "Helvetica Neue",
                  fontWeight: 500,
                }}
              >
                Your Location
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Text
                  style={{
                    ...styles.headerWelcome,
                    marginRight: 3,
                    fontWeight: 600,
                    fontFamily: "Helvetica Neue",
                    fontSize: 14,
                  }}
                >
                  {address.address_line1}
                </Text>
                <FontAwesome6 name="angle-down" size={15} color="#fff" />
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("creditWallet")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 10,
                    // backgroundColor: "green",
                  }}
                >
                  <Ionicons
                    name="wallet-outline"
                    size={24}
                    color="#fff"
                    style={{
                      paddingHorizontal: 5,
                      lineHeight: 40,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setNotificationOpen(true)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: "blue",
                  }}
                >
                  <MaterialIcons
                    name="notifications-none"
                    size={24}
                    color="#fff"
                    style={{
                      paddingHorizontal: 5,
                      // backgroundColor: "red",.
                      lineHeight: 40,
                    }}
                  />
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 20,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      marginLeft: -15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: "center",
                        color: "black",
                        fontWeight: 600,
                      }}
                    >
                      6
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchSection}>
            <Ionicons
              style={styles.searchIcon}
              name="search"
              size={24}
              color="black"
            />
            <TextInput
              style={styles.input}
              editable={false}
              placeholder="Search Doctor..."
              placeholderTextColor="#63635E"
              onPressIn={() => router.push("globalSearch")}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <LocationModal
          open={open}
          close={close}
          getCurrentLocation={getCurrentLocation}
        />
        {notificationOpen && (
          <NotificationModal
            open={notificationOpen}
            close={closeNotification}
          />
        )}
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerWrapper: {},
  headerUserImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 15,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    fontSize: 18,
  },
  button: {
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    // textAlign: "center",
  },
  headerWelcome: {
    fontSize: 12,
    color: headaerTextColor,
  },
});
