import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";

const InputField = ({
  placeholder,
  icon,
  secureTextEntry,
  value,
  onChangeText,
  errorText,
}) => {
  const [border, setBorder] = useState(colors.muted);
  return (
    <View>
      <View style={[styles.inputContainer, { borderColor: border }]}>
        <Ionicons name={icon} size={24} color={colors.dark} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => setBorder(colors.gray)}
          onBlur={() => setBorder(colors.muted)}
        />
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 200,
    backgroundColor: colors.white,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    marginLeft: 15,
    color: colors.primary,
    paddingLeft: 5,
    fontSize: 18,
    fontFamily: "Avenir-Medium",
    borderColor: colors.muted,
  },
  error: {
    color: colors.danger,
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    marginLeft: 40,
    marginTop: 3,
  },
});
