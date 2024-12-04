import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import appointmentFactory from "../../actions/appointmentAction";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { RadioButton } from "react-native-paper";

const ApptBottomSheet = ({ title, modalTitle, memberData, setMemberData }) => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();
  const refStandard = useRef();

  const changeHandler = (index) => {
    let newState = [...memberData];
    newState = newState.map((item, i) => {
      if (i === index) {
        return { ...item, active: true };
      } else {
        return { ...item, active: false };
      }
    });
    setMemberData(newState);
    refStandard.current.close();
  };

  return (
    <View>
      <TouchableOpacity onPress={() => refStandard.current.open()}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: defaultColor.defaultColor,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
      {/* List Menu */}
      <RBSheet
        ref={refStandard}
        draggable={true}
        dragOnContent={false}
        height={600}
      >
        <ScrollView style={{ flex: 1, marginBottom: 50 }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 15,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: defaultColor.heading,
                }}
              >
                {modalTitle}
              </Text>
              <TouchableOpacity
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
                onPress={() => {
                  refStandard.current.close();
                  navigation.navigate("addFamilyMember", {
                    docId: params.id,
                    source: "appointment",
                  });
                }}
              >
                <AntDesign
                  name="pluscircleo"
                  size={20}
                  color={defaultColor.defaultColor}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: defaultColor.defaultColor,
                  }}
                >
                  Add Patient
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 0.5,
                backgroundColor: "#ccc",
                marginTop: 30,
                // marginBottom: 10,
              }}
            />
            {memberData?.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={{
                    flexDirection: "row",
                    backgroundColor: " #fff",
                    alignItems: "center",
                    marginTop: 10,
                    borderWidth: 0.5,
                    padding: 10,
                    borderRadius: 10,
                    borderColor: "#ccc",
                  }}
                  onPress={() => changeHandler(i)}
                >
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 15,
                        }}
                      >
                        <Avatar.Text size={36} label="GB" />
                        <View>
                          <Text
                            style={{
                              color: defaultColor.heading,
                              fontWeight: 500,
                              fontSize: 16,
                              textTransform: "capitalize",
                            }}
                          >
                            {item.patientName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginTop: 2,
                              color: defaultColor.text,
                              textTransform: "capitalize",
                            }}
                          >
                            {item.gender}, {item.age}
                          </Text>
                        </View>
                      </View>

                      <RadioButton.Group
                        onValueChange={() => changeHandler(i)}
                        value={item.active ? item.active : ""}
                      >
                        <RadioButton.Item value={item.active} />
                      </RadioButton.Group>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ApptBottomSheet;
