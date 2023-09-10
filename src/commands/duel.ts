import { duels, users } from "../db";
import { client } from "../main";
import { getUser, getIdByUsername } from "../services/userService";
import { Command, Duel } from "../types";

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
    client.say(channel, rejectDuel(chatUser.username, initiatorName));
  }
};

const createDuel = async (
  initiatorName: string,
  initiatorId: string,
  recieverName: string,
  bet: number,
) => {
  const initiator = getUser(initiatorId);
  const recieverId = await getIdByUsername(recieverName);
  const reciever = getUser(recieverId);

  if (initiator.balance < bet || reciever.balance < bet) return "";
  if (bet < 1) return "";

  const createdDuel: Duel = { initiatorId, recieverId, bet };
  duels.set(initiatorName + "+" + recieverName, createdDuel);

  return `@${recieverName} to accept duel against @${initiatorName} type !duel accept @${initiatorName}`;
};

const acceptDuel = (recieverName: string, initiatorName: string) => {
  const duelId = initiatorName + "+" + recieverName;
  if (!duels.has(duelId)) return "";

  const duel = duels.get(duelId);
  const rnd = Math.random();

  if (rnd > 0.5) {
    users.get(duel.recieverId).balance -= duel.bet;
    users.get(duel.initiatorId).balance += duel.bet;

    return `@${initiatorName} won @${recieverName} and got ${duel.bet} coins`;
  }

  users.get(duel.recieverId).balance += duel.bet;
  users.get(duel.initiatorId).balance -= duel.bet;

  return `@${initiatorName} lost to @${recieverName} and lost ${duel.bet} coins LUL`;
};

const rejectDuel = (recieverName: string, initiatorName: string) => {};
