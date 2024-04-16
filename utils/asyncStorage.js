import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("saved");
  } catch (error) {
    console.log("Error storing value: ", error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log("retrieved");
    return value;
  } catch (error) {
    console.log("Error retrieving value: ", error);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("removed");
  } catch (error) {
    console.log("Error deleting value: ", error);
  }
};
