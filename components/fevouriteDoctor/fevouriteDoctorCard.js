import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useApplicationContext } from "@/context/ApplicationContext";
const textColor = "black";
const seeAllColor = "#4C4DDC";
const FevouriteDoctorCard = ({}) => {
  const router = useRouter();
  const { defaultColor } = useApplicationContext();
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 5,
        marginHorizontal: 5,
        marginVertical: 5,
      }}
    >
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "doctorDetails/[id]",
              params: {
                id: 8,
              },
            })
          }
          key={Math.random()}
        >
          <ImageBackground
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 1,
            }}
            imageStyle={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            source={require("@/assets//images/banner.jpg")}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                top: "83%",
                bottom: 0,
                left: 8,
                backgroundColor: "#fff",
                paddingVertical: 3,
                width: 55,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: seeAllColor,
                  fontWeight: 500,
                  marginRight: 6,
                }}
              >
                4.5
              </Text>
              <Ionicons name="star" size={10} color={"#FF8C00"} />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 5, marginVertical: 5 }}>
        <Text
          style={{
            color: textColor,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Dr. Gaurav Baranawal
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "gray",
            marginTop: 3,
            fontWeight: 600,
          }}
        >
          Neurologist | Vcare Clinic
        </Text>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 12,
            marginVertical: 5,
            color: "#4C4DDC",
          }}
        >
          Fee: ₹500
        </Text>
      </View>

      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            borderTopWidth: 1,
            borderColor: "#D9D9D9",
            paddingVertical: 8,
          }}
          onPress={() => router.push("bookAppointment")}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: 600,
              textAlign: "center",
              color: "#4C4DDC",
            }}
          >
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FevouriteDoctorCard;
