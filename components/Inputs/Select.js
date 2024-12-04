import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useApplicationContext } from "@/context/ApplicationContext";

const DropdownComponent = ({
  error,
  field,
  invalid,
  isSearch,
  option,
  placeholder,
  labelText,
}) => {
  const { defaultColor } = useApplicationContext();
  const { value, onChange } = field;
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[styles.label, isFocus && { color: defaultColor.placeHolder }]}
        >
          {labelText}
        </Text>
      );
    }
    return null;
  };

  return (
    <>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={option}
          search={isSearch}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            onChange(item.value);
            setIsFocus(false);
          }}
        />
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
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#cbcbcb",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 10,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
