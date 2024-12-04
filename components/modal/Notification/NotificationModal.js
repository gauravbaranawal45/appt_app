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
import NotiCard from "@/components/modal/Notification/NotiCard";
const layoutMarginHorizontal = 10;

const NotificationModal = ({ open, close, getCurrentLocation }) => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={close}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
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
                  Notifications
                </Text>
              </View>
              <View></View>
            </View>
          </View>
          <ScrollView
            style={{ flex: 1, backgroundColor: "#fff", marginTop: 8 }}
          >
            <View
              style={{
                marginHorizontal: layoutMarginHorizontal,
              }}
            >
              <NotiCard
                showSortWithFilter={true}
                title="Fevourite Doctor"
                link="fevouriteDoctor"
                layoutMarginVerticle={20}
                layoutMarginHorizontal={10}
                data={10}
              />
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

export default NotificationModal;
