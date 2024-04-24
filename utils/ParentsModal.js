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
      style={styles.modal}
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
          />
          <Button title="Bestätigen" onPress={validateAnswer} />
        </View>
      </View>
    </Modal>
  );
};

export default ParentsModal;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    backgroundColor: "white",
  },
  modal: {
    height: "50%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "white",
    height: "60%",
    borderWidth: 1,
    borderColor: "black",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "absolute",
    top: 10,
    right: 10,
  },
});
