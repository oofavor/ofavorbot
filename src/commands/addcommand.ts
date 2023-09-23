import { Command } from "../types.js";

export const addcommand: Command = (channel, user, args) => {
  const regexp = /!\w+ /;
  const res = regexp.exec(args);

  // if !command isn't first
  if (res === null || res.index !== 0) return;

  const commandName = res[0].replace("!", "").trim();
  const commandContent = args.replace(regexp, "");

};
