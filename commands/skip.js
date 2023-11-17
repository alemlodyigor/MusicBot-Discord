module.exports = {
  name: "skip",
  aliases: ["s"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.DisTube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Nie ma nic w kolejce!`
      );
    try {
      await queue.skip();
      message.channel.send(`${client.emotes.success} | Pominięto`);
    } catch (e) {
      message.channel.send(`${client.emotes.error} | Nie ma nic w kolejce!`);
    }
  },
};
