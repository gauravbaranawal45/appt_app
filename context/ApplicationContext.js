import { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Linking, Platform, Alert } from "react-native";

const ApplicationContext = createContext();

const Provider = ({ children }) => {
  const colorScheme = "light"; //useColorScheme();
  const defaultColor = Colors[colorScheme];
  const [location, setLocation] = useState();
  const [address, setAddress] = useState({ postalCode: "Fetching..." });
  const [homedata, setHomedata] = useState({});
  const [apptdata, setApptdata] = useState({ data: [] });
  const [profile, setProfile] = useState({});

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status", status);
    if (status !== "granted") {
      Alert.alert("Location not enabled", "Please enable your Location", [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: "OK",
          onPress: () => {
            if (Platform.OS === "ios") {
              Linking.openURL("app-settings:");
            } else {
              // IntentLauncher.startActivity({
              //   action: "android.settings.APPLICATION_DETAILS_SETTINGS",
              //   data: "package:" + package,
              // });
            }
          },
        },
      ]);
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    let response = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
    let newRes = response[0];
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      address:
        newRes?.district +
        " " +
        newRes?.city +
        " " +
        newRes?.region +
        " " +
        newRes?.postalCode,
    });

    setAddress({
      ...newRes,
      address_line1: newRes?.city + " " + newRes?.postalCode,
    });

    // const getLatLong = await Location.geocodeAsync("old Delhi");
    // console.log("getLatLong2222", getLatLong);
    // let responce1 = await Location.reverseGeocodeAsync({
    //   latitude: getLatLong[0].latitude,
    //   longitude: getLatLong[0].longitude,
    // });
    // console.log("responce1", responce1);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        companyName: "QuickAppt",
        colorScheme,
        defaultColor,
        getPermissions,
        location,
        setLocation,
        address,
        setAddress,
        homedata,
        setHomedata,
        apptdata,
        setApptdata,
        profile,
        setProfile,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

const ApplicationContextProvider = ({ children }) => (
  <Provider>{children}</Provider>
);

export default ApplicationContextProvider;

export const useApplicationContext = () => useContext(ApplicationContext);
