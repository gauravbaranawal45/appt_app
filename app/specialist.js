import { View, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React from "react";
import SpecialistCard from "@/components/home/specialistCard";
import { useNavigation } from "@react-navigation/native";
import { useApplicationContext } from "@/context/ApplicationContext";

const Specialist = () => {
  const navigation = useNavigation();
  const { homedata } = useApplicationContext();

  const handleSeeAllForSpec = () => {
    navigation.navigate("specializationList");
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
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <SpecialistCard
            showSortWithFilter={true}
            title="Top Doctor"
            link="doctorList"
            data={homedata.specializations ?? []}
            handleSeeAll={handleSeeAllForSpec}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Specialist;
