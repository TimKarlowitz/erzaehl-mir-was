import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../utils/Styles";
import { Button } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { getAllStories } from "../utils/database";
import Colors from "../utils/Colors";
import { fetchAllKeywords } from "../utils/database";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ParentsScreen = () => {
  const navigation = useNavigation();
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keywords, setKeywords] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchKeywords = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const keywords = await fetchAllKeywords();
          console.log("Fetched keywords:", keywords);
          setKeywords(keywords);
        } catch (err) {
          setError("Failed to fetch keywords.");
          console.error(err);
        }
        setIsLoading(false);
      };
      fetchKeywords();
    }, [])
  );
  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={StyleSheet.absoluteFillObject}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerBox}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={30} color="white" />
            </TouchableOpacity>
            <Text style={{ ...globalStyles.heading, color: "white" }}>
              Elternbereich
            </Text>
          </View>
          <Text style={styles.keywordsHeader}>Keywords Ihres Kindes</Text>
          <ScrollView style={styles.scrollView}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text>{error}</Text>
            ) : (
              // Display all keywords
              keywords.map((keyword) => (
                <View key={keyword.id} style={styles.storyContainer}>
                  <Text style={styles.titleText}>{keyword.id}. </Text>
                  <Text style={styles.titleText}>{keyword.keyword}</Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ParentsScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
  },
  screentimeHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 10,
    marginBottom: 20,
  },
  keywordsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.primary,
    margin: 20,
    borderRadius: 20,
    marginBottom: 50,
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.primary,
  },
  storyContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    borderRadius: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  storyText: {
    fontSize: 16,
    color: Colors.secondary,
  },
});
