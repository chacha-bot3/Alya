const fs = require('fs');

module.exports = {
	config: {
		name: "file",
		aliases: ["sage"],
		version: "1.0",
		author: "Mahir Tahsan",
		countDown: 5,
		role: 0,
		shortDescription: "Send bot script",
		longDescription: "Send bot specified file ",
		category: "𝗢𝗪𝗡𝗘𝗥",
		guide: "{pn} file name. Ex: .{pn} filename"
	},

	onStart: async function ({ message, args, api, event }) {
		const permission = ["100080355760429"];
		if (!permission.includes(event.senderID)) {
			return api.sendMessage(" 𝐇𝐄𝐈𝐍... 𝐯𝐨𝐮𝐬 𝐞𝐭𝐞𝐬 𝐟𝐨𝐮𝐬? 𝐬𝐞𝐮𝐥 𝐌𝐚𝐢𝐭𝐫𝐞 𝐬𝐨𝐦𝐛𝐫𝐚 𝐩𝐞𝐮𝐭 𝐮𝐬𝐞 𝐥𝐚 𝐜𝐦𝐝 𝐜𝐡𝐨𝐮 🧙", event.threadID, event.messageID);
		}

		const fileName = args[0];
		if (!fileName) {
			return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
		}

		const filePath = __dirname + `/${fileName}.js`;
		if (!fs.existsSync(filePath)) {
			return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
		}

		const fileContent = fs.readFileSync(filePath, 'utf8');
		api.sendMessage({ body: fileContent }, event.threadID);
	}
};
