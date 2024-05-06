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

const Profile = () => {
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
        <View style={styles.container}>
          <View style={styles.headerBox}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.headerContainer}>
              <Text style={{ ...globalStyles.heading, color: "white" }}>
                Dein Profil
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <TextInput
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              mode="outlined"
            />
            <Title>Wie alt ist Ihr Kind?</Title>
            <View style={styles.switchRow}>
              <View style={styles.switchContainer}>
                <Switch
                  value={ageGroup === "5-10"}
                  onValueChange={() => setAgeGroup("5-10")}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.settingsText}>5 – 10 Jahre</Text>
              </View>
            </View>
            <View style={styles.switchRow}>
              <View style={styles.switchContainer}>
                <Switch
                  value={ageGroup === "10-14"}
                  onValueChange={() => setAgeGroup("10-14")}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.settingsText}>10 – 14 Jahre</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Title>Geschichten sind:</Title>
            <View style={styles.switchRow}>
              <View style={styles.switchContainer}>
                <Switch
                  value={isLearning}
                  onValueChange={() => handleToggleSwitch("learning")}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.settingsText}>Lernend</Text>
              </View>
            </View>
            <View style={styles.switchRow}>
              <View style={styles.switchContainer}>
                <Switch
                  value={isFun}
                  onValueChange={() => handleToggleSwitch("fun")}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.settingsText}>Spaßig</Text>
              </View>
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchContainer}>
                <Switch
                  value={isBoth}
                  onValueChange={() => handleToggleSwitch("both")}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.settingsText}>Beides</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    marginVertical: 20,

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
export default Profile;
