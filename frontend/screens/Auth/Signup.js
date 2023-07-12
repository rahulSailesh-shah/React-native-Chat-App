import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import Link from "../../components/Link";
import { register } from "../../actions/auth";
import validate from "../../utils/validate";
import { connect } from "react-redux";
import colors from "../../utils/colors";

const Signup = ({ navigation, register, isAuthenticated }) => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  // useEffect(() => {
  //   if (isAuthenticated) navigation.navigate("home-stack");
  //   // const listener = navigation.addListener("didFocus", () => {
  //   //   if (isAuthenticated) navigation.navigate("home-stack");
  //   // });
  // }, []);

  const onFormSubmit = () => {
    const errors = validate(fields);
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      register(fields);
    }
  };

  const handleTextChange = (value, field) => {
    setFields({ ...fields, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Header text="Sign up" />
      <View style={styles.content}>
        <InputField
          placeholder="Name"
          icon="person-outline"
          secureTextEntry={false}
          value={fields.name}
          onChangeText={(text) => handleTextChange(text, "name")}
          errorText={error.name}
        />
        <InputField
          placeholder="Email"
          icon="ios-at-outline"
          secureTextEntry={false}
          value={fields.email}
          onChangeText={(text) => handleTextChange(text, "email")}
          errorText={error.email}
        />
        <InputField
          placeholder="Password"
          icon="md-lock-closed-outline"
          secureTextEntry={true}
          value={fields.password}
          onChangeText={(text) => handleTextChange(text, "password")}
          errorText={error.password}
        />

        <Button text="Signup" onPress={onFormSubmit} />
        <Link
          linkText="Login"
          infoText="Joined us before?"
          textAlign="center"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Signup);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 40,
    backgroundColor: colors.primary,
  },
  content: {
    paddingTop: 20,
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    overflow: "hidden",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 30,
  },
});
