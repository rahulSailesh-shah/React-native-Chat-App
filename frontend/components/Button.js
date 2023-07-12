import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 60,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    fontFamily: "Avenir-Medium",
  },
});
