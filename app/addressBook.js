import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
// import Input from "@/components/common/Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useApplicationContext } from "@/context/ApplicationContext";
import Select from "@/components/common/Select";
import { useRouter } from "expo-router";
import { AntDesign, Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { genderData } from "@//constants/staticData";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AddressModal from "../components/modal/Address/AddressModal";
import profileFactory from "@/actions/profileAction";

const AddressBook = () => {
  const navigation = useNavigation();
  const { defaultColor, colorScheme } = useApplicationContext();
  const [addressList, setAddressList] = useState([]);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addDetail, setAddDetail] = useState(null);

  const hideDialog = () => setVisible(false);

  const getAddressList = async () => {
    const addressRes = await profileFactory.getAddress();
    setAddressList(addressRes.data.data);
  };

  useEffect(() => {
    getAddressList();
  }, []);

  const close = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    let newState = [...addressList];
    newState = newState.filter((item) => item._id === id)[0];
    setAddDetail(newState);
    setOpen(true);
  };

  const deleteConfirm = (id) => {
    let newState = [...addressList];
    newState = newState.filter((item) => item._id === id)[0];
    setAddDetail(newState);
    setVisible(true);
  };

  const handlerDelete = async () => {
    await profileFactory.deleteAddress(addDetail._id);
    const addressRes = await profileFactory.getAddress();
    setAddressList(addressRes.data.data);
    setAddDetail(null);
    hideDialog();
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar barStyle={"dark-content"} animated={true} />
      <View
        style={{
          ...styles.headerWrapper,
          backgroundColor: defaultColor.background,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={28}
            color="#63635E"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={{ marginRight: 30 }}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Address Book</Text>
        </View>
        <View></View>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginTop: 8 }}>
        {open && (
          <AddressModal
            open={open}
            close={close}
            addDetail={addDetail}
            setAddressList={setAddressList}
            setAddDetail={setAddDetail}
          />
        )}
        {addressList?.map((item, i) => {
          return (
            <Card
              key={i}
              style={{
                marginVertical: 10,
                marginHorizontal: 15,
                padding: 15,
                backgroundColor: "#fff",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{}}>
                  <FontAwesome5
                    name="map-marker-alt"
                    size={28}
                    color={defaultColor.defaultColor}
                  />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ fontSize: 14, fontWeight: 600 }}>
                    {item.fullName}
                  </Text>

                  <Text style={{ fontSize: 12, fontWeight: 500, marginTop: 2 }}>
                    {item.house_street}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 500, marginTop: 2 }}>
                    {item.colony_area}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 500, marginTop: 2 }}>
                    {item.city}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 500, marginTop: 2 }}>
                    {item.state} - {item.pinCode}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 500, marginTop: 3 }}>
                    Mobile: +91 {item.phoneNumber}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleEdit(item._id)}
                >
                  <AntDesign
                    name="edit"
                    size={22}
                    color={defaultColor.defaultColor}
                    style={{
                      marginRight: 10,
                      paddingHorizontal: 5,
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: 1,
                    backgroundColor: defaultColor.defaultBorder,
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => deleteConfirm(item._id)}
                >
                  <Ionicons
                    name="trash"
                    size={22}
                    color={defaultColor.defaultColor}
                    style={{
                      paddingHorizontal: 5,
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: " #fff",
          //   paddingVertical: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#fff",
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 2,
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              flex: 1,
              paddingVertical: 10,
              backgroundColor: "#4C4DDC",
              borderRadius: 10,
              alignItems: "center",
              //   marginLeft: 20,
            }}
            onPress={() => setOpen(true)}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Add New Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure, You want cancel your address
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handlerDelete}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default AddressBook;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
  },
});
