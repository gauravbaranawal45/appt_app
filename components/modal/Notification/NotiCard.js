import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import HeadingTitle from "@/components/common/headingTitle";
import MenuWithBottomSheet from "@/components/common/MenuWithBottomSheet";
import { imgPath } from "@/service/axiosInstance";
import RenderHtml from "react-native-render-html";
import blankProfile from "@/assets//images/blank-profile-picture.png";
const textColor = "black";
const seeAllColor = "#4C4DDC";

const NotiCard = ({ item, close }) => {
  const router = useRouter();

  return (
    <View
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
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: item.notiLink,
          });
          close();
        }}
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
            source={
              item.image ? imgPath + item.dir + "/" + item.image : blankProfile
            }
          />
        </View>
        <View style={{ marginHorizontal: 10, flex: 1 }}>
          <RenderHtml
            baseStyle={{ color: textColor }}
            source={{ html: item.message }}
          />
        </View>
      </TouchableOpacity>

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
