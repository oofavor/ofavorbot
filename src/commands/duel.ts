import { duels } from "../db";
import { client } from "../main";
import { createUser, getUser, getIdByUsername } from "../services/userService";
import { Command, Duel } from "../types";

// !duel @username bet
//
export const duel: Command = async (channel, chatUser, args) => {
  const options = args.split(" ");

  const command = options[0];

  if (command.startsWith("@")) {
    client.say(channel, await createDuel(chatUser.username, chatUser["user-id"], args));
  }
  if (command === "accept") {
  }
  if (command === "reject") {
  }
  if (command === "cancel") {
  }
};

const createDuel = async (
  initiatorName: string,
  initiatorId: string,
  args: string,
) => {
  const options = args.split(" ");

  const duelistUsername = options[0].replace("@", "");
  const bet = +options[1];

  const initiator = getUser(initiatorId);
  const recieverId = await getIdByUsername(duelistUsername);
  const reciever = getUser(recieverId);

  if (initiator.balance < bet || reciever.balance < bet) return "";
  if (bet < 1) return "";

  const createdDuel: Duel = {
    initiatorId,
    recieverId: recieverId,
    bet,
  };
  duels.set(initiatorName, createdDuel);
  console.log(duels)

  return `@${duelistUsername}, to accept duel against @${initiatorName} type !duel accept ${123}`;
};

const acceptDuel = () => {};

const rejectDuel = () => {};

const cancelDuel = () => {};
