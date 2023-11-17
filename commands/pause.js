module.exports = {
  name: "pause",
  inVoiceChannel: true,

  run: async (client, message) => {
    const queue = client.DisTube.getQueue(message);

    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Nic nie odtwarzam!`
      );

    if (queue.paused) {
      queue.resume();
      return message.channel.send("Odtwarzanie piosenki");
    }

    await queue.pause();
    message.channel.send("Wstrzymano odtwarzanie piosenki");
  },
};
