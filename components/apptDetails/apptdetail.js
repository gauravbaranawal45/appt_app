import { View, StyleSheet, Text } from "react-native";
import {
  formattedDate,
  formatAMPM,
  renderSpecialist,
} from "../../utils/helper";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Apptdetail = ({ data, defaultColor }) => {
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
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Appointment Details
          </Text>
          {/* <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            #{data?.apptID}
          </Text> */}
        </View>
        {data?.scheduledAppt && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: defaultColor.inputBackground,
              paddingVertical: 12,
              marginVertical: 10,
              borderRadius: 10,
              paddingHorizontal: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: defaultColor.defaultColor,
              }}
            >
              {formattedDate(data?.scheduledAppt)}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: defaultColor.defaultColor,
              }}
            >
              {data.apptType === "numberWise"
                ? "WL " + data.waitingList
                : formatAMPM(new Date(data?.scheduledAppt.date))}
              {}
            </Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.listWrap}>
          <MaterialCommunityIcons
            name="stethoscope"
            size={22}
            style={{ color: defaultColor.heading, width: 40 }}
          />
          <Text style={styles.listText}>
            {renderSpecialist(data?.doctorData, data?.specialist)}
          </Text>
        </View>
        <View style={styles.listWrap}>
          <FontAwesome
            name="map-marker"
            size={22}
            style={{ color: defaultColor.heading, width: 40 }}
          />
          <Text style={styles.listText}>{data?.doctorData?.clinicName}</Text>
        </View>
        <View style={styles.listWrap}>
          <FontAwesome
            name="building-o"
            size={22}
            style={{ color: defaultColor.heading, width: 40 }}
          />
          <Text style={[styles.listText, { flex: 1 }]}>
            {`${data?.doctorData.address?.address1}, ${data?.doctorData.address?.address2}, ${data?.doctorData.address?.landmark}, ${data?.doctorData.address?.city}, ${data?.doctorData.address?.state} - ${data?.doctorData.address?.pincode}`}
          </Text>
        </View>
        <View style={styles.listWrap}>
          <MaterialIcons
            name="payment"
            size={22}
            style={{ color: defaultColor.heading, width: 40 }}
          />
          <Text style={[styles.listText, { flex: 1 }]}>
            Payment {data?.paymentStatus}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Apptdetail;

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
