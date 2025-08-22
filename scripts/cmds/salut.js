module.exports ={
  config: {
    name:"salut",
    aliases: ["hey","hi","hello","bonjour"],
    version: "1.0",
    author:"goatmart",
    countDown: 5,
    role: 0,
    shorDescription: "repondre aux salutations",
    longDescription: "Repondre avec un message des salutations quand l'utilisateur va saluer",
    category: "reply",
  },
  onStart: async function () {},
  onChat: async function({api,event, args, message}) {
    const salutation = event.body.trim().toLowerCase();
    
   if(salutation.includes("salut")){
    const reponseFr = [
  "Bonjour ! Comment vas-tu aujourd'hui ?",
  "Salut ! Heureux de te voir.",
  "Coucou 👋 ! Ça fait plaisir de te croiser.",
  "Bonsoir 🌙 ! Comment s'est passée ta journée ?",
  "Yo 😎 ! Quoi de neuf ?",
  "Hey 👋 ! Comment ça va ?",
  "Allô 📞 ! Qui est à l’appareil ?",
  "Salut à toi ! J’espère que tu vas bien.",
  "Heeey 🙌 ! Comment ça se passe ?",
  "Coucou mon ami(e) 😊 !",
  "Bonjour, ravi de te retrouver.",
  "Hey hey ! Toujours en forme ?",
  "Salut, prêt(e) pour une belle journée ?",
  "Coucou 🌸 ! Ça fait longtemps.",
  "Bonjour ☀️ ! Passe une excellente journée.",
  "Salut 😁 ! J’espère que tout roule.",
  "Bonsoir ✨ ! Prêt(e) à te détendre ?",
  "Hey 👌 ! Quoi de nouveau depuis la dernière fois ?",
  "Bonjour 🙋 ! J’ai pensé à toi aujourd’hui.",
  "Coucou 🎉 ! Tu illumines ma journée."
]
      const randomReponseFr = Math.floor(Math.random()* reponseFr.length)
api.setMessageReaction("🔮",event.messageID, () => {}, true)
      return message.reply(reponseFr[randomReponseFr])
    }
    
   else if(salutation.includes("hello")) {
  
     const reponseEn = [
  "Hello! How are you today?",
  "Hi! Nice to see you.",
  "Hey 👋! Glad to catch you.",
  "Good evening 🌙! How was your day?",
  "Yo 😎! What's up?",
  "Hey 👋! How's it going?",
  "Hello there 📞! Who's calling?",
  "Hi there! Hope you're doing well.",
  "Heeey 🙌! How’s everything?",
  "Hey buddy 😊!",
  "Good morning, happy to see you again.",
  "Hey hey! Still feeling great?",
  "Hi! Ready for a wonderful day?",
  "Hello 🌸! Long time no see.",
  "Good morning ☀️! Have a great day.",
  "Hi 😁! Hope everything’s going fine.",
  "Good evening ✨! Ready to relax?",
  "Hey 👌! What's new since last time?",
  "Hello 🙋! I thought about you today.",
  "Hey 🎉! You made my day brighter."
]

     api.setMessageReaction("🎉",event.messageID, ()=>{}, true)
     
        const randomReponseEn = Math.floor(Math.random()* reponseEn.length);
        return message.reply(reponseEn[randomReponseEn]);
   } else {
    
   }
  }
   }
