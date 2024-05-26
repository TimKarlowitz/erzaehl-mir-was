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
import { Button, Switch } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getAllStories, likeStory } from "../utils/database";
import Colors from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { set } from "firebase/database";

const Stories = () => {
  const navigation = useNavigation();
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const stories = await getAllStories();
      console.log("Fetched stories:", stories);
      // Sortieren der Geschichten nach dem 'date' Feld (neueste zuerst)
      const sortedStories = stories.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      console.log("Sorted stories:", sortedStories);
      console.log("Story Date:", sortedStories[0].date);
      setStories(sortedStories);
      setStoriesToShow(sortedStories);
      console.log("Stories set:", stories);
    } catch (err) {
      setError("Failed to fetch stories.");
      console.error(err);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStories();

      // Return a cleanup function
      return () => {
        // Cleanup if necessary, like cancelling subscriptions
      };
    }, [])
  );

  const handleLikeStory = (id) => {
    const story = stories.find((story) => story.id === id);

    if (!story) {
      console.error("Story not found with ID:", id);
      return;
    }

    const toLike = story.liked === 1 ? false : true;

    try {
      likeStory(id, toLike);
      console.log("Story liked with ID:", id);
      fetchStories();
    } catch (err) {
      console.error("Failed to like story with ID:", id);
    }
  };

  const [showFavs, setShowFavs] = useState(false);
  const [storiesToShow, setStoriesToShow] = useState([]);

  const handleFavchange = () => {
    setShowFavs(!showFavs);
    if (showFavs) {
      setStoriesToShow(stories);
    } else {
      const favs = stories.filter((story) => story.liked === 1);
      setStoriesToShow(favs);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      source={require("../assets/images/background.jpg")}
      style={StyleSheet.absoluteFillObject}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerBox}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={30} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                ...globalStyles.heading,
                color: "white",
                fontFamily: "IrishGrover",
              }}
            >
              Deine Geschichten
            </Text>
          </View>
        </View>
        <View style={styles.switchView}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              alignSelf: "center",
              marginRight: 10,
              fontFamily: "IrishGrover",
            }}
          >
            Nur Favoriten
          </Text>
          <Switch
            value={showFavs}
            onValueChange={() => handleFavchange()}
            color={Colors.primary}
          />
        </View>
        <ScrollView style={{ flex: 1 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            storiesToShow.map((story) => (
              <View key={story.id} style={styles.storyContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={() => handleLikeStory(story.id)}>
                    <Ionicons
                      name={story.liked ? "heart-sharp" : "heart-outline"}
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.titleText}>{story.title}</Text>
                <Text style={styles.storyText}>{story.content}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Stories;

const styles = StyleSheet.create({
  switchView: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.primary,
    margin: 10,

    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 24,
    color: "white",

    fontFamily: "IrishGrover",
  },
  storyText: {
    fontSize: 20,
    color: "white",
    fontFamily: "IrishGrover",
  },
  storyContainer: {
    borderRadius: 20,
    margin: 10,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    backgroundColor: "#DA4100",
  },
  headerBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
