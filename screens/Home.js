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
import { LinearGradient } from "expo-linear-gradient";
import SettingsScreen from "./Settings";
import SettingsModal from "../utils/SettingsModal";
import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ParentsModal from "../utils/ParentsModal";
import Colors from "../utils/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import {
  addAgeGroup,
  addCategory,
  addStory,
  insertKeyword,
} from "../utils/database";
import { set } from "firebase/database";

const Home = () => {
  const [text, setText] = React.useState("");
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [parentsModalVisible, setParentsModalVisible] = React.useState(false);
  //WARNING: Only for development purposes
  const devMode = true;
  const firebaseFunctionsURL =
    "https://us-central1-erzaehlmirwas-8301e.cloudfunctions.net/generateStory-generateStory";

  const [isSaving, setIsSaving] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [onModalSuccess, setOnModalSuccess] = React.useState(() => () => {});

  const showParentsModal = (onSuccess) => {
    if (devMode) {
      onSuccess();
      return;
    }
    setOnModalSuccess(() => onSuccess); // Speichere die Callback-Funktion
    setParentsModalVisible(true); // Zeige das Modal an
  };

  const handleModalClose = (solved) => {
    setParentsModalVisible(false); // Verstecke das Modal
    if (solved) {
      onModalSuccess(); // Führe die Callback-Funktion aus, wenn die Aufgabe gelöst wurde
    }
  };

  const handleSettingsPress = () => {
    showParentsModal(() => navigation.navigate("Settings"));
  };
  const handleParentsPress = () => {
    showParentsModal(() => navigation.navigate("Parents"));
  };
  const handleProfilePress = () => {
    showParentsModal(() => navigation.navigate("Profile"));
  };

  async function storyAPICall(keywords) {
    setIsSaving(true);
    const ageGroup = "5-10";
    const style = "educational";
    try {
      const response = await fetch(firebaseFunctionsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: keywords,
          ageGroup: ageGroup,
          style: style,
        }),
      });

      const responseText = await response.text();
      console.log("Raw response text: " + responseText); // Logs the raw response text

      try {
        const data = JSON.parse(responseText);
        console.log(data);

        if (data.message && data.message.content) {
          const storyText = data.message.content.trim();
          console.log(storyText);
          await addStory(keywords, storyText, 1, 1, false, keywords);
        } else {
          console.error("Unexpected JSON format:", data);
        }
        setIsSaving(false);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } catch (error) {
      console.error("Error with fetch call:", error);
    }
  }
  //Warning: Only for development purposes

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={StyleSheet.absoluteFillObject}
    >
      <ParentsModal
        visible={parentsModalVisible}
        onClose={() => handleModalClose(false)}
        onSolve={(solved) => handleModalClose(solved)}
      />
      <SettingsModal visible={modalVisible} onClose={toggleModal} />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.gearView}
            onPress={() => handleSettingsPress()}
          >
            <FontAwesome name="gear" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gearView}
            onPress={() => handleParentsPress()}
          >
            <Entypo name="lock" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gearView}
            onPress={() => handleProfilePress()}
          >
            <MaterialIcons name="person" size={30} color="black" />
          </TouchableOpacity>
        </View>
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
            </View>

            <View style={styles.goContainer}>
              <TouchableOpacity
                style={styles.goView}
                onPress={() => storyAPICall(text)}
              >
                <Text style={globalStyles.buttonText}>Erzähl</Text>
                <FontAwesome5
                  name="angle-right"
                  size={40}
                  color={globalStyles.buttonText.color}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.storiesContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Stories")}
                style={styles.storiesView}
              >
                <Text style={globalStyles.buttonText}>
                  Zu deinen Geschichten
                </Text>
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

    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "white",
    height: 50,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  bodyHeader: {
    flex: 4,
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
    backgroundColor: Colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 10,
    height: 50,
    width: 50,
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
  },
});

export default Home;
