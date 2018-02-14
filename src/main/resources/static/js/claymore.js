var path = window.location.pathname;
var id = path.substring(path.lastIndexOf('/') + 1);

var character = null;

var attackTemplate;
var dice = new DiceRoller();

$(document).ready(
	function(){
		attackTemplate = $('#attack_template').clone();
		
		loadCharFromServer();
		
		$("#save_json_button").click(saveCharacter);
		$("#clone_json_button").click(cloneCharacter);
		
		$('.rollable_d100').click(rollable_d100);
		$('.rollable_literal').click(rollable_literal);
		
	}
);

var saveCharacter = function() {
	var jqxhr = $.ajax({
			type: "PUT",
			url: "/claymore/api/characters/" + id, 
			data: JSON.stringify(character, null, 2), 
			success: function(data) {
				alert('success');
			},
			contentType: "application/json"
	});
}

var cloneCharacter = function() {
	var jqxhr = $.ajax({
			type: "POST",
			url: "/claymore/api/characters", 
			data: JSON.stringify(character, null, 2), 
			success: function(data) {
				alert('success');
			},
			contentType: "application/json"
	});
}

var rollable_d100 = function(event){
	var text = event.target.textContent;
	text = text.replace('%','');
	var roll = dice.roll('d100').getTotal();
	var diff = text - roll;
	if(diff > 0) {
		alert('Roll: '+roll+'\nPass by: '+diff);
	} else {
		alert('Roll: '+roll+'\nFail by: '+Math.abs(diff));
	}
	return false;
};

var rollable_literal = function(event){
	var text = event.target.textContent;
	var roll = dice.roll(text);
	alert(roll);
	return false;
};

var loadCharFromServer = function() {
	var jqxhr = $.get(
		"/claymore/api/characters/" + id, 
		function(data) {
			character = data;
			createFormFromModel();
			updateJsonView();
			updateDerivedFields();
		}
	);
};

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
};

var updateModel = function(event) {
	var prop = event.target.id.substring(4);
	character[prop] = event.target.value;
	updateJsonView();
	updateDerivedFields();
};

var updateJsonView = function() {
	$("#json_text").text(JSON.stringify(character, null, 2));
};

var updateDerivedFields = function() {
	processXpBuys();
	processSkillBuys();
	showRelaventClassSections();
	
	$("#character_name").text(character.name);
	$("#character_race").text(character.race);
	$("#character_gender").text(character.gender);
	$("#character_age").text(character.age);
	$("#character_height").text(Math.floor(character.height/12)+"' "+character.height%12+'"');
	$("#character_weight").text(character.weight);
	
	$("#character_level").text(character.level);
	$("#character_xp").text(character.xp);	
	$("#character_unspentXp").text(character.unspentXp);
	$("#character_spendableXp").text(character.spendableXp);
	
	updateHpCard();
	
	$("#character_might").text(character.might+"%");
	$("#character_fortitude").text(character.fortitude+"%");
	$("#character_agility").text(character.agility+"%");
	$("#character_will").text(character.will+"%");
	$("#character_identity").text(character.identity+"%");
	$("#character_surprise").text(character.surprise+"%");
	$("#character_perception").text(character.perception+"%");
	$("#character_passiveId").text(character.passiveId+"%");
	$("#character_weightLimit").text(character.weightLimit);
	$("#character_maxLift").text(character.maxLift);

	$("#character_mws").text(character.mws+"%");
	$("#character_bws").text(character.bws+"%");
	
	updateAttacks();

};

var showRelaventClassSections = function() {
	for (var className in character.classes) {
		$("#section_"+className).show();
	}
};

var updateHpCard = function() {
	var currentHp = $("#raw_currentHp").val();
	var maxHp = character.maxHp;
	var hpPercent = Math.round(currentHp / maxHp * 100);
	$("#character_currentHp").text(currentHp);
	$("#character_maxHp").text(maxHp);
	$("#hpBar").attr("aria-valuenow", currentHp);
	$("#hpBar").attr("aria-valuemax", maxHp);
	$("#hpBar").css("width", hpPercent + "%");
	$("#hpBar").text(hpPercent + "%");
};

