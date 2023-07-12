import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import Link from "../../components/Link";
import { login } from "../../actions/auth";
import validate from "../../utils/validate";
import colors from "../../utils/colors";

const Login = ({ navigation, login, isAuthenticated }) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  // useEffect(() => {
  //   console.log("Login useEffect ran");
  //   if (isAuthenticated) navigation.navigate("home-stack");
  // }, []);

  const onFormSubmit = () => {
    const errors = validate(fields);
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      login(fields);
      setFields({});
    }
  };

  const handleTextChange = (value, field) => {
    setFields({ ...fields, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Header text="Login" />
      <View style={styles.content}>
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
        <Link
          linkText="Forgot Password?"
          textAlign="right"
          onPress={() => navigation.navigate("forgotpassword")}
        />
        <Button text="Login" onPress={onFormSubmit} />
        <Link
          linkText="Register"
          infoText="New here?"
          textAlign="center"
          onPress={() => navigation.navigate("signup")}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
    paddingTop: 40,
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
