import Colors from "./Colors";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  heading: {
    fontSize: 40,
    color: Colors.primary,
    fontFamily: "IrishGrover",
  },
  paragraph: {
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: "IrishGrover",
  },
  buttonText: {
    fontSize: 20,
    color: Colors.primary,
    fontFamily: "IrishGrover",
    marginRight: 10,
  },

  link: {
    fontSize: 16,
    color: Colors.link,
    textDecorationLine: "underline",
  },
});

export default globalStyles;
