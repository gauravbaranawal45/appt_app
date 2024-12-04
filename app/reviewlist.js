import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Reviews from "@/components/doctorProfile/Reviews";
import SortBottomSheet from "@/components/SortBottomSheet";
import RatingSection from "../components/reviewCompo/RatingSection";
import { useApplicationContext } from "@/context/ApplicationContext";
import homeFactory from "../actions/homeAction";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";
const layoutMarginVerticle = 20;
const layoutMarginHorizontal = 10;
const seeAllColor = "#4C4DDC";

const ReviewList = () => {
  const router = useRouter();
  const refRBSheet = useRef();
  const { params } = useRoute();
  const { defaultColor } = useApplicationContext();
  const [reviewList, setReviewList] = useState([]);

  const fetchHome = async () => {
    try {
      const rlist = await homeFactory.getDoctorReview({
        id: params.id,
        filter: "mostHelpful",
        limit: 5,
        page: 0,
      });
      setReviewList(rlist.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  const onClickHandler = () => {};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" />
      <View style={{ backgroundColor: "#c7c7c9" }}>
        <View style={styles.firstSection}>
          <Text style={styles.firstTitle}>
            Share your experience and help other patients
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.firstbtn}
            onPress={() => router.push("reviewlist")}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: seeAllColor,
              }}
            >
              Share your story
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={{}}>
          {/* Start 2nd review section */}
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}
          >
            <RatingSection />
          </View>

          {/* Start 3rd review section */}

          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              paddingVertical: 20,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                ...styles.flexBetween,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: seeAllColor,
                  fontWeight: 600,
                }}
              >
                Patients Reviews
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                // onPress={() => setIsopen(true)}
                onPress={() => refRBSheet.current.open()}
              >
                <SortBottomSheet
                  title="Sort"
                  modalTitle="Sort By"
                  onClickHandler={onClickHandler}
                />
              </TouchableOpacity>
            </View>
            {reviewList.map((item, i) => (
              <Reviews key={i} item={item} defaultColor={defaultColor} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
    backgroundColor: "#c7c7c9",
  },
  firstSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  firstTitle: {
    flex: 1,
    fontSize: 14,
    color: seeAllColor,
    fontWeight: 600,
    marginRight: 10,
  },
  firstbtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: seeAllColor,
    borderRadius: 5,
  },
  mt5: {
    marginTop: 5,
  },
  mt25: {
    marginTop: 25,
  },
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconInfoText: {
    textAlign: "center",
    fontWeight: "500",
  },
});

export default ReviewList;
