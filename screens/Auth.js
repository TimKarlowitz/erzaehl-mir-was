import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useFocusEffect } from "@react-navigation/native";
import Styles from "../utils/Styles";
import { LinearGradient } from "expo-linear-gradient";

const Auth = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      NavigationBar.setBackgroundColorAsync("#05142f");
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.imageBackground}
      >
        <LinearGradient
          colors={["black", "black", "transparent"]}
          start={[0.5, 1]}
          end={[0.5, 0]}
          style={{
            width: "100%",
            height: "60%",
            position: "absolute",
            bottom: 0,
            zIndex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.splashText}>Erzähl mir was</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Registrierung</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.contactText}>
              Kontaktiere uns:{"\n"}
              <Text style={styles.contactEmail}>tim.karlowitz@gmail.com</Text>
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  contactText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  contactEmail: {
    color: Styles.primaryColor,
    fontSize: 12,
    textDecorationLine: "underline",
  },
  container: {
    flex: 1,
    backgroundColor: "#00001c",
  },
  splashText: {
    fontSize: 30,
    color: "white",
    marginBottom: 0,
    fontWeight: "bold",
    marginTop: 100,
    marginBottom: 60,
    textAlign: "center",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    width: "100%",
  },
  button: {
    padding: 15,
    borderRadius: 25,
    width: "55%",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Auth;
