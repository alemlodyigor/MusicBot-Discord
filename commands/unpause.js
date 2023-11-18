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
      return message.channel.send(
        `${client.emotes.stop} | Wznowiono odtwarzanie piosenki`
      );
    } else
      message.channel.send(
        `${client.emotes.error} | Kolejka nie jest wstrzymana`
      );
  },
};
