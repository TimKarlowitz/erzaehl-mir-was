import * as React from "react";

import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Switch, TextInput, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../utils/Styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { set } from "firebase/database";
import { useState } from "react";
//import * as promptflow from "../promptflow.json";

const PromptFlowStartScreen = () => {
  const navigation = useNavigation();
  const [promptflowIndex, setPromptflowIndex] = useState(0);
  const [inputs, setInputs] = useState(["", "", "", ""]);

  const promptflow = [
    {
      title: "Charaktere",
      description:
        "Welche Charaktere sollen in deiner Geschichte vorkommen? Ein Bär? Eine Prinzessin? Ein Drache?...",
      alert:
        "Schon alle Charaktere eingetragen? Dann drücke auf Weiter, um die Emotionen einzugeben.",
      tip: "Klicke auf das Symbol oben links, um deine Angaben zu ändern.",
    },
    {
      title: "Emotionen",
      description:
        "Welche Emotionen haben deine Charaktere? Ein trauriger Bär? Eine glückliche Prinzessin? Ein freundlicher Drache?...",
      alert:
        "Hast du die Emotionen deiner Charaktere eingetragen? Dann geht's weiter mit dem nächsten Schritt. Klicke auf Weiter.",
      tip: "Klicke auf das Symbol oben links, um deine Angaben zu ändern.",
    },
    {
      title: "Orte",
      description:
        "Wo findet deine Geschichte statt? Im Wald? In der Arktis?...",
      alert:
        "Hast du den Ort deiner Geschichte festgelegt? Dann drücke auf Weiter.",
      tip: "Klicke auf das Symbol oben links, um deine Angaben zu ändern.",
    },
    {
      title: "Aktivitäten",
      description:
        "Was machen deine Charaktere? Kämpft der Bär gegen den bösen König? Beschützt der Drache die Bewohner des Dorfes?...",
      alert:
        "Wenn du die Aktivitäten festgelegt hast, drücke auf Weiter, damit wir deine Geschichte erstellen können.",
      tip: "Klicke auf das Symbol oben links, um deine Angaben zu ändern.",
    },
  ];

  const updateInputAndAdvance = (text) => {
    const updatedInputs = [...inputs];
    updatedInputs[promptflowIndex] = text;

    // Aktualisiere das Input-Array
    setInputs(updatedInputs);

    // Prüfe, ob wir am Ende des Flows sind
    if (promptflowIndex === 3) {
      console.log("Story wird generiert...");
      // Navigation mit aktuellen Daten
      navigation.navigate("Home", { inputs: updatedInputs }); // Verwende updatedInputs direkt hier
    } else {
      // Inkrementiere den Index für den nächsten Screen
      setPromptflowIndex(promptflowIndex + 1);
    }

    // Debugging: Zeige die aktualisierten Inputs im Console-Log
    console.log(updatedInputs);
  };

  const stepBack = () => {
    if (promptflowIndex > 0) {
      setPromptflowIndex(promptflowIndex - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={StyleSheet.absoluteFillObject}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerBox}>
            <TouchableOpacity onPress={() => stepBack()}>
              <Ionicons name="chevron-back-sharp" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.headerContainer}>
              <Text style={{ ...globalStyles.heading, color: "white" }}>
                {promptflow[promptflowIndex].title}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.descriptionView}>
              <Text style={styles.description}>
                {promptflow[promptflowIndex].description}
              </Text>
            </View>
            <TextInput
              value={inputs[promptflowIndex]}
              onChangeText={(text) =>
                setInputs([
                  ...inputs.slice(0, promptflowIndex),
                  text,
                  ...inputs.slice(promptflowIndex + 1),
                ])
              }
              style={styles.input}
              mode="outlined"
            />
            <View style={styles.alertView}>
              <Text style={styles.alertText}>
                {promptflow[promptflowIndex].alert}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => updateInputAndAdvance(inputs[promptflowIndex])}
              style={styles.button}
            >
              <Text style={globalStyles.buttonText}>Weiter</Text>
            </TouchableOpacity>
            <View style={styles.tipView}>
              <Text style={styles.tipText}>
                {promptflow[promptflowIndex].tip}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  descriptionView: {
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "white",
  },
  description: {
    fontSize: 18,
    color: "black",
  },
  alertView: {
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
  },
  alertText: {
    fontSize: 18,
    color: "white",
  },
  tipView: {
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
  },
  tipText: {
    fontSize: 18,
    color: "white",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  settingsText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  headerBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
    backgroundColor: Colors.primary,
    margin: 20,
    borderRadius: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  section: {
    borderRadius: 20,
    padding: 10,
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
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
  },
});
export default PromptFlowStartScreen;
