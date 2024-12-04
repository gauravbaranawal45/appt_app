import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import homeFactory from "../actions/homeAction";
import { imgPath } from "../service/axiosInstance";
import blankProfile from "@/assets/images/blank-profile-picture.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import ApptSlot from "./doctorDetails/ApptSlot";
import { useRouter } from "expo-router";

const AppointmentSlot = () => {
  const { params } = useRoute();
  const router = useRouter();
  const { defaultColor } = useApplicationContext();
  const [data, setData] = useState(null);

  const fetchDetails = async () => {
    try {
      const res = await homeFactory.doctorDetail(params.docId);
      setData(res.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const renderSpecialist = (item) => {
    let text = "";
    if (params.specialist) {
      item?.specialization?.forEach((subitem, i) => {
        if (params.specialist === subitem._id) {
          text += (i ? ", " : "") + subitem.name;
        }
      });
    } else {
      item?.specialization?.forEach((subitem, i) => {
        text += (i ? ", " : "") + subitem.name;
      });
    }
    return text;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          {data && (
            <>
              <View
                style={{
                  backgroundColor: "#fff",
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push({
                      pathname: `doctorDetails/${params.docId}`,
                    })
                  }
                  key={Math.random()}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Image
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 100,
                      }}
                      source={
                        data?.image
                          ? { uri: `${imgPath}profileimages/${data?.image}` }
                          : blankProfile
                      }
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    >
                      {data?.firstName + " " + data?.lastName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: defaultColor.text,
                        marginTop: 3,
                      }}
                    >
                      {renderSpecialist(data)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: defaultColor.text,
                        marginTop: 10,
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    >
                      {data?.workExperience} YRS Exp | {data?.gender}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <ApptSlot
                details={data}
                normalFee={data?.normalFee}
                docId={params.docId}
                horizontal={false}
                numColumns={4}
                extraStyle={{}}
                params={params}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentSlot;
