class SkillPointsSoldProcessor extends CharacterProcessor {

	init() {
		character.spendableSkillPoints = character.skillPoints;
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

var initSkillBuyTab = function() {
	//weapon
	$('#weapon_skill_table').empty();

	for(var weaponGroup in WEAPON_GROUP_COST_TABLE) {
		var row = weaponSkillTemplate.clone();
		row.attr('id','weapon_skill_'+weaponGroup);
		row.find('.weapon_skill_weaponGroup').text(weaponGroup);
		row.find('.weapon_skill_spend').attr('id','weapon_skill_spend_'+weaponGroup).data('weaponGroup',weaponGroup).change(skillBuyInputChange);
		var required = WEAPON_GROUP_COST_TABLE[weaponGroup];
		row.find('.weapon_skill_required').text(required);
		row.appendTo('#weapon_skill_table');
	}

	$('#weaponSkillModal_add').click(function(){
		var weaponGroup = $('#weaponSkillModal_weaponGroup').val();
		$('#weapon_skill_'+weaponGroup).show();
	});

};

var clearCurrentLevelSkillBuys = function() {
	var newSkillBuys = [];
	for(var i = 0; i< character.skillBuys.length; i++) {
		var skillBuy = character.skillBuys[i];
		if(skillBuy.level != character.level) {
			newSkillBuys.push(skillBuy);
		}
	}
	character.skillBuys = newSkillBuys;
};

var addCurrentSkillBuys = function() {
	$('.weapon_skill_spend').each(function(){
		var weaponGroup = $(this).data('weaponGroup');
		var points = parseInt($(this).val());
		if(points > 0) {	
			var currentLevelBuy = getSkillBuy(character.level, 'Weapon', weaponGroup);
			var currentLevelPoints = currentLevelBuy ? currentLevelBuy.points : 0;

			var required = WEAPON_GROUP_COST_TABLE[weaponGroup];
			var total = character.weaponGroupPoints[weaponGroup];
			if(!total) {
				total = 0;
			}
			var previousLevelPoints = total - currentLevelPoints;
			var remaining = required-previousLevelPoints;
			
			points = Math.min(points, remaining);
			character.skillBuys.push({level: character.level, points: points, category: "Weapon", ability: weaponGroup});
		}
	});
};

var levelUpSkills = function() {
	$('.weapon_skill_spend').val(0);
};

var validateLevelUpSkills = function(errors) {
	if(character.spendableSkillPoints < 0) {
		errors.push('You spent too many skill points this level.  Adjust your purchases before leveling.');
	}
};

var skillBuyInputChange = function(event) {
	console.log('change: '+event.target.id);

	clearCurrentLevelSkillBuys();
	addCurrentSkillBuys();
	updateJsonView();
	updateDerivedFields();
};

var updateSkillBuyTab = function() {
	
	for(var weaponGroup in WEAPON_GROUP_COST_TABLE) {
		var currentLevelBuy = getSkillBuy(character.level, 'Weapon', weaponGroup);
		var points = currentLevelBuy ? currentLevelBuy.points : 0;
		
		var row = $('#weapon_skill_'+weaponGroup);
		row.find('.weapon_skill_spend').val(points);
		var total = character.weaponGroupPoints[weaponGroup];
		row.find('.weapon_skill_total').text(total);
		var required = WEAPON_GROUP_COST_TABLE[weaponGroup];
		if(total) {
			row.find('.weapon_skill_penalty').text(character.weaponGroupSkill[weaponGroup]);
			row.show();
		} else {
			row.find('.weapon_skill_penalty').text(character.unskilledPenalty);
		}
		if(total==required && points==0) {
			row.find('.weapon_skill_spend').attr('disabled',true);
		}
	}


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