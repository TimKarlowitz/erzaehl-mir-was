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

    // Insert default values into Categories
    tx.executeSql(
      "INSERT INTO Categories (name) VALUES ('Entertaining'), ('Educational')",
      [],
      () => console.log("Default categories inserted"),
      (error) =>
        console.log("Error occurred while inserting default categories:", error)
    );

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS AgeGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",
      [],
      () => console.log("AgeGroups table created if not exists"),
      (error) =>
        console.log("Error occurred while creating the AgeGroups table:", error)
    );

    // Insert default values into AgeGroups
    tx.executeSql(
      "INSERT INTO AgeGroups (name) VALUES ('3-6'), ('6-10')",
      [],
      () => console.log("Default age groups inserted"),
      (error) =>
        console.log("Error occurred while inserting default age groups:", error)
    );

    // Create Keywords table
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Keywords (id INTEGER PRIMARY KEY AUTOINCREMENT, keyword TEXT, story_id INTEGER, FOREIGN KEY(story_id) REFERENCES Stories(id))",
      [],
      () => console.log("Keywords table created if not exists"),
      (error) =>
        console.log("Error occurred while creating the Keywords table:", error)
    );
  });
};

export const insertKeyword = (keyword, storyId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Keywords (keyword, story_id) VALUES (?, ?)",
      [keyword, storyId],
      () => console.log("Keyword inserted"),
      (error) => console.log("Error occurred while inserting keyword:", error)
    );
  });
};

export const fetchAllKeywords = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, keyword, story_id FROM Keywords",
        [],
        (tx, results) => {
          let keywords = [];
          for (let i = 0; i < results.rows.length; i++) {
            keywords.push({
              id: results.rows.item(i).id,
              keyword: results.rows.item(i).keyword,
              storyId: results.rows.item(i).story_id,
            });
          }
          resolve(keywords);
        },
        (error) => {
          console.log("Error occurred while fetching all keywords:", error);
          reject(error);
        }
      );
    });
  });
};

export const addStory = (inputs, content, categoryId, ageGroupId, liked) => {
  const currentDate = moment().format("YYYY-MM-DD");
  // Combine all inputs to form a single title string with commas separating them.
  const title = inputs.join(", ");

  // Start the transaction
  db.transaction(
    (tx) => {
      // Insert the story first
      tx.executeSql(
        "INSERT INTO Stories (title, content, date, liked, category_id, agegroup_id) VALUES (?, ?, ?, ?, ?, ?)",
        [title, content, currentDate, liked ? 1 : 0, categoryId, ageGroupId],
        (tx, result) => {
          console.log("Story added with ID:", result.insertId);
          // Insert each input as a keyword
          inputs.forEach((keyword) => {
            if (keyword.trim()) {
              // Ensure the keyword is not empty or just spaces
              tx.executeSql(
                "INSERT INTO Keywords (keyword, story_id) VALUES (?, ?)",
                [keyword, result.insertId],
                null,
                (tx, error) =>
                  console.error(`Error inserting keyword '${keyword}':`, error)
              );
            }
          });
        },
        (tx, error) =>
          console.error("Error occurred while adding the story:", error)
      );
    },
    (error) => console.error("Transaction Error:", error),
    () => console.log("Transaction completed successfully")
  );
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
