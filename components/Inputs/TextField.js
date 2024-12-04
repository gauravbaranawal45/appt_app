import { Text, View, TextInput } from "react-native";
// import { TextInput } from "react-native-paper";
import React from "react";
import { useApplicationContext } from "@/context/ApplicationContext";

const InputLabel = ({
  //
  error,
  field,
  invalid,
  keyboardType,
  lableText,
  placeholder,
  extraStyle = {},
}) => {
  const { onChange } = field;
  const { defaultColor } = useApplicationContext();
  return (
    <View>
      <TextInput
        {...field}
        onChangeText={onChange}
        keyboardType={keyboardType}
        lableText={lableText}
        label={"sasa"}
        placeholder={placeholder}
        placeholderTextColor={defaultColor.placeHolder}
        style={{
          ...extraStyle,
          color: "black",
          borderWidth: 1,
          borderColor: defaultColor.defaultBorder,
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}
      />
      {/* <TextInput label="Email" {...field} /> */}
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
    </View>
  );
};

export default InputLabel;
