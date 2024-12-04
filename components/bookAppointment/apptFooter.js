import { View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider, Avatar } from "react-native-paper";
import ApptBottomSheet from "./ApptBottomSheet";

const ApptFooter = ({
  fees,
  defaultColor,
  memberData,
  setMemberData,
  handleAppt,
}) => {
  const defaultMember = () => {
    return memberData.filter((item) => item.active)[0] ?? {};
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: "#fff",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          padding: 10,
        }}
      >
        <View>
          <View>
            <View>
              <Text>Consult for : </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: " #fff",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 15 }}>
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
                      {defaultMember().patientName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 2,
                        color: defaultColor.text,
                        textTransform: "capitalize",
                      }}
                    >
                      {defaultMember().gender}, {defaultMember().age}
                    </Text>
                  </View>
                </View>
              </View>
              <ApptBottomSheet
                title={"Change"}
                modalTitle="Select Patient"
                memberData={memberData}
                setMemberData={setMemberData}
              />
            </View>
          </View>
          <Divider style={{ marginVertical: 20 }} />
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#4C4DDC", fontWeight: 700, fontSize: 16 }}>
                ₹{fees}
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 12,
                  marginTop: 2,
                  color: "#4C4DDC",
                }}
              >
                View Bill
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor: "#4C4DDC",
                borderRadius: 10,
                alignItems: "center",
                marginLeft: 30,
              }}
              onPress={handleAppt}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  // textAlign: "center",
                  color: "#fff",
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ApptFooter;
