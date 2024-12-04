import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Dialog, Portal, Button, Divider } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import profileFactory from "@/actions/profileAction";
import { useToast } from "react-native-toast-notifications";
// import SortBottomSheet from "@/components/SortBottomSheet";
import { formattedDate } from "../utils/helper";
// import { reviewSortForSelf } from "@/constants/sortOptions";

const OwnReviews = () => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const navigation = useNavigation();
  const { defaultColor } = useApplicationContext();
  const [reviewList, setReviewList] = useState({ data: [] });
  const [visible, setVisible] = useState(false);
  const [addDetail, setAddDetail] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const hideDialog = () => setVisible(false);

  const getReviewList = async () => {
    const res = await profileFactory.getUserOwnReview();
    setReviewList(res.data);
  };

  useEffect(() => {
    if (isFocused) {
      getReviewList();
    }
  }, [isFocused]);

  const handleEdit = (id, docId) => {
    navigation.navigate("writeReview", {
      id: docId,
      review_id: id,
    });
  };

  const deleteConfirm = (id) => {
    setAddDetail(id);
    setVisible(true);
  };

  const handlerDelete = async () => {
    setIsClicked(true);
    const res = await profileFactory.deleteOwnReview(addDetail);
    toast.show(res.data.data, {
      type: "success",
      placement: "top",
      duration: 2000,
      animationType: "zoom-in",
    });
    setTimeout(() => {
      getReviewList();
      hideDialog();
      setIsClicked(false);
    }, 500);
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
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Your Reviews</Text>
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
            {reviewList.data.length} stories
          </Text>
          {/* <SortBottomSheet
            title={"All"}
            modalTitle="Sort By"
            // onClickHandler={onClickHandler}
            options={reviewSortForSelf}
          /> */}
        </View>
        {reviewList.data?.map((item, i) => {
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
              <View style={{}}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{}}>
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {formattedDate({ date: item.createdAt })}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor:
                        item.status === "inactive" ? "#fcf2f1" : "#5cb85c",
                      padding: 5,
                      borderRadius: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: item.status === "inactive" ? "#890000" : "#fff",
                        fontSize: 12,
                        // fontWeight: 600,
                      }}
                    >
                      {item.status === "inactive"
                        ? "UNDER MODERATION"
                        : "Published "}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 15, fontWeight: 500 }}>
                    Feedback for{" "}
                    {item.doctorFirstName + " " + item.doctorLastName}
                  </Text>
                </View>
                <Divider style={{ marginVertical: 10 }} />

                <View style={{}}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    {item.recommendation === "yes" ? (
                      <>
                        <AntDesign
                          name="like2"
                          size={18}
                          color={defaultColor.defaultColor}
                        />
                        <Text style={{ fontSize: 14 }}>
                          I recommend the doctor
                        </Text>
                      </>
                    ) : (
                      <>
                        <AntDesign name="dislike2" size={18} color={"red"} />
                        <Text style={{ fontSize: 14, color: "red" }}>
                          I do not recommend the doctor
                        </Text>
                      </>
                    )}
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>
                      I visited for {item.specialization.name}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text style={{ fontSize: 14 }}>{item.desc}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: 10,
                  gap: 5,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleEdit(item._id, item.doctorId)}
                  style={{ padding: 5 }}
                >
                  <AntDesign
                    name="edit"
                    size={22}
                    color={defaultColor.defaultColor}
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
                  style={{ padding: 5 }}
                >
                  <Ionicons
                    name="trash"
                    size={22}
                    color={defaultColor.defaultColor}
                  />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to permanently delete this review?
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

export default OwnReviews;

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
