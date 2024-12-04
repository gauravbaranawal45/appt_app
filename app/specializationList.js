import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import homeFactory from "../actions/homeAction";
import blankProfile from "@/assets//images/blank-profile-picture.png";
import { imgPath } from "@/service/axiosInstance";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useRouter } from "expo-router";
import { Divider } from "react-native-paper";

const SpecializationList = () => {
  const { defaultColor } = useApplicationContext();
  const navigation = useNavigation();
  const router = useRouter();
  const [searchedData, setSearchedData] = useState([]);
  const [limit, setLimit] = useState(40);
  const [page, setPage] = useState(0);

  const datalist = async () => {
    const res = await homeFactory.getAllSpecialization({ limit, page });
    setSearchedData(res.data.data);
  };

  useEffect(() => {
    datalist();
  }, []);

  const debounced = useDebouncedCallback(async (searchQuery) => {
    if (searchQuery) {
      datalist();
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar barStyle={"light-content"} animated={true} />
      {/* start common header */}
      <View style={{ margin: 15 }}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            editable={true}
            placeholder="Search Doctor..."
            placeholderTextColor={defaultColor.defaultColor}
          />
          <Ionicons name="search" size={22} color={defaultColor.defaultColor} />
        </View>
      </View>
      {/* end common header */}
      <ScrollView style={{ flex: 1, backgroundColor: defaultColor.background }}>
        <View style={{ marginHorizontal: 15, marginVertical: 0 }}>
          {searchedData.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                  gap: 10,
                  borderWidth: 1,
                  borderColor: "#D9D9D9",
                }}
                onPress={() =>
                  navigation.navigate("doctorList", {
                    specialist: item._id,
                  })
                }
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
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
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: defaultColor.heading,
                            fontWeight: 600,
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: defaultColor.text,
                            marginTop: 5,
                          }}
                        >
                          {item.shortDescription}
                        </Text>
                      </View>
                      <View>
                        <MaterialIcons
                          name="arrow-forward-ios"
                          size={16}
                          color={defaultColor.defaultColor}
                        />
                      </View>
                    </View>
                    <Divider style={{ marginVertical: 10 }} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: defaultColor.subText,
                        marginTop: 0,
                      }}
                    >
                      {item.symptoms}
                    </Text>
                  </View>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e4e3e3",
    paddingHorizontal: 10,
    backgroundColor: "#fafaff",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default SpecializationList;
