import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import Colors from "./Colors";

const generateMathProblem = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const num3 = Math.floor(Math.random() * 10) + 1;
  return {
    question: `${num1} * ${num2} + ${num3}`,
    answer: num1 * num2 + num3,
  };
};

const ParentsModal = ({ visible, onClose, onSolve }) => {
  const [mathProblem, setMathProblem] = useState(generateMathProblem());
  const [userInput, setUserInput] = useState("");

  const validateAnswer = () => {
    if (parseInt(userInput) === mathProblem.answer) {
      onSolve(true); // Rufe onSolve mit true auf, wenn die Antwort korrekt ist
      setUserInput(""); // Setze das userInput zurück
      setMathProblem(generateMathProblem()); // Generiere eine neue Aufgabe
      onClose(); // Schließe das Modal
    } else {
      // Optional: Feedback geben, dass die Antwort falsch ist.
      alert("Falsche Antwort, bitte versuche es noch einmal.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose(false)}
    >
      <View style={styles.centeredView}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => onClose(false)}
        >
          <Text style={styles.textStyle}>X</Text>
        </TouchableOpacity>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Bitte löse die folgende Aufgabe, um fortzufahren:
          </Text>
          <Text style={styles.modalText}>{mathProblem.question}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Deine Antwort"
            placeholderTextColor={"white"}
          />

          <TouchableOpacity onPress={validateAnswer} style={styles.sendButton}>
            <Text style={styles.textStyle}>Bestätigen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ParentsModal;

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  sendButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    color: "white",
    backgroundColor: "black",
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    backgroundColor: Colors.secondary,
    padding: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: "30%",
    margin: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "absolute",
    top: 10,
    right: 10,
  },
});
