import { View, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AppointmentCard from "@/components/home/appointmentCard";
import HeadingTitle from "@/components/common/headingTitle";
import Header from "@/components/header1";
import { useApplicationContext } from "@/context/ApplicationContext";
import { appointments } from "@/constants/sortOptions";
import appointmentFactory from "../../actions/appointmentAction";
import { RefreshControl } from "react-native";

const layoutMarginVerticle = 20;
const layoutMarginHorizontal = 10;

const Appointments = () => {
  const { defaultColor, apptdata, setApptdata } = useApplicationContext();
  const [limit, setLimit] = useState(10);
  const [sortValue, setSortValue] = useState({ name: "All" });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAppointments({ apptType: sortValue.value });
    setRefreshing(false);
  }, [sortValue]);

  const onClickHandler = (item) => {
    fetchAppointments({ apptType: item.value });
    setSortValue(item);
  };

  const fetchAppointments = async ({ apptType }) => {
    try {
      const res = await appointmentFactory.getAppointments({
        limit: limit,
        apptType,
      });
      setApptdata(res.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchAppointments({ apptType: "all" });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.defaultColor,
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <Header />
      <View
        style={{
          backgroundColor: defaultColor.background,
          paddingHorizontal: 10,
        }}
      >
        <HeadingTitle
          options={appointments}
          title={`All Appointments (${apptdata.total})`}
          onClickHandler={onClickHandler}
          showSort={true}
          sortValue={sortValue}
        />
      </View>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            marginHorizontal: layoutMarginHorizontal,
          }}
        >
          <AppointmentCard
            title="Appointments"
            link="appointments"
            layoutMarginVerticle={layoutMarginVerticle}
            layoutMarginHorizontal={layoutMarginHorizontal}
            data={apptdata.data}
            showSortWithFilter={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appointments;
