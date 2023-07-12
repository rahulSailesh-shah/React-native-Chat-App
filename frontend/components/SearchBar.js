import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";

const SearchBar = ({ icon, placeholder, term, setTerm }) => {
  return (
    <View style={styles.container}>
      {icon && (
        <AntDesign
          style={styles.icon}
          name={icon}
          size={20}
          color={colors.muted}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        value={term}
        onChangeText={(text) => setTerm(text)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 13,
    borderRadius: 100,
    paddingHorizontal: 20,
    backgroundColor: colors.primaryLight,
    marginHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
    fontFamily: "Avenir-Medium",
  },
});
