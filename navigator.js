import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import StoriesScreen from "./screens/Stories";
import SettingsScreen from "./screens/Settings";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./screens/Auth";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ParentsScreen from "./screens/ParentsScreen";
import Profile from "./screens/Profile";
import PromptFlowStartScreen from "./screens/PromptFlowStartScreen";

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
      <Stack.Screen
        name="Parents"
        component={ParentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PromptFlowStart"
        component={PromptFlowStartScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const AuthStack = () => {
  const [isLoading, setIsLoading] = useState(true); // Initially true

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("RootStack: useEffect");
    const auth = getAuth();
    console.log("RootStack: auth", auth);
    console.log("RootStack: auth.user", auth.currentUser);
    console.log("RootStack: auth.user", auth.currentUser);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        // User is not logged in
        setIsAuthenticated(false);
        setIsLoading(false);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    console.log("Authentication is: ", isAuthenticated);
    return unsubscribe;
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <>
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
        </>
      ) : (
        <Stack.Screen
          name="App"
          component={HomeStackNavigation}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export { HomeStackNavigation, AuthStack };
