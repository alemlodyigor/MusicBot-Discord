module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  inVoiceChannel: true,

  run: async (client, message, args) => {
    const queue = client.DisTube.getQueue(message);

    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | Nie ma nic w kolejce`
      );

    const song = queue.songs[0];
    message.channel.send(
      `${client.emotes.play} | Teraz odtwarzam ${song.name} dodane przez ${song.user}`
    );
  },
};
