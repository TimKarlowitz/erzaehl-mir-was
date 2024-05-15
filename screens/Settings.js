import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Switch, TextInput, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalStyles from "../utils/Styles";
import { set } from "firebase/database";
import { auth } from "../utils/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const Settings = () => {
  const [isLearning, setIsLearning] = React.useState(false);
  const [isFun, setIsFun] = React.useState(false);
  const [isBoth, setIsBoth] = React.useState(true);
  const [mail, setMail] = React.useState("");
  const [ageGroup, setAgeGroup] = React.useState("5-10");
  const navigation = useNavigation();
  const [id, setId] = React.useState("");

  // Handle switch toggle logic to ensure only one switch is on at a time
  const handleToggleSwitch = (switchId) => {
    setIsLearning(switchId === "learning" || switchId === "both");
    setIsFun(switchId === "fun" || switchId === "both");
    setIsBoth(switchId === "both");
  };

  React.useEffect(() => {
    setMail(auth.currentUser.email);
    setId(auth.currentUser.uid);
  }, []);

  const handlePasswordReset = () => {
    // Implement password reset logic here
    sendPasswordResetEmail(auth, mail)
      .then(() => {
        alert("Password reset email sent");
        console.log("Password reset email sent to:", mail);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    auth.signOut();
    //navigation.navigate("Auth");
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={StyleSheet.absoluteFillObject}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{ ...globalStyles.heading, color: "white" }}>
            Einstellungen
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText}> Ihre ID: {id}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionText}> E-Mail: {mail} </Text>
          </View>
          <TouchableOpacity onPress={handlePasswordReset}>
            <View style={styles.section}>
              <Text style={styles.sectionText}> Passwort vergessen </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.section}>
              <Text style={styles.sectionText}> Logout </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.section}>
              <Text style={styles.sectionText}> Account Löschen </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.gearCircle}>
        <FontAwesome name="gear" size={90} color="black" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sectionText: {
    fontSize: 18,
    color: "white",
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  gearCircle: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    alignContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  section: {
    marginVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 10,
  },
});

export default Settings;
