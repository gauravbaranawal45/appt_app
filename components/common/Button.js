import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useApplicationContext } from "@/context/ApplicationContext";

const Button = ({ title, iconLeft, iconRight, onPress, style, textStyle }) => {
  const { defaultColor } = useApplicationContext();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        ...style,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {iconLeft ? iconLeft : null}
      <Text
        style={{
          ...textStyle,
          // fontSize: 14,
          // fontWeight: 600,
          // textAlign: "center",
          // color: defaultColor.defaultColor,
          // fontFamily: "Al Nile",
        }}
      >
        {title}
      </Text>
      {iconRight ? iconRight : null}
    </TouchableOpacity>
  );
};

export default Button;
