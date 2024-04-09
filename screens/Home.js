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

const Home = () => {
  const [text, setText] = React.useState("");
  const navigation = useNavigation();
  return (
    
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={StyleSheet.absoluteFillObject}
      >
        <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <View style={styles.accountView}>
            <FontAwesome5 name="user-circle" size={50} color="black" />
          </View>
          <TouchableOpacity style={styles.accountView} onPress={()=>navigation.navigate("Settings")}>
            <FontAwesome name="gear" size={50} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyHeader}>
          
          <LinearGradient
            colors={["black", "black", "transparent"]}
            start={[0.5, 1]}
            end={[0.5, 0]}
            style={{
              width: "100%",
              height: "100%",
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
                <TouchableOpacity >
                  <FontAwesome name="gear" size={20} color="black" />
                </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    width: "80%",
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
  },
  bodyHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  accountView: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
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
