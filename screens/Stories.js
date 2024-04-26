import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../utils/Styles";
import { Button } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { getAllStories } from "../utils/database";
import Colors from "../utils/Colors";

const Stories = () => {
  const navigation = useNavigation();
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchStories = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const stories = await getAllStories();
          console.log("Fetched stories:", stories);
          setStories(stories);
        } catch (err) {
          setError("Failed to fetch stories.");
          console.error(err);
        }
        setIsLoading(false);
      };

      fetchStories();

      // Return a cleanup function
      return () => {
        // Cleanup if necessary, like cancelling subscriptions
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerBox}>
        <Button icon="arrow-left" onPress={() => navigation.goBack()}></Button>
        <Text style={globalStyles.heading}>Deine Geschichten</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          stories.map((story) => (
            <View key={story.id} style={styles.storyContainer}>
              <Text style={styles.titleText}>{story.title}</Text>
              <Text style={styles.storyText}>{story.content}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stories;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  storyText: {
    fontSize: 20,
    color: "white",
  },
  storyContainer: {
    borderRadius: 20,
    margin: 10,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    backgroundColor: Colors.primary,
  },
  headerBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
