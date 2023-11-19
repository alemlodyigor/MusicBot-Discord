module.exports = {
  name: "stop",
  aliases: ["disconnect", "leave"],
  inVoiceChannel: true,

  run: async (client, message) => {
    const queue = client.DisTube.getQueue(message);
    if (!queue)
      return message.channel.send(`${client.emotes.error} | Nic nie odtwarzam`);

    queue.stop();
    message.channel.send(`${client.emotes.success} | Zatrzymano odtwarzanie`);
  },
};
