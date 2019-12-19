function containsNonLatinCodepoints(s) {return /[^\u0000-\u00ff]/.test(s)}
function spaces(s) {return /[^\u0051-\u0059]/.test(s)}
function tiles(s) {return /[^\u0048-\u0050]/.test(s)}

module.exports = {
  check: function check_errors(path1, paths, multiplying, path_num) {
	path1=path1.replace(/(?:\x2c\x3b|\x2c|\x3b)/g, ','); paths=paths.replace(/(?:\x2c\x3b|\x2c|\x3b)/g, ',');
	paths=paths.split(",");
	result=[];
	lastEl=paths.pop();
	if (lastEl!=="") {result.push(lastEl)}
	for (i=0; i<paths.length; i++) {
		if (paths[i].includes("2<>")||paths[i].includes("3<>")||paths[i].includes("5<>")||paths[i].includes("6<>")||paths[i].includes("7<>")||paths[i].includes("8<>")||paths[i].includes("9<>")||paths[i].includes("10<>")) {result.push(paths[i])}
	}
	for (i=0; i<paths.length; i++) {
		a1=paths[i].indexOf("<"); a2=paths[i].lastIndexOf(">");
		if (a2==paths[i].length-1) {paths[i]=paths[i].substr(0, paths[i].length-1)}
		if (a1!=-1) {paths[i]=paths[i].substr(a1+1, paths[i].length)}
	}
	for (i=0; i<paths.length; i++) {
		a1=paths[i].indexOf("("); a1_match=paths[i].match(/\x28/g);
		if (a1_match==null) {a1_match="("}
		a2=paths[i].indexOf("]"); a2_match=paths[i].match(/\x5d/g);
		if (a2_match==null) {a2_match="]"}
		a3=paths[i].indexOf(")"); a3_match=paths[i].match(/\x29/g);
		if (a3_match==null) {a3_match=")"}
		a4=paths[i].indexOf("["); a4_match=paths[i].match(/\x5b/g);
		if (a4_match==null) {a4_match="["}
		a_match=a1_match+a2_match+a3_match+a4_match; a4=a4-1;
		if (paths[i].indexOf("(")>0) {result.push(paths[i])}
		else if (paths[i].includes("\"")||paths[i].includes("\'")||paths[i].includes("*")||paths[i].includes("?")||paths[i].includes("|")||paths[i].includes("+")||paths[i].includes("_")||paths[i].includes("=")||paths[i].includes(":")||paths[i].includes("`")||paths[i].includes("\\")||paths[i].includes("Z")||paths[i].includes("z")) {result.push(paths[i])}
		else if (paths[i].includes("\r")||paths[i].includes("\n")) {result.push("used enter")}
		else if (paths[i].includes("Q[")||paths[i].includes("R[")||paths[i].includes("S[")||paths[i].includes("T[")||paths[i].includes("U[")||paths[i].includes("V[")||paths[i].includes("W[")||paths[i].includes("X[")||paths[i].includes("Y[")) {result.push(paths[i])}
		else if (containsNonLatinCodepoints(paths[i])==true) {result.push(paths[i])}
		else if (a1==0&&!paths[i].includes(")[")) {result.push(paths[i])}
		else if (a1==-1&&paths[i].includes(")[")) {result.push(paths[i])}
		else if (a2==-1&&paths[i].includes("[")) {result.push(paths[i])}
		else if (paths[i].includes(")]")) {result.push(paths[i])}
		else if (a3!=a4&&a3>-1&&a4>-1) {result.push(paths[i])}
		else if (a4==-2&&paths[i].includes("]")) {result.push(paths[i])}
		else if (a_match.match(/\x28/g).length>1||a_match.match(/\x29/g).length>1||a_match.match(/\x5b/g).length>1||a_match.match(/\x5d/g).length>1) {result.push(paths[i])}
		else {
			a5=paths[i].indexOf("{"); a6=paths[i].indexOf("}"); a6=a6-2;
			effects=paths[i].substr(a5, a6+2);
			if (a5!=a6&&a5>-1&&a6>-1) {result.push(paths[i])}
			if (a5==-1&&a6==-3) {effects="{1}"}
			if (effects==="{1}") {paths[i]=paths[i].substr(0, a5)+paths[i].substr(a6+3, paths[i].length)}
			if (effects==="{2}") {effects="{1}"; paths[i]=paths[i].substr(0, a5)+paths[i].substr(a6+3, paths[i].length)}
			if (effects==="{3}") {effects="{1}"; paths[i]=paths[i].substr(0, a5)+paths[i].substr(a6+3, paths[i].length)}
			if (effects==="{4}") {effects="{1}"; paths[i]=paths[i].substr(0, a5)+paths[i].substr(a6+3, paths[i].length)}
			if (effects==="{5}") {effects="{1}"; paths[i]=paths[i].substr(0, a5)+paths[i].substr(a6+3, paths[i].length)}
			if (effects==="{6}") {effects="{1}"; paths[i]=paths[i].substr(0, a5)+paths[i].substr(a6+3, paths[i].length)}
			if (effects==="{7}") {effects="{1}"; paths[i]=paths[i].substr(0, a5)+paths[i].substr(a6+3, paths[i].length)}
			if (effects==="{8}") {effects="{1}"; paths[i]=paths[i].substr(0, a5)+paths[i].substr(a6+3, paths[i].length)}
			if (effects==="{9}") {effects="{1}"; paths[i]=paths[i].substr(0, a5)+paths[i].substr(a6+3, paths[i].length)}
			if (effects!=="{1}") {
				result.push(paths[i]);
			} else {
				if (paths[i].indexOf("(")!=0&&paths[i].includes(".")) {result.push(paths[i])}
				else if (paths[i].indexOf("(")!=0&&paths[i].includes("~")) {result.push(paths[i])}
				else if (paths[i].indexOf("(")!=0&&paths[i].includes("!")) {result.push(paths[i])}
				else if (paths[i].indexOf("(")!=0&&paths[i].includes("@")) {result.push(paths[i])}
				else if (paths[i].indexOf("(")!=0&&paths[i].includes("$")) {result.push(paths[i])}
				else if (paths[i].indexOf("(")!=0&&paths[i].includes("%")) {result.push(paths[i])}
				else if (paths[i].indexOf("(")!=0&&paths[i].includes("^")) {result.push(paths[i])}
				else if (paths[i].indexOf("(")!=0&&paths[i].includes("&")) {result.push(paths[i])}
				else {
					if (paths[i].indexOf("Q")==0||paths[i].indexOf("R")==0||paths[i].indexOf("S")==0||paths[i].indexOf("T")==0||paths[i].indexOf("U")==0||paths[i].indexOf("V")==0||paths[i].indexOf("W")==0||paths[i].indexOf("X")==0||paths[i].indexOf("Y")==0) {
						if (spaces(paths[i])==true) {result.push(paths[i])}
					} else if (paths[i].indexOf("(")==0) {
						if (paths[i].indexOf("Q")==1||paths[i].indexOf("R")==1||paths[i].indexOf("S")==1||paths[i].indexOf("T")==1||paths[i].indexOf("U")==1||paths[i].indexOf("V")==1||paths[i].indexOf("W")==1||paths[i].indexOf("X")==1||paths[i].indexOf("Y")==1) {
							if (paths[i].includes("~")&&paths[i].includes("!")) {result.push(paths[i])}
							else if (paths[i].includes("~")&&paths[i].includes("@")) {result.push(paths[i])}
							else if (paths[i].includes("~")&&paths[i].includes("$")) {result.push(paths[i])}
							else if (paths[i].includes("~")&&paths[i].includes("%")) {result.push(paths[i])}
							else if (paths[i].includes("~")&&paths[i].includes("^")) {result.push(paths[i])}
							else if (paths[i].includes("~")&&paths[i].includes("&")) {result.push(paths[i])}
							else if (paths[i].includes("!")&&paths[i].includes("@")) {result.push(paths[i])}
							else if (paths[i].includes("!")&&paths[i].includes("$")) {result.push(paths[i])}
							else if (paths[i].includes("!")&&paths[i].includes("%")) {result.push(paths[i])}
							else if (paths[i].includes("!")&&paths[i].includes("^")) {result.push(paths[i])}
							else if (paths[i].includes("!")&&paths[i].includes("&")) {result.push(paths[i])}
							else if (paths[i].includes("@")&&paths[i].includes("$")) {result.push(paths[i])}
							else if (paths[i].includes("@")&&paths[i].includes("%")) {result.push(paths[i])}
							else if (paths[i].includes("@")&&paths[i].includes("^")) {result.push(paths[i])}
							else if (paths[i].includes("@")&&paths[i].includes("&")) {result.push(paths[i])}
							else if (paths[i].includes("$")&&paths[i].includes("%")) {result.push(paths[i])}
							else if (paths[i].includes("$")&&paths[i].includes("^")) {result.push(paths[i])}
							else if (paths[i].includes("$")&&paths[i].includes("&")) {result.push(paths[i])}
							else if (paths[i].includes("%")&&paths[i].includes("^")) {result.push(paths[i])}
							else if (paths[i].includes("%")&&paths[i].includes("&")) {result.push(paths[i])}
							else if (paths[i].includes("^")&&paths[i].includes("&")) {result.push(paths[i])}
						}
					}
				}
				if (spaces(paths[i])==false) {paths[i]="a[M]"}
				tiles_start=paths[i].indexOf("[");
				tiles_start=tiles_start+1;
				tiles_length=paths[i].substr(tiles_start, paths[i].length);
				tiles_length=tiles_length.substr(0, tiles_length.length-1);
				if (tiles(tiles_length)==true) {result.push(paths[i])}
				paths1=paths[i].substr(0, tiles_start-1);
				if (paths1.substr(paths1.length-1, paths1.length)===")") {paths1=paths1.substr(0, paths1.length-1)}
				if (paths1.indexOf("(")==0) {paths1=paths1.substr(1, paths1.length)}
				paths_no_arp=paths1.replace(/\x21|\x24|\x25|\x26|\x2e|\x40|\x5e|\x7e/g, ',');
				paths_no_arp=paths_no_arp.split(",");
				var correct_notes = ["A-3", "#A-3", "B-3", "C-2", "#C-2", "D-2", "#D-2", "E-2", "F-2", "#F-2", "G-2", "#G-2", "A-2", "#A-2", "B-2", "C-1", "#C-1", "D-1", "#D-1", "E-1", "F-1", "#F-1", "G-1", "#G-1", "A-1", "#A-1", "B-1", "c", "#c", "d", "#d", "e", "f", "#f", "g", "#g", "a", "#a", "b", "c1", "#c1", "d1", "#d1", "e1", "f1", "#f1", "g1", "#g1", "a1", "#a1", "b1", "c2", "#c2", "d2", "#d2", "e2", "f2", "#f2", "g2", "#g2", "a2", "#a2", "b2", "c3", "#c3", "d3", "#d3", "e3", "f3", "#f3", "g3", "#g3", "a3", "#a3", "b3", "c4", "#c4", "d4", "#d4", "e4", "f4", "#f4", "g4", "#g4", "a4", "#a4", "b4", "c5", "mute", "empty"];
				for (j=0; j<paths_no_arp.length; j++) {
					if (spaces(paths_no_arp[j])==true) {if (correct_notes.indexOf(paths_no_arp[j])==-1) {result.push(paths[i])}}
				}
			}
		}
	}
	b1=path1.match(/\x3c/g);
	if (b1==null) {b1=""}
	b2=path1.match(/\x3e/g);
	if (b1.length>0&&b2==null) {
		path1="5<a[M]>,5<a[M]>";
		result.push(`<${result}`);
	}
	special_tiles=[];
	path1=path1.split(",");
	for (i=0; i<path1.length; i++) {
		j=i+1;
		if (path1[i].includes("<")&&!path1[i].includes(">")) {
			special_tiles.push(path1[i]);
			path1[i]=path1[i].replace(path1[i], "");
			if (!path1[j].includes(">")) {path1[j]=`${path1[j]}<`}
		} else if (path1[i].includes(">")&&!path1[i].includes("<")) {
			special_tiles.push(path1[i]);
			path1[i]=path1[i].replace(path1[i], "");
		} else if (path1[i].includes(">")&&path1[i].includes("<")) {
			special_tiles.push(path1[i]);
			path1[i]=path1[i].replace(path1[i], "");
		}
	}
	for (i=0; i<special_tiles.length; i++) {
		if (special_tiles[i].lastIndexOf("<")==special_tiles[i].length-1) {
			special_tiles[i]=special_tiles[i].substr(0, special_tiles[i].length-1);
		}
	}
	if (special_tiles=="") {special_tiles=["5<a[M]>", "5<a[M]>"]}
	special_tiles1=special_tiles.pop();
	special_tiles1=special_tiles1.substr(0, special_tiles1.length-1);
	special_tiles.push(special_tiles1);
	special_tiles1=special_tiles.shift();
	if (special_tiles1.indexOf("2<")==0||special_tiles1.indexOf("3<")==0||special_tiles1.indexOf("5<")==0||special_tiles1.indexOf("6<")==0||special_tiles1.indexOf("7<")==0||special_tiles1.indexOf("8<")==0||special_tiles1.indexOf("9<")==0) {
		special_tiles1=special_tiles1.substr(2, special_tiles1.length);
	} else if (special_tiles1.indexOf("10<")==0) {
		special_tiles1=special_tiles1.substr(3, special_tiles1.length);
	}
	special_tiles.unshift(special_tiles1);
	special_tiles=special_tiles.join();
	special_tiles=special_tiles.replace(/\x3e\x2c2\x3c|\x3e\x2c3\x3c|\x3e\x2c5\x3c|\x3e\x2c6\x3c|\x3e\x2c7\x3c|\x3e\x2c8\x3c|\x3e\x2c9\x3c|\x3e\x2c10\x3c/g, ",");
	special_tiles=special_tiles.split(",");
	path1=path1.join();
	path1_return=path1.split(",");
	path1=path1.replace(/1|2|3|4|5|6|7|8|9|0|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7d|\x7e|mute|empty|A|B|C|D|E|F|G|Z|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/g, "");
	path1=path1.replace(/Q/g, "RR"); path1=path1.replace(/R/g, "SS"); path1=path1.replace(/S/g, "TT"); path1=path1.replace(/T/g, "UU"); path1=path1.replace(/U/g, "VV"); path1=path1.replace(/V/g, "WW"); path1=path1.replace(/W/g, "XX"); path1=path1.replace(/X/g, "YY"); path1=path1.replace(/Y/g, "P");
	path1=path1.replace(/H/g, "II"); path1=path1.replace(/I/g, "JJ"); path1=path1.replace(/J/g, "KK"); path1=path1.replace(/K/g, "LL"); path1=path1.replace(/L/g, "MM"); path1=path1.replace(/M/g, "NN"); path1=path1.replace(/N/g, "OO"); path1=path1.replace(/O/g, "PP");
	path1=path1.split(",");
	path1.pop();
	result1=[];
	if (multiplying!=0) {
		const path1_new=path1.map(({length}) => {
			const x=length;
			if (x==0) {return 1}
			const length_of_tile=x*multiplying;
			if (length_of_tile<1) {return -1}
			const n=parseInt(length_of_tile);
			return n;
		});
		path1=path1_new;
		for (i=0; i<=path1.length; i++) {
			if (path1[i]=="-1") {result1.push(path1_return[i])}
		}
	}
	for (i=0; i<special_tiles.length; i++) {
		if (special_tiles[i].includes("<")||special_tiles[i].includes(">")) {result.push(special_tiles[i])}
	}
	if (result1.length>0) return ":x: Tiles shorter than 1 in "+path_num+" path (`"+result1.join("`, `")+"`)";
	if (result.length>0) return ":x: Error results: `"+result.join("`, `")+"`";
	return "NO ERRORS!";
  }
}
