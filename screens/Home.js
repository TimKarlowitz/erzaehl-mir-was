import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,

} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../utils/Styles";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import SettingsScreen from "./Settings";
import SettingsModal from "../utils/SettingsModal";
import { Button } from "react-native-paper";

const Home = () => {
  const [text, setText] = React.useState("");
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={StyleSheet.absoluteFillObject}
      >
        <SettingsModal visible={modalVisible} onClose={toggleModal} />
        <SafeAreaView style={styles.safeAreaView}>
        
          <TouchableOpacity style={styles.gearView} onPress={()=>navigation.navigate("Settings")}>
            <FontAwesome name="gear" size={50} color="black" />
          </TouchableOpacity>
        
        <View style={styles.bodyHeader}>
          
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
            <View style={styles.body}>
              <Text style={globalStyles.heading}>Erzähl mir was</Text>
              <Text style={globalStyles.paragraph}>ÜBER</Text>
            </View>

            <View style={styles.inputView}>
              <TextInput
                placeholder="Drachen, Monster, Prinzessinnen"
                style={styles.input}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
              />

              <View style={styles.accountView}>
                <Button icon="tune-variant" onPress={() => toggleModal()}/>
              </View>
          </View>

          <View style={styles.goContainer}>
            <TouchableOpacity style={styles.goView}>
              <Text style={globalStyles.buttonText}>Erzähl</Text>
              <FontAwesome5 name="angle-right" size={40} color={globalStyles.buttonText.color} />
            </TouchableOpacity>
          </View>

          <View style={styles.storiesContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Stories")}
              style={styles.storiesView}
            >
              <Text style={globalStyles.buttonText}>Zu deinen Geschichten</Text>
            </TouchableOpacity>
          </View>
          </LinearGradient>
        </View>
        </SafeAreaView>
      </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  storiesView: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    width: "90%",
    alignItems: "center",
  },
  storiesContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  goButtonText: {
    fontSize: 20,
    color: "orange",
    fontWeight: "bold",
    marginRight: 10,
  },
  goContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  goView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 50,
    width: "90%",
  },
  inputView: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderLeftWidth: 0,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "white",
    height: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  bodyHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  accountView: {
    
    borderRadius: 50,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  gearView: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
    right: 20,
    top: 20,

  },
  header: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  safeAreaView: {
    flex: 1,
  }
});

export default Home;
