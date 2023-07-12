import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../colors";
import { AntDesign } from "@expo/vector-icons";

const ProfileBanner = ({ navigation, usr }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.icon}>
          <AntDesign name="left" size={22} color={colors.primary} />
        </View>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.name}>{usr.name}</Text>
        <Text style={styles.email}>{usr.email}</Text>
      </View>
      <Image source={{ uri: "https://picsum.photos/200" }} style={styles.img} />
    </View>
  );
};

export default ProfileBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    backgroundColor: colors.whiteMuted,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 100,
    overflow: "hidden",
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  textContainer: {
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    color: colors.white,
    fontWeight: "700",
    marginBottom: 2,
    fontFamily: "Avenir-Medium",
  },
  email: {
    color: colors.whiteMuted,
    fontFamily: "Avenir-Medium",
  },
});
