import { Duel, User } from "./types";

// key = userId
export const users: Map<String, User> = new Map();

// key = username+username
export const duels: Map<String, Duel> = new Map();
