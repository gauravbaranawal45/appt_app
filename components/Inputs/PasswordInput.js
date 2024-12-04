import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useApplicationContext } from "@/context/ApplicationContext";

const PasswordInput = ({ value, onChange, invalid, error, placeholder }) => {
  const { defaultColor } = useApplicationContext();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChange}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={defaultColor.placeHolder}
        />
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="#aaa"
          onPress={toggleShowPassword}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbcbcb",
    paddingHorizontal: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
  },
});
export default PasswordInput;
