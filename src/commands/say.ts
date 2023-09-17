import { client } from "../main.js";
import { Command } from "../types.js";

export const say: Command = (channel, chatUser, args) => {
  client.say(channel, args);
};
