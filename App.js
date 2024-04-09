import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigation from "./navigator";
import { PaperProvider } from 'react-native-paper';


export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <HomeStackNavigation />
    </NavigationContainer>
    </PaperProvider>
  );
}
