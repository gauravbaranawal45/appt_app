import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import HomeCard from "@/components/home/card";
import AppointmentCard from "@/components/home/appointmentCard";
import FilterSpecialist from "@/components/home/filterSpecialist";
import Header from "@/components/header1";
import homeFactory from "../../actions/homeAction";
import { useApplicationContext } from "@/context/ApplicationContext";
import appointmentFactory from "@/actions/appointmentAction";
import { useNavigation } from "@react-navigation/native";
import { imgPath } from "../../service/axiosInstance";
const layoutMarginVerticle = 20;
const layoutMarginHorizontal = 10;

const Home = () => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const { homedata, setHomedata } = useApplicationContext();
  const [apptData, setApptData] = useState([]);
  const [docList, setDocList] = useState([]);

  const fetchHome = async () => {
    try {
      const res = await homeFactory.home({ limit: 2 });
      setHomedata(res.data.data);
      const getDoctors = await homeFactory.getDoctors({
        limit: 2,
        specialization: "doctorList",
      });
      setDocList(getDoctors.data.data);
      const appt = await appointmentFactory.getAppointments({
        limit: 2,
        apptType: "pending",
      });
      setApptData(appt.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  const handleSeeAll = () => {
    navigation.navigate("doctorList", {
      specialist: "doctorList",
    });
  };

  const handleSeeAllForAppt = () => {
    navigation.navigate("appointments");
  };

  const handleSeeAllForSpec = () => {
    navigation.navigate("specializationList");
  };

  const homeTopBanner = () => {
    return homedata.banners?.filter(
      (item) => item.sectionName === "top-section"
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#4C4DDC",
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Carousel
            loop
            width={width}
            height={width / 2}
            // autoPlay={true}
            data={homeTopBanner()}
            scrollAnimationDuration={3000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ index, item }) => {
              return (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    navigation.navigate(item.link);
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: 200,
                    }}
                    source={{
                      uri: `${imgPath}banners/${item.bannerImg}`,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: layoutMarginHorizontal,
          }}
        >
          <FilterSpecialist handleSeeAll={handleSeeAllForSpec} />
          {apptData.length > 0 && (
            <AppointmentCard
              data={apptData}
              title="Appointments"
              showSectionsTitle={true}
              handleSeeAll={handleSeeAllForAppt}
            />
          )}

          {/* 
          <HomeCard
            data={2}
            link="recentVisit"
            title="Recent Visit"
            layoutMarginVerticle={layoutMarginVerticle}
            layoutMarginHorizontal={layoutMarginHorizontal}
            showSectionsTitle={true}
          />
          <HomeCard
            data={2}
            link="fevouriteDoctor"
            title="Fevourite Doctor"
            layoutMarginVerticle={layoutMarginVerticle}
            layoutMarginHorizontal={layoutMarginHorizontal}
            showSectionsTitle={true}
          /> */}
          <HomeCard
            data={docList ?? []}
            title="Top Doctor"
            handleSeeAll={handleSeeAll}
            showSectionsTitle={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {},
  headerUserImg: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: layoutMarginVerticle,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    fontSize: 18,
  },
  button: {
    borderWidth: 2,
    // paddingVertical: 5,
    // paddingHorizontal: 10,
    // borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    // textAlign: "center",
  },
});

export default Home;
