import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { navigationRef } from "./utils/RootNavigation";

import Alert from "./components/Alert";
import MainStack from "./navigation";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Alert />
        <MainStack />
        <StatusBar style="light" />
      </NavigationContainer>
    </Provider>
  );
}
