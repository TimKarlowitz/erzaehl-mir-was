import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigation from "./navigator";


export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigation />
    </NavigationContainer>
  );
}
