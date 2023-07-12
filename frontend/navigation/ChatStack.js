import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import ChatScreen from "../screens/Chat/ChatScreen";
import ContactsScreen from "../screens/Chat/ContactsScreen";
import AccountScreen from "../screens/Chat/AccountScreen";
import colors from "../colors";

const Tab = createBottomTabNavigator();

const ChatStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 80,
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          paddingTop: 24,
          borderRadius: 32,
        },
      }}
    >
      <Tab.Screen
        name="chats"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="message1"
              size={28}
              color={focused ? colors.secondary : colors.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="contacts"
        component={ContactsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="contacts"
              size={28}
              color={focused ? colors.secondary : colors.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={28}
              color={focused ? colors.secondary : colors.gray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ChatStack;
