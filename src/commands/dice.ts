import { db } from "../db.js";
import { client } from "../main.js";
import { Command } from "../types.js";

export const dice: Command = (channel, user, msg) => {
  const num = 1;
  client.say(channel, `You rolled a ${num}`);
  console.log(db.data)
};
