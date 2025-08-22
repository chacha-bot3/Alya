module.exports = {
 config: {
 name: "pending",
 aliases: [`pen`],
 version: "1.0",
 author: "Rômeo",//cmd modified by Aryan Chauhan don't change my author name
 countDown: 0,
 role: 2,
 shortDescription: {
 vi: "",
 en: ""
 },
 longDescription: {
 vi: "",
 en: ""
 },
 category: "owner"
 },

langs: {
 en: {
 invaildNumber: "𝗜𝗡𝗩𝗔𝗟𝗘𝗗 𝗜𝗡𝗣𝗨𝗧:\n\n%1 is not an invalid number",
 cancelSuccess: "𝗖𝗔𝗡𝗖𝗘𝗟 𝗥𝗘𝗤𝗨𝗘𝗦𝗧:\n\nRefused %1 thread!",
 approveSuccess: "𝗔𝗣𝗣𝗥𝗢𝗩𝗘𝗗 𝗚𝗖:\n━━━━━━━━━━━━━━━〛\nApproved successfully %1 threads!",

 cantGetPendingList: "Can't get the pending list!",
 returnListPending: "»「𝗣𝗘𝗡𝗗𝗜𝗡𝗚 𝗚𝗖」\n━━━━━━━━━━━━━━━\n✅ ❮ The whole number of threads to approve is: %1 thread ❯\n\n%2",
 returnListClean: "「𝗣𝗘𝗡𝗗𝗜𝗡𝗚 𝗚𝗖」\n━━━━━━━━━━━━━━━\n❌ There is no thread in the pending list"
 }
 },

onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
 if (String(event.senderID) !== String(Reply.author)) return;
 const { body, threadID, messageID } = event;
 var count = 0;

 if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
 const index = (body.slice(1, body.length)).split(/\s+/);
 for (const singleIndex of index) {
 console.log(singleIndex);
 if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
 api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[singleIndex - 1].threadID);
 count+=1;
 }
 return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
 }
 else {
 const index = body.split(/\s+/);
 for (const singleIndex of index) {
 if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
 api.sendMessage(`✅𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘𝗗 𝗕𝗢𝗧\n━━━━━━━━━━━━━━━\n🎀 R0M30 BOT has been successfully connected 🫂🤍:\n\n📍 Type ${prefix}alyagc to enter the Messenger group 🙂🤍\n\n👉 Type ${prefix}commands to display the bot commands🫂🌝🤍`, Reply.pending[singleIndex - 1].threadID);
 count+=1;
 }
 return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
 }
},

onStart: async function({ api, event, getLang, commandName }) {
 const { threadID, messageID } = event;

 var msg = "", index = 1;

 try {
 var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
 var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
 } catch (e) { return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID) }

 const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

 for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

 if (list.length != 0) return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
 global.GoatBot.onReply.set(info.messageID, {
 commandName,
 messageID: info.messageID,
 author: event.senderID,
 pending: list
 })
 }, messageID);
 else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
}
}
