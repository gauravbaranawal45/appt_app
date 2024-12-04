import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import HomeCard from "@/components/home/card";
import SortWithFilter from "@/components/common/sortWithFilter";
import { useRoute } from "@react-navigation/native";
import homeFactory from "../actions/homeAction";
import { useEffect } from "react";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useApplicationContext } from "@/context/ApplicationContext";
import { docListSort } from "@/constants/sortOptions";

const TopDoctor = () => {
  const { params } = useRoute();
  const { defaultColor } = useApplicationContext();
  const [docList, setDocList] = useState([]);
  const [showLocationAlert, setShowLocationAlert] = useState(true);

  const fetchList = async () => {
    try {
      const getDoctors = await homeFactory.getDoctors({
        limit: 20,
        specialization: params.specialist,
      });
      setDocList(getDoctors.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

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
        {showLocationAlert && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: defaultColor.inputBackground,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: defaultColor.text,
                }}
              >
                Showing results for Delhi{" "}
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ borderBottomWidth: 1 }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: defaultColor.heading,
                  }}
                >
                  Change Location
                </Text>
              </TouchableOpacity>
            </View>
            <Feather
              name="x"
              size={18}
              color="black"
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}
              onPress={() => {
                setShowLocationAlert(false);
              }}
            />
          </View>
        )}
        <View style={{ marginHorizontal: 15 }}>
          <SortWithFilter onClickHandler={() => {}} options={docListSort} />
        </View>

        <View style={{ marginHorizontal: 15 }}>
          <HomeCard data={docList ?? []} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopDoctor;
