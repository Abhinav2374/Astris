const { afkmap } = require("./afk");

async function afkCheck(message) {
  if (afkmap.has(message.author.id)) {
    afkmap.delete(message.author.id);
    message.reply(
      `Welcome back <@${message.author.id}>! I have removed your AFK status 😎`
    );
  }

  message.mentions.users.forEach((user) => {
    if (afkmap.has(user.id)) {
      const afkInfo = afkmap.get(user.id);
      message.reply(
        `${user.username} has been AFK in the server for reason : ${afkInfo.reason}`
      );
    }
  });
}

module.exports = { afkCheck };
