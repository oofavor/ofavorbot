import { client } from "../main.js";
import * as userService from "../services/users.js";
import * as duelService from "../services/duels.js";
import { Command, Duel } from "../types.js";
import { db } from "../db.js";

export const duel: Command = async (channel, chatUser, args) => {
  const options = args.trim().split(" ");
  const command = options[0];

  if (options.length < 2) return;

  if (command.startsWith("@")) {
    const bet = +options[1];

    client.say(
      channel,
      await createDuel(
        chatUser.username,
        chatUser["user-id"],
        command.replace("@", ""),
        bet,
      ),
    );
  }

  const initiatorName = options[1].replace("@", "").trim();

  if (command === "accept") {
    client.say(channel, acceptDuel(chatUser.username, initiatorName));
  }

  if (command === "reject") {
    rejectDuel(chatUser.username, initiatorName);
  }

  await db.write()
};

const createDuel = async (
  initiatorName: string,
  initiatorId: string,
  recieverName: string,
  bet: number,
) => {
  const initiator = userService.getUser(initiatorId);
  const recieverId = await userService.getIdByUsername(recieverName);
  const reciever = userService.getUser(recieverId);

  if (initiator.balance < bet || reciever.balance < bet) return "";
  if (bet < 1) return "";

  const createdDuel: Duel = { initiatorId, recieverId, bet };
  duelService.createDuel(initiatorName + "+" + recieverName, createdDuel);

  return `@${recieverName} to accept duel against @${initiatorName} type !duel accept @${initiatorName}`;
};

const acceptDuel = (recieverName: string, initiatorName: string) => {
  const duelId = initiatorName + "+" + recieverName;
  if (!duelService.duelExists(duelId)) return "";

  const duel = duelService.getById(duelId);
  const rnd = Math.random();


  if (rnd > 0.5) {
    userService.getUser(duel.recieverId).balance -= duel.bet;
    userService.getUser(duel.initiatorId).balance += duel.bet;
    duelService.deleteById(duelId);

    return `@${initiatorName} won @${recieverName} and got ${duel.bet} coins`;
  }

  userService.getUser(duel.recieverId).balance += duel.bet;
  userService.getUser(duel.initiatorId).balance -= duel.bet;
  duelService.deleteById(duelId);

  return `@${initiatorName} lost to @${recieverName} and lost ${duel.bet} coins LUL`;
};

const rejectDuel = (recieverName: string, initiatorName: string) => {
  const duelId = initiatorName + "+" + recieverName;
  if (!duelService.duelExists(duelId)) return "";

  duelService.deleteById(duelId);
  return "";
};
