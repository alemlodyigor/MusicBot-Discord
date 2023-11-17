require("dotenv").config();

const { DisTube } = require("distube");
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
  ],
});
const config = require("./config.json");

client.DisTube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
});

client.on("ready", () => {
  console.log("Bot is now Online!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot || !message.guild) return;

  const prefix = config.prefix;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;

  if (args.shift().toLowerCase() === "play") {
    try {
      client.DisTube.play(message.member.voice.channel, args.join(" "), {
        member: message.member,
        textChannel: message.channel,
        message,
      });
    } catch (error) {
      console.error("Error: ", error.message);
    }
  }
});

client.DisTube.on("playSong", (queue, song) => {
  try {
    if (queue && queue.textChannel)
      queue.textChannel.channel.send("NOW PLAYING " + song.name);
    else console.error("Error: Queue or TextChannel is undefined");
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

client.login(process.env.TOKEN);
