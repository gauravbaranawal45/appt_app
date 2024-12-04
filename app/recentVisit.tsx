import { View, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React from "react";
import HomeCard from "@/components/home/card";
import FilterSpecialist from "@/components/home/filterSpecialist";
import Header from "@/components/header";
const layoutMarginVerticle = 20;
const layoutMarginHorizontal = 10;

const RecentVisit = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="light-content" />
      {/* start common header */}
      <Header isHome={false} />
      {/* end common header */}
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            marginHorizontal: layoutMarginHorizontal,
          }}
        >
          <FilterSpecialist
            layoutMarginVerticle={layoutMarginVerticle}
            layoutMarginHorizontal={layoutMarginHorizontal}
          />
          <HomeCard
            showSectionsTitle={true}
            title="Recent Visit"
            link="recentVisit"
            layoutMarginVerticle={layoutMarginVerticle}
            layoutMarginHorizontal={layoutMarginHorizontal}
            data={10}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecentVisit;
