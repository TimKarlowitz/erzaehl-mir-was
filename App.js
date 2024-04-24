import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./navigator";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import { createTables } from "./utils/database";

export default function App() {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
