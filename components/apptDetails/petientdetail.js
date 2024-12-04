import { View, StyleSheet, Text } from "react-native";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const Petientdetail = ({ data, defaultColor }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderColor: defaultColor.cardBorderColor,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 5,
        }}
      >
        Patent details
      </Text>
      <View style={styles.listWrap}>
        <FontAwesome5
          name="user"
          size={22}
          style={{ color: defaultColor.heading, width: 40 }}
        />
        <Text style={styles.listText}>{data?.patientInfo.patientName}</Text>
      </View>
      <View style={styles.listWrap}>
        <Feather
          name="phone"
          size={22}
          style={{ color: defaultColor.heading, width: 40 }}
        />
        <Text style={styles.listText}>{data?.patientInfo.mobile}</Text>
      </View>
      <View style={styles.listWrap}>
        <FontAwesome
          name="transgender"
          size={22}
          style={{ color: defaultColor.heading, width: 40 }}
        />
        <Text style={styles.listText}>
          {data?.patientInfo.gender} | {data?.patientInfo.age} Years
        </Text>
      </View>
      <View style={styles.listWrap}>
        <FontAwesome
          name="map-marker"
          size={26}
          style={{ color: defaultColor.heading, width: 40 }}
        />
        <Text style={styles.listText}>{data?.patientInfo.address}</Text>
      </View>
    </View>
  );
};

export default Petientdetail;

const styles = StyleSheet.create({
  listWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#11181C",
    textTransform: "capitalize",
  },
});
