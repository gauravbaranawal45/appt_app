import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
  Text,
} from "react-native";
import React from "react";
import Header from "@/components/header1";
import { useApplicationContext } from "@/context/ApplicationContext";
import HeadingTitle from "../../components/common/headingTitle";
import HomeSpecialist from "../../components/home/homeSpecialist";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Specialization = () => {
  const navigation = useNavigation();
  const { defaultColor, homedata } = useApplicationContext();

  const handleSeeAllForSpec = () => {
    navigation.navigate("specializationList");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.defaultColor,
      }}
    >
      <StatusBar barStyle="light-content" />
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ paddingHorizontal: 15 }}>
          {/* <View style={{ marginTop: 10 }}>
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: defaultColor.defaultColor,
                }}
              >
                Consult for Seasonal Ailments
              </Text>
            </View>
            <View
              style={{
                flex: 1,

                backgroundColor: "#fff",
              }}
            >
              <FlatList
                data={homedata.specializations}
                renderItem={({ item, index }) => (
                  <HomeSpecialist
                    item={item}
                    width={30}
                    height={30}
                    wrapperView={80}
                  />
                )}
                showsVerticalScrollIndicator={false}
                style={{
                  marginTop: 10,
                }}
                numColumns={4}
              />
            </View>
          </View> */}
          {/* //this is for specialties */}
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                marginTop: 10,
                marginBottom: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: defaultColor.defaultColor,
                }}
              >
                Top Specialties
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={handleSeeAllForSpec}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: defaultColor.defaultColor,
                    fontWeight: 600,
                  }}
                >
                  View all
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={defaultColor.defaultColor}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
              }}
            >
              <FlatList
                data={homedata.specializations}
                renderItem={({ item, index }) => (
                  <HomeSpecialist
                    index={index}
                    item={item}
                    width={30}
                    height={30}
                    wrapperView={80}
                  />
                )}
                showsVerticalScrollIndicator={false}
                style={{
                  marginTop: 0,
                }}
                numColumns={4}
              />
            </View>
          </View>
          {/* <View style={{ marginTop: 10 }}>
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: defaultColor.defaultColor,
                }}
              >
                Browse by Symptoms
              </Text>
            </View>
            <View
              style={{
                flex: 1,

                backgroundColor: "#fff",
              }}
            >
              <FlatList
                data={homedata.specializations}
                renderItem={({ item, index }) => (
                  <HomeSpecialist
                    item={item}
                    width={30}
                    height={30}
                    wrapperView={80}
                  />
                )}
                showsVerticalScrollIndicator={false}
                style={{
                  marginTop: 10,
                }}
                numColumns={4}
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: defaultColor.defaultColor,
                }}
              >
                Most Common Symptoms
              </Text>
            </View>
            <View
              style={{
                flex: 1,

                backgroundColor: "#fff",
              }}
            >
              <FlatList
                data={homedata.specializations}
                renderItem={({ item, index }) => (
                  <HomeSpecialist
                    item={item}
                    width={30}
                    height={30}
                    wrapperView={80}
                  />
                )}
                showsVerticalScrollIndicator={false}
                style={{
                  marginTop: 10,
                }}
                numColumns={4}
              />
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Specialization;
