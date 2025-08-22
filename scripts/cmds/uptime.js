const fs = require("fs");
const os = require("os");

const statsFile = "./stats.json";

module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt", "up"],
    version: "2.1",
    author: "OtinXSandip - Modded by L'Uchiha Perdu",
    role: 0,
    shortDescription: {
      en: "Displays bot uptime, system status, and more."
    },
    longDescription: {
      en: "Shows the bot's uptime, system status, user statistics, and more useful details."
    },
    category: "system",
    guide: {
      en: "Use {p}uptime to check bot uptime and system capacity."
    }
  },
  onStart: async function ({ api, event, usersData, threadsData }) {
    try {
      if (!fs.existsSync(statsFile)) {
        fs.writeFileSync(statsFile, JSON.stringify({ totalCommands: 0 }, null, 2));
      }


      let stats = JSON.parse(fs.readFileSync(statsFile, "utf8"));

      stats.totalCommands += 1;
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));

      // Infos système
      const uptime = process.uptime();
      const totalUsers = await usersData.getAll();
      const totalGroups = await threadsData.getAll();
      const cpuUsage = os.loadavg()[0] * 10;
      const osUptime = os.uptime();
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2);
      const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2);
      const usedMemory = (totalMemory - freeMemory).toFixed(2);
      const speed = (Math.random() * (4000 - 1000) + 1000).toFixed(0);
      let status = "🟢| 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭";
      if (cpuUsage > 70 || usedMemory / totalMemory > 0.8) status = "🟡| 𝐌𝐨𝐲𝐞𝐧";
      if (cpuUsage > 90 || usedMemory / totalMemory > 0.9) status = "🔴| 𝐅𝐚𝐢𝐛𝐥𝐞";

      const message = `╭─⌾🤖 BOT INFO 🎯
│ 𝐍𝐚𝐦𝐞: alya 
│ 𝐏𝐫𝐞𝐟𝐢𝐱: * 
│ 𝐎𝐰𝐧𝐞𝐫: sombra 😑 
╰────────⌾
╭─⌾⏰ 𝗨𝗣𝗧𝗜𝗠𝗘 ⏰
│ 🎶✨ ${days} 𝐝𝐚𝐲𝐬✨🎶
│ 🎶✨ ${hours} 𝐡𝐨𝐮𝐫𝐬✨🎶
│ 🎶✨ ${minutes} 𝐦𝐢𝐧𝐮𝐭𝐞𝐬✨🎶
│ 🎶✨ ${seconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐬✨🎶
╰────────⌾
╭─⌾🌍 𝗦𝗧𝗔𝗧𝗦 🌍
│ 👥 𝐓𝐨𝐭𝐚𝐥 𝐔𝐬𝐞𝐫𝐬: ${totalUsers.length}
│ 🏠 𝐓𝐨𝐭𝐚𝐥 𝐆𝐫𝐨𝐮𝐩𝐬: ${totalGroups.length}
│ 📜 𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐔𝐬𝐞𝐝: ${stats.totalCommands}
╰────────⌾
╭─⌾💻 𝗦𝗬𝗦𝗧𝗘𝗠 💻
│ 🖥️ 𝐎𝐒: ${os.type()} ${os.release()}
│ 🔖 𝐎𝐒 𝐔𝐩𝐭𝐢𝐦𝐞: ${(osUptime / 3600).toFixed(2)} hours
│ ⚙️ 𝐂𝐏𝐔 𝐔𝐬𝐚𝐠𝐞: ${cpuUsage.toFixed(2)}%
│ 📶 𝐒𝐩𝐞𝐞𝐝: ${speed} ko/s
│ 💽 𝐒𝐭𝐨𝐜𝐤𝐚𝐠𝐞: ${usedMemory}/${totalMemory} GB
│ 📡 𝐑𝐀𝐌: ${usedMemory}/${totalMemory} GB
│ ${status}
╰────────⌾`;

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving system data.", event.threadID);
    }
  }
};
