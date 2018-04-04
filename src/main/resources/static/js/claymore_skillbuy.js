class SkillPointsSoldProcessor extends CharacterProcessor {

	init() {
		character.spendableSkillPoints = character.skillPoints;
	}
	
	postProcess() {
		for(var i=0; i< character.skillBuys.length; i++) {
			var skillBuy = character.skillBuys[i];
			character.spendableSkillPoints -= skillBuy.points;
		}
	}
	
}

class WeaponGroupProcessor extends CharacterProcessor {
	init() {
		character.weaponGroupPoints = {};
		character.unskilledPenalty = UNSKILLED_TABLE['None'];
		for(var className in character.classes) {
			character.unskilledPenalty = Math.max(character.unskilledPenalty, UNSKILLED_TABLE[className]);
		}
	}
	
	processBuy(skillBuy){
		var weaponGroup = skillBuy.ability;
		var points = skillBuy.points;
		var previousPoints = character.weaponGroupPoints[weaponGroup];
		if(!previousPoints) {
			previousPoints = 0;
		}
		character.weaponGroupPoints[weaponGroup] = previousPoints + points;
	}
	
	postProcess() {
		character.weaponGroupSkill = {};
		
		for(var weaponGroup in character.weaponGroupPoints) {
			var points = character.weaponGroupPoints[weaponGroup];
			var requiredPoints = WEAPON_GROUP_COST_TABLE[weaponGroup];
			
			if(points >= requiredPoints) {
				character.weaponGroupSkill[weaponGroup] = 0;
			} else {
				character.weaponGroupSkill[weaponGroup] = character.unskilledPenalty + Math.floor(points/2);
			}
		}
	}
}

var skillBuyProcessors = {
	SkillPoints: new SkillPointsSoldProcessor(),
	Weapon: new WeaponGroupProcessor()
};

var updateSkillBuyTab = function() {
	$('#skill_history_table').empty();
	
	for(var i=0; i<character.skillBuys.length; i++) {
		var skillBuy = character.skillBuys[i];
		var row = skillHistoryTemplate.clone();
		row.attr('id','skill_history_'+i);
		row.find('.skill_history_level').text(skillBuy.level);
		row.find('.skill_history_points').text(skillBuy.points);
		row.find('.skill_history_category').text(skillBuy.category);
		var ability = skillBuy.ability ? skillBuy.ability : "";
		row.find('.skill_history_ability').text(ability);
		if(skillBuy.level%2==0) {
			row.attr('class','table-active');
		}
		row.appendTo('#skill_history_table');
		row.show();
	}

};