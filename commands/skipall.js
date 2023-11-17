module.exports = {
  name: "skipall",
  aliases: ["sall"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.DisTube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Nie ma nic w kolejce!`
      );

    try {
      await queue.stop();
      message.channel.send(
        `${client.emotes.success} | Kolejka została wyczyszczona.`
      );
    } catch (error) {
      console.error(error.message);
      message.channel.send(
        `${client.emotes.error} | Wystąpił błąd podczas czyszczenia kolejki`
      );
    }
  },
};
