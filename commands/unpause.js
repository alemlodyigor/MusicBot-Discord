module.exports = {
  name: "unpause",
  inVoiceChannel: true,

  run: async (client, message) => {
    const queue = client.DisTube.getQueue(message);

    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Nic nie odtwarzam!`
      );

    if (queue.paused) {
      queue.resume();
      return message.channel.send("Wznowiono odtwarzanie piosenki");
    } else message.channel.send("Kolejka nie jest wstrzymana");
  },
};
