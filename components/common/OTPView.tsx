import { useApplicationContext } from "@/context/ApplicationContext";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import OTPTextView from "react-native-otp-textinput";

const styles = StyleSheet.create({
  roundedTextInput: {
    borderRadius: 10,

    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,

    // borderTopColor: "#4C4DDC",
    // borderBottomColor: "#4C4DDC",
    // borderLeftColor: "#4C4DDC",
    // borderRightColor: "#4C4DDC",
  },
});

const OTPView = ({ setOtpInput }) => {
  const { defaultColor } = useApplicationContext();

  return (
    <>
      <OTPTextView
        textInputStyle={{
          ...styles.roundedTextInput,
          borderTopColor: defaultColor.defaultBorder,
          borderBottomColor: defaultColor.defaultBorder,
          borderLeftColor: defaultColor.defaultBorder,
          borderRightColor: defaultColor.defaultBorder,
        }}
        handleTextChange={setOtpInput}
        inputCount={6}
        inputCellLength={1}
        keyboardType="numeric"
        autoFocus={true}
      />
    </>
  );
};

export default OTPView;
