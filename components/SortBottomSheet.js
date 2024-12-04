import React, { useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useApplicationContext } from "@/context/ApplicationContext";

const seeAllColor = "#4C4DDC";

const App = ({
  title,
  onClickHandler,
  modalTitle,
  options = [],
  height = 330,
}) => {
  const { defaultColor } = useApplicationContext();
  const refStandard = useRef();

  return (
    <View>
      <TouchableOpacity
        onPress={() => refStandard.current.open()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          // borderWidth: 1.5,
          borderRadius: 10,
          padding: 5,
          borderColor: seeAllColor,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: seeAllColor,
            marginRight: 8,
          }}
        >
          {title}
        </Text>
        <Octicons name="sort-desc" size={20} color={seeAllColor} />
      </TouchableOpacity>
      {/* List Menu */}
      <RBSheet ref={refStandard} draggable dragOnContent height={height}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
          }}
        >
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
          {options.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 15,
                }}
                onPress={() => {
                  onClickHandler(item);
                  refStandard.current.close();
                }}
              >
                {item.icon(defaultColor.heading)}
                <Text
                  style={{
                    fontSize: 16,
                    color: defaultColor.text,
                    marginLeft: 25,
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

const styles = StyleSheet.create({});

export default App;