var processXpBuys = function() {
	character.level = 0;
	
	character.levelToXpBuyMap = {};
	
	for(var name in xpBuyProcessors) {
		var processor = xpBuyProcessors[name];
		processor.init();
	}

	for(var i = 0; i < character.xpBuys.length; i++) {
		var xpBuy = character.xpBuys[i];
		character.level = Math.max(character.level, xpBuy.level);
		var processor = xpBuyProcessors[xpBuy.category];
		if(processor) {
			processor.processBuy(xpBuy);
		}
		indexXpBuy(xpBuy);
	}
	
	for(var name in xpBuyProcessors) {
		var processor = xpBuyProcessors[name];
		processor.postProcess();
	}
	
};

//{level: {category: [buy1, buy2]}
var indexXpBuy = function(xpBuy) {
	var level = xpBuy.level;
	var category = xpBuy.category;
	
	if(!character.levelToXpBuyMap[level]) {
		character.levelToXpBuyMap[level] = {};
	}
	if(!character.levelToXpBuyMap[level][category]) {
		character.levelToXpBuyMap[level][category] = [];
	}
	character.levelToXpBuyMap[level][category].push(xpBuy);
};

var processSkillBuys = function() {
	
	for(var name in skillBuyProcessors) {
		var processor = skillBuyProcessors[name];
		processor.init();
	}

	for(var i = 0; i < character.skillBuys.length; i++) {
		var skillBuy = character.skillBuys[i];
		var processor = skillBuyProcessors[skillBuy.category];
		if(processor) {
			processor.processBuy(skillBuy);
		}
	}
	
	for(var name in skillBuyProcessors) {
		var processor = skillBuyProcessors[name];
		processor.postProcess();
	}

};



var getXpBuys = function(level, category) {
	if(!character.levelToXpBuyMap[level] || !character.levelToXpBuyMap[level][category]) {
		return null;
	} else {
		return character.levelToXpBuyMap[level][category];
	}
};

var updateAttacks = function() {
	$('#attack_table').empty();
	for(var i=0; i<character.attacks.length; i++) {
		var attack = character.attacks[i];
		var baseWeapon = attack.baseWeapon;
		var row = attackTemplate.clone();
		row.attr('id','attack.'+i);
		row.find('.attack_name').text(getAttackValOverride(attack.name,baseWeapon.name));
		row.find('.attack_hit').text(calculateHitForAttack(attack)+'%');
		row.find('.attack_damage').text(getAttackValConcat(attack.damage,baseWeapon.damage));
		row.find('.attack_speed').text(getAttackValSum(attack.speed,baseWeapon.speed));
		row.find('.attack_attacks').text(getAttackValSum(attack.attacks,1));
		row.find('.attack_notes').html(getAttackValNotes(attack,baseWeapon));
		row.find('.rollable_d100').click(rollable_d100);
		row.find('.rollable_literal').click(rollable_literal);
		row.appendTo('#attack_table');
		row.show();
	}
};

var calculateHitForAttack = function(attack) {
	
	//start with base MWS/BWS
	var hit = character[attack.weaponSkill.toLowerCase()];
	
	//add bonus/penalty for weapon group
	var wgs = character.weaponGroupSkill[attack.baseWeapon.weaponGroup]
	if(wgs || wgs==0) {
		hit += wgs;
	} else {
		hit += character.unskilledPenalty;
	}
	
	//add any bonus/override from this attack
	hit = getAttackValSum(attack.hit, hit);
	
	return hit;
	
};

var getAttackValOverride = function(attackVal, baseVal) {
	return attackVal ? attackVal : baseVal;
};

var getAttackValSum = function(attackVal, baseVal) {
	if(attackVal && attackVal.startsWith('=')) {
		return attackVal.substring(1);
	}
	baseVal = baseVal ? baseVal : 0;
	attackVal = attackVal ? parseFloat(attackVal.replace('+','')) : 0;
	return baseVal + attackVal;
};

var getAttackValConcat = function(attackVal, baseVal) {
	if(attackVal && attackVal.startsWith('=')) {
		return attackVal.substring(1);
	}
	var retVal ='';
	if(baseVal) retVal += baseVal;
	if(attackVal) retVal += attackVal;
	return retVal;
};

var getAttackVal = function(attackVal, baseVal, combine) {
	
	if(combine && baseVal && attackVal) {
		if(attackVal.startsWith('=')) {
			return attackVal.substring(1);
		} else {
			if(attackVal.startsWith('+')){
				attackVal = attackVal.substring(1);
			}
			return baseVal+parseInt(attackVal.substring(1));
		}
	} else {
		return attackVal ? attackVal : baseVal;
	}
	
};

var getAttackValNotes = function(attack, baseWeapon) {
	return attack.notes;
};

