class XpProcessor extends CharacterProcessor {
	init() {
		character.unspentXp = character.xp;
		character.spendableXp = character.xp;
	}
	
	postProcess() {

		var levelSpent;

		for(var level=1; level<=character.level; level++) {
			levelSpent = 0;
			var currentLevelBuys = character.levelToXpBuyMap[level];
			if (currentLevelBuys) {
				for (var category in currentLevelBuys) {
					var xpBuy = currentLevelBuys[category];
					levelSpent += xpBuy.points;
				}
			}
			character.unspentXp -= levelSpent;
		}
		var maxLevelUnspent = MAX_HP_BUY_PER_LEVEL - levelSpent;
		character.spendableXp = Math.min(maxLevelUnspent, character.unspentXp);
	}
}

class HpProcessor extends CharacterProcessor {
	init() {
		character.maxHp = HP_BASE;
	}
	
	postProcess() {
		for(var level=1; level<=character.level; level++) {
			var hpBuy = getXpBuy(level, 'HP');
			if(hpBuy) {				
				character.maxHp += getHpIncrease(level, hpBuy.points);
			} 
			//add con bonus
			character.maxHp += getConstitutionMods().hpMod
		}
	}
	
}

var getHpIncrease = function(level, points) {
	var hpMap = {};
	if(level>20) {
		hpMap = HP_BUY_TABLE['highLevel'];
	} else {
		hpMap = HP_BUY_TABLE['lowLevel'];
	}
	return hpMap[points];
};

class ClassProcessor extends CharacterProcessor {
	init() {
		character.classes = {};
	}
	
	processBuy(xpBuy) {
		character.classes[xpBuy.ability]=true;
	}
}

class SavingThrowProcessor extends CharacterProcessor {
	init() {
		character.might=30 + getStrengthMods().might;
		character.fortitude=20 + getConstitutionMods().fotMod;
		character.agility=20 + getDexterityMods().aglMod;
		character.will=20 + getProblemSolvingMods().wilMod;
		character.identity=20 + getRecallMods().idnMod;
		character.perception=getWitMods().percMod;//TODO: add racial base and rogue abilities
		character.weightLimit=getConstitutionMods().weight;
		character.maxLift=getStrengthMods().maxLift;
	}
	
	processBuy(xpBuy) {
		character.fortitude += 1;
		character.agility += 1;
		character.will += 1;
		character.identity += 1;
		
		var savePoints = xpBuy.points;
		var saveAbility = xpBuy.ability;
		
		if(savePoints && saveAbility) {
			var saves = saveAbility.split(',');
			for(var i = 0; i < saves.length; i++) {
				character[saves[i]] += getSavingThrowBonus(i, savePoints);
			}
		}
	}
	
	//this will be done in ClassSavingThrowProcessor
	postProcess() {}
}

class ClassSavingThrowProcessor extends CharacterProcessor {
	
	processBuy(xpBuy) {
		var saveAbility = xpBuy.ability;
		
		if(saveAbility) {
			var saves = saveAbility.split(',');
			character[saves[0]] += 15;
			character[saves[1]] -= 5;
		}
	}
	
	postProcess() {		
		character.surprise=35+character.perception+character.wit;
		character.passiveId=character.leadership+character.perception;
	}
}

class WeaponSkillProcessor extends CharacterProcessor {
	
	init() {
		if(character.primaryWeaponSkill=='MWS') {
			character.mws = PWS_BASE;
			character.bws = SWS_BASE;
		} else {
			character.mws = SWS_BASE;
			character.bws = PWS_BASE;
		}

		character.mws += getStrengthMods().mwsMod;
		character.bws += getDexterityMods().bwsMod;
		
	}
	
	postProcess() {		

		for(var level=1; level<=character.level; level++) {
			var weaponSkillBuy = getXpBuy(level, 'WeaponSkill');
			if(weaponSkillBuy) {
				var points = weaponSkillBuy.points;
				var ability = weaponSkillBuy.ability;
				if(ability == 'MWS') {
					character.mws += getWeaponSkillBonus(0,points);
					character.bws += getWeaponSkillBonus(1,points);
				} else {
					character.bws += getWeaponSkillBonus(0,points);
					character.mws += getWeaponSkillBonus(1,points);
				}
			}
		}
	}
}

