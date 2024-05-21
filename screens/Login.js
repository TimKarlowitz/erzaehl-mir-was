import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { auth } from "../utils/firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        navigation.navigate("App");
      })
      .catch((error) => {
        console.log("Fehler beim Anmelden:", error.message);
        alert(error.message);
      });
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["orange", "black", "transparent"]}
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
          <View style={styles.inputContainer}>
            <Text style={styles.splashText}>Erzähl mir was</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="black"
              autoCapitalize="none"
              keyboardType="email-address"
              keyboardAppearance="dark"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.invisibleButton}
              onPress={handleForgotPassword}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: "white",
                  fontSize: 13,
                  textDecorationLine: "underline",
                }}
              >
                Passwort vergessen?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.invisibleButton}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: "white",
                  fontSize: 13,
                  textDecorationLine: "underline",
                }}
              >
                noch kein Account?
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  splashText: {
    fontSize: 30,
    color: "white",
    marginBottom: 0, // Decrease this value
    fontWeight: "bold",

    marginBottom: 60,
    textAlign: "center",
  },
  imageBackground: {
    flex: 1, // Adjust this to control the height of the image
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,

    justifyContent: "center",
    paddingVertical: 20,
  },
  inputContainer: {
    marginTop: 150,

    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    marginHorizontal: 20,
    width: "90%",
    alignSelf: "center",
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 20,
    padding: 10,
    color: "black",
    fontSize: 18,
    width: "80%",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#09315d",
    fontSize: 18,
    fontWeight: "bold",
  },
  invisibleButton: {
    backgroundColor: "transparent",
    padding: 10,
    alignItems: "center",
  },
});

export default Login;
