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
const fs = require("fs");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

client.DisTube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  youtubeCookie: JSON.parse(fs.readFileSync("cookies.json")),
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log("Could not find any commands!");

  const jsFiles = files.filter((f) => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) return console.log("Could not find any commands!");

  jsFiles.forEach((file) => {
    const cmd = require(`./commands/${file}`);
    console.log(`Loaded ${file}`);
    client.commands.set(cmd.name, cmd);
    if (cmd.aliases)
      cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
  });
});

client.on("ready", () => {
  console.log("Bot is now Online!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  const prefix = config.prefix;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (!cmd) return;
  if (cmd.inVoiceChannel && !message.member.voice.channel)
    return message.channel.send(
      `${client.emotes.error} | Musisz być na kanale głosowym`
    );

  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.error(e);
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
  }
});

client.DisTube.on("addSong", (queue, song) => {
  queue.textChannel.send(
    `${client.emotes.success} | Dodano ${song.name} - \`${song.formattedDuration}\` do kolejki!`
  );
});

client.DisTube.on("addList", (queue, playlist) => {
  queue.textChannel.send(
    `${client.emotes.success} | Dodano playlistę \`${playlist.name}\` (${
      playlist.songs.length
    } songs) do kolejki\n${status(queue)}`
  );
});

client.DisTube.on("searchNoResult", (message, query) =>
  message.channel.send(
    `${client.emotes.error} | Brak wyników dla \`${query}\`!`
  )
);

client.DisTube.on("empty", (channel) =>
  channel.send("Kanał głosowy jest pusty. Wychodzę...")
);

client.DisTube.on("playSong", (queue, song) => {
  try {
    if (queue && queue.textChannel)
      queue.textChannel.send(
        `${client.emotes.play} Akutalnie odtwarzam: ${song.name}\n${song.url}`
      );
    else
      console.error(
        "Error: Kolejka, TextChannel lub channel nie jest zdefiniowany"
      );
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

client.DisTube.on("error", (channel, e) => {
  if (channel)
    channel.send(
      `${client.emotes.error} | Wystąpił błąd: ${e
        .toString()
        .replace("PlayingError:", "")
        .slice(0, 1974)}`
    );
  else console.error(e);
});

client.DisTube.on("finish", (queue) =>
  queue.textChannel.send("Nie ma więcej piosenek w kolejce!")
);

client.login(process.env.TOKEN);
