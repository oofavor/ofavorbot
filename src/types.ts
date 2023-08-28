import { ChatUserstate } from "tmi.js";

export type Command = (channel: string, userState: ChatUserstate, msg: string) => void

