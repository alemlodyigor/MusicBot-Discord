module.exports = {
  name: "leave",

  run: async (client, message) => {
    client.DisTube.voices.leave(message);
  },
};
