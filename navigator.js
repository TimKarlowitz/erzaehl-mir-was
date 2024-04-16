import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import StoriesScreen from "./screens/Stories";
import SettingsScreen from "./screens/Settings";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./screens/Auth";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Stories"
        component={StoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="App"
        component={HomeStackNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { HomeStackNavigation, AuthStack };
