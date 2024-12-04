import { View, SafeAreaView, StatusBar, FlatList } from "react-native";
import React from "react";
import FevouriteDoctorCard from "@/components/fevouriteDoctor/fevouriteDoctorCard";
import Header from "@/components/header";
const layoutMarginVerticle = 20;
const layoutMarginHorizontal = 10;

const FevouriteDoctor = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="light-content" />
      <Header title="Fevourite Doctor" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[
          {
            banner: require("@/assets//images/banner.jpg"),
            name: "Peripheral Nerve",
          },
          {
            banner: require("@/assets//images/banner.jpg"),
            name: "Dental",
          },
          {
            banner: require("@/assets//images/banner.jpg"),
            name: "Anesthesiologists & fsdfsdfsd",
          },
          {
            banner: require("@/assets//images/banner.jpg"),
            name: "Peripheral Nerve",
          },
          {
            banner: require("@/assets//images/banner.jpg"),
            name: "Peripheral Nerve",
          },
          {
            banner: require("@/assets//images/banner.jpg"),
            name: "Peripheral Nerve",
          },
        ]}
        renderItem={({ item }) => (
          <FevouriteDoctorCard
            showSortWithFilter={false}
            title="Fevourite Doctor"
            link="fevouriteDoctor"
            layoutMarginVerticle={layoutMarginVerticle}
            layoutMarginHorizontal={layoutMarginHorizontal}
          />
        )}
        style={{ marginVertical: 10, marginHorizontal: 5 }}
        numColumns={2}
        keyExtractor={(item) => Math.random()}
      />
    </SafeAreaView>
  );
};

export default FevouriteDoctor;
