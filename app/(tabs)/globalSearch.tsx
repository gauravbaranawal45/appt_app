import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import HomeSpecialist from "@/components/home/homeSpecialist";
import { useColorScheme } from "@/hooks/useColorScheme";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import homeFactory from "../../actions/homeAction";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import { imgPath } from "@/service/axiosInstance";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useRouter } from "expo-router";

const layoutMarginHorizontal = 10;

const GlobalSearch = () => {
  const { defaultColor } = useApplicationContext();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const router = useRouter();
  const [searchedData, setSearchedData] = useState([]);

  const debounced = useDebouncedCallback(async (searchQuery) => {
    if (searchQuery) {
      let result = await homeFactory.doctorSearch({ query: searchQuery });
      if (result.status === 200) {
        setSearchedData(result.data.data);
      } else {
        console.error(result);
      }
    }
  }, 1000);

  const handleChange = async (val) => {
    debounced(val);
  };

  const handleClick = (item) => {
    if (item.name) {
      navigation.navigate("doctorList", {
        specialist: item._id,
      });
    } else {
      router.push({
        pathname: `doctorDetails/${item._id}`,
      });
    }
  };

  const inputRef = React.useRef();

  setTimeout(() => inputRef.current.focus(), 100);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
        animated={true}
      />
      {/* start common header */}
      <View>
        <View
          style={{
            marginHorizontal: layoutMarginHorizontal,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              ...styles.searchSection,
              // borderColor: defaultColor.inputBorder,
              backgroundColor: defaultColor.inputBackground,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={20}
                color={defaultColor.inputIcon}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
            <TextInput
              style={{ ...styles.input, color: defaultColor.text }}
              placeholder="Search Doctors, Specialities or Symptoms"
              placeholderTextColor={defaultColor.placeHolder}
              onChangeText={handleChange}
              underlineColorAndroid="transparent"
              ref={inputRef}
            />
          </View>
        </View>
      </View>
      {/* end common header */}
      <ScrollView style={{ flex: 1, backgroundColor: defaultColor.background }}>
        <View
          style={{
            marginHorizontal: layoutMarginHorizontal,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: defaultColor.text,
              }}
            >
              Recent
            </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 16, color: defaultColor.text }}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <FlatList
              horizontal={true}
              data={[
                {
                  banner: require("@/assets//images/img1.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/img2.jpg"),
                  name: "Dental",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Anesthesiologists & fsdfsdfsd",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
                {
                  banner: require("@/assets//images/banner.jpg"),
                  name: "Peripheral Nerve",
                },
              ]}
              renderItem={({ item }) => (
                <HomeSpecialist
                  item={item}
                  width={30}
                  height={30}
                  wrapperView={80}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: "#d7d5d5",
              marginVertical: 10,
            }}
          />
          {searchedData.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: 10,
                  gap: 10,
                }}
                onPress={() => handleClick(item)}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  {item.name ? (
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                      }}
                      source={
                        item.image
                          ? { uri: `${imgPath}specializations/${item.image}` }
                          : blankProfile
                      }
                    />
                  ) : (
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                      }}
                      source={
                        item.image
                          ? { uri: `${imgPath}profileimages/${item.image}` }
                          : blankProfile
                      }
                    />
                  )}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: defaultColor.text,
                        fontWeight: 600,
                      }}
                    >
                      {item.name
                        ? item.name
                        : item.firstName + " " + item.lastName}
                    </Text>
                    {!item.name && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: defaultColor.text,
                          fontWeight: 500,
                        }}
                      >
                        Genral dsa
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: defaultColor.text,
                    }}
                  >
                    {item.name ? "Speciality" : "Doctor"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e4e3e3",
  },
  searchIcon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: "#424242",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    fontSize: 14,
  },
});

export default GlobalSearch;
