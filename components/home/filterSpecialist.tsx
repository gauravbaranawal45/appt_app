import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import HomeSpecialist from "./homeSpecialist";
import HeadingTitle from "../common/headingTitle";
import { useApplicationContext } from "@/context/ApplicationContext";

const FilterSpecialist = ({ handleSeeAll }) => {
  const { homedata } = useApplicationContext();
  return (
    <View>
      {/* section should be here */}
      <HeadingTitle
        title={"Specialist"}
        handleSeeAll={handleSeeAll}
        showSort={false}
      />
      <View>
        <FlatList
          horizontal={true}
          data={homedata.specializations}
          renderItem={({ item }) => (
            <HomeSpecialist
              item={item}
              width={30}
              height={30}
              wrapperView={80}
            />
          )}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 5 }}
        />
      </View>
    </View>
  );
};

export default FilterSpecialist;
