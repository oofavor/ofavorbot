import { getIdByUsername } from "../services/userService";
import { Command } from "../types";

export const debug: Command = (channel, userState, args) => {
  getIdByUsername(args);
};
