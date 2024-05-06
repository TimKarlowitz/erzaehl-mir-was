import Colors from "./Colors";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.primary,
  },
  paragraph: {
    fontSize: 16,
    color: Colors.secondary,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "bold",
    marginRight: 10,
  },

  link: {
    fontSize: 16,
    color: Colors.link,
    textDecorationLine: "underline",
  },
});

export default globalStyles;
