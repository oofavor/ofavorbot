import { duels } from "../db.js";
import { Duel } from "../types.js";

export const duelExists = (duelId: string) => {
  return duels[duelId] !== undefined;
};

export const createDuel = (duelId: string, duel: Duel) => {
  if (duelExists(duelId)) return;
  duels[duelId] = duel;
};

export const getById = (duelId: string) => {
  return duels[duelId];
};

export const deleteById = (duelId: string) => {
  delete duels[duelId];
};
