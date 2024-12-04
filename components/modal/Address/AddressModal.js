import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Platform,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Buttons from "@/components/common/Button";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@/components/Inputs/TextField";
import { addressSchema } from "../../../schema/addressSchema";
import profileFactory from "@/actions/profileAction";
import Select from "../../Inputs/Select";
import { useToast } from "react-native-toast-notifications";
const layoutMarginHorizontal = 10;

const defaultValues = {
  fullName: "",
  phoneNumber: "",
  pinCode: "",
  state: "",
  city: "",
  house_street: "",
  colony_area: "",
};

const AddressModal = ({
  open,
  close,
  addDetail,
  setAddressList,
  setAddDetail,
  getCurrentLocation,
}) => {
  const toast = useToast();
  const { defaultColor } = useApplicationContext();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: defaultValues,
  });

  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  const getStateList = async () => {
    const stateRes = await profileFactory.getState();
    setStateList(stateRes.data.data);
    const cityRes = await profileFactory.getCity();
    setCityList(cityRes.data.data);
  };

  useEffect(() => {
    if (addDetail) {
      Object.keys(defaultValues).forEach((item) => {
        setValue(item, addDetail[item]);
      });
    }
    getStateList();
  }, [addDetail]);

  const onFormSubmit = async (data) => {
    try {
      let res;
      if (addDetail) {
        res = await profileFactory.updateAddress(data, addDetail._id);
      } else {
        res = await profileFactory.saveAddress(data);
      }
      const addressRes = await profileFactory.getAddress();
      setAddressList(addressRes.data.data);
      setAddDetail(null);
      reset();
      toast.show(res.data.data, {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
      setTimeout(() => {
        close();
      }, 500);
    } catch (e) {
      console.log("eeeeeeee", e);
      setApiError({ error: true, ...e.response?.data });
    }
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
                  Add new address
                </Text>
              </View>
              <View></View>
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={{ backgroundColor: "#fff", marginTop: 20 }}>
                <View
                  style={{
                    marginHorizontal: 10,
                  }}
                >
                  <View style={{ marginTop: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field, fieldState: { invalid, error } }) => {
                        return (
                          <TextField
                            field={field}
                            invalid={invalid}
                            error={error}
                            placeholder="Full Name"
                            keyboardType="default"
                            extraStyle={{ backgroundColor: "#fff" }}
                          />
                        );
                      }}
                      name="fullName"
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field, fieldState: { invalid, error } }) => {
                        return (
                          <TextField
                            field={{ ...field, maxLength: 10 }}
                            invalid={invalid}
                            error={error}
                            placeholder="Phone Number"
                            keyboardType="numeric"
                            extraStyle={{ backgroundColor: "#fff" }}
                          />
                        );
                      }}
                      name="phoneNumber"
                    />
                  </View>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <View style={{ marginTop: 10, flex: 1 }}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field, fieldState: { invalid, error } }) => {
                          return (
                            <TextField
                              field={{ ...field, maxLength: 6 }}
                              invalid={invalid}
                              error={error}
                              placeholder="Pin code"
                              keyboardType="numeric"
                              extraStyle={{ backgroundColor: "#fff" }}
                            />
                          );
                        }}
                        name="pinCode"
                      />
                    </View>
                    <View style={{ marginTop: 10, flex: 1 }}>
                      <Buttons
                        style={{
                          borderRadius: 5,
                          backgroundColor: "#eef0ff",
                          paddingVertical: 15,
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

                  <View style={{ marginTop: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field, fieldState: { invalid, error } }) => {
                        return (
                          <Select
                            field={field}
                            invalid={invalid}
                            error={error}
                            placeholder="State"
                            labelText="State"
                            option={stateList}
                            isSearch={false}
                          />
                        );
                      }}
                      name="state"
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field, fieldState: { invalid, error } }) => {
                        return (
                          <Select
                            field={field}
                            invalid={invalid}
                            error={error}
                            placeholder="City"
                            labelText="City"
                            option={cityList}
                            isSearch={true}
                          />
                        );
                      }}
                      name="city"
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field, fieldState: { invalid, error } }) => {
                        return (
                          <TextField
                            field={field}
                            invalid={invalid}
                            error={error}
                            placeholder="House No./ Street Name/ Area"
                            keyboardType="default"
                            extraStyle={{ backgroundColor: "#fff" }}
                          />
                        );
                      }}
                      name="house_street"
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field, fieldState: { invalid, error } }) => {
                        return (
                          <TextField
                            field={field}
                            invalid={invalid}
                            error={error}
                            placeholder="Colony / Area / Locality"
                            keyboardType="default"
                            extraStyle={{ backgroundColor: "#fff" }}
                          />
                        );
                      }}
                      name="colony_area"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    marginTop: 50,
                    paddingHorizontal: 10,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      paddingVertical: 15,
                      backgroundColor: defaultColor.defaultColor,
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                    onPress={handleSubmit(onFormSubmit)}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      Save Address
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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

export default AddressModal;
