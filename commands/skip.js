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
      if (queue.songs.length === 1) {
        await queue.stop();
        message.channel.send(`${client.emotes.success} | Pominięto, dodaj piosenkę do kolejki!`);
        return;
      }
      await queue.skip();
      message.channel.send(`${client.emotes.success} | Pominięto`);
      queue.setRepeatMode(0);
    } catch (e) {
      message.channel.send(`${client.emotes.error} | Nie ma nic w kolejce!`);
    }
  },
};
