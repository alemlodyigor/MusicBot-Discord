module.exports = {
  name: "shuffle",
  inVoiceChannel: true,

  run: async (client, message) => {
    const queue = client.DisTube.getQueue(message);

    if (!queue)
      return message.channel.send(`${client.emotes.error} | Nic nie odtwarzam`);

    queue.shuffle();
    message.channel.send(`${client.emotes.shuffle} | Pomieszano utwory w kolejce`);
  },
};