class WeaponMasteryProcessor extends CharacterProcessor {
	
	init() {
		character.weaponMasteryLevel = {};
	}
	
	processBuy(xpBuy) {
		var weaponGroups = xpBuy.ability.split(',');
		for(var i=0; i<weaponGroups.length; i++) {
			var weaponGroup = weaponGroups[i];
			var currentLevel = getWeaponMasteryLevel(weaponGroup);
			character.weaponMasteryLevel[weaponGroup] = currentLevel + 1;
		}
	}

}

var xpBuyProcessors = {
	XP: new XpProcessor(),
	HP: new HpProcessor(),
	Class: new ClassProcessor(),
	//SavingThrow and ClassSavingThrow need to stay in this order
	SavingThrow: new SavingThrowProcessor(),
	ClassSavingThrow: new ClassSavingThrowProcessor(),
	WeaponSkill: new WeaponSkillProcessor(),
	WeaponMastery: new WeaponMasteryProcessor()
};

/**
 * Start code for the XP Buy tab
 */
var initXpBuyTab = function() {
	$('#level_up_button').click(
		function(){
			character.xpBuys.push({level: character.level+1, points: 0, category: "HP", ability: null});
			character.xpBuys.push({level: character.level+1, points: 0, category: "SavingThrow", ability: null});
			character.xpBuys.push({level: character.level+1, points: 0, category: "SkillPoints", ability: null});
			character.xpBuys.push({level: character.level+1, points: 0, category: "WeaponSkill", ability: character.primaryWeaponSkill});
			updateJsonView();
			updateDerivedFields();
		}
	);
	
	$('.xpBuyInput').change(
		function(event){
			clearCurrentLevelXpBuys();
			addCurrentXpBuys();
			updateSecondaryWeapon();
			updateValidResists();
			updateJsonView();
			updateDerivedFields();
		}
	);
	
};

var getSelectedWeaponSkill = function() {
	return $('#xpShop_weapon_primary_MWS').prop('selected') ? 'MWS' : 'BWS';
};

var updateSecondaryWeapon = function() {
	if(getSelectedWeaponSkill() == 'MWS') {
		$('#xpShop_weapon_secondary').text("BWS");
	} else {
		$('#xpShop_weapon_secondary').text("MWS");				
	}	
};

var clearCurrentLevelXpBuys = function() {
	var newXpBuys = [];
	for(var i = 0; i< character.xpBuys.length; i++) {
		var xpBuy = character.xpBuys[i];
		if(xpBuy.level != character.level) {
			newXpBuys.push(xpBuy);
		}
	}
	character.xpBuys = newXpBuys;
};

var addCurrentXpBuys = function() {
	var selectedHpPoints = parseInt($('input[name=xpShop_hp]:checked').val());
	var selectedResistPoints = parseInt($('input[name=xpShop_resist]:checked').val());
	var selectedSkillPoints = parseInt($('input[name=xpShop_skill]:checked').val());
	var selectedWeaponPoints = parseInt($('input[name=xpShop_weapon]:checked').val());

	character.xpBuys.push({level: character.level, points: selectedHpPoints, category: "HP", ability: null});
	character.xpBuys.push({level: character.level, points: selectedResistPoints, category: "SavingThrow", ability: getSelectedResists(selectedResistPoints).toString()});
	character.xpBuys.push({level: character.level, points: selectedSkillPoints, category: "SkillPoints", ability: null});
	character.xpBuys.push({level: character.level, points: selectedWeaponPoints, category: "WeaponSkill", ability: getSelectedWeaponSkill()});
};

var getSelectedResists = function(selectedResistPoints) {
	var resists = [$("#xpShop_resist_score1").val(),$("#xpShop_resist_score2").val(),$("#xpShop_resist_score3").val()];
	var length = SAVING_BONUS_TABLE[selectedResistPoints].length;
	return resists.splice(0,length);
};

