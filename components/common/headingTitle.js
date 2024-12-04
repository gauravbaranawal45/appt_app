import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import SortBottomSheet from "../SortBottomSheet";
import { MaterialIcons } from "@expo/vector-icons";
const seeAllColor = "#4C4DDC";

const HeadingTitle = ({
  title,
  onClickHandler,
  showSort,
  handleSeeAll,
  options,
  sortValue,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleStyle}>{title}</Text>
      {showSort ? (
        <SortBottomSheet
          title={sortValue.name}
          modalTitle="Sort By"
          onClickHandler={onClickHandler}
          options={options}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSeeAll}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.seeAll}>View all</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={seeAllColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeadingTitle;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  seeAll: {
    fontSize: 16,
    marginHorizontal: 10,
    color: seeAllColor,
  },
  titleStyle: {
    fontSize: 20,
    color: seeAllColor,
    fontWeight: "600",
  },
});
