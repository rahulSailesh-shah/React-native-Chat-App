import { createStackNavigator } from "@react-navigation/stack";

import AuthStack from "./AuthStack";
import MessageScreen from "../screens/Chat/MessageScreen";
import ChatStack from "./ChatStack";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="authStack" component={AuthStack} />
      <Stack.Screen name="chatStack" component={ChatStack} />
      <Stack.Screen name="message" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
