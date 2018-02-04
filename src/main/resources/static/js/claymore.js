var character = null;

var HP_BASE = 6;

$(document).ready(function(){loadCharFromServer();});

var loadCharFromServer = function() {
	var path = window.location.pathname;
	var id = path.substring(path.lastIndexOf('/') + 1);
	var jqxhr = $.get("/claymore/api/characters/" + id, function(data) {
		character = data;
		var promises = [];
		for (var link in character._links) {
			if(link != "self" && link != "character") {
				promises.push(getLink(character._links[link].href, link));
			}
		}
		$.when.apply($, promises).then(function() {
			createFormFromModel();
			updateJsonView();
			updateDerivedFields();
		}, function() {
			alert("Error loading character");
		});
	});
};

var getLink = function(href, prop) {
	return $.get(href, function(data) {
		if(data._embedded) {
			character[prop] = data._embedded[prop];
		} else {
			character[prop] = data;
		}
	});
}

var createFormFromModel = function() {
	for ( var prop in character) {
		if (!prop.startsWith("_")) {
			$("#raw_div").append(
					'<div class="row"><div class="col-md-2 text-right">' + prop
							+ ': </div><div class="col-md-2"><input id="raw_'
							+ prop + '" name="raw_' + prop
							+ '" class="raw" value="' + character[prop]
							+ '"/></div></div>');
		}
	}
	$(".raw").change(updateModel);
}

var updateModel = function(event) {
	var prop = event.target.id.substring(4);
	character[prop] = event.target.value;
	updateJsonView();
	updateDerivedFields();
}

var updateJsonView = function() {
	$("#inventory_div").html("<pre>"+JSON.stringify(character, null, 2)+"</pre>");
}

var updateDerivedFields = function() {
	$("#character_name").text(character.name);
	$("#character_race").text(character.race);
	$("#character_gender").text(character.gender);
	$("#character_age").text(character.age);
	$("#character_height").text(Math.floor(character.height/12)+"' "+character.height%12+'"');
	$("#character_weight").text(character.weight);
	$("#character_xp").text(character.xp);
	
	processXpBuys();
	$("#character_unspentXp").text(character.unspentXp);
	$("#character_spendableXp").text(character.spendableXp);
	$("#character_level").text(character.level);
	for (var i = 0; i < character.classes.length; i++) {
		var className = character.classes[i];
		$("#section_"+className).show();
	}
	
	updateHp();

}

var processXpBuys = function() {
	character.level = 0;
	character.classes = [];
	
	character.unspentXp = character.xp;
	var xpPerLevel = {};
	
	character.maxHp = HP_BASE + conTable[character.constitution].hpMod;
	
	for(var i = 0; i < character.xpBuys.length; i++) {
		var xpBuy = character.xpBuys[i];
		character.level = Math.max(character.level, xpBuy.level);
		character.unspentXp -= xpBuy.points;
		
		if(!xpPerLevel[xpBuy.level]) {
			xpPerLevel[xpBuy.level] = 0;
		}
		xpPerLevel[xpBuy.level] += xpBuy.points;
		
		if(xpBuy.category == 'Class') {
			character.classes.push(xpBuy.ability);
		}
	}
	
	character.spendableXp = Math.min(10-xpPerLevel[character.level], character.unspentXp);
};

var updateHp = function() {
	var currentHp = $("#raw_currentHp").val();
	var maxHp = character.maxHp;
	var hpPercent = Math.round(currentHp / maxHp * 100);
	$("#character_currentHp").text(currentHp);
	$("#character_maxHp").text(maxHp);
	$("#hpBar").attr("aria-valuenow", currentHp);
	$("#hpBar").attr("aria-valuemax", maxHp);
	$("#hpBar").css("width", hpPercent + "%");
	$("#hpBar").text(hpPercent + "%");
}

var conTable = [
	{},
	{hpMod:-6, tMod:-6, fotMod:-25, weight:1, healing:.25},
	{hpMod:-5, tMod:-4, fotMod:-20, weight:3, healing:.5},
	{hpMod:-4, tMod:-3, fotMod:-17, weight:5, healing:1},
	{hpMod:-3, tMod:-3, fotMod:-13, weight:7, healing:1},
	{hpMod:-2, tMod:-2, fotMod:-11, weight:14, healing:2},
	{hpMod:-2, tMod:-2, fotMod:-8, weight:20, healing:2},
	{hpMod:-2, tMod:-2, fotMod:-5, weight:40, healing:2},
	{hpMod:-1, tMod:-1, fotMod:-2, weight:60, healing:2},
	{hpMod:-1, tMod:-1, fotMod:-1, weight:75, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:85, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:85, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:85, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:85, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:85, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:85, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:85, healing:2},
	{hpMod:0, tMod:0, fotMod:1, weight:100, healing:2},
	{hpMod:1, tMod:0, fotMod:2, weight:110, healing:2},
	{hpMod:1, tMod:0, fotMod:5, weight:120, healing:2},
	{hpMod:1, tMod:0, fotMod:8, weight:130, healing:2},
	{hpMod:2, tMod:1, fotMod:11, weight:140, healing:2},
	{hpMod:2, tMod:1, fotMod:13, weight:150, healing:3},
	{hpMod:2, tMod:1, fotMod:17, weight:160, healing:3},
	{hpMod:3, tMod:1, fotMod:20, weight:180, healing:4},
	{hpMod:4, tMod:2, fotMod:22, weight:240, healing:5},
	{hpMod:5, tMod:2, fotMod:23, weight:320, healing:6},
	{hpMod:6, tMod:2, fotMod:25, weight:480, healing:7},
	{hpMod:7, tMod:3, fotMod:27, weight:700, healing:8},
	{hpMod:8, tMod:4, fotMod:33, weight:1200, healing:10},
	{hpMod:9, tMod:5, fotMod:37, weight:2200, healing:15}
];