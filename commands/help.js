const Discord = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder().setTitle("Komendy").setDescription(
          `!h - komendy\n
            !l - pętla\n
            !np - teraz odtwarzane\n
            !p [tytuł, url] - dodanie piosenki do odtwarzania\n
            !q - kolejka\n
            !s - pominięcie aktualnej piosenki\n
            !sall - pominięcie całej kolejki\n
            !pause - wstrzymanie odtwarzania piosenek\n
            !resume - wznowienie odtwarzania piosenki
            `
        ),
      ],
    });
  },
};
