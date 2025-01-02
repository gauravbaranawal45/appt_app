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
} from "react-native";
import React, { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import homeFactory from "../../actions/homeAction";
import { useApplicationContext } from "@/context/ApplicationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Recentsearch from "@/components/globalsearch/recentsearch";
import Searchcard from "@/components/globalsearch/searchcard";
import { useRouter } from "expo-router";

const layoutMarginHorizontal = 10;

const GlobalSearch = () => {
  const inputRef = React.useRef();
  setTimeout(() => inputRef.current.focus(), 100);
  const { defaultColor } = useApplicationContext();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const router = useRouter();
  const [searchedData, setSearchedData] = useState([]);
  const [recentData, setRecentData] = useState([]);

  const debounced = useDebouncedCallback(async (searchQuery) => {
    if (searchQuery) {
      let result = await homeFactory.doctorSearch({ query: searchQuery });
      if (result.status === 200) {
        setSearchedData(result.data.data);
      } else {
        console.error(result);
      }
    } else {
      setSearchedData([]);
    }
  }, 1000);

  const handleChange = async (val) => {
    debounced(val);
  };

  useFocusEffect(
    useCallback(() => {
      // console.log("Screen is focused!");
      getStoredSchedule();
      return () => {
        // console.log("Screen is blurred!");
      };
    }, [])
  );

  const getStoredSchedule = async () => {
    const storedData = await AsyncStorage.getItem("__recentSearch");
    setRecentData(storedData ? JSON.parse(storedData) : []);
  };

  const handleClick = async (item) => {
    let newState = [...recentData];
    newState = newState.filter((newitem) => item._id !== newitem._id);
    newState.unshift(item);
    await AsyncStorage.setItem("__recentSearch", JSON.stringify(newState));
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

  const clearRecentSearch = async () => {
    await AsyncStorage.removeItem("__recentSearch");
    setRecentData([]);
  };

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
          {recentData.length > 0 && (
            <>
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
                <TouchableOpacity onPress={clearRecentSearch}>
                  <Text style={{ fontSize: 16, color: defaultColor.text }}>
                    Clear
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 20 }}>
                <FlatList
                  horizontal={true}
                  data={recentData}
                  renderItem={({ item }) => (
                    <Recentsearch
                      item={item}
                      width={30}
                      height={30}
                      wrapperView={80}
                      handleClick={handleClick}
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
            </>
          )}

          {searchedData.map((item, i) => {
            return <Searchcard item={item} handleClick={handleClick} key={i} />;
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
