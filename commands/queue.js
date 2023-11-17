module.exports = {
  name: "queue",
  aliases: ["q"],
  run: async (client, message) => {
    const queue = client.DisTube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing playing!`
      );
    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "Teraz odtwarzane:" : `${i + 1}.`} ${song.name} - \`${
            song.formattedDuration
          }\``
      )
      .join("\n");
    message.channel.send(`${client.emotes.queue} | **Kolejka piosenek**\n${q}`);
  },
};
