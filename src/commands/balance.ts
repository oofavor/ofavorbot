import { client } from "../main.js";
import { getUser } from "../services/users.js";
import { Command } from "../types.js";

export const balance: Command = (channel, chatUser, args) => {
  const balance = getUser(chatUser["user-id"]).balance;
  client.say(channel, `@${chatUser.username} balance is ${balance}`);
};
