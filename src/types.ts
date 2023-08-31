import { ChatUserstate } from "tmi.js";

export type Command = (channel: string, userState: ChatUserstate, msg: string) => void

export interface User {
    id: string;
    username: string;
    balance: string;
}

