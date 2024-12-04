import { Text, View, TextInput } from "react-native";
import React from "react";
import { useApplicationContext } from "@/context/ApplicationContext";

const InputLabel = (props) => {
  const { defaultColor } = useApplicationContext();
  return (
    <View>
      {/* <Text
        style={{
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {props.lableText} :
      </Text> */}
      <TextInput
        {...props}
        placeholderTextColor={defaultColor.placeHolder}
        style={{
          color: "black",
          borderWidth: 1,
          borderColor: defaultColor.defaultBorder,
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 10,
          // marginTop: 10,
        }}
      />
    </View>
  );
};

export default InputLabel;
