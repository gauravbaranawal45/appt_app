import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import Buttons from "@/components/common/Button";
import { suggestedCitiesName } from "@/constants/staticData";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
const layoutMarginHorizontal = 10;

const LocationModal = ({ open, close, getCurrentLocation }) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { address, setAddress } = useApplicationContext();
  const [addressList, setAddressList] = useState([]);

  // console.log("addressaddress", address.city);

  const changeHandler = (text) => {
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&type=city&limit=5&format=json&filter=countrycode:in&apiKey=1aa33c1c139b45bb9e74c15ca565275e`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log("resssssssss", res);
        setAddressList(res.results || []);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const selectAddress = (item) => {
    // console.log("itemmmm", item);
    setAddress(item);
    setAddressList([]);
    setTimeout(() => {
      close();
    }, 10);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={close}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <StatusBar barStyle={"dark-content"} animated={true} />
          <View style={{ backgroundColor: "#fff" }}>
            <View style={styles.headerView}>
              <TouchableOpacity onPress={close}>
                <AntDesign
                  name="arrowleft"
                  size={28}
                  color="#63635E"
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <View style={{ marginRight: 30 }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  {address.address_line1}
                </Text>
              </View>
              <View></View>
            </View>
          </View>
          <View style={{ backgroundColor: "#fff", marginTop: 20 }}>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <View style={styles.searchSection}>
                <Ionicons
                  style={styles.searchIcon}
                  name="search"
                  size={24}
                  color="#63635E"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Search Location"
                  placeholderTextColor="#63635E"
                  onChangeText={changeHandler}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={{ marginVertical: 20 }}>
                <Buttons
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#eef0ff",
                    paddingVertical: 12,
                  }}
                  title="Use Current Location"
                  iconLeft={
                    <MaterialIcons
                      name="my-location"
                      size={18}
                      color="#4C4DDC"
                      style={{ marginRight: 8 }}
                    />
                  }
                  onPress={getCurrentLocation}
                />
              </View>
            </View>
          </View>
          <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.cityListWrapper}>
              {addressList?.length === 0 ? (
                <View style={styles.listTitle}>
                  <Text style={{ ...styles.titleText, color: "#4C4DDC" }}>
                    Popular cities
                  </Text>
                </View>
              ) : null}
              <View>
                {addressList?.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.listValue}
                    onPress={() => selectAddress(item)}
                  >
                    <Text style={styles.addresslist}>{item.formatted}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {addressList?.length === 0 ? (
                <View>
                  {suggestedCitiesName.map((item, i) => (
                    <TouchableOpacity key={i} style={styles.listValue}>
                      <Ionicons
                        style={{ marginRight: 15 }}
                        name="search"
                        size={16}
                        color="gray"
                      />
                      <Text style={styles.addresslist}>{item.city}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addresslist: {
    fontSize: 14,
    fontWeight: 500,
    color: "#545151",
  },
  listValue: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    paddingVertical: 10,
  },
  headerView: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "black",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  cityListWrapper: {
    marginHorizontal: layoutMarginHorizontal,
    marginTop: 0,
  },
  listTitle: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e3e3",
    paddingVertical: 5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 600,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  filterTextWrapper: {
    paddingVertical: 15,
    paddingLeft: 10,
    paddingRight: 20,
    borderBottomWidth: 0.5,
    borderColor: "#c6cdff",
  },
  filterText: {
    fontSize: 14,
    fontWeight: 600,
    // color: "gray",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e4e3e3",
  },
  backIcon: {
    paddingRight: 10,
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

export default LocationModal;
