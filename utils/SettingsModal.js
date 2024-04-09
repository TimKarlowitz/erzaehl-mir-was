import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const SettingsModal = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      style={styles.modal}
      
    >
        <View style={styles.centeredView}>
            <TouchableOpacity
                style={styles.buttonClose}
                onPress={onClose}
            >
                <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Hier kommen die Search settings rein</Text>
            </View>
        </View>
    </Modal>
  )
}

export default SettingsModal

const styles = StyleSheet.create({
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

})