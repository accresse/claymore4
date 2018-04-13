var path = window.location.pathname;
var id = path.substring(path.lastIndexOf('/') + 1);

var defenseFactorList = null;
var defenseFactorMap = {};

var weaponList = null;
var weaponMap = {};

var weaponGroupList = null;

var character = null;

var attackTemplate;
var defenseTemplate;
var xpHistoryTemplate;

var weaponSkillTemplate;
var skillHistoryTemplate;

var dice = new DiceRoller();

$(document).ready(
	function(){		
		var promises = [];
		promises.push(loadWeaponsFromServer());
		promises.push(loadDefenseFactorsFromServer());
		promises.push(loadCharFromServer());
		$.when.apply($, promises).then(layoutPageAfterDataDownload, function() {
			alert("Error loading character");
		});
	}
);

var layoutPageAfterDataDownload = function() {
	console.log("Layout page");
	
	attackTemplate = $('#attack_template').clone();
	defenseTemplate = $('#defense_template').clone();
	xpHistoryTemplate = $('#xp_history_template').clone();
	
	weaponSkillTemplate = $('#weapon_skill_template').clone();
	skillHistoryTemplate = $('#skill_history_template').clone();

	createFormFromModel();
	initSkillBuyTab();
	updateJsonView();
	updateDerivedFields();

	$('#level_up_button').click(levelUp);
	$("#save_character_button").click(saveCharacter);
	$("#clone_character_button").click(cloneCharacter);
	$("#delete_character_button").click(deleteCharacter);
	
	$('.rollable_d100').click(rollable_d100);
	$('.rollable_literal').click(rollable_literal);
	
	$("#character_mws_plan").click(function(){
		showMessage(formatPlanMessage(character.mwsPlan,'MWS'));
		return false;
	});	
	
	$("#character_bws_plan").click(function(){
		showMessage(formatPlanMessage(character.bwsPlan,'BWS'));
		return false;
	});	
	
	for(var i=0; i< WIZARD_SCHOOLS.length; i++) {
		var school = WIZARD_SCHOOLS[i];
		$('.wizardSchool_select').append($('<option>').text(school).attr('value', school).attr('class','wizardSchool_option_'+school));
	}

	setupAttackModal();
	setupDefenseModal();
	initXpBuyTab();
};

var formatPlanMessage = function(plan, title) {
	var message = '<h3>'+title+'</h3><table class="table table-sm"><thead><tr><th>Reason</th><th class="text-right">Value</th></tr></thead><tbody>';
	
	for(var i=0; i<plan.length; i++) {
		message += '<tr><td>' + plan[i][1] + '</td><td class="text-right">'+plan[i][0] + '</td></tr>';
	}
	
	message += '</tbody></table>';
	return message;
}

var showMessage = function(message) {
	$('#alertModal_content').html(message);
	$('#alertModal').modal('show');
};

var levelUp = function() {
	levelUpXp();
	levelUpSkills();
	updateJsonView();
	updateDerivedFields();
};

//validate if you can level now
var validateLevelUp = function() {
	var errors = [];
	validateLevelUpXp(errors);
	validateLevelUpSkills(errors);
	
	if(errors.length > 0) {
		$('#level_up_button').attr('disabled','disabled');
		$('#level_up_button').prop('title',errors.join('\n\n'));	
	} else {
		$('#level_up_button').removeAttr('disabled');
		$('#level_up_button').prop('title',"Let's do this!");
	}
};

var saveCharacter = function() {
	var jqxhr = $.ajax({
			type: "PUT",
			url: "/claymore/api/characters/" + id, 
			data: JSON.stringify(character, null, 2), 
			success: function(data) {
				alert('Character has been saved.');
			},
			contentType: "application/json"
	}).fail(function() {
	    alert('ERROR: Could not save character');
	});
};

var cloneCharacter = function() {
	var jqxhr = $.ajax({
			type: "POST",
			url: "/claymore/api/characters", 
			data: getClonedCharacter(), 
			success: function(data) {
				alert('Character has been cloned.');
			},
			contentType: "application/json"
	});
}

var getClonedCharacter = function() {
	var id = character.characterId;
	character.characterId = null;
	var charString = JSON.stringify(character, null, 2);
	character.characterId = id;
	return charString;
};

