import {
  View,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import profileFactory from "@/actions/profileAction";
import { useRoute } from "@react-navigation/native";
import RenderHtml from "react-native-render-html";
import { useApplicationContext } from "@/context/ApplicationContext";

const RenderStaticPage = () => {
  const { width } = useWindowDimensions();
  const { defaultColor, profile, setProfile } = useApplicationContext();
  const { params } = useRoute();
  const [data, setData] = useState({});

  const getData = async () => {
    const res = await profileFactory.getStaticPage(params.name);
    setData(res.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: defaultColor.background,
      }}
    >
      <StatusBar barStyle={"dark-content"} animated={true} />

      <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginTop: 8 }}>
        <View style={{ paddingHorizontal: 15 }}>
          {data?.content && (
            <RenderHtml
              baseStyle={{ color: defaultColor.placeHolder }}
              contentWidth={width}
              source={{ html: data?.content }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RenderStaticPage;
