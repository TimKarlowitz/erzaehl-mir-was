import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "./Styles";
import Colors from "./Colors";

const AGBModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            Bereit für spannende Geschichten?
          </Text>
          <Text style={styles.modalText}>
            Bitte beachten Sie unsere Allgemeinen Geschäftsbedingungen. Durch
            die Nutzung unserer Dienste erklären Sie sich damit einverstanden.
            Für weitere Informationen lesen Sie bitte unsere ausführlichen AGB
            und Datenschutzrichtlinien.
          </Text>
          <Text style={styles.modalLink}>AGB</Text>
          <Text style={styles.modalLink}>Datenschutzrichtlinien</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={{ ...globalStyles.buttonText, color: "white" }}>
              Akzeptieren
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  modalLink: {
    color: "blue",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AGBModal;
