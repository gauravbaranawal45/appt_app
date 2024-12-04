import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SortBottomSheet from "../SortBottomSheet";
import ModalCompo from "./ModalCompo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const seeAllColor = "#4C4DDC";

const SortWithFilter = ({ onClickHandler, options }) => {
  console.log("showLocationAlert", options);

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const close = () => {
    setOpen(false);
  };
  return (
    <>
      <View style={styles.wrapper}>
        <SortBottomSheet
          title="Sort"
          modalTitle="Sort By"
          onClickHandler={onClickHandler}
          options={options}
          height={500}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpen(true)}
          style={styles.filterWrapper}
        >
          <Ionicons
            name="options"
            size={20}
            color={seeAllColor}
            style={{ marginRight: 10 }}
          />
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text style={{ ...styles.filterText, lineHeight: 20 }}>Filter</Text>
            <View style={styles.subTextWrap}>
              <Text style={styles.subText}>4</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <ModalCompo open={open} close={close} />
    </>
  );
};

export default SortWithFilter;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    // backgroundColor: "red",
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
  subTextWrap: {
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: seeAllColor,
    justifyContent: "center",
    marginLeft: 5,
  },
  subText: {
    fontSize: 10,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  filterText: {
    fontSize: 14,
    fontWeight: 600,
    color: seeAllColor,
  },
  filterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    // borderColor: seeAllColor,
    // backgroundColor: "green",
  },
});
