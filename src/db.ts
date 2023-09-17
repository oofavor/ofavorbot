import { Duel, User, DB } from "./types.js";

// Remember to set type: module in package.json or use .mjs extension
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// load files
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

// Configure lowdb to write data to JSON file
const adapter = new JSONFile<DB>(file);
const defaultData: DB = {
  users: {},
  duels: {},
};
export const db = new Low<DB>(adapter, defaultData);

// Read data from JSON file, this will set db.data content
// If JSON file doesn't exist, defaultData is used instead
await db.read();

// Create and query items using plain JavaScript
export const { users, duels } = db.data;
