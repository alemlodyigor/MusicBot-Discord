module.exports = {
  name: "volume",
  aliases: ["v"],
  inVoiceChannel: true,

  run: async (client, message, args) => {
    const queue = client.DisTube.getQueue(message);
    if (!queue)
      return message.channel.send(`${client.emotes.error} | Nic nie odtwarzam`);

    const volume = parseInt(args[0]);
    if (isNaN(volume))
      return message.channel.send(
        `${client.emotes.error} | Podaj poprawną liczbę`
      );

    queue.setVolume(volume);
    message.channel.send(
      `${client.emotes.success} | Ustawiono głośność na \`${volume}\``
    );
  },
};
