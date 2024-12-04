import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import HeadingTitle from "../common/headingTitle";
import SortWithFilter from "../common/sortWithFilter";
import Button from "../common/Button";
import { imgPath } from "../../service/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";
import { useApplicationContext } from "@/context/ApplicationContext";
const textColor = "black";
const seeAllColor = "#4C4DDC";

const SpecialistCard = ({
  title,
  link,
  data,
  showSectionsTitle,
  showSort,
  showSortWithFilter,
  handleSeeAll,
}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();

  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      {showSectionsTitle ? (
        <HeadingTitle
          title={title}
          link={link}
          onClickHandler={() => {}}
          showSort={showSort}
          handleSeeAll={handleSeeAll}
        />
      ) : null}
      {/* {showSortWithFilter ? <SortWithFilter onClickHandler={() => {}} /> : null} */}

      {data.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              borderWidth: 1,
              padding: 5,
              borderColor: "#D9D9D9",
              borderRadius: 10,
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: `doctorDetails/${item._id}`,
                })
              }
              key={Math.random()}
              style={{ flexDirection: "row" }}
            >
              <View>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                  }}
                  source={
                    item.image
                      ? { uri: `${imgPath}profileimages/${item.image}` }
                      : blankProfile
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: textColor,
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
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

export default SpecialistCard;
