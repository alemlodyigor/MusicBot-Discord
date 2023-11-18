module.exports = {
  name: "loop",
  aliases: ["l"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.DisTube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Nic nie odtwarzam!`
      );

    if (queue.repeatMode !== 0) {
      await queue.setRepeatMode(0);
      return message.channel.send(
        `${client.emotes.repeat} | Wyłączono odtwarzanie w pętli`
      );
    }

    await queue.setRepeatMode(1);
    message.channel.send(
      `${client.emotes.repeat} | Włączono odtwarzanie w pętli`
    );
  },
};
