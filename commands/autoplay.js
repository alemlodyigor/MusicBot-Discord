module.exports = {
  name: "autoplay",
  inVoiceChannel: true,

  run: async (client, message) => {
    const queue = client.DisTube.getQueue(message);
    if (!queue)
      return message.channel.send(`${client.emotes.error} | Nic nie odtwarzam`);

    const autoplay = queue.toggleAutoPlay();
    message.channel.send(
      `${client.emotes.success} | Autoodtwarzanie: \`${
        autoplay ? "Włączone" : "Wyłączone"
      }\``
    );
  },
};
