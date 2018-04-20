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

class ClassProcessor extends CharacterProcessor {
	init() {
		character.classes = {};
	}
	
	processBuy(xpBuy) {
		var classes = xpBuy.ability.split(',');
		for(var i=0; i<classes.length; i++){			
			character.classes[classes[i]]=true;
		}
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
		character.mwsPlan = [];
		character.bwsPlan = [];
		if(character.primaryWeaponSkill=='MWS') {
			character.mws = PWS_BASE;
			character.bws = SWS_BASE;
			character.mwsPlan.push([PWS_BASE,'Base value for primary skill']);
			character.bwsPlan.push([SWS_BASE,'Base value for secondary skill']);
		} else {
			character.mws = SWS_BASE;
			character.bws = PWS_BASE;
			character.mwsPlan.push([SWS_BASE,'Base value for primary skill']);
			character.bwsPlan.push([PWS_BASE,'Base value for secondary skill']);
		}

		character.mws += getStrengthMods().mwsMod;
		character.bws += getDexterityMods().bwsMod;
		character.mwsPlan.push([getStrengthMods().mwsMod,'STR bonus']);
		character.bwsPlan.push([getDexterityMods().bwsMod,'DEX bonus']);
		var witBonus = getWitMods().weaponMod;
		character.mws += witBonus;
		character.bws += witBonus;
		character.mwsPlan.push([witBonus,'WIT bonus']);
		character.bwsPlan.push([witBonus,'WIT bonus']);
		
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
					character.mwsPlan.push([getWeaponSkillBonus(0,points),'Level '+level+' WeaponSkill Bonus']);
					character.bwsPlan.push([getWeaponSkillBonus(1,points),'Level '+level+' WeaponSkill Bonus']);
				} else {
					character.bws += getWeaponSkillBonus(0,points);
					character.mws += getWeaponSkillBonus(1,points);
					character.bwsPlan.push([getWeaponSkillBonus(0,points),'Level '+level+' WeaponSkill Bonus']);
					character.mwsPlan.push([getWeaponSkillBonus(1,points),'Level '+level+' WeaponSkill Bonus']);
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

class SkillPointsEarnedProcessor extends CharacterProcessor {
	init() {
		character.skillPoints = SKILL_POINTS_BASE + getRecallMods().skillPoints;
	}
	
	postProcess() {
		for(var level=1; level<=character.level; level++) {
			var skillPointBuy = getXpBuy(level, 'SkillPoints');
			if(skillPointBuy) {				
				character.skillPoints += getSkillPointIncrease(skillPointBuy.points);
			} else {
				character.skillPoints += getSkillPointIncrease(0);
			}
			//add ps bonus
			character.skillPoints += getProblemSolvingMods().skillPoints;
		}
	}
	
}

class WizardCastingLevelProcessor extends CharacterProcessor {
	init() {
		character.learnSpell = getProblemSolvingMods().learnSpell + getRecallMods().learnSpell;
		character.spellFailure = getWitMods().spellFailure;
		character.wizardCastingLevels = {};
		for(var i=0; i<WIZARD_SCHOOLS.length; i++) {
			var school = WIZARD_SCHOOLS[i];
			character.wizardCastingLevels[school] = 0;
		}
	}
	
	processBuy(xpBuy) {
		var ability = xpBuy.ability;
		if(ability) {
			if(ability=='ALL') {
				for(var i=0; i<WIZARD_SCHOOLS.length; i++) {
					var school = WIZARD_SCHOOLS[i];
					character.wizardCastingLevels[school]++;
				}
			} else {
				character.wizardCastingLevels[ability]++;
			}
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
	WeaponMastery: new WeaponMasteryProcessor(),
	SkillPoints: new SkillPointsEarnedProcessor(),
	WizardCastingLevel: new WizardCastingLevelProcessor()
};

//Start code for the XP Buy tab
var initXpBuyTab = function() {

	$('.xpBuyInput').change(
		function(event){
			console.log('change: '+event.target.id);
			clearCurrentLevelXpBuys();
			addCurrentXpBuys();
			updateJsonView();
			updateDerivedFields();
		}
	);
	for(var className in CLASS_COST_TABLE) {
		var checkbox = $('#xpShop_class_cost_'+className).text(CLASS_COST_TABLE[className]);
	}
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

	var selectedClasses = {};
	var addedClasses = [];
	var totalXp = 0;
	
	for(var className in CLASS_COST_TABLE) {
		var checkbox = $('#xpShop_class_'+className);
		if(checkbox.prop('checked')) {
			selectedClasses[className] = true;
			
			if(!checkbox.prop('disabled')) {
				addedClasses.push(className);
				totalXp += CLASS_COST_TABLE[className];
			}
		}
	}
	if(totalXp) {		
		character.xpBuys.push({level: character.level, points: totalXp, category: "Class", ability: addedClasses.toString()});			
	}
	
	if(selectedClasses.Fighter) {
		var selectedMasteryPoints = parseInt($('input[name=xpShop_class_fighter_mastery]:checked').val());
		character.xpBuys.push({level: character.level, points: selectedMasteryPoints, category: "WeaponMastery", ability: getSelectedMastery(selectedMasteryPoints).toString()});
	}
	if(selectedClasses.Wizard) {
		var selectedCastingLevelPoints = parseInt($('input[name=xpShop_class_wizard_casting_level]:checked').val());
		character.xpBuys.push({level: character.level, points: selectedCastingLevelPoints, category: "WizardCastingLevel", ability: getSelectedSchools(selectedCastingLevelPoints).toString()});
	}
};

var getSelectedResists = function(selectedResistPoints) {
	var resists = [$("#xpShop_resist_score1").val(),$("#xpShop_resist_score2").val(),$("#xpShop_resist_score3").val()];
	var length = SAVING_BONUS_TABLE[selectedResistPoints].length;
	return resists.splice(0,length);
};

var getSelectedMastery = function(selectedMasteryPoints) {
	var resists = [$("#xpShop_class_fighter_mastery_weapon_1").val(),$("#xpShop_class_fighter_mastery_weapon_2").val()];
	var length = selectedMasteryPoints;
	return resists.splice(0,length);
};

var getSelectedSchools = function(selectedCastingLevelPoints) {
	if(selectedCastingLevelPoints==8) {
		return "ALL";
	} else if(selectedCastingLevelPoints==4) {
		return $("#xpShop_class_wizard_casting_level_school").val();
	} else {
		return "";
	}
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

var updateValidMastery = function(){
	var needsRefresh = false;

	var weapon1 = $("#xpShop_class_fighter_mastery_weapon_1 option:selected").val();
	
	//disable option in second select if it was used in first select
	$("#xpShop_class_fighter_mastery_weapon_2 .weaponGroup_option_"+weapon1).attr('disabled','disabled').siblings().removeAttr('disabled');
	
	//update second select if it is currently selecting a disabled option
	if($("#xpShop_class_fighter_mastery_weapon_2 option:selected").attr('disabled')) {
		$('#xpShop_class_fighter_mastery_weapon_2').children('option:enabled').eq(0).prop('selected',true);
		needsRefresh = true;
	}
	
	//if we had to change the selected value in second select, fire an event to update again
	if(needsRefresh) {
		$('#xpShop_class_fighter_mastery_weapon_2').change();
	}
	
};

var levelUpXp = function() {
	character.xpBuys.push({level: character.level+1, points: 0, category: "HP", ability: null});
	character.xpBuys.push({level: character.level+1, points: 0, category: "SavingThrow", ability: null});
	character.xpBuys.push({level: character.level+1, points: 0, category: "SkillPoints", ability: null});
	character.xpBuys.push({level: character.level+1, points: 0, category: "WeaponSkill", ability: character.primaryWeaponSkill});
	
	//reset fighter upgrades to zero
	$('#xpShop_class_fighter_mastery_0').prop('checked',true);

	//reset wizard upgrades to zero
	$('#xpShop_class_wizard_casting_level_0').prop('checked',true);
	
};

var validateLevelUpXp = function(errors) {
	if(character.unspentXp<10) {
		errors.push('You must have at least 10 unspent XP to level.');
	}
	if(character.spendableXp >= 10) {
		errors.push('You must spend at least 1 XP to level.');
	}
	if(character.spendableXp < 0) {
		errors.push('You spent too many XP points this level.  Adjust your purchases before leveling.');
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
		if(xpBuy.level%2==0) {
			row.attr('class','table-active');
		}
		row.appendTo('#xp_history_table');
		row.show();
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
	
	for(var charClass in character.classes) {
		//disable all the class checkboxes for classes we already have
		$('#xpShop_class_'+charClass).prop('checked',true).prop('disabled','disabled');
	}
	//but if class was added this level, then enable checkbox
	var currentLevelClassBuy = getXpBuy(character.level,'Class');
	if(currentLevelClassBuy) {
		var currentLevelClasses = currentLevelClassBuy.ability.split(',');
		for(var i=0; i<currentLevelClasses.length; i++) {
			var charClass = currentLevelClasses[i];
			$('#xpShop_class_'+charClass).removeProp('disabled');
		}
	}
	
	if(character.classes.Fighter) {		
		var weaponMasteryBuy = getXpBuy(character.level,'WeaponMastery');
		if(weaponMasteryBuy && weaponMasteryBuy.ability) {
			var weapons = weaponMasteryBuy.ability.split(",");
			if(weapons){
				if(weapons.length > 0) {
					$('#xpShop_class_fighter_mastery_weapon_1').val(weapons[0]);
				}
				if(weapons.length > 1) {
					$('#xpShop_class_fighter_mastery_weapon_2').val(weapons[1]);
				}
			}
			
			$('#xpShop_class_fighter_mastery_'+weaponMasteryBuy.points).prop('checked',true);
		}
		updateValidMastery();
	}

	if(character.classes.Wizard) {		
		var castingLevelBuy = getXpBuy(character.level,'WizardCastingLevel');
		if(castingLevelBuy) {
			$('#xpShop_class_wizard_casting_level_'+castingLevelBuy.points).prop('checked',true);
		}
	}

};