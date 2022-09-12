module.exports.config = {
  name: "chuibot",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ManhG",
  description: "Người chửi bot sẽ tự động bị ban khỏi hệ thống <3",
  commandCategory: "admin",
  usages: "",
  cooldowns: 0,
  denpendencies: {}
};

module.exports.handleReply = async function ({ api, args, Users, event, handleReply }) {
  const { threadID, messageID } = event;
  const { reason } = handleReply;
  var name = await Users.getNameUser(event.senderID);
  //const moment = require("moment-timezone");
  //const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
  var arg = event.body.split(" ");
  var uidUser = handleReply.author;
  var nameU = handleReply.nameU;
  //console.log(uidUser, nameU)
  switch (handleReply.type) {
    case "reply":
      {
        var idad = global.config.ADMINBOT;
        for (let ad of idad) {
          api.sendMessage({
            body: "🐸Lời chăng chối từ " + name + ":\n " + event.body,
            mentions: [{
              id: event.senderID,
              tag: name
            }]
          }, ad, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            messageID: data.messageID,
            messID: event.messageID,
            author: event.senderID,
            id: event.threadID,
            nameU: name,
            type: "banU"
          }))
        }
        break;
      }

    case "banU":
      {
        if (arg[0] == "unban" || arg[0] == "Unban") {

          let data = (await Users.getData(uidUser)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(uidUser, { data });
          global.data.userBanned.delete(uidUser, 1);

          api.sendMessage(`🌺Thông báo từ Admin ${name}🌺\n\n ${nameU}\n✅Bạn Đã Được Gỡ Ban✅\n- Có thể sử dụng bot ngay bây giờ🥳`, uidUser, () =>
            api.sendMessage(`${global.data.botID}`, () =>
              api.sendMessage(`★★UnBanSuccess★★\n\n🔷${nameU} \n✅TID:${uidUser} `, threadID)));
        } else {
          api.sendMessage({ body: `➢ lời cứu vớt từ admin đến bạn:\n\n${event.body}\n\n📩Reply tin nhắn này để gửi trả lời của bạn🌺`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
          break;
          
        }
      }

    case "chuibot":
      {
        api.sendMessage({ body: `🐸Admin thông tin đến bạn:\n\n${event.body}\n\n📩Reply tin nhắn này để nói lời chăng chối của bạn tới admin🌺`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
          name: this.config.name,
          author: event.senderID,
          messageID: data.messageID,
          type: "reply"
        }), handleReply.messID);
        break;
      }
  }
};

module.exports.handleEvent = async ({ event, api, Users, Threads }) => {
  var { threadID, messageID, body, senderID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:mm:ss D/MM/YYYY");
  
    var { threadID, messageID, body, senderID } = event; const thread = global.data.threadData.get(threadID) || {};
    if (typeof thread["fixspam"] !== "undefined" && thread["fixspam"] == false) return;

  if (senderID == global.data.botID) return;
  let name = await Users.getNameUser(event.senderID);
  var idbox = event.threadID;
  var threadInfo = (await Threads.getData(threadID)).threadInfo;
  //trả lời
  var msg = {
    body: `➢ Thông báo từ Admin\n\n${name}, bạn thật ngu ngok khi chửi bot vì vậy bot đã tự động ban bạn khỏi hệ thống✅\n\n💌Hãy nhờ ai đó sử dụng !callad + link fb để gở ban ( hên xui ), chúc bạn 1 ngày như con cặk 🖕\n\nThả tim cho bạn nè <3`
  }
  // Gọi bot
  const arr = ["botngu", "bot ngu", "bot gà", "con bot lol", "bot ngu lol", "bot chó", "dm bot", "đm bot", "dmm bot", "dmm bot", "đmm bot", "đb bot", "bot điên", "bot dở", "bot khùng", "đĩ bot", "bot paylac rồi", "con bot lòn", "cmm bot", "clap bot", "bot ncc", "bot oc", "bot óc", "bot óc chó", "cc bot", "bot tiki", "lozz bottt", "lol bot", "loz bot", "lồn bot", "bot lồn", "bot lon", "bot cac", "bot nhu lon", "bot như cc", "bot như bìu", "Bot sida", "bot sida", "bot fake", "bằng ngu", "bot shoppee","bot đểu", "bot dỡm"];

  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
      const uidUser = event.senderID;
      modules = "chui bot:"
      console.log(name, modules, i);
      const data = Users.getData(uidUser).data || {};
      Users.setData(uidUser, { data });
      data.banned = 1;
      data.reason = i || null;
      data.dateAdded = time;
      global.data.userBanned.set(uidUser, { reason: data.reason, dateAdded: data.dateAdded });

      api.sendMessage(msg, threadID, () => {
        var listAdmin = global.config.ADMINBOT;
        for (var idad of listAdmin) {
          let namethread = threadInfo.threadName;
          api.sendMessage(`🆘Tội nhân: ${name}\n🚫Uid: ${uidUser}\n🤷‍♂️Box: ${namethread}\n🐸Chửi bot: ${i}\n\n✅Đã bị ban khỏi hệ thống\nAdmin hãy reply tin nhắn này để chửi thằng bị ban`, idad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                author: senderID,
                messageID: info.messageID,
                messID: messageID,
                id: idbox,
                type: "chuibot"
              })
          );
        }
      });
    }
  });

};

module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt","successText": "autoban nhóm này thành công",},
  "en": {"on": "on","off": "off","successText": "autoban success!",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["autoban"] == "undefined" || data["autoban"] == true) data["autoban"] = false;
  else data["autoban"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["autoban"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
    }