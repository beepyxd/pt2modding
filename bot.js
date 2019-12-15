const Discord = require("discord.js");
const client = new Discord.Client({fetchAllMembers: true, disableEveryone: true});
process.on('unhandledRejection', (reason, promise) => {
  reason = String(reason);
    if (reason.indexOf("Missing Permissions")==-1) {
      console.log(reason, promise);
    process.exit(1);
  }
});
client.on('ready', async () => {
	client.user.setActivity(`pt2 | Commands in progress!`, {type: "LISTENING"});
	console.log("I'm ready!")
});
client.on('message', async message => {
  if(message.content.indexOf("<@655703534733492235>")!=-1||message.content.indexOf("<@!655703534733492235>")!=-1) {message.react(":thinkping:512223822053769216").catch(()=>{})}
  if(message.channel.type!=="dm"){
  	if (message.channel.id!=="581184610067808298") return message.react(":whyhere:582157451848187904");
  }
  if(message.author.bot) return;
  var messageArray = message.content.split(" ");
  if (messageArray.length>0) {var cmd = messageArray[0].toLowerCase()} else {return}
  var messageArray2 = [];
	for (i=0; i<messageArray.length; i++) {if (messageArray[i]!=="") {messageArray2.push(messageArray[i])}}
	messageArray=messageArray2;
  var prefix = "pt2";
  if (cmd.indexOf(prefix)!=0) return;
  let args = messageArray.slice(1);
  let commandfile = cmd.slice(prefix.length);
  //commands
  if (commandfile==="ping") {
    var the_ping = Math.round(client.ping)-118;
    if (the_ping<100) {var color = "#00ff00"}
    else if (the_ping>99&&the_ping<500) {var color = "#ffff00"}
    else {var color = "#ff0000"}
    const n_embed = new Discord.RichEmbed()
    .setColor(color)
    .setDescription("Ping is **"+the_ping+"ms**")
    message.channel.send(n_embed);
  }
  if (commandfile==="say") {
    if (args.length > 0) {
	if(message.channel.type!=="dm") {
		message.delete(msg => msg.delete(1)).catch(()=>{});
	}
	return message.channel.send(args.join(" "));
    } else {
	return message.reply(":x: Please put your text!");
    }
  }
});

client.login(process.env.BOT_TOKEN);
