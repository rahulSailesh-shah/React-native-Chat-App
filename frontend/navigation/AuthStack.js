import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import VerifyOtp from "../screens/Auth/VerifyOtp";
import ResetPassword from "../screens/Auth/ResetPassword";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        name="signup"
        component={Signup}
      />
      <Stack.Screen
        name="login"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        component={Login}
      />
      <Stack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        name="forgotpassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        name="verifyotp"
        component={VerifyOtp}
      />
      <Stack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        name="resetpassword"
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
