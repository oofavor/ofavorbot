import { client } from "../main";
import { Command } from "../types";

export const dice: Command = (channel, user, msg) => {
  const num = 1;
  client.say(channel, `You rolled a ${num}`);
};
