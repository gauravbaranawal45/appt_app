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
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
const seeAllColor = "#4C4DDC";

const ModalCompo = ({ open, close }) => {
  const [selectedFilter, setSelectedFilter] = useState([]);

  const applyHandler = () => {};
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={close}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                  marginHorizontal: 10,
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <AntDesign
                    name="close"
                    size={24}
                    color="black"
                    onPress={close}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginLeft: 15,
                    }}
                  >
                    Filters
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginLeft: 15,
                    color: seeAllColor,
                  }}
                >
                  Clear All
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.5,
                }}
              />
              <View
                style={{
                  flexDirection: "row",

                  flex: 1,
                }}
              >
                <View
                  style={{
                    width: "30%",
                    backgroundColor: "#eef0ff",
                  }}
                >
                  <View
                    style={{
                      ...styles.filterTextWrapper,
                      backgroundColor: "#e8e6e6",
                    }}
                  >
                    <Text style={styles.filterText}>Experience</Text>
                  </View>
                  <View style={styles.filterTextWrapper}>
                    <Text style={styles.filterText}>Availability</Text>
                  </View>
                  <View style={styles.filterTextWrapper}>
                    <Text style={styles.filterText}>Fees</Text>
                  </View>
                  <View style={styles.filterTextWrapper}>
                    <Text style={styles.filterText}>Area of Expertise</Text>
                  </View>
                  <View style={styles.filterTextWrapper}>
                    <Text style={styles.filterText}>Gender</Text>
                  </View>
                  <View style={styles.filterTextWrapper}>
                    <Text style={styles.filterText}>Language</Text>
                  </View>
                </View>
                {/* <View
                  style={{
                    backgroundColor: "gray",
                    width: 0.5,
                  }}
                /> */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        marginHorizontal: 10,
                        marginTop: 10,
                        marginBottom: 15,
                      }}
                    >
                      <Text style={{ fontSize: 20, fontWeight: 600 }}>
                        Experience
                      </Text>
                    </View>
                    <FlatList
                      numColumns={3}
                      data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            marginBottom: 10,
                            flex: 1,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              borderWidth: 0.5,
                              borderColor: "#4C4DDC",
                              paddingVertical: 10,
                              borderRadius: 5,
                              marginHorizontal: 10,
                              alignItems: "center",
                            }}
                          >
                            <Text style={{ fontSize: 14 }}>0-5</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      showsHorizontalScrollIndicator={true}
                      style={
                        {
                          // marginTop: 10,
                        }
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* footer part */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              padding: 10,
              alignItems: "center",
              borderTopWidth: 1,
              borderColor: "#c6cdff",
              // flex: 1,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: "#4C4DDC",
                borderRadius: 10,
                alignItems: "center",
                marginLeft: 30,
              }}
              onPress={close}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  // textAlign: "center",
                  color: "black",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor: "#4C4DDC",
                borderRadius: 10,
                alignItems: "center",
                marginLeft: 30,
              }}
              onPress={applyHandler}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  // textAlign: "center",
                  color: "#fff",
                }}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ModalCompo;
