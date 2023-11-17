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

    let mode = 1;

    mode = queue.setRepeatMode(mode);
    message.channel.send(
      `${client.emotes.repeat} | Włączono odtwarzanie w pętli`
    );
  },
};
