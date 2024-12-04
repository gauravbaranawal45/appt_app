import { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ToastProvider } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApplicationContextProvider from "@/context/ApplicationContext";
import { PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync();
const commonColor = "#4C4DDC";

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      checkIsLoggedIn();
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const checkIsLoggedIn = async () => {
    const userToken = await AsyncStorage.getItem("__token");
    console.log("userToken", userToken);
    if (userToken) {
      router.push("home");
    }
  };

  return (
    <ApplicationContextProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
      >
        <PaperProvider>
          <ToastProvider>
            <Stack>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="signup" options={{ headerShown: false }} />
              <Stack.Screen name="OTPScreen" options={{ headerShown: false }} />
              <Stack.Screen
                name="signupPersonalInfo"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="splash" options={{ headerShown: false }} />
              <Stack.Screen
                name="specializationList"
                options={{
                  title: "Specialities ",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="doctorList"
                options={{
                  title: "Find your doctors",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="specialist"
                options={{
                  title: "Specialies",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="editProfile"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="addressBook"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ownReviews"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="manageMember"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="inviteEarn"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="helpSupport"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
              <Stack.Screen
                name="fevouriteDoctor"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="creditWallet"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="about" options={{ headerShown: false }} />
              <Stack.Screen
                name="recentVisit"
                options={{
                  title: "Recent Visit",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="doctorDetails/[id]"
                options={{
                  title: "Doctor",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="reviewlist"
                options={{
                  title: "Patients Reviews",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="bookAppointment"
                options={{
                  title: "Summary",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="appointmentDetail"
                options={{
                  title: "Appointment Detail",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="addFamilyMember"
                options={{
                  title: "Add Family Member",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="appointmentSlot"
                options={{
                  title: "Select Time Slot",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="coupons"
                options={{
                  title: "Apply Coupon",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="writeReview"
                options={{
                  title: "Share your story",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="renderStaticPage"
                options={{
                  title: "Share your story",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="changePassword"
                options={{
                  title: "Change Password",
                  headerStyle: {
                    backgroundColor: commonColor,
                  },
                  headerTintColor: "#fff",
                  headerShadowVisible: false, // applied here
                  headerBackTitleVisible: false,
                }}
              />

              <Stack.Screen name="+not-found" />
            </Stack>
          </ToastProvider>
        </PaperProvider>
      </ThemeProvider>
    </ApplicationContextProvider>
  );
}
