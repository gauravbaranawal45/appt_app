import Buttons from "@/components/common/Button";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Splash() {
  const { defaultColor } = useApplicationContext();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("@/assets//images/img1.jpg")}
          style={styles.image}
        >
          <View style={styles.footerContainer}>
            <View style={{ width: "100%", marginVertical: 0 }}>
              <Buttons
                style={{
                  borderRadius: 10,
                  backgroundColor: defaultColor.defaultColor,
                  paddingVertical: 15,
                }}
                textStyle={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  textAlign: "center",
                }}
                title="Log in"
                onPress={() => router.push("./login")}
              />
            </View>
            <View style={{ width: "100%", marginVertical: 10 }}>
              <Buttons
                style={{
                  borderRadius: 10,
                  paddingVertical: 15,
                  borderWidth: 1,
                  borderColor: defaultColor.inputBorder,
                }}
                textStyle={{
                  color: defaultColor.defaultColor,
                  fontSize: 16,
                  fontWeight: 600,
                  textAlign: "center",
                }}
                title="Join now"
                onPress={() => router.push("./signup")}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: "100%",
  },
  footerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
});
