import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import HeadingTitle from "@/components/common/headingTitle";
import MenuWithBottomSheet from "@/components/common/MenuWithBottomSheet";
const textColor = "black";
const seeAllColor = "#4C4DDC";
const NotiCard = ({
  title,
  link,
  layoutMarginVerticle,
  layoutMarginHorizontal,
  data,
  showSectionsTitle,
  showSort,
  showSortWithFilter,
}) => {
  const router = useRouter();

  return (
    <View style={{ marginBottom: 20 }}>
      {[...Array(data)].map((item, index) => {
        return (
          <View
            key={index}
            style={{
              borderWidth: 1,
              padding: 5,
              borderColor: "#D9D9D9",
              borderRadius: 10,
              marginTop: 10,
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                  }}
                  source={require("@/assets//images/banner.jpg")}
                />
              </View>
              <View style={{ marginHorizontal: 10, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: textColor,
                  }}
                >
                  This is my life. i want be a bilinears thi is demo example
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity>
                <Text>18d</Text>
                <MenuWithBottomSheet
                  title="Sort"
                  modalTitle="Sort By"
                  onClickHandler={() => {}}
                  options={[
                    {
                      icon: (color) => (
                        <Ionicons name="trash" size={26} color={color} />
                      ),
                      name: "Delete Notification",
                      value: "delete",
                    },
                  ]}
                  headerVisible={false}
                  height={150}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: seeAllColor,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
});

export default NotiCard;