var updateValidResists = function(){
	var needsRefresh = false;

	var class1 = $("#xpShop_resist_score1 option:selected").attr('class');
	
	//disable option in second select if it was used in first select
	$("#xpShop_resist_score2 ."+class1).attr('disabled','disabled').siblings().removeAttr('disabled');
	
	//update second select if it is currently selecting a disabled option
	if($("#xpShop_resist_score2 option:selected").attr('disabled')) {
		$('#xpShop_resist_score2').children('option:enabled').eq(0).prop('selected',true);
		needsRefresh = true;
	}
	
	var class2 = $("#xpShop_resist_score2 option:selected").attr('class');
	
	//disable options in third select if it was used in first two selects
	$("#xpShop_resist_score3 ."+class1).attr('disabled','disabled').siblings().removeAttr('disabled');
	$("#xpShop_resist_score3 ."+class2).attr('disabled','disabled');
	
	//update third select if it is currently selecting a disabled option
	if($("#xpShop_resist_score3 option:selected").attr('disabled')) {
		$('#xpShop_resist_score3').children('option:enabled').eq(0).prop('selected',true);
		needsRefresh = true;
	}
	
	//if we had to change the selected value in second two selects, fire an event to update again
	if(needsRefresh) {
		$('#xpShop_resist_score1').change();
	}
	
};

var updateXpBuyTab = function() {
	$('#xp_history_table').empty();
	
	for(var i=0; i<character.xpBuys.length; i++) {
		var xpBuy = character.xpBuys[i];
		var row = xpHistoryTemplate.clone();
		row.attr('id','xp_history_'+i);
		row.find('.xp_history_level').text(xpBuy.level);
		row.find('.xp_history_points').text(xpBuy.points);
		row.find('.xp_history_category').text(xpBuy.category);
		var ability = xpBuy.ability ? xpBuy.ability : "";
		row.find('.xp_history_ability').text(ability);
		row.appendTo('#xp_history_table');
		row.show();
	}

	//validate if you can level now
	if(character.unspentXp<10) {
		$('#level_up_button').attr('disabled','disabled');
		$('#level_up_button').prop('title','You must have at least 10 unspent XP to level.');
	} else if(character.spendableXp >= 10) {
		$('#level_up_button').attr('disabled','disabled');
		$('#level_up_button').prop('title','You must spend at least 1 XP to level.');
	} else if(character.spendableXp < 0) {
		$('#level_up_button').attr('disabled','disabled');
		$('#level_up_button').prop('title','You spent too much XP this level.  Adjust your purchases before leveling.');
	} else {
		$('#level_up_button').removeAttr('disabled');
		$('#level_up_button').prop('title',"Let's do this!");
	}
		
	var currentHp = getXpBuy(character.level,'HP');
	$('#xpShop_hp_'+currentHp.points).prop('checked',true);
	
	var currentSavingThrow = getXpBuy(character.level,'SavingThrow');
	$('#xpShop_resist_'+currentSavingThrow.points).prop('checked',true);
	if(currentSavingThrow.ability && currentSavingThrow.points) {
		var resists = currentSavingThrow.ability.split(',');
		$("#xpShop_resist_score1").val(resists[0]);
		if(resists.length>1){
			$("#xpShop_resist_score2").val(resists[1]);			
		}
		if(resists.length>2) {			
			$("#xpShop_resist_score3").val(resists[2]);
		}
	}
	updateValidResists();

	var currentSkillPoints = getXpBuy(character.level,'SkillPoints');
	$('#xpShop_skill_'+currentSkillPoints.points).prop('checked',true);
	
	var currentWeaponSkill = getXpBuy(character.level,'WeaponSkill');
	$('#xpShop_weapon_'+currentWeaponSkill.points).prop('checked',true);
	if(currentWeaponSkill.ability=='MWS') {
		$('#xpShop_weapon_primary_MWS').prop('selected',true);
	} else {
		$('#xpShop_weapon_primary_BWS').prop('selected',true);
	}
	updateSecondaryWeapon();
		
	
};