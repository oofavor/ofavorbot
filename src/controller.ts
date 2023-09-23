import { ChatUserstate } from "tmi.js";
import commands from "./commands/index.js";

export function controller(
  channel: string,
  userState: ChatUserstate,
  msg: string,
  self: boolean,
) {
  msg = msg.trim();

  if (!msg.startsWith("!")) return;

  const command = msg.split(" ")[0].replace("!", "");
  const args = msg.replace("!" + command + " ", "").trim();

  if (command in commands) {
    commands[command](channel, userState, args);
    console.log(`* Executed command ${command}`);
  } else {
    console.log(`* Unknown command ${command}`);
  }
}
