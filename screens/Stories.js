import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../utils/Styles";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { getAllStories } from "../utils/database";
import { get, set } from "firebase/database";

const Stories = () => {
  const navigation = useNavigation();
  const [stories, setStories] = React.useState([]);
  useEffect(() => {
    getStories();
  }, []);

  const getStories = async () => {
    const stories = await getAllStories();
    setStories(stories);
  };
  return (
    <SafeAreaView>
      <View style={styles.headerBox}>
        <Button icon="arrow-left" onPress={() => navigation.goBack()}></Button>
        <Text style={globalStyles.heading}>Deine Geschichten</Text>
      </View>
      <ScrollView>
        {stories.map((story) => (
          <View key={story.id}>
            <Text>{story.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stories;

const styles = StyleSheet.create({
  headerBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
