import * as SQLite from "expo-sqlite";


const databaseName = "stories.db";
const databaseVersion = "1.0";
const databaseDisplayName = "Notes Database";
const databaseSize = 200000;

const db = SQLite.openDatabase(
  databaseName,
  databaseVersion,
  databaseDisplayName,
  databaseSize
);