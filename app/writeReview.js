import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useApplicationContext } from "@/context/ApplicationContext";
import homeFactory from "@/actions/homeAction";
import profileFactory from "@/actions/profileAction";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@/components/Inputs/TextField";
import Select from "../components/Inputs/Select";
import Checkbox from "expo-checkbox";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

const schema = yup.object().shape({
  recommendation: yup.string().required("Please select recommendation"),
  specialization: yup.string().required("Please choose specialization"),
  mostHappyWith: yup.string().required("Please select an option"),
  desc: yup.string().required("Please enter your experience"),
});

const defaultValues = {
  recommendation: "",
  specialization: "",
  mostHappyWith: "",
  desc: "",
  isAnonymous: false,
};

const data = [
  { id: 1, txt: "Doctor friendliness", isChecked: false },
  { id: 2, txt: "Explanation of the health issue", isChecked: false },
  { id: 3, txt: "Treatment satisfaction", isChecked: false },
  { id: 4, txt: "Value for money", isChecked: false },
  { id: 5, txt: "Wait time", isChecked: false },
];

const WriteReview = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const toast = useToast();

  const { defaultColor } = useApplicationContext();

  const [details, setDetails] = useState({});
  const [products, setProducts] = useState(data);
  const [recommendValue, setRecommendValue] = useState("");

  const [apiError, setApiError] = useState({
    error: false,
    message: "",
  });

  const fetchHome = async () => {
    try {
      const res = await homeFactory.doctorSpecialization(params.id);
      setDetails(res.data.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchDetail = async () => {
    try {
      if (params.review_id) {
        const res = await homeFactory.getReviewDetails(params.review_id);
        setValue("recommendation", res.data.data.recommendation);
        setValue("specialization", res.data.data.specialization.id);
        setValue("mostHappyWith", "mostHappyWith");
        setValue("desc", res.data.data.desc);
        setValue("isAnonymous", res.data.data.isAnonymous);

        const happywith = products.map((item) => {
          if (res.data.data.mostHappyWith.includes(item.txt)) {
            return { ...item, isChecked: true };
          } else {
            return item;
          }
        });
        setProducts(happywith);
        setRecommendValue(res.data.data.recommendation);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };

  const renderFlatList = (renderData) => {
    return (
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { invalid, error } }) => {
          return (
            <>
              <FlatList
                data={renderData}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 20 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        gap: 20,
                      }}
                    >
                      <Checkbox
                        value={item.isChecked}
                        onValueChange={(e) => {
                          handleChange(item.id);
                          field.onChange(item.id);
                        }}
                      />
                      <Text>{item.txt}</Text>
                    </View>
                  </View>
                )}
              />
              {invalid && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 13,
                    marginTop: 8,
                  }}
                >
                  {error.message}
                </Text>
              )}
            </>
          );
        }}
        name="mostHappyWith"
      />
    );
  };

  const onFormSubmit = async (data) => {
    try {
      const sp = details?.specialization?.filter(
        (item) => item._id === data.specialization
      )[0];
      const newstate = { ...data };
      let selectHappyWith = products.filter((item) => item.isChecked);
      selectHappyWith = selectHappyWith.map((item) => item.txt);
      newstate.mostHappyWith = selectHappyWith;
      newstate.specialization = { name: sp.name, id: sp._id };
      newstate.doctorId = params.id;
      console.log("dataaaaa", newstate);
      console.log("params.review_id", params.review_id);
      // return;
      let res;
      if (params.review_id) {
        res = await homeFactory.editPatientReview(newstate, params.review_id);
      } else {
        res = await homeFactory.savePatientReview(newstate);
      }
      toast.show(res.data.data, {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "zoom-in",
      });
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (e) {
      console.log("eeeeeeee", e);
      setApiError({ error: true, ...e.response?.data });
    }
  };

  const renderData = () => {
    return (
      details?.specialization?.map((item) => {
        return { label: item.name, value: item._id };
      }) ?? []
    );
  };

  const recommendationHandler = (val) => {
    setRecommendValue(val);
    setValue("recommendation", val);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle={"dark-content"} animated={true} />
      <ScrollView>
        <View style={{ backgroundColor: "#fff" }}>
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 600 }}>
                How was your appointment experience with Dr. Reshma Phulwar?
              </Text>
              <Text style={{ marginTop: 10 }}>
                How was your appointment experience with Dr. Reshma Phulwar?
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", marginTop: 40, gap: 5 }}>
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Q1.
                </Text>
                <Text
                  style={{
                    color: defaultColor.text,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Would you like to recommend the doctor?
                </Text>
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  *
                </Text>
              </View>

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { invalid, error } }) => {
                  return (
                    <>
                      <View
                        ref={field.ref}
                        style={{ flexDirection: "row", gap: 10, marginTop: 15 }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.5}
                          style={[
                            styles.recommendatonBtn,
                            {
                              borderColor: defaultColor.cardBorderColor,
                              backgroundColor:
                                recommendValue === "yes" &&
                                defaultColor.defaultColor,
                            },
                          ]}
                          onPress={() => {
                            recommendationHandler("yes");
                            field.onChange("yes");
                          }}
                        >
                          <AntDesign
                            name="like2"
                            size={18}
                            color={
                              recommendValue === "yes" &&
                              defaultColor.background
                            }
                          />
                          <Text
                            style={{
                              color:
                                recommendValue === "yes" &&
                                defaultColor.background,
                            }}
                          >
                            Yes
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          style={[
                            styles.recommendatonBtn,
                            {
                              borderColor: defaultColor.cardBorderColor,
                              backgroundColor:
                                recommendValue === "no" &&
                                defaultColor.defaultColor,
                            },
                          ]}
                          onPress={() => {
                            recommendationHandler("no");
                            field.onChange("no");
                          }}
                        >
                          <AntDesign
                            name="dislike2"
                            size={18}
                            color={
                              recommendValue === "no" && defaultColor.background
                            }
                          />
                          <Text
                            style={{
                              color:
                                recommendValue === "no" &&
                                defaultColor.background,
                            }}
                          >
                            No
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {invalid && (
                        <Text
                          style={{
                            color: "red",
                            fontSize: 13,
                            marginTop: 8,
                          }}
                        >
                          {error.message}
                        </Text>
                      )}
                    </>
                  );
                }}
                name="recommendation"
              />
            </View>
            <View>
              <View style={{ flexDirection: "row", marginTop: 40, gap: 5 }}>
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Q2.
                </Text>
                <Text
                  style={{
                    color: defaultColor.text,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  For which health problem/treatment did you visit?
                </Text>
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  *
                </Text>
              </View>
              {renderData().length > 0 && (
                <View style={{ marginTop: 15 }}>
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
                          placeholder="e.g. Dentist,Cardiology"
                          option={renderData()}
                          isSearch={false}
                        />
                      );
                    }}
                    name="specialization"
                  />
                </View>
              )}
            </View>
            <View>
              <View style={{ flexDirection: "row", marginTop: 40, gap: 5 }}>
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Q3.
                </Text>
                <Text
                  style={{
                    color: defaultColor.text,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  What were you most happy with?
                </Text>
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  *
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: 15 }}>
                {renderFlatList(products)}
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", marginTop: 40, gap: 5 }}>
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Q4.
                </Text>
                <Text
                  style={{
                    color: defaultColor.text,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Tell us about your experience with the doctor.
                </Text>
                <Text
                  style={{
                    color: defaultColor.lightGreen,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  *
                </Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState: { invalid, error } }) => {
                    return (
                      <TextField
                        field={{ ...field, multiline: true }}
                        invalid={invalid}
                        error={error}
                        placeholder="e.g. Dentist,Cardiology"
                        extraStyle={{ minHeight: 150 }}
                      />
                    );
                  }}
                  name="desc"
                />
              </View>
            </View>

            <View style={{ marginTop: 25 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { invalid, error } }) => {
                  return (
                    <>
                      <FlatList
                        data={[
                          {
                            id: 1,
                            txt: "Keep this story publicly anonymous",
                            isChecked: false,
                          },
                        ]}
                        renderItem={({ item }) => (
                          <View style={{ marginBottom: 20 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                flex: 1,
                                gap: 20,
                              }}
                            >
                              <Checkbox
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e.target.checked);
                                }}
                              />
                              <Text>{item.txt}</Text>
                            </View>
                          </View>
                        )}
                      />
                      {invalid && (
                        <Text
                          style={{
                            color: "red",
                            fontSize: 13,
                            marginTop: 8,
                          }}
                        >
                          {error.message}
                        </Text>
                      )}
                    </>
                  );
                }}
                name="isAnonymous"
              />
            </View>
            {apiError.error && (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  marginBottom: 20,
                }}
              >
                {apiError.message}
              </Text>
            )}
            <View style={{ marginBottom: 50 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  backgroundColor: defaultColor.defaultColor,
                  borderRadius: 10,
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
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  recommendatonBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
    borderWidth: 1,
    gap: 10,
  },
  checkbox: {
    marginVertical: 8,
  },
});

export default WriteReview;
