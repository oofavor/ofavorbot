import { ChatUserstate } from "tmi.js"
import { dice } from "./commands/dice";

// reading files names to then map them to commands
// const commands = readdirSync(`${__dirname}/commands`, { recursive: false })

const commands = {
    "!dice": dice,
    "!roll": dice
}

export function controller(channel: string, userState: ChatUserstate, msg: string, self: boolean) {
    msg = msg.trim();
    if (!msg.startsWith("!")) return;

    if (msg.split(" ")[0] in commands) {
        commands[msg](channel, userState, msg)
        console.log(`* Executed command ${msg}`);
    } else {
        console.log(`* Unknown command ${msg}`);
    }
}

// WORKFLOW
// 1 v 1 
// randy: !fight @ofavor 
// ofavorbot: @ofavor, do you accept the duel? 
// ofavor: !fight @randy accept
