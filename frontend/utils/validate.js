export default validate = (fields) => {
  let errors = {};

  if (fields.name === "") {
    errors.name = "Name is required";
  }

  const isEmailValid = String(fields.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (fields.email === "") {
    errors.email = "Email is required";
  } else if (fields.email && !isEmailValid) {
    errors.email = "Enter a valid email";
  }

  if (fields.password === "") {
    errors.password = "Password is required";
  } else if (fields.password && fields.password.length < 6) {
    errors.password = "Password must be atleast 6 characters";
  }

  if (fields.otp === "") {
    errors.otp = "OTP is required";
  } else if (fields.otp && (fields.otp.length !== 4 || !parseInt(fields.otp))) {
    errors.otp = "OTP must be numeric and 4 digits long.";
  }
  return errors;
};
