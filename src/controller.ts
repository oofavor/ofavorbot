import { ChatUserstate } from "tmi.js";
import { dice } from "./commands/dice";
import { duel } from "./commands/duel";
import { debug } from "./commands/debug";

const commandList = {
  "!dice": dice,
  "!roll": dice,
  "!duel": duel,
  "!debug": debug,
};

export function controller(
  channel: string,
  userState: ChatUserstate,
  msg: string,
  self: boolean,
) {
  msg = msg.trim();
  if (!msg.startsWith("!")) return;

  const command = msg.split(" ")[0];
  const args = msg.replace(command + " ", "");

  if (command in commandList) {
    commandList[command](channel, userState, args);
    console.log(`* Executed command ${command}`);
  } else {
    console.log(`* Unknown command ${command}`);
  }
}
