import { StyleSheet, TextInput, View } from "react-native";
import { useApplicationContext } from "@/context/ApplicationContext";
import React from "react";

const Input = ({
  //
  error,
  field,
  invalid,
  keyboardType,
  lableText,
  placeholder,
}) => {
  // console.log("sdsadfdsfsd", field);
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
        style={styles.inputFullWidth}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputFullWidth: {
    flex: 1,
    borderColor: "#4C4DDC",
    borderBottomWidth: 2,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
});
