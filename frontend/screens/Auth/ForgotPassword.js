import React, { useContext, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Link from "../../components/Link";
import { forgotPassword } from "../../actions/auth";
import validate from "../../utils/validate";
import { connect } from "react-redux";
import colors from "../../utils/colors";

const Forgotpassword = ({ navigation, forgotPassword }) => {
  const [fields, setFields] = useState({ email: "" });
  const [error, setError] = useState({});

  const onFormSubmit = () => {
    const errors = validate(fields);
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      forgotPassword(fields);
    }
  };

  const handleTextChange = (value, field) => {
    setFields({ ...fields, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.taglineContainer}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your registered email to receive verificaion code.{" "}
        </Text>
      </View>

      <View style={styles.content}>
        <InputField
          placeholder="Email"
          icon="ios-at-outline"
          secureTextEntry={false}
          value={fields.email}
          onChangeText={(text) => handleTextChange(text, "email")}
          errorText={error.email}
        />

        <Button text="Get OTP" onPress={onFormSubmit} />
        <Link
          linkText="Login"
          infoText="Go back to"
          textAlign="center"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </View>
  );
};

export default connect(null, { forgotPassword })(Forgotpassword);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 40,
    backgroundColor: colors.primary,
  },
  taglineContainer: {
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  title: {
    fontFamily: "Avenir-Medium",
    color: colors.primary,
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 20,
    color: colors.white,
  },

  subtitle: {
    marginVertical: 20,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    color: colors.muted,
  },
  content: {
    paddingTop: 20,
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    overflow: "hidden",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 20,
  },
});
