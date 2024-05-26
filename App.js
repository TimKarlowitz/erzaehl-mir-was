import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./navigator";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import { createTables } from "./utils/database";
import * as Font from "expo-font";
import { useState } from "react";

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFontsAndSetup() {
      try {
        await Font.loadAsync({
          IrishGrover: require("./assets/fonts/IrishGrover-Regular.ttf"),
        });
        setFontLoaded(true);
        console.log("Fonts loaded");
      } catch (error) {
        console.error("Error loading fonts or setting up:", error);
      }
    }
    loadFontsAndSetup();
    createTables();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
