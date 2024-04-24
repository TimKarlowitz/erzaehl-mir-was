import * as SQLite from "expo-sqlite";
import moment from "moment";

const databaseName = "stories.db";
const databaseVersion = "1.0";
const databaseDisplayName = "Stories Database";
const databaseSize = 200000;

const db = SQLite.openDatabase(
  databaseName,
  databaseVersion,
  databaseDisplayName,
  databaseSize
);

export const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql("PRAGMA foreign_keys = ON");

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Stories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, date TEXT, liked BOOLEAN, category_id INTEGER, agegroup_id INTEGER, FOREIGN KEY(category_id) REFERENCES Categories(id), FOREIGN KEY(agegroup_id) REFERENCES AgeGroups(id))",
      [],
      () => console.log("Stories table created if not exists"),
      (error) =>
        console.log("Error occurred while creating the Stories table:", error)
    );

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",
      [],
      () => console.log("Categories table created if not exists"),
      (error) =>
        console.log(
          "Error occurred while creating the Categories table:",
          error
        )
    );

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS AgeGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",
      [],
      () => console.log("AgeGroups table created if not exists"),
      (error) =>
        console.log("Error occurred while creating the AgeGroups table:", error)
    );
  });
};

export const addStory = (title, content, categoryId, ageGroupId, liked) => {
  const currentDate = moment().format("YYYY-MM-DD");

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Stories (title, content, date, liked, category_id, agegroup_id) VALUES (?, ?, ?, ?, ?, ?)",
      [title, content, currentDate, liked ? 1 : 0, categoryId, ageGroupId],
      (_, result) => console.log("Story added with ID:", result.insertId),
      (_, error) =>
        console.error("Error occurred while adding the story:", error)
    );
  });
};

export const deleteStory = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Stories WHERE id = ?",
      [id],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log("Story with ID:", id, "deleted");
        }
      },
      (_, error) =>
        console.error("Error occurred while deleting the story:", error)
    );
  });
};

export const addCategory = (name) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Categories (name) VALUES (?)",
      [name],
      (_, result) => console.log("Category added with ID:", result.insertId),
      (_, error) =>
        console.error("Error occurred while adding the category:", error)
    );
  });
};

export const addAgeGroup = (name) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO AgeGroups (name) VALUES (?)",
      [name],
      (_, result) => console.log("AgeGroup added with ID:", result.insertId),
      (_, error) =>
        console.error("Error occurred while adding the age group:", error)
    );
  });
};

export const likeStory = (id, liked) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Stories SET liked = ? WHERE id = ?",
      [liked ? 1 : 0, id],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log("Story with ID:", id, "updated to liked:", liked);
        }
      },
      (_, error) =>
        console.error(
          "Error occurred while updating the story's liked status:",
          error
        )
    );
  });
};

export const getAllStories = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT Stories.id, Stories.title, Stories.content, Stories.date, Stories.liked, 
                Categories.name AS category_name, AgeGroups.name AS agegroup_name
         FROM Stories
         JOIN Categories ON Stories.category_id = Categories.id
         JOIN AgeGroups ON Stories.agegroup_id = AgeGroups.id`,
        [],
        (_, { rows }) => {
          console.log("Fetched all stories:", rows._array);
          resolve(rows._array);
        },
        (_, error) => {
          console.error("Error fetching all stories:", error);
          reject(error);
        }
      );
    });
  });
};
