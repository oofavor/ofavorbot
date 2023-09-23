import { ChatUserstate } from "tmi.js";

export type Command = (
  channel: string,
  userState: ChatUserstate,
  args: string,
) => void;

export interface User {
  balance: number;
}

export interface Duel {
  initiatorId: string;
  recieverId: string;
  bet: number;
}

export interface UserDB {
  [key: string]: User;
}

export interface DuelDB {
  [key: string]: Duel;
}

export interface CustomCommand {
    name: string;
    content: string;
}

export interface DB {
  users: UserDB;
  duels: DuelDB;
}

