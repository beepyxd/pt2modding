const Discord = require("discord.js");
const _ = require('lodash');
const fs = require('fs');
const https = require('https');
const errors = require('./js/error_checker.js');
const client = new Discord.Client({fetchAllMembers: true, disableEveryone: true});
//restart with crash
process.on('unhandledRejection', (reason, promise) => {
	reason = String(reason);
	if (reason.indexOf("Missing Permissions")==-1) {
		console.log(reason, promise);
		process.exit(1);
	}
});
//bot
client.on('ready', async () => {
	client.user.setActivity(`pt2 | Commands in progress!`, {type: "LISTENING"});
	console.log("I'm ready!")
});
client.on('message', async message => {
	if(message.content.indexOf("<@655703534733492235>")!=-1||message.content.indexOf("<@!655703534733492235>")!=-1) {message.react(":thinkping:512223822053769216").catch(()=>{})}
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
		if (message.channel.type!=="dm") {if (message.channel.id!=="581184610067808298") return message.react(":whyhere:582157451848187904")}
		var the_ping = Math.round(client.ping);
		if (the_ping<200) {var color = "#00ff00"}
		else if (the_ping>199&&the_ping<500) {var color = "#ffff00"}
		else {var color = "#ff0000"}
		const n_embed = new Discord.RichEmbed()
		.setColor(color)
		.setDescription("Ping is **"+the_ping+"ms**")
		message.channel.send(n_embed);
	} else if (commandfile==="say") {
		if (message.channel.type!=="dm") {if (message.channel.id!=="581184610067808298") return message.react(":whyhere:582157451848187904")}
		if (args.length>0) {
			if (message.channel.type!=="dm") {
				message.delete(msg => msg.delete(1)).catch(()=>{});
			}
			return message.channel.send(args.join(" "));
		} else {
			return message.reply(":x: Please put your text!");
		}
	} else if (commandfile==="help") {
		if (message.channel.type!=="dm") {if (message.channel.id!=="581184610067808298") return message.react(":whyhere:582157451848187904")}
		let serverembed = new Discord.RichEmbed()
		.setColor("#00ffff")
		.setTitle("All commands")
		.setDescription("• `pt2ping` - Bot's ping\n• `pt2say` - Bot send your message")
		return message.channel.send(serverembed);
	} else if (commandfile==="ci") {
		if (message.channel.type!=="dm") {if (message.channel.id!=="581184610067808298") return message.react(":whyhere:582157451848187904")}
		try {
			var Attachment = message.attachments.first();
		} catch(e) {
			return message.reply(":x: Put JSON file!");
		}
		const file = fs.createWriteStream("a.json");
		https.get(Attachment.url, response => {
			const stream = response.pipe(file);
			stream.on("finish", async () => {
				var data = fs.readFileSync(file.path, 'utf8');
				if (!!args[0]) {var bpm1 = parseFloat(args[0])} else {var bpm1=""}
				if (!!args[1]) {var bpm2 = parseFloat(args[1])} else {var bpm2=""}
				if (!!args[2]) {var bpm3 = parseFloat(args[2])} else {var bpm3=""}
				function numbers(o) {return /[^\u0030-\u0039]/.test(o)}
				function info(data, bpm1, bpm2, bpm3) {
					var nbpm1 = bpm1; var nbpm2 = bpm2; var nbpm3 = bpm3;
					var delay="*no delay*";
					try {var new_data=JSON.parse(data)} catch(e) {return "**JSON ERROR:** Error result: `Unexpected end of JSON format`"};
					try {var id_first=new_data.musics[0].id} catch(e) {return "**JSON ERROR:** Error result: `Couldn't find first id`"}
					try {var id_sec=new_data.musics[1].id} catch(e) {return "**JSON ERROR:** Error result: `Couldn't find second id`"}
					try {var id_third=new_data.musics[2].id} catch(e) {return "**JSON ERROR:** Error result: `Couldn't find third id`"}
					try {var basebeats1=new_data.musics[0].baseBeats} catch(e) {return "**JSON ERROR:** Error result: `Couldn't find first baseBeats`"}
					try {var basebeats2=new_data.musics[1].baseBeats} catch(e) {return "**JSON ERROR:** Error result: `Couldn't find second baseBeats`"}
					try {var basebeats3=new_data.musics[2].baseBeats} catch(e) {return "**JSON ERROR:** Error result: `Couldn't find third baseBeats`"}
					try {var bpm1=new_data.musics[0].bpm} catch(e) {if (bpm1==="") return ":x: Couldn't find first bpm. Please put them in command! e.g. `pt2ci 100 101 102`"}
					try {var bpm2=new_data.musics[1].bpm} catch(e) {if (bpm2==="") return ":x: Couldn't find second bpm. Please put them in command! e.g. `pt2ci 100 101 102`"}
					try {var bpm3=new_data.musics[2].bpm} catch(e) {if (bpm3==="") return ":x: Couldn't find third bpm. Please put them in command! e.g. `pt2ci 100 101 102`"}
					try {var id1=new_data.musics[0].scores} catch(e) {return "**JSON ERROR:** Error result: `Couldn't find first scores`"}
					try {var id2=new_data.musics[1].scores} catch(e) {return "**JSON ERROR:** Error result: `Couldn't find second scores`"}
					try {var id3=new_data.musics[2].scores} catch(e) {return "**JSON ERROR:** Error result: `Couldn't find third scores`"}
					if (!bpm1) {bpm1=nbpm1} if (!bpm2) {bpm2=nbpm2} if (!bpm3) {bpm3=nbpm3}
					if (bpm1===""||parseFloat(bpm1)<=0) return ":x: Couldn't find first bpm or lower by 0. Please put them in command! e.g. `pt2ci 100 101 102`"
					if (bpm2===""||parseFloat(bpm2)<=0) return ":x: Couldn't find second bpm or lower by 0. Please put them in command! e.g. `pt2ci 100 101 102`"
					if (bpm3===""||parseFloat(bpm3)<=0) return ":x: Couldn't find third bpm or lower by 0. Please put them in command! e.g. `pt2ci 100 101 102`"
					if (!id_first) return "**JSON ERROR:** Error result: `Couldn't find first id`"
					if (!id_sec) return "**JSON ERROR:** Error result: `Couldn't find second id`"
					if (!id_third) return "**JSON ERROR:** Error result: `Couldn't find third id`"
					if (!basebeats1) return "**JSON ERROR:** Error result: `Couldn't find first baseBeats`"
					if (!basebeats2) return "**JSON ERROR:** Error result: `Couldn't find second baseBeats`"
					if (!basebeats3) return "**JSON ERROR:** Error result: `Couldn't find third baseBeats`"
					var multiplying1=0.03125/basebeats1;
					var multiplying2=0.03125/basebeats2;
					var multiplying3=0.03125/basebeats3;
					var first_path_id1=id1[0]; var id1_err=id1.join();
					var first_path_id2=id2[0]; var id2_err=id2.join();
					var first_path_id3=id3[0]; var id3_err=id3.join();
					var id1_path_bg1=[]; var id2_path_bg1=[]; var id3_path_bg1=[];
					var stuff_remove=/1|2|3|4|5|6|7|8|9|0|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2c|\x2d|\x2e|\x3b|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7d|\x7e|mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g/g;
					for (i=0; i<id1.length; i++) {
						var a1=id1[i].replace(stuff_remove, "").replace(/Q/g, "RR").replace(/R/g, "SS").replace(/S/g, "TT").replace(/T/g, "UU").replace(/U/g, "VV").replace(/V/g, "WW").replace(/W/g, "XX").replace(/X/g, "YY").replace(/Y/g, "P").replace(/H/g, "II").replace(/I/g, "JJ").replace(/J/g, "KK").replace(/K/g, "LL").replace(/L/g, "MM").replace(/M/g, "NN").replace(/N/g, "OO").replace(/O/g, "PP");
						id1_path_bg1.push(a1.length);
					}
					for (i=1; i<id1_path_bg1.length; i++) {
						var first_length=(id1_path_bg1[0]*multiplying1).toFixed(3);
						var path_background=(id1_path_bg1[i]*multiplying1).toFixed(3);
						j=i+1;
						if (path_background!=first_length) {delay=`**DELAY ERROR:** id: ${id_first}, Path 1: ${parseFloat(first_length)}, Path ${j}: ${parseFloat(path_background)}`}
					}
					for (i=0; i<id2.length; i++) {
						var a2=id2[i].replace(stuff_remove, "").replace(/Q/g, "RR").replace(/R/g, "SS").replace(/S/g, "TT").replace(/T/g, "UU").replace(/U/g, "VV").replace(/V/g, "WW").replace(/W/g, "XX").replace(/X/g, "YY").replace(/Y/g, "P").replace(/H/g, "II").replace(/I/g, "JJ").replace(/J/g, "KK").replace(/K/g, "LL").replace(/L/g, "MM").replace(/M/g, "NN").replace(/N/g, "OO").replace(/O/g, "PP");
						id2_path_bg1.push(a2.length);
					}
					for (i=1; i<id2_path_bg1.length; i++) {
						var first_length=(id2_path_bg1[0]*multiplying1).toFixed(3);
						var path_background=(id2_path_bg1[i]*multiplying1).toFixed(3);
						j=i+1;
						if (path_background!=first_length) {delay=`**DELAY ERROR:** id: ${id_second}, Path 1: ${parseFloat(first_length)}, Path ${j}: ${parseFloat(path_background)}`}
					}
					for (i=0; i<id3.length; i++) {
						var a3=id3[i].replace(stuff_remove, "").replace(/Q/g, "RR").replace(/R/g, "SS").replace(/S/g, "TT").replace(/T/g, "UU").replace(/U/g, "VV").replace(/V/g, "WW").replace(/W/g, "XX").replace(/X/g, "YY").replace(/Y/g, "P").replace(/H/g, "II").replace(/I/g, "JJ").replace(/J/g, "KK").replace(/K/g, "LL").replace(/L/g, "MM").replace(/M/g, "NN").replace(/N/g, "OO").replace(/O/g, "PP");
						id3_path_bg1.push(a3.length);
					}
					for (i=1; i<id3_path_bg1.length; i++) {
						var first_length=(id3_path_bg1[0]*multiplying1).toFixed(3);
						var path_background=(id3_path_bg1[i]*multiplying1).toFixed(3);
						j=i+1;
						if (path_background!=first_length) {delay=`**DELAY ERROR:** id: ${id_third}, Path 1: ${parseFloat(first_length)}, Path ${j}: ${parseFloat(path_background)}`}
					}
					var to_check_errors1=first_path_id1+id1_err;
					var to_check_errors2=first_path_id2+id2_err;
					var to_check_errors3=first_path_id3+id3_err;
					const tile="P"; const space="Y";
					var res1=errors.check(first_path_id1, to_check_errors1, multiplying1);
					var res2=errors.check(first_path_id2, to_check_errors2, multiplying2);
					var res3=errors.check(first_path_id3, to_check_errors3, multiplying3);
					if (res1!=="NO ERRORS!") return res1;
					if (res2!=="NO ERRORS!") return res2;
					if (res3!=="NO ERRORS!") return res3;
					var path_special=first_path_id1+first_path_id2+first_path_id3;
					path_special=path_special.replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/2\x3c/g, "hh<").replace(/3\x3c/g, "hi<").replace(/5\x3c/g, "hj<").replace(/6\x3c/g, "hk<").replace(/7\x3c/g, "hk<").replace(/8\x3c/g, "hk<").replace(/9\x3c/g, "hk<").replace(/10\x3c/g, "hh<").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256));
					var b1=path_special.match(/\x3c/g);
					if (b1==null) {b1=""}
					var b2=path_special.match(/\x3e/g);
					if (b1.length>0&&b2==null) {path_special="hk<>,hk<>"}
					var special_tiles=[];
					for (i=0; i<path_special.length; i++) {
						j=i+1;
						if (path_special[i].includes("<")&&!path_special[i].includes(">")) {
							special_tiles.push(path_special[i]);
							path_special[i]=path_special[i].replace(path_special[i], "");
							if (!path_special[j].includes(">")) {path_special[j]=(`${path_special[j]}<`)}
						} else if (path_special[i].includes(">")&&!path_special[i].includes("<")) {
							special_tiles.push(path_special[i]);
							path_special[i]=path_special[i].replace(path_special[i], "");
						} else if (path_special[i].includes(">")&&path_special[i].includes("<")) {
							special_tiles.push(path_special[i]);
							path_special[i]=path_special[i].replace(path_special[i], "");
						}
					}
					for (i=0; i<special_tiles.length; i++) {
						if (special_tiles[i].lastIndexOf("<")==special_tiles[i].length-1) {
							special_tiles[i]=special_tiles[i].substr(0, special_tiles[i].length-1);
						}
						special_tiles[i]=special_tiles[i].replace(/\x3e/g, ">>");
					}
					if (special_tiles=="") {special_tiles=["hk<>>", "hk<>>"]}
					if (special_tiles[0].indexOf("h")==0) {
						special_tiles[0]=special_tiles[0].substr(1, special_tiles[0].length);
					}
					var special_tiles1=special_tiles.pop();
					if (special_tiles1.lastIndexOf(">")>special_tiles1.length-2) {
						special_tiles1=special_tiles1.substr(0, special_tiles1.length-1);
					}
					special_tiles.push(special_tiles1);
					special_tiles=special_tiles.join();
					special_tiles=special_tiles.split(">,h");
					for (i=0; i<special_tiles.length; i++) {
						if (special_tiles[i].includes("h")) {special_tiles[i]=1}
						else if (special_tiles[i].includes("i")) {
							var combo_length=special_tiles[i].split(",");
							special_tiles[i]=combo_length.length;
						}
						else if (special_tiles[i].includes("j")) {special_tiles[i]=4}
						else if (special_tiles[i].includes("k")) {special_tiles[i]=0}
					}
					var special_tiles_calc=0;
					for (i=0; i<special_tiles.length; i++) {special_tiles_calc=special_tiles_calc+special_tiles[i]}
					path_special=special_tiles_calc;
					var first_path_id1_normal=first_path_id1.replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/2\x3c/g, "hh<").replace(/3\x3c/g, "hi<").replace(/5\x3c/g, "hj<").replace(/6\x3c/g, "hk<").replace(/7\x3c/g, "hk<").replace(/8\x3c/g, "hk<").replace(/9\x3c/g, "hk<").replace(/10\x3c/g, "hh<").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256));
					var b1=first_path_id1_normal.match(/\x3c/g);
					if (b1==null) {b1=""}
					var b2=first_path_id1_normal.match(/\x3e/g);
					if (b1.length>0&&b2==null) {first_path_id1_normal="hh<>,hh<>"}
					var special_tiles2=[];
					first_path_id1_normal=first_path_id1_normal.split(",");
					for (i=0; i<first_path_id1_normal.length; i++) {
						j=i+1;
						if (first_path_id1_normal[i].includes("<")&&!first_path_id1_normal[i].includes(">")) {
							special_tiles2.push(first_path_id1_normal[i]);
							first_path_id1_normal[i]=first_path_id1_normal[i].replace(first_path_id1_normal[i], "");
							if (!first_path_id1_normal[j].includes(">")) {first_path_id1_normal[j]=(`${first_path_id1_normal[j]}<`)}
						} else if (first_path_id1_normal[i].includes(">")&&!first_path_id1_normal[i].includes("<")) {
							special_tiles2.push(first_path_id1_normal[i]);
							first_path_id1_normal[i]=first_path_id1_normal[i].replace(first_path_id1_normal[i], "");
						} else if (first_path_id1_normal[i].includes(">")&&first_path_id1_normal[i].includes("<")) {
							special_tiles2.push(first_path_id1_normal[i]);
							first_path_id1_normal[i]=first_path_id1_normal[i].replace(first_path_id1_normal[i], "");
						}
					}
					for (i=0; i<special_tiles2.length; i++) {
						if (special_tiles2[i].lastIndexOf("<")==special_tiles2[i].length-1) {
							special_tiles2[i]=special_tiles2[i].substr(0, special_tiles2[i].length-1);
						}
						special_tiles2[i]=special_tiles2[i].replace(/\x3e/g, ">>");
					}
					if (special_tiles2=="") {special_tiles2=["hh<>>", "hh<>>"]}
					if (special_tiles2[0].indexOf("h")==0) {
						special_tiles2[0]=special_tiles2[0].substr(1, special_tiles2[0].length);
					}
					var special_tiles21=special_tiles2.pop();
					if (special_tiles21.includes(">")) {
						special_tiles21=special_tiles21.substr(0, special_tiles21.length-1);
					}
					special_tiles2.push(special_tiles21);
					special_tiles2=special_tiles2.join();
					special_tiles2=special_tiles2.split(">,h");
					for (i=0; i<special_tiles2.length; i++) {
						if (special_tiles2[i].includes("h")) {special_tiles2[i]=""}
						else if (special_tiles2[i].includes("i")) {special_tiles2[i]=""}
						else if (special_tiles2[i].includes("j")) {special_tiles2[i]=""}
						else {special_tiles2[i]=special_tiles2[i].replace(/k|\x3c|\x3e|\x2c/g, "")}
					}
					special_tiles2=special_tiles2.map(({length}) => {
						const length_of_tile=length*multiplying1;
						let m=length_of_tile%1;
						if (length_of_tile==1&&m==0) {m=0}
						else if (length_of_tile<1.5&&length_of_tile>1) {m=1}
						else if (length_of_tile<2&&length_of_tile>=1.5) {m=2}
						if (length_of_tile==2) {m=1}
						else if (length_of_tile>2&&m<0.5) {m=1}
						else if (length_of_tile>2&&m>=0.5||length_of_tile>2&&m<1) {m=2}
						const finaled=parseInt(length_of_tile)+m;
						return finaled;
					});
					var special_tiles2_calc=0;
					for (i=0; i<special_tiles2.length; i++) {special_tiles2_calc=special_tiles2_calc+special_tiles2[i]}
					for (i=0; i<first_path_id1_normal.length; i++) {
						if (first_path_id1_normal[i].includes("Y")) {
							first_path_id1_normal[i]=first_path_id1_normal[i].replace(first_path_id1_normal[i], "");
						}
					}
					var first_path_id1_normal_new=first_path_id1_normal.map(({length}) => {
						const length_of_tile=length*multiplying1;
						let m=length_of_tile%1;
						if (length_of_tile==1&&m==0) {m=0}
						else if (length_of_tile<1.5&&length_of_tile>1) {m=1}
						else if (length_of_tile<2&&length_of_tile>=1.5) {m=2}
						if (length_of_tile==2) {m=1}
						else if (length_of_tile>2&&m<0.5) {m=1}
						else if (length_of_tile>2&&m>=0.5||length_of_tile>2&&m<1) {m=2}
						const finaled=parseInt(length_of_tile)+m;
						return finaled;
					});
					first_path_id1_normal=first_path_id1_normal_new;
					var first_path_id1_normal_calc=0;
					for (i=0; i<first_path_id1_normal.length; i++) {first_path_id1_normal_calc=first_path_id1_normal_calc+first_path_id1_normal[i]}
					first_path_id1_normal_calc=first_path_id1_normal_calc+special_tiles2_calc;
					//first_path_id2
					var first_path_id2_normal=first_path_id2.replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/2\x3c/g, "hh<").replace(/3\x3c/g, "hi<").replace(/5\x3c/g, "hj<").replace(/6\x3c/g, "hk<").replace(/7\x3c/g, "hk<").replace(/8\x3c/g, "hk<").replace(/9\x3c/g, "hk<").replace(/10\x3c/g, "hh<").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256));
					var b1=first_path_id2_normal.match(/\x3c/g);
					if (b1==null) {b1=""}
					var b2=first_path_id2_normal.match(/\x3e/g);
					if (b1.length>0&&b2==null) {first_path_id2_normal="hh<>,hh<>"}
					var special_tiles2=[];
					first_path_id2_normal=first_path_id2_normal.split(",");
					for (i=0; i<first_path_id2_normal.length; i++) {
						j=i+1;
						if (first_path_id2_normal[i].includes("<")&&!first_path_id2_normal[i].includes(">")) {
							special_tiles2.push(first_path_id2_normal[i]);
							first_path_id2_normal[i]=first_path_id2_normal[i].replace(first_path_id2_normal[i], "");
							if (!first_path_id2_normal[j].includes(">")) {first_path_id2_normal[j]=(`${first_path_id2_normal[j]}<`)}
						} else if (first_path_id2_normal[i].includes(">")&&!first_path_id2_normal[i].includes("<")) {
							special_tiles2.push(first_path_id2_normal[i]);
							first_path_id2_normal[i]=first_path_id2_normal[i].replace(first_path_id2_normal[i], "");
						} else if (first_path_id2_normal[i].includes(">")&&first_path_id2_normal[i].includes("<")) {
							special_tiles2.push(first_path_id2_normal[i]);
							first_path_id2_normal[i]=first_path_id2_normal[i].replace(first_path_id2_normal[i], "");
						}
					}
					for (i=0; i<special_tiles2.length; i++) {
						if (special_tiles2[i].lastIndexOf("<")==special_tiles2[i].length-1) {
							special_tiles2[i]=special_tiles2[i].substr(0, special_tiles2[i].length-1);
						}
						special_tiles2[i]=special_tiles2[i].replace(/\x3e/g, ">>");
					}
					if (special_tiles2=="") {special_tiles2=["hh<>>", "hh<>>"]}
					if (special_tiles2[0].indexOf("h")==0) {
						special_tiles2[0]=special_tiles2[0].substr(1, special_tiles2[0].length);
					}
					var special_tiles21=special_tiles2.pop();
					if (special_tiles21.includes(">")) {
						special_tiles21=special_tiles21.substr(0, special_tiles21.length-1);
					}
					special_tiles2.push(special_tiles21);
					special_tiles2=special_tiles2.join();
					special_tiles2=special_tiles2.split(">,h");
					for (i=0; i<special_tiles2.length; i++) {
						if (special_tiles2[i].includes("h")) {special_tiles2[i]=""}
						else if (special_tiles2[i].includes("i")) {special_tiles2[i]=""}
						else if (special_tiles2[i].includes("j")) {special_tiles2[i]=""}
						else {special_tiles2[i]=special_tiles2[i].replace(/k|\x3c|\x3e|\x2c/g, "")}
					}
					var special_tiles2=special_tiles2.map(({length}) => {
						const length_of_tile=length*multiplying2;
						let m=length_of_tile%1;
						if (length_of_tile==1&&m==0) {m=0}
						else if (length_of_tile<1.5&&length_of_tile>1) {m=1}
						else if (length_of_tile<2&&length_of_tile>=1.5) {m=2}
						if (length_of_tile==2) {m=1}
						else if (length_of_tile>2&&m<0.5) {m=1}
						else if (length_of_tile>2&&m>=0.5||length_of_tile>2&&m<1) {m=2}
						const finaled=parseInt(length_of_tile)+m;
						return finaled;
					});
					var special_tiles2_calc=0;
					for (i=0; i<special_tiles2.length; i++) {special_tiles2_calc=special_tiles2_calc+special_tiles2[i]}
					for (i=0; i<first_path_id2_normal.length; i++) {
						if (first_path_id2_normal[i].includes("Y")) {
							first_path_id2_normal[i]=first_path_id2_normal[i].replace(first_path_id2_normal[i], "");
						}
					}
					var first_path_id2_normal_new=first_path_id2_normal.map(({length}) => {
						const length_of_tile=length*multiplying2;
						let m=length_of_tile%1;
						if (length_of_tile==1&&m==0) {m=0}
						else if (length_of_tile<1.5&&length_of_tile>1) {m=1}
						else if (length_of_tile<2&&length_of_tile>=1.5) {m=2}
						if (length_of_tile==2) {m=1}
						else if (length_of_tile>2&&m<0.5) {m=1}
						else if (length_of_tile>2&&m>=0.5||length_of_tile>2&&m<1) {m=2}
						const finaled=parseInt(length_of_tile)+m;
						return finaled;
					});
					first_path_id2_normal=first_path_id2_normal_new;
					var first_path_id2_normal_calc=0;
					for (i=0; i<first_path_id2_normal.length; i++) {first_path_id2_normal_calc=first_path_id2_normal_calc+first_path_id2_normal[i]}
					first_path_id2_normal_calc=first_path_id2_normal_calc+special_tiles2_calc;
					//first_path_id3
					var first_path_id3_normal=first_path_id3.replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/2\x3c/g, "hh<").replace(/3\x3c/g, "hi<").replace(/5\x3c/g, "hj<").replace(/6\x3c/g, "hk<").replace(/7\x3c/g, "hk<").replace(/8\x3c/g, "hk<").replace(/9\x3c/g, "hk<").replace(/10\x3c/g, "hh<").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256));
					var b1=first_path_id3_normal.match(/\x3c/g);
					if (b1==null) {b1=""}
					var b2=first_path_id3_normal.match(/\x3e/g);
					if (b1.length>0&&b2==null) {first_path_id3_normal="hh<>,hh<>"}
					var special_tiles2=[];
					first_path_id3_normal=first_path_id3_normal.split(",");
					for (i=0; i<first_path_id3_normal.length; i++) {
						j=i+1;
						if (first_path_id3_normal[i].includes("<")&&!first_path_id3_normal[i].includes(">")) {
							special_tiles2.push(first_path_id3_normal[i]);
							first_path_id3_normal[i]=first_path_id3_normal[i].replace(first_path_id3_normal[i], "");
							if (!first_path_id3_normal[j].includes(">")) {first_path_id3_normal[j]=(`${first_path_id3_normal[j]}<`)}
						} else if (first_path_id3_normal[i].includes(">")&&!first_path_id3_normal[i].includes("<")) {
							special_tiles2.push(first_path_id3_normal[i]);
							first_path_id3_normal[i]=first_path_id3_normal[i].replace(first_path_id3_normal[i], "");
						} else if (first_path_id3_normal[i].includes(">")&&first_path_id3_normal[i].includes("<")) {
							special_tiles2.push(first_path_id3_normal[i]);
							first_path_id3_normal[i]=first_path_id3_normal[i].replace(first_path_id3_normal[i], "");
						}
					}
					for (i=0; i<special_tiles2.length; i++) {
						if (special_tiles2[i].lastIndexOf("<")==special_tiles2[i].length-1) {
							special_tiles2[i]=special_tiles2[i].substr(0, special_tiles2[i].length-1);
						}
						special_tiles2[i]=special_tiles2[i].replace(/\x3e/g, ">>");
					}
					if (special_tiles2=="") {special_tiles2=["hh<>>", "hh<>>"]}
					if (special_tiles2[0].indexOf("h")==0) {
						special_tiles2[0]=special_tiles2[0].substr(1, special_tiles2[0].length);
					}
					var special_tiles21=special_tiles2.pop();
					if (special_tiles21.includes(">")) {
						special_tiles21=special_tiles21.substr(0, special_tiles21.length-1);
					}
					special_tiles2.push(special_tiles21);
					special_tiles2=special_tiles2.join();
					special_tiles2=special_tiles2.split(">,h");
					for (i=0; i<special_tiles2.length; i++) {
						if (special_tiles2[i].includes("h")) {special_tiles2[i]=""}
						else if (special_tiles2[i].includes("i")) {special_tiles2[i]=""}
						else if (special_tiles2[i].includes("j")) {special_tiles2[i]=""}
						else {special_tiles2[i]=special_tiles2[i].replace(/k|\x3c|\x3e|\x2c/g, "")}
					}
					var special_tiles2=special_tiles2.map(({length}) => {
						const length_of_tile=length*multiplying3;
						let m=length_of_tile%1;
						if (length_of_tile==1&&m==0) {m=0}
						else if (length_of_tile<1.5&&length_of_tile>1) {m=1}
						else if (length_of_tile<2&&length_of_tile>=1.5) {m=2}
						if (length_of_tile==2) {m=1}
						else if (length_of_tile>2&&m<0.5) {m=1}
						else if (length_of_tile>2&&m>=0.5||length_of_tile>2&&m<1) {m=2}
						const finaled=parseInt(length_of_tile)+m;
						return finaled;
					});
					var special_tiles2_calc=0;
					for (i=0; i<special_tiles2.length; i++) {special_tiles2_calc=special_tiles2_calc+special_tiles2[i]}
					for (i=0; i<first_path_id3_normal.length; i++) {
						if (first_path_id3_normal[i].includes("Y")) {
							first_path_id3_normal[i]=first_path_id3_normal[i].replace(first_path_id3_normal[i], "");
						}
					}
					var first_path_id3_normal_new=first_path_id3_normal.map(({length}) => {
						const length_of_tile=length*multiplying3;
						let m=length_of_tile%1;
						if (length_of_tile==1&&m==0) {m=0}
						else if (length_of_tile<1.5&&length_of_tile>1) {m=1}
						else if (length_of_tile<2&&length_of_tile>=1.5) {m=2}
						if (length_of_tile==2) {m=1}
						else if (length_of_tile>2&&m<0.5) {m=1}
						else if (length_of_tile>2&&m>=0.5||length_of_tile>2&&m<1) {m=2}
						const finaled=parseInt(length_of_tile)+m;
						return finaled;
					});
					first_path_id3_normal=first_path_id3_normal_new;
					var first_path_id3_normal_calc=0;
					for (i=0; i<first_path_id3_normal.length; i++) {first_path_id3_normal_calc=first_path_id3_normal_calc+first_path_id3_normal[i]}
					first_path_id3_normal_calc=first_path_id3_normal_calc+special_tiles2_calc;
					var path_normal=first_path_id1_normal_calc+first_path_id2_normal_calc+first_path_id3_normal_calc;
					//calculating background tiles
					var first_path_id_bg=first_path_id1.replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/\x3c|\x3e/g, "|").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256)).split("|");
					for (i=1; i<first_path_id_bg.length; i += 2) {
						first_path_id_bg[i]=first_path_id_bg[i].replace(/Y/g, "P");
						first_path_id_bg[i]=first_path_id_bg[i].replace(/\x2c/g, "");
					}
					first_path_id_bg=first_path_id_bg.join("");
					first_path_id_bg=first_path_id_bg.split(",");
					first_path_id_bg.pop();
					for (i=1; i<id1.length; i++) {
						var id1_a=id1[i].replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/\x2c\x2c/g, ",").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256)).split(",");
						for (j=0; j<id1_a.length; j++) {
							id1_a[j]=id1_a[j].replace(/Y/g, "0,");
							if (id1_a[j].indexOf("P")==0) {
								id1_a[j]=id1_a[j].replace(/P/g, "0,");
								id1_a[j]=`1,${id1_a[j].substr(2)}`;
							}
						}
						id1_a=id1_a.join("");
						id1_a=id1_a.split(",");
						for (j=0; j<id1_a.length; j++) {
							id1_a[j]=parseInt(id1_a[j]);
							if (isNaN(id1_a[j])) {id1_a[j]=0}
						}
						id1[i]=id1_a;
					}
					id1.shift();
					var id1_bg=_.unzipWith(id1, _.add);
					for (i=0; i<id1_bg.length; i++) {
						if (id1_bg[i]>0) {id1_bg[i]=1}
					}
					id1_bg=id1_bg.join("");
					for (i=0; i<first_path_id_bg.length; i++) {
						if (first_path_id_bg[i].includes("Y")) {first_path_id_bg[i]=`|${first_path_id_bg[i]}|`}
					}
					first_path_id_bg=first_path_id_bg.join("");
					first_path_id_bg=first_path_id_bg.replace(/\x7c\x7c/g, "|");
					first_path_id_bg=first_path_id_bg.split("|");
					var array_a=[];
					for (i=0; i<first_path_id_bg.length; i++) {
						k=first_path_id_bg[i].length;
						first_path_id_bg[i]=first_path_id_bg[i].replace(/P/g, "2");
						first_path_id_bg[i]=first_path_id_bg[i].replace(/Y/g, "0");
						id1_bg=`${id1_bg.substr(0, k)},${id1_bg.substr(k)}`;
						id1_bg=id1_bg.split(",");
						array_a.push(id1_bg[0]);
						id1_bg=id1_bg[1];
					}
					for (i=0; i<first_path_id_bg.length; i++) {
						if (first_path_id_bg[i].includes("2")) {
							first_path_id_bg[i]=first_path_id_bg[i].replace(/2/g, "");
						} else if (first_path_id_bg[i].includes("0")&&array_a[i].includes("1")) {
							first_path_id_bg[i]=first_path_id_bg[i].replace(/0/g, "P");
						} else {
							first_path_id_bg[i]="";
						}
					}
					var first_path_id_bg_new=first_path_id_bg.map(({length}) => {
						const length_of_tile=length*multiplying1;
						let m=length_of_tile%1;
						if (length_of_tile==1&&m==0) {m=0}
						else if (length_of_tile<1.5&&length_of_tile>1) {m=1}
						else if (length_of_tile<2&&length_of_tile>=1.5) {m=2}
						if (length_of_tile==2) {m=1}
						else if (length_of_tile>2&&m<0.5) {m=1}
						else if (length_of_tile>2&&m>=0.5||length_of_tile>2&&m<1) {m=2}
						const finaled=parseInt(length_of_tile)+m;
						return finaled;
					});
					first_path_id_bg=first_path_id_bg_new;
					var first_path_id_normal_calc=0;
					for (i=0; i<first_path_id_bg.length; i++) {first_path_id_normal_calc=first_path_id_normal_calc+first_path_id_bg[i]}
					var second_path_id_bg=first_path_id2.replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/\x3c|\x3e/g, "|").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256)).split("|");
					for (i=1; i<second_path_id_bg.length; i += 2) {
						second_path_id_bg[i]=second_path_id_bg[i].replace(/Y/g, "P");
						second_path_id_bg[i]=second_path_id_bg[i].replace(/\x2c/g, "");
					}
					second_path_id_bg=second_path_id_bg.join("");
					second_path_id_bg=second_path_id_bg.split(",");
					second_path_id_bg.pop();
					for (i=1; i<id2.length; i++) {
						var id2_a=id2[i].replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/\x2c\x2c/g, ",").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256)).split(",");
						for (j=0; j<id2_a.length; j++) {
							id2_a[j]=id2_a[j].replace(/Y/g, "0,");
							if (id2_a[j].indexOf("P")==0) {
								id2_a[j]=id2_a[j].replace(/P/g, "0,");
								id2_a[j]=`1,${id2_a[j].substr(2)}`;
							}
						}
						id2_a=id2_a.join("");
						id2_a=id2_a.split(",");
						for (j=0; j<id2_a.length; j++) {
							id2_a[j]=parseInt(id2_a[j]);
							if (isNaN(id2_a[j])) {id2_a[j]=0}
						}
						id2[i]=id2_a;
					}
					id2.shift();
					var id2_bg=_.unzipWith(id2, _.add);
					for (i=0; i<id2_bg.length; i++) {
						if (id2_bg[i]>0) {id2_bg[i]=1}
					}
					id2_bg=id2_bg.join("");
					for (i=0; i<second_path_id_bg.length; i++) {
						if (second_path_id_bg[i].includes("Y")) {second_path_id_bg[i]=`|${second_path_id_bg[i]}|`}
					}
					second_path_id_bg=second_path_id_bg.join("");
					second_path_id_bg=second_path_id_bg.replace(/\x7c\x7c/g, "|");
					second_path_id_bg=second_path_id_bg.split("|");
					var array_a=[];
					for (i=0; i<second_path_id_bg.length; i++) {
						k=second_path_id_bg[i].length;
						second_path_id_bg[i]=second_path_id_bg[i].replace(/P/g, "2");
						second_path_id_bg[i]=second_path_id_bg[i].replace(/Y/g, "0");
						id2_bg=`${id2_bg.substr(0, k)},${id2_bg.substr(k)}`;
						id2_bg=id2_bg.split(",");
						array_a.push(id2_bg[0]);
						id2_bg=id2_bg[1];
					}
					for (i=0; i<second_path_id_bg.length; i++) {
						if (second_path_id_bg[i].includes("2")) {
							second_path_id_bg[i]=second_path_id_bg[i].replace(/2/g, "");
						} else if (second_path_id_bg[i].includes("0")&&array_a[i].includes("1")) {
							second_path_id_bg[i]=second_path_id_bg[i].replace(/0/g, "P");
						} else {
							second_path_id_bg[i]="";
						}
					}
					var second_path_id_bg_new=second_path_id_bg.map(({length}) => {
						const length_of_tile=length*multiplying2;
						let m=length_of_tile%1;
						if (length_of_tile==1&&m==0) {m=0}
						else if (length_of_tile<1.5&&length_of_tile>1) {m=1}
						else if (length_of_tile<2&&length_of_tile>=1.5) {m=2}
						if (length_of_tile==2) {m=1}
						else if (length_of_tile>2&&m<0.5) {m=1}
						else if (length_of_tile>2&&m>=0.5||length_of_tile>2&&m<1) {m=2}
						const finaled=parseInt(length_of_tile)+m;
						return finaled;
					});
					second_path_id_bg=second_path_id_bg_new;
					var second_path_id_normal_calc=0;
					for (i=0; i<second_path_id_bg.length; i++) {second_path_id_normal_calc=second_path_id_normal_calc+second_path_id_bg[i]}
					var third_path_id_bg=first_path_id3.replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/\x3c|\x3e/g, "|").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256)).split("|");
					for (i=1; i<third_path_id_bg.length; i += 2) {
						third_path_id_bg[i]=third_path_id_bg[i].replace(/Y/g, "P");
						third_path_id_bg[i]=third_path_id_bg[i].replace(/\x2c/g, "");
					}
					third_path_id_bg=third_path_id_bg.join("");
					third_path_id_bg=third_path_id_bg.split(",");
					third_path_id_bg.pop();
					for (i=1; i<id3.length; i++) {
						var id3_a=id3[i].replace(/\x3b/g, ",").replace(/\x2c\x2c/g, ",").replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "").replace(/\x2c\x2c/g, ",").replace(/P/g, tile.repeat(1)).replace(/O/g, tile.repeat(2)).replace(/N/g, tile.repeat(4)).replace(/M/g, tile.repeat(8)).replace(/L/g, tile.repeat(16)).replace(/K/g, tile.repeat(32)).replace(/J/g, tile.repeat(64)).replace(/I/g, tile.repeat(128)).replace(/H/g, tile.repeat(256)).replace(/Y/g, space.repeat(1)).replace(/X/g, space.repeat(2)).replace(/W/g, space.repeat(4)).replace(/V/g, space.repeat(8)).replace(/U/g, space.repeat(16)).replace(/T/g, space.repeat(32)).replace(/S/g, space.repeat(64)).replace(/R/g, space.repeat(128)).replace(/Q/g, space.repeat(256)).split(",");
						for (j=0; j<id3_a.length; j++) {
							id3_a[j]=id3_a[j].replace(/Y/g, "0,");
							if (id3_a[j].indexOf("P")==0) {
								id3_a[j]=id3_a[j].replace(/P/g, "0,");
								id3_a[j]=`1,${id3_a[j].substr(2)}`;
							}
						}
						id3_a=id3_a.join("");
						id3_a=id3_a.split(",");
						for (j=0; j<id3_a.length; j++) {
							id3_a[j]=parseInt(id3_a[j]);
							if (isNaN(id3_a[j])) {id3_a[j]=0}
						}
						id3[i]=id3_a;
					}
					id3.shift();
					var id3_bg=_.unzipWith(id3, _.add);
					for (i=0; i<id3_bg.length; i++) {
						if (id3_bg[i]>0) {id3_bg[i]=1}
					}
					id3_bg=id3_bg.join("");
					for (i=0; i<third_path_id_bg.length; i++) {
						if (third_path_id_bg[i].includes("Y")) {
							third_path_id_bg[i]=`|${third_path_id_bg[i]}|`;
						}
					}
					third_path_id_bg=third_path_id_bg.join("");
					third_path_id_bg=third_path_id_bg.replace(/\x7c\x7c/g, "|");
					third_path_id_bg=third_path_id_bg.split("|");
					var array_a=[];
					for (i=0; i<third_path_id_bg.length; i++) {
						k=third_path_id_bg[i].length;
						third_path_id_bg[i]=third_path_id_bg[i].replace(/P/g, "2");
						third_path_id_bg[i]=third_path_id_bg[i].replace(/Y/g, "0");
						id3_bg=`${id3_bg.substr(0, k)},${id3_bg.substr(k)}`;
						id3_bg=id3_bg.split(",");
						array_a.push(id3_bg[0]);
						id3_bg=id3_bg[1];
					}
					for (i=0; i<third_path_id_bg.length; i++) {
						if (third_path_id_bg[i].includes("2")) {
							third_path_id_bg[i]=third_path_id_bg[i].replace(/2/g, "");
						} else if (third_path_id_bg[i].includes("0")&&array_a[i].includes("1")) {
							third_path_id_bg[i]=third_path_id_bg[i].replace(/0/g, "P");
						} else {
							third_path_id_bg[i]="";
						}
					}
					var third_path_id_bg_new=third_path_id_bg.map(({length}) => {
						const length_of_tile=length*multiplying3;
						let m=length_of_tile%1;
						if (length_of_tile==1&&m==0) {m=0}
						else if (length_of_tile<1.5&&length_of_tile>1) {m=1}
						else if (length_of_tile<2&&length_of_tile>=1.5) {m=2}
						if (length_of_tile==2) {m=1}
						else if (length_of_tile>2&&m<0.5) {m=1}
						else if (length_of_tile>2&&m>=0.5||length_of_tile>2&&m<1) {m=2}
						const finaled=parseInt(length_of_tile)+m;
						return finaled;
					});
					third_path_id_bg=third_path_id_bg_new;
					var third_path_id_normal_calc=0;
					for (i=0; i<third_path_id_bg.length; i++) {
						third_path_id_normal_calc=third_path_id_normal_calc+third_path_id_bg[i];
					}
					var all_bg_points=first_path_id_normal_calc+second_path_id_normal_calc+third_path_id_normal_calc;
					//all points
					var all_points=parseInt(path_special)+parseInt(path_normal)+parseInt(all_bg_points);
					var ppr = `${all_points}`;
					let star1=first_path_id1; let star2=first_path_id2; let star3=first_path_id3;
					const full_lap=star1+star2+star3;
					doubles_amount=(full_lap.match(/5\x3c/g)||[]).length;
					combo_amount=(full_lap.match(/3\x3c/g)||[]).length;
					slide1_amount=(full_lap.match(/7\x3c/g)||[]).length;
					slide2_amount=(full_lap.match(/8\x3c/g)||[]).length;
					slide_amount=slide1_amount+slide2_amount;
					burst_amount=(full_lap.match(/10\x3c/g)||[]).length;
					var tiles_info = `Double tiles: ${doubles_amount}\nCombo tiles: ${combo_amount}\nSlide tiles: ${slide_amount}\nBurst tiles: ${burst_amount}`;
					if (basebeats1 <= 0||basebeats2 <= 0||basebeats3 <= 0) return ":x: baseBeats can't be lower or equal to 0!";
					const speed1=parseFloat(bpm1/basebeats1/60); const speed2=parseFloat(bpm2/basebeats2/60); const speed3=parseFloat(bpm3/basebeats3/60);
					var speed_info = `${speed1.toFixed(3)}, ${speed2.toFixed(3)}, ${speed3.toFixed(3)}`;
					star1=star1.replace(stuff_remove, "").replace(/Q/g, "RR").replace(/R/g, "SS").replace(/S/g, "TT").replace(/T/g, "UU").replace(/U/g, "VV").replace(/V/g, "WW").replace(/W/g, "XX").replace(/X/g, "YY").replace(/Y/g, "P").replace(/H/g, "II").replace(/I/g, "JJ").replace(/J/g, "KK").replace(/K/g, "LL").replace(/L/g, "MM").replace(/M/g, "NN").replace(/N/g, "OO").replace(/O/g, "PP");
					if (star1==="") {star1_final=0} else {star1_final=star1.match(/P/gi).length}
					r1=(1*star1_final*multiplying1);
					if (!Number.isInteger(r1)) {r1=(1*r1).toFixed(3)}
					star2=star2.replace(stuff_remove, "").replace(/Q/g, "RR").replace(/R/g, "SS").replace(/S/g, "TT").replace(/T/g, "UU").replace(/U/g, "VV").replace(/V/g, "WW").replace(/W/g, "XX").replace(/X/g, "YY").replace(/Y/g, "P").replace(/H/g, "II").replace(/I/g, "JJ").replace(/J/g, "KK").replace(/K/g, "LL").replace(/L/g, "MM").replace(/M/g, "NN").replace(/N/g, "OO").replace(/O/g, "PP");
					if (star2==="") {star2_final=0} else {star2_final=star2.match(/P/gi).length}
					r2=(1*star2_final*multiplying2);
					if (!Number.isInteger(r2)) {r2=(1*r2).toFixed(3)}
					star3=star3.replace(stuff_remove, "").replace(/Q/g, "RR").replace(/R/g, "SS").replace(/S/g, "TT").replace(/T/g, "UU").replace(/U/g, "VV").replace(/V/g, "WW").replace(/W/g, "XX").replace(/X/g, "YY").replace(/Y/g, "P").replace(/H/g, "II").replace(/I/g, "JJ").replace(/J/g, "KK").replace(/K/g, "LL").replace(/L/g, "MM").replace(/M/g, "NN").replace(/N/g, "OO").replace(/O/g, "PP");
					if (star3==="") {star3_final=0} else {star3_final=star3.match(/P/gi).length}
					r3=(1*star3_final*multiplying3);
					if (!Number.isInteger(r3)) {r3=(1*r3).toFixed(3)}
					if (isNaN(r1)||isNaN(r2)||isNaN(r3)) return ":x: Unknown error.";
					s1_duration=r1/speed1; s2_duration=r2/speed2; s3_duration=r3/speed3;
					duration_main=s1_duration+s2_duration+s3_duration;
					hrs=~~(duration_main/3600);
					hrs=parseInt(hrs*1);
					if (hrs<1) {hrs=""} else {hrs=(`${hrs}h `)}
					mins=~~((duration_main%3600)/60);
					mins=parseInt(mins*1);
					secs=(duration_main%60).toFixed(0);
					if (secs<1) {secs=""} else if (secs==60) {secs=""; mins=mins+1} else {secs=(`${secs}s`)}
					if (mins<1) {mins=""} else {mins=(`${mins}m `)}
					if (hrs===""&&mins===""&&secs==="") {
						var duration = `less than 1s`;
					} else {
						var duration = `${hrs}${mins}${secs}`;
					}
					return [delay, tiles_info, speed_info, duration, ppr];
				}
				var tt = info(data, bpm1, bpm2, bpm3);
				if (Array.isArray(tt)==true) {
					if (tt[0]==="*no delay*") {var color="#00ff00"} else {var color="#ffff00"}
					let serverembed = new Discord.RichEmbed()
					.setColor(color)
					.setTitle("Info checker")
					.addField("Duration", tt[3])
					.addField("Points per round", tt[4])
					.addField("Speeds", tt[2])
					.addField("Delay", tt[0])
					return message.channel.send(serverembed);
				} else {
					message.reply(tt);
				}
			});
		});
	}
});

client.login(process.env.BOT_TOKEN);