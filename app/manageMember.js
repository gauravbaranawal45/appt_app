import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import appointmentFactory from "../actions/appointmentAction";
import { useToast } from "react-native-toast-notifications";

const ManageMember = () => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();
  const [memberList, setMemberList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [addDetail, setAddDetail] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const hideDialog = () => setVisible(false);

  const getMemberList = async () => {
    const res = await appointmentFactory.getMember();
    setMemberList(res.data.data);
  };

  useEffect(() => {
    getMemberList();
  }, []);

  const handleEdit = (id) => {};

  const deleteConfirm = (id) => {
    setAddDetail(id);
    setVisible(true);
  };

  const handlerDelete = async () => {
    setIsClicked(true);
    const res = await appointmentFactory.deleteMember(addDetail);
    toast.show(res.data.data, {
      type: "success",
      placement: "top",
      duration: 2000,
      animationType: "zoom-in",
    });
    setTimeout(() => {
      getMemberList();
      hideDialog();
      setIsClicked(false);
    }, 500);
  };

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
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Members</Text>
        </View>
        <View></View>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginTop: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: defaultColor.heading,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {memberList.length} members
          </Text>
          {/* <SortBottomSheet
            title={"All"}
            modalTitle="Sort By"
            // onClickHandler={onClickHandler}
            options={reviewSortForSelf}
          /> */}
        </View>
        {memberList?.map((item, i) => {
          return (
            <Card
              key={i}
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                padding: 20,
                backgroundColor: "#fff",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{}}>
                  <Text style={{ fontSize: 15, fontWeight: 600 }}>
                    {item.patientName}
                  </Text>
                  {item.patientEmail && (
                    <Text
                      style={{ fontSize: 13, fontWeight: 500, marginTop: 5 }}
                    >
                      {item.patientEmail}
                    </Text>
                  )}
                  <Text style={{ fontSize: 13, fontWeight: 500, marginTop: 5 }}>
                    {item.mobile}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: defaultColor.text,
                      marginTop: 5,
                    }}
                  >
                    {item.gender} | {item.age}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 5,
                      color: defaultColor.text,
                    }}
                  >
                    {item.address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  {/* <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => handleEdit(item._id)}
                    style={{ padding: 5 }}
                  >
                    <AntDesign
                      name="edit"
                      size={22}
                      color={defaultColor.defaultColor}
                    />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => deleteConfirm(item._id)}
                    style={{ padding: 5 }}
                  >
                    <Ionicons
                      name="trash"
                      size={22}
                      color={defaultColor.defaultColor}
                    />
                  </TouchableOpacity>
                </View>
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
            onPress={() => {
              navigation.navigate("addFamilyMember", {
                source: "manageMember",
              });
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Add New Member
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
            <Button disabled={isClicked} onPress={handlerDelete}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default ManageMember;

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