var deleteCharacter = function() {
	character.active=false;
	var answer = confirm("Really delete character?");
	if(!answer) return;
	
	var jqxhr = $.ajax({
			type: "PUT",
			url: "/claymore/api/characters/" + id, 
			data: JSON.stringify(character, null, 2), 
			success: function(data) {
				window.location.replace('/claymore/characterList.html');
			},
			contentType: "application/json"
	}).fail(function() {
		    alert('ERROR: Could not delete character');
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

var loadWeaponsFromServer = function() {
	return $.get(
		"/claymore/api/weapons?sort=weaponGroup,name&size=1000", 
		function(data) {
			weaponList = data._embedded.weapons;
			var weaponGroupMap = {};
			var previousWeaponGroup = null;
			for(var i=0; i< weaponList.length; i++) {
				var weapon = weaponList[i];
				if(weapon.weaponGroup != previousWeaponGroup) {
					previousWeaponGroup = weapon.weaponGroup;
					weaponGroupMap[previousWeaponGroup] = true;
					$('#attackModal_baseWeapon').append($('<option>').text('--'+weapon.weaponGroup+'--').attr('disabled', true));
				}
				$('#attackModal_baseWeapon').append($('<option>').text(weapon.name).attr('value', weapon.weaponId));
				weaponMap[weapon.weaponId] = weapon;
			}
			weaponGroupList = Object.keys(weaponGroupMap).sort();
			for(var i=0; i< weaponGroupList.length; i++) {
				var weaponGroup = weaponGroupList[i];
				$('.weaponGroup_select').append($('<option>').text(weaponGroup).attr('value', weaponGroup).attr('class','weaponGroup_option_'+weaponGroup));
			}
			
			console.log('Done loading weapons');
		}
	);
};

var loadDefenseFactorsFromServer = function() {
	return $.get(
		"/claymore/api/defenseFactors?sort=name&size=1000", 
		function(data) {
			defenseFactorList = data._embedded.defenseFactors;
			for(var i=0; i< defenseFactorList.length; i++) {
				var defenseFactor = defenseFactorList[i];
				$('#defenseModal_baseDefenseFactor').append($('<option>').text(defenseFactor.name).attr('value', defenseFactor.defenseFactorId));
				defenseFactorMap[defenseFactor.defenseFactorId] = defenseFactor;
			}
			console.log('Done loading defenseFactors');
		}
	);
};

var loadCharFromServer = function() {
	return $.get(
		"/claymore/api/characters/" + id, 
		function(data) {
			character = data;
			console.log('Done loading character');
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
	var value = event.target.value;
	if($.isNumeric(value)) {
		value = parseInt(value);
	}
	character[prop] = value;
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
	
	$(".character_level").text(character.level);
	$("#character_xp").text(character.xp);	
	$("#character_unspentXp").text(character.unspentXp);
	$(".remaining_xp").text(character.spendableXp);
	$(".remaining_skill").text(character.spendableSkillPoints);
	
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
	
	$("#character_learn_spell").text(character.learnSpell+"%");
	$("#character_spell_failure").text(character.spellFailure+"%");

	updateAttacks();
	updateDefenses();
	updateXpBuyTab();
	updateSkillBuyTab();
	validateLevelUp();
};

var showRelaventClassSections = function() {
	for (var className in CLASS_COST_TABLE) {
		$(".visible_"+className).hide();
	}
	for (var className in character.classes) {
		$(".visible_"+className).show();
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

//{level: {category: buy}
var indexXpBuy = function(xpBuy) {
	var level = xpBuy.level;
	var category = xpBuy.category;
	
	if(!character.levelToXpBuyMap[level]) {
		character.levelToXpBuyMap[level] = {};
	}
	character.levelToXpBuyMap[level][category] = xpBuy;
};

var processSkillBuys = function() {
	
	character.levelToSkillBuyMap = {};

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
		indexSkillBuy(skillBuy);
	}
	
	for(var name in skillBuyProcessors) {
		var processor = skillBuyProcessors[name];
		processor.postProcess();
	}

};

//{level: {category: {ability: buy}}
var indexSkillBuy = function(skillBuy) {
	var level = skillBuy.level;
	var category = skillBuy.category;
	var ability = skillBuy.ability;
	
	if(!character.levelToSkillBuyMap[level]) {
		character.levelToSkillBuyMap[level] = {};
	}
	if(!character.levelToSkillBuyMap[level][category]) {
		character.levelToSkillBuyMap[level][category] = {};
	}
	character.levelToSkillBuyMap[level][category][ability] = skillBuy;
};

var getXpBuy = function(level, category) {
	if(!character.levelToXpBuyMap[level] || !character.levelToXpBuyMap[level][category]) {
		return null;
	} else {
		return character.levelToXpBuyMap[level][category];
	}
};

var getSkillBuy = function(level, category, ability) {
	if(!character.levelToSkillBuyMap[level] || !character.levelToSkillBuyMap[level][category] || !character.levelToSkillBuyMap[level][category][ability]) {
		return null;
	} else {
		return character.levelToSkillBuyMap[level][category][ability];
	}
};

var calculateValWithOverride = function(overrideVal, baseVal) {
	return overrideVal ? overrideVal : baseVal;
};

