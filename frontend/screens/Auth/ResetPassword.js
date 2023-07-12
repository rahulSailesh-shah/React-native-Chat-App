import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Link from "../../components/Link";
import validate from "../../utils/validate";
import { resetPassword } from "../../actions/auth";
import { connect } from "react-redux";
import colors from "../../utils/colors";

const ResetPassword = ({ navigation, resetPassword }) => {
  const [fields, setFields] = useState({ password: "" });
  const [error, setError] = useState({});

  const onFormSubmit = () => {
    const errors = validate(fields);
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      resetPassword(fields);
    }
  };

  const handleTextChange = (value, field) => {
    setFields({ ...fields, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.taglineContainer}>
        <Text style={styles.title}>Reset</Text>
        <Text style={styles.title}>Password</Text>
      </View>
      <View style={styles.content}>
        <InputField
          placeholder="New Password"
          icon="md-lock-closed-outline"
          secureTextEntry={true}
          value={fields.password}
          onChangeText={(text) => handleTextChange(text, "password")}
          errorText={error.password}
        />

        <Button text="Submit" onPress={onFormSubmit} />
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

export default connect(null, { resetPassword })(ResetPassword);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 80,
    backgroundColor: colors.primary,
  },
  taglineContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Avenir-Medium",
    color: colors.white,
    fontSize: 48,
    fontWeight: "bold",
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
