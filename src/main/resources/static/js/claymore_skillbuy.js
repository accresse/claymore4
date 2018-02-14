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
	Weapon: new WeaponGroupProcessor()
};