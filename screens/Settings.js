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

const Settings = () => {
  const [isLearning, setIsLearning] = React.useState(false);
  const [isFun, setIsFun] = React.useState(false);
  const [isBoth, setIsBoth] = React.useState(true);
  const [name, setName] = React.useState("");
  const [ageGroup, setAgeGroup] = React.useState("5-10");
  const navigation = useNavigation();

  // Handle switch toggle logic to ensure only one switch is on at a time
  const handleToggleSwitch = (switchId) => {
    setIsLearning(switchId === "learning" || switchId === "both");
    setIsFun(switchId === "fun" || switchId === "both");
    setIsBoth(switchId === "both");
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
            <Text style={styles.sectionText}> Ihre ID: 2WAd9das8J</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              {" "}
              Ihre Email: tim.karlowitz@gmail.com
            </Text>
          </View>
          <TouchableOpacity>
            <View style={styles.section}>
              <Text style={styles.sectionText}> Passwort vergessen </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
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
