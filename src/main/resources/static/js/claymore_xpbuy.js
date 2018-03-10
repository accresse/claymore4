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
					var xpBuys = currentLevelBuys[category];
					for (var i = 0; i<xpBuys.length; i++) {
						var xpBuy = xpBuys[i];
						levelSpent += xpBuy.points;
					}
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
			var levelHpBuys = getXpBuys(level, 'HP');
			if(levelHpBuys) {				
				for (var i = 0; i<levelHpBuys.length; i++) {
					var hpBuy = levelHpBuys[i];
					character.maxHp += getHpIncrease(level, hpBuy.points);
				}
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
		
		var saves = JSON.parse(xpBuy.ability);
		for(var save in saves) {
			character[save] += saves[save];
		}
	}
	
	//this will be done in ClassSavingThrowProcessor
	postProcess() {}
}

class ClassSavingThrowProcessor extends CharacterProcessor {
	
	processBuy(xpBuy) {
		var saves = JSON.parse(xpBuy.ability);
		for(var save in saves) {
			character[save] += saves[save];
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
			var levelWeaponSkillBuys = getXpBuys(level, 'WeaponSkill');
			if(levelWeaponSkillBuys) {				
				for (var i = 0; i<levelWeaponSkillBuys.length; i++) {
					var weaponSkillBuy = levelWeaponSkillBuys[i];
					var ability = JSON.parse(weaponSkillBuy.ability);
					character.mws += ability['mws'];
					character.bws += ability['bws'];
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
		var weaponGroups = JSON.parse(xpBuy.ability);
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
	
	calculateOverallDefense();
};