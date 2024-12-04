import React, { useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useApplicationContext } from "@/context/ApplicationContext";

const seeAllColor = "#4C4DDC";

const MenuWithBottomSheet = ({
  title,
  onClickHandler,
  modalTitle,
  options = [],
  headerVisible,
  height = 330,
}) => {
  const { defaultColor } = useApplicationContext();
  const refStandard = useRef();

  return (
    <View>
      <TouchableOpacity onPress={() => refStandard.current.open()}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={30}
          color="black"
        />
      </TouchableOpacity>
      {/* List Menu */}
      <RBSheet ref={refStandard} draggable dragOnContent height={height}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          {headerVisible && (
            <>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: defaultColor.heading,
                  }}
                >
                  {modalTitle}
                </Text>
              </View>
              <View
                style={{
                  height: 0.5,
                  backgroundColor: "#ccc",
                  marginTop: 20,
                  marginBottom: 10,
                }}
              />
            </>
          )}

          {options.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 15,
                }}
                onPress={onClickHandler}
              >
                {item.icon(defaultColor.heading)}
                <Text
                  style={{
                    fontSize: 16,
                    color: defaultColor.text,
                    marginLeft: 25,
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </RBSheet>
    </View>
  );
};

export default MenuWithBottomSheet;
