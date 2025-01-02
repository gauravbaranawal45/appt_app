import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import { AntDesign, SimpleLineIcons, Feather } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";
import { createOpenLink } from "react-native-open-maps";

const ProfessionalDetails = ({ details }) => {
  const { width } = useWindowDimensions();
  const { defaultColor } = useApplicationContext();
  const [textlimit, setTextlimit] = useState(30);
  const [isredmore, setIsredmore] = useState(false);

  const mapView = createOpenLink({
    provider: "apple",
    query: "Santha, Sant Kabir Nagar",
    latitude: 26.908808,
    longitude: 83.069369,
    zoom: 1,
  });

  const handleAbout = (about) => {
    let newword = "";
    const words = about?.split(" ") ?? [];
    words?.slice(0, textlimit).forEach((item) => {
      newword += item + " ";
    });
    return newword;
  };

  const readMore = () => {
    if (isredmore) {
      setTextlimit(30);
      setIsredmore(false);
    } else {
      const words = details.about.split(" ");
      setTextlimit(words.length);
      setIsredmore(true);
    }
  };

  const renderAddress = (address) => {
    return (
      <>
        <Text
          style={{
            flex: 1,
            marginTop: 2,
            color: defaultColor.placeHolder,
          }}
        >
          {address.address1 + ", "}
          {address.address2 + ", "}
          {address.landmark !== "" && address.landmark + ", "}
          {address.city}
        </Text>
        <Text
          style={{
            flex: 1,
            marginTop: 2,
            color: defaultColor.placeHolder,
          }}
        >
          {address.state + " - "}
          {address.pincode}
        </Text>
      </>
    );
  };

  return (
    <View>
      {/* Start Clinic detail component */}
      <View
        style={{
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: defaultColor.heading,
            fontWeight: "bold",
          }}
        >
          Clinic Detail
        </Text>

        <View
          style={{
            // flexDirection: "row",
            marginTop: 15,
            // alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: 600, color: defaultColor.text }}>
            {details?.clinicName}
          </Text>
          {details && renderAddress(details.address)}
        </View>
        <Pressable onPress={mapView}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
              // textAlign: "center",
              color: defaultColor.defaultColor,
              marginTop: 10,
            }}
          >
            View on Map
          </Text>
        </Pressable>
      </View>
      {/* End Clinic detail component */}

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontSize: 16,
            color: defaultColor.heading,
            fontWeight: "bold",
          }}
        >
          About me
        </Text>
        <View>
          <RenderHtml
            baseStyle={{ color: defaultColor.placeHolder }}
            contentWidth={width}
            source={{ html: handleAbout(details?.about) }}
          />
          <Text
            style={{
              color: defaultColor.defaultColor,
              fontWeight: 600,
              marginTop: 0,
            }}
            onPress={readMore}
          >
            {isredmore ? "Show Less" : "Read More"}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontSize: 16,
            color: defaultColor.heading,
            fontWeight: "bold",
          }}
        >
          Specializations
        </Text>
        {details?.specialization.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <AntDesign
                name="checkcircleo"
                size={18}
                color={defaultColor.defaultColor}
              />
              <Text style={styles.iconInfoText}>{item.name}</Text>
            </View>
          );
        })}
      </View>

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontSize: 16,
            color: defaultColor.heading,
            fontWeight: "bold",
          }}
        >
          Education
        </Text>
        {details?.educations.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <AntDesign
                name="checkcircleo"
                size={18}
                color={defaultColor.defaultColor}
              />
              <Text style={{}}>
                {item.degree}
                {" - "}
                {item.school}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontSize: 16,
            color: defaultColor.heading,
            fontWeight: "bold",
          }}
        >
          Experience
        </Text>
        {details?.experiences.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <AntDesign
                name="checkcircleo"
                size={18}
                color={defaultColor.defaultColor}
              />
              <Text style={{ flex: 1 }}>
                {item.title}
                {" - "}
                {item.clinicName}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontSize: 16,
            color: defaultColor.heading,
            fontWeight: "bold",
          }}
        >
          Registrations
        </Text>
        {details?.experiences.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <AntDesign
                name="checkcircleo"
                size={18}
                color={defaultColor.defaultColor}
              />
              <Text style={{ flex: 1 }}>
                {item.title}
                {" - "}
                {item.clinicName}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontSize: 16,
            color: defaultColor.heading,
            fontWeight: "bold",
          }}
        >
          Cancellation Policy
        </Text>
        {details?.cancellationCharges === "no" ? (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Feather
              name="alert-triangle"
              size={22}
              color={defaultColor.defaultColor}
            />
            <Text style={styles.iconInfoText}>
              This appointment is fully refundable.
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Feather
              name="alert-triangle"
              size={22}
              color={defaultColor.defaultColor}
            />
            <Text style={{ fontWeight: "500", fontSize: 13, flex: 1 }}>
              This appointment is completely non-refundable. If you cancel this
              appointment you will only get {details?.cancellationAmt}% amount.
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <SimpleLineIcons
            name="lock"
            size={22}
            color={defaultColor.defaultColor}
          />

          <Text style={{ fontWeight: "500", fontSize: 13 }}>
            Free cancellation available until payment is completed.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfessionalDetails;

const styles = StyleSheet.create({
  iconInfoText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 13,
  },
});
