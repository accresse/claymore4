var MAX_HP_BUY_PER_LEVEL = 10;
var HP_BASE = 6;
var SKILL_POINTS_BASE = 40;
var PWS_BASE = 50;
var SWS_BASE = 45;

var HP_BUY_TABLE = {
	lowLevel:  {0:1,2:3,5:6},
	highLevel: {0:1,2:2,5:3}
};

var getHpIncrease = function(level, points) {
	var hpMap = {};
	if(level>20) {
		hpMap = HP_BUY_TABLE['highLevel'];
	} else {
		hpMap = HP_BUY_TABLE['lowLevel'];
	}
	return hpMap[points];
};

var getSkillPointIncrease = function(points) {
	if(points==0) {
		return 2;
	} else {
		return 10;
	}
};

var STR_TABLE = [
	{},
	{mwsMod:-35, damMod:-15, might:-70, maxLift:3},
	{mwsMod:-28, damMod:-12, might:-60, maxLift:5},
	{mwsMod:-22, damMod:-9, might:-50, maxLift:10},
	{mwsMod:-17, damMod:-6, might:-30, maxLift:15},
	{mwsMod:-13, damMod:-4, might:-26, maxLift:20},
	{mwsMod:-10, damMod:-3, might:-22, maxLift:40},
	{mwsMod:-7, damMod:-2, might:-18, maxLift:60},
	{mwsMod:-5, damMod:-1, might:-14, maxLift:80},
	{mwsMod:-3, damMod:0, might:-10, maxLift:100},
	{mwsMod:-2, damMod:0, might:-6, maxLift:120},
	{mwsMod:-1, damMod:0, might:-4, maxLift:140},
	{mwsMod:-1, damMod:0, might:-2, maxLift:160},
	{mwsMod:0, damMod:0, might:0, maxLift:170},
	{mwsMod:0, damMod:0, might:0, maxLift:180},
	{mwsMod:0, damMod:0, might:0, maxLift:190},
	{mwsMod:1, damMod:0, might:2, maxLift:200},
	{mwsMod:1, damMod:0, might:4, maxLift:210},
	{mwsMod:2, damMod:0, might:6, maxLift:225},
	{mwsMod:2, damMod:0, might:10, maxLift:260},
	{mwsMod:3, damMod:1, might:14, maxLift:280},
	{mwsMod:3, damMod:2, might:18, maxLift:300},
	{mwsMod:4, damMod:3, might:22, maxLift:330},
	{mwsMod:5, damMod:4, might:26, maxLift:380},
	{mwsMod:6, damMod:6, might:30, maxLift:475},
	{mwsMod:9, damMod:9, might:50, maxLift:700},
	{mwsMod:13, damMod:12, might:60, maxLift:900},
	{mwsMod:16, damMod:15, might:70, maxLift:1200},
	{mwsMod:20, damMod:18, might:80, maxLift:1600},
	{mwsMod:24, damMod:21, might:90, maxLift:2100},
	{mwsMod:28, damMod:24, might:100, maxLift:3000},
	{mwsMod:31, damMod:27, might:120, maxLift:4000},
	{mwsMod:35, damMod:30, might:140, maxLift:5000},
	{mwsMod:39, damMod:33, might:160, maxLift:6000},
	{mwsMod:42, damMod:36, might:180, maxLift:8000},
	{mwsMod:48, damMod:39, might:200, maxLift:10000}
];

var CON_TABLE = [
	{},
	{hpMod:-6, tMod:-6, fotMod:-40, weight:1, healing:.25},
	{hpMod:-5, tMod:-4, fotMod:-30, weight:3, healing:.25},
	{hpMod:-4, tMod:-3, fotMod:-25, weight:5, healing:.25},
	{hpMod:-4, tMod:-3, fotMod:-20, weight:7, healing:.5},
	{hpMod:-3, tMod:-2, fotMod:-17, weight:14, healing:.5},
	{hpMod:-3, tMod:-2, fotMod:-14, weight:20, healing:1},
	{hpMod:-2, tMod:-1, fotMod:-11, weight:30, healing:1},
	{hpMod:-2, tMod:-1, fotMod:-8, weight:40, healing:1},
	{hpMod:-1, tMod:0, fotMod:-5, weight:50, healing:1},
	{hpMod:-1, tMod:0, fotMod:-2, weight:55, healing:1},
	{hpMod:0, tMod:0, fotMod:-1, weight:60, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:65, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:70, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:75, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:80, healing:2},
	{hpMod:0, tMod:0, fotMod:0, weight:85, healing:2},
	{hpMod:0, tMod:0, fotMod:1, weight:100, healing:2},
	{hpMod:1, tMod:0, fotMod:2, weight:110, healing:3},
	{hpMod:1, tMod:0, fotMod:5, weight:120, healing:3},
	{hpMod:1, tMod:1, fotMod:8, weight:130, healing:3},
	{hpMod:2, tMod:1, fotMod:11, weight:140, healing:3},
	{hpMod:2, tMod:1, fotMod:14, weight:150, healing:3},
	{hpMod:2, tMod:1, fotMod:17, weight:160, healing:4},
	{hpMod:3, tMod:2, fotMod:20, weight:180, healing:4},
	{hpMod:4, tMod:2, fotMod:24, weight:240, healing:5},
	{hpMod:5, tMod:3, fotMod:29, weight:320, healing:6},
	{hpMod:6, tMod:4, fotMod:35, weight:480, healing:7},
	{hpMod:7, tMod:5, fotMod:42, weight:700, healing:8},
	{hpMod:8, tMod:6, fotMod:50, weight:1200, healing:10},
	{hpMod:9, tMod:8, fotMod:60, weight:2200, healing:15}
];

var DEX_TABLE = [
	{},
	{bwsMod:-50, aglMod:-40, iMod:-12},
	{bwsMod:-40, aglMod:-30, iMod:-6},
	{bwsMod:-35, aglMod:-25, iMod:-4},
	{bwsMod:-30, aglMod:-20, iMod:-3},
	{bwsMod:-25, aglMod:-17, iMod:-2},
	{bwsMod:-20, aglMod:-14, iMod:-2},
	{bwsMod:-15, aglMod:-11, iMod:-1},
	{bwsMod:-10, aglMod:-8, iMod:-1},
	{bwsMod:-5, aglMod:-5, iMod:0},
	{bwsMod:-2, aglMod:-2, iMod:0},
	{bwsMod:-1, aglMod:-1, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:1, aglMod:1, iMod:0},
	{bwsMod:2, aglMod:2, iMod:0},
	{bwsMod:3, aglMod:5, iMod:1},
	{bwsMod:5, aglMod:8, iMod:1},
	{bwsMod:7, aglMod:11, iMod:1},
	{bwsMod:9, aglMod:14, iMod:1},
	{bwsMod:10, aglMod:17, iMod:2},
	{bwsMod:13, aglMod:20, iMod:2},
	{bwsMod:16, aglMod:24, iMod:2},
	{bwsMod:19, aglMod:29, iMod:2},
	{bwsMod:22, aglMod:35, iMod:3},
	{bwsMod:28, aglMod:42, iMod:4},
	{bwsMod:34, aglMod:50, iMod:6},
	{bwsMod:41, aglMod:60, iMod:10}	
];

var PS_TABLE = [
	{},
	{skillPoints:-6, wilMod:-40, chargeBonus:0, learnSpell:0},
	{skillPoints:-6, wilMod:-30, chargeBonus:0, learnSpell:0},
	{skillPoints:-5, wilMod:-25, chargeBonus:0, learnSpell:0},
	{skillPoints:-4, wilMod:-20, chargeBonus:0, learnSpell:0},
	{skillPoints:-3, wilMod:-17, chargeBonus:0, learnSpell:0},
	{skillPoints:-3, wilMod:-14, chargeBonus:0, learnSpell:0},
	{skillPoints:-2, wilMod:-11, chargeBonus:0, learnSpell:0},
	{skillPoints:-2, wilMod:-8, chargeBonus:0, learnSpell:0},
	{skillPoints:-2, wilMod:-5, chargeBonus:0, learnSpell:0},
	{skillPoints:-1, wilMod:-2, chargeBonus:0, learnSpell:0},
	{skillPoints:-1, wilMod:-1, chargeBonus:0, learnSpell:25},
	{skillPoints:-1, wilMod:0, chargeBonus:0, learnSpell:26},
	{skillPoints:0, wilMod:0, chargeBonus:0, learnSpell:28},
	{skillPoints:0, wilMod:0, chargeBonus:0, learnSpell:29},
	{skillPoints:0, wilMod:0, chargeBonus:0, learnSpell:30},
	{skillPoints:1, wilMod:0, chargeBonus:0, learnSpell:31},
	{skillPoints:1, wilMod:1, chargeBonus:0, learnSpell:32},
	{skillPoints:1, wilMod:2, chargeBonus:5, learnSpell:33},
	{skillPoints:1, wilMod:5, chargeBonus:5, learnSpell:34},
	{skillPoints:2, wilMod:8, chargeBonus:5, learnSpell:36},
	{skillPoints:2, wilMod:11, chargeBonus:5, learnSpell:40},
	{skillPoints:2, wilMod:14, chargeBonus:10, learnSpell:48},
	{skillPoints:3, wilMod:17, chargeBonus:10, learnSpell:54},
	{skillPoints:3, wilMod:20, chargeBonus:15, learnSpell:64},
	{skillPoints:3, wilMod:24, chargeBonus:20, learnSpell:75},
	{skillPoints:4, wilMod:29, chargeBonus:25, learnSpell:100},
	{skillPoints:4, wilMod:35, chargeBonus:50, learnSpell:125},
	{skillPoints:5, wilMod:42, chargeBonus:100, learnSpell:125},
	{skillPoints:8, wilMod:50, chargeBonus:150, learnSpell:125},
	{skillPoints:14, wilMod:60, chargeBonus:200, learnSpell:125}
];

var RC_TABLE = [
	{},
	{skillPoints:-65, idnMod:-40, chargeBonus:0, learnSpell:0},
	{skillPoints:-60, idnMod:-30, chargeBonus:0, learnSpell:0},
	{skillPoints:-55, idnMod:-25, chargeBonus:0, learnSpell:0},
	{skillPoints:-50, idnMod:-20, chargeBonus:0, learnSpell:0},
	{skillPoints:-45, idnMod:-17, chargeBonus:0, learnSpell:0},
	{skillPoints:-40, idnMod:-14, chargeBonus:0, learnSpell:0},
	{skillPoints:-35, idnMod:-11, chargeBonus:0, learnSpell:0},
	{skillPoints:-30, idnMod:-8, chargeBonus:0, learnSpell:0},
	{skillPoints:-20, idnMod:-5, chargeBonus:0, learnSpell:0},
	{skillPoints:-15, idnMod:-2, chargeBonus:0, learnSpell:0},
	{skillPoints:-10, idnMod:-1, chargeBonus:0, learnSpell:0},
	{skillPoints:-6, idnMod:0, chargeBonus:0, learnSpell:0},
	{skillPoints:-4, idnMod:0, chargeBonus:0, learnSpell:0},
	{skillPoints:0, idnMod:0, chargeBonus:0, learnSpell:0},
	{skillPoints:2, idnMod:0, chargeBonus:0, learnSpell:5},
	{skillPoints:4, idnMod:0, chargeBonus:5, learnSpell:6},
	{skillPoints:6, idnMod:1, chargeBonus:5, learnSpell:7},
	{skillPoints:8, idnMod:2, chargeBonus:10, learnSpell:8},
	{skillPoints:10, idnMod:5, chargeBonus:10, learnSpell:10},
	{skillPoints:12, idnMod:8, chargeBonus:15, learnSpell:12},
	{skillPoints:16, idnMod:11, chargeBonus:15, learnSpell:14},
	{skillPoints:20, idnMod:14, chargeBonus:20, learnSpell:16},
	{skillPoints:25, idnMod:17, chargeBonus:25, learnSpell:18},
	{skillPoints:30, idnMod:20, chargeBonus:50, learnSpell:20},
	{skillPoints:50, idnMod:24, chargeBonus:100, learnSpell:22},
	{skillPoints:70, idnMod:29, chargeBonus:150, learnSpell:25},
	{skillPoints:100, idnMod:35, chargeBonus:200, learnSpell:30},
	{skillPoints:150, idnMod:42, chargeBonus:250, learnSpell:35},
	{skillPoints:200, idnMod:50, chargeBonus:300, learnSpell:40},
	{skillPoints:300, idnMod:60, chargeBonus:400, learnSpell:50}
];





var WIT_TABLE = [
	{},
	{weaponMod:-24, aglMod:-14, percMod:-60, spellFailure:100},
	{weaponMod:-20, aglMod:-10, percMod:-40, spellFailure:100},
	{weaponMod:-16, aglMod:-6, percMod:-35, spellFailure:100},
	{weaponMod:-12, aglMod:-4, percMod:-30, spellFailure:100},
	{weaponMod:-10, aglMod:-3, percMod:-25, spellFailure:100},
	{weaponMod:-8, aglMod:-2, percMod:-20, spellFailure:100},
	{weaponMod:-6, aglMod:-1, percMod:-15, spellFailure:75},
	{weaponMod:-4, aglMod:-1, percMod:-10, spellFailure:50},
	{weaponMod:-3, aglMod:0, percMod:-8, spellFailure:43},
	{weaponMod:-2, aglMod:0, percMod:-5, spellFailure:32},
	{weaponMod:-1, aglMod:0, percMod:-3, spellFailure:25},
	{weaponMod:-1, aglMod:0, percMod:-1, spellFailure:19},
	{weaponMod:0, aglMod:0, percMod:0, spellFailure:14},
	{weaponMod:0, aglMod:0, percMod:0, spellFailure:11},
	{weaponMod:0, aglMod:0, percMod:0, spellFailure:7},
	{weaponMod:1, aglMod:0, percMod:1, spellFailure:5},
	{weaponMod:1, aglMod:0, percMod:1, spellFailure:3},
	{weaponMod:1, aglMod:0, percMod:2, spellFailure:2},
	{weaponMod:1, aglMod:0, percMod:3, spellFailure:1},
	{weaponMod:2, aglMod:1, percMod:4, spellFailure:0},
	{weaponMod:2, aglMod:1, percMod:6, spellFailure:0},
	{weaponMod:3, aglMod:2, percMod:8, spellFailure:0},
	{weaponMod:4, aglMod:2, percMod:10, spellFailure:0},
	{weaponMod:5, aglMod:2, percMod:12, spellFailure:0},
	{weaponMod:7, aglMod:3, percMod:15, spellFailure:0},
	{weaponMod:9, aglMod:3, percMod:20, spellFailure:0},
	{weaponMod:12, aglMod:3, percMod:25, spellFailure:0},
	{weaponMod:16, aglMod:4, percMod:30, spellFailure:0},
	{weaponMod:21, aglMod:4, percMod:40, spellFailure:0},
	{weaponMod:27, aglMod:4, percMod:50, spellFailure:0},
];

var UNSKILLED_TABLE = {
		Fighter:	-10,
		Priest:-15,
		Rogue:-15,
		Wizard:-20,
		None:-25	
};

var CLASS_COST_TABLE = {
		Fighter:3,
		Priest:6,
		Rogue:3,
		Wizard:10
};

var RACE_TABLE = {
		'Human':{'bonusSkillPoints': 0, 'mightMod': 0, 'tMod':0, 'fotMod': 0, 'aglMod': 0, 'wilMod': 0, 'idnMod': 0, 'percMod': 0, 'mwsMod':0, 'bwsMod':0},
		'Dwarf':{'bonusSkillPoints': 40, 'mightMod': 10, 'tMod':1, 'fotMod': 0, 'aglMod': 0, 'wilMod': 0, 'idnMod': 0, 'percMod': -10, 'mwsMod':0, 'bwsMod':0},
		'Elf':{'bonusSkillPoints': 5, 'mightMod': 0, 'tMod':0, 'fotMod': 0, 'aglMod': 0, 'wilMod': 0, 'idnMod': 0, 'percMod': 20, 'mwsMod':0, 'bwsMod':0},
		'Gnome':{'bonusSkillPoints': 20, 'mightMod': 0, 'tMod':0, 'fotMod': 0, 'aglMod': 0, 'wilMod': 0, 'idnMod': 0, 'percMod': 0, 'mwsMod':0, 'bwsMod':0},
		'Half_Elf':{'bonusSkillPoints': 0, 'mightMod': 0, 'tMod':0, 'fotMod': 0, 'aglMod': 0, 'wilMod': 0, 'idnMod': 0, 'percMod': 5, 'mwsMod':0, 'bwsMod':0},
		'Halfling':{'bonusSkillPoints': 27, 'mightMod': 0, 'tMod':0, 'fotMod': 0, 'aglMod': 0, 'wilMod': 0, 'idnMod': 0, 'percMod': 0, 'mwsMod':-15, 'bwsMod':15},
		'Hobgoblin':{'bonusSkillPoints': 20, 'mightMod': 0, 'tMod':0, 'fotMod': 0, 'aglMod': 0, 'wilMod': 0, 'idnMod': 0, 'percMod': 5, 'mwsMod':0, 'bwsMod':0},
};

var WEAPON_GROUP_COST_TABLE = {
	'Blades_Slashing':14,
	'Blades_Stabbing':12,
	'Blades_Two_Handed':16,
	'Bows':14,
	'Cleaving':10,
	'Crossbows':6,
	'Crushing':8,
	'Flails':16,
	'Improvised':10,
	'Lances':14,
	'Polearms':14,
	'Punching_Weapons':4,
	'Quarter_Staff':12,
	'Rope_like':14,
	'Shields	':4,		
	'Slings':14,
	'Small_Throwing':8,
	'Spears':10
};

var WEAPON_MASTERY_TABLE = [
	{hit:0, damage:0, speed:0, attacks:0},
	{hit:2, damage:1, speed:0, attacks:0},
	{hit:4, damage:2, speed:0, attacks:0},
	{hit:6, damage:3, speed:0, attacks:0},
	{hit:8, damage:3, speed:0, attacks:0},
	{hit:10, damage:4, speed:0, attacks:0},
	{hit:11, damage:4, speed:0, attacks:.5},
	{hit:12, damage:5, speed:0, attacks:.5},
	{hit:13, damage:5, speed:1, attacks:.5},
	{hit:14, damage:5, speed:1, attacks:.5},
	{hit:15, damage:6, speed:1, attacks:.5},
	{hit:16, damage:6, speed:1, attacks:.5},
	{hit:17, damage:6, speed:1, attacks:.5},
	{hit:18, damage:7, speed:1, attacks:.5},
	{hit:19, damage:7, speed:1, attacks:.5},
	{hit:20, damage:7, speed:1, attacks:1},
	{hit:21, damage:7, speed:1, attacks:1},
	{hit:21, damage:8, speed:1, attacks:1},
	{hit:22, damage:8, speed:1, attacks:1},
	{hit:22, damage:8, speed:1, attacks:1},
	{hit:23, damage:8, speed:2, attacks:1},
	{hit:23, damage:9, speed:2, attacks:1},
	{hit:24, damage:9, speed:2, attacks:1},
	{hit:24, damage:9, speed:2, attacks:1},
	{hit:25, damage:9, speed:2, attacks:1},
	{hit:25, damage:9, speed:2, attacks:1.5},
	{hit:26, damage:10, speed:2, attacks:1.5},
	{hit:26, damage:10, speed:2, attacks:1.5},
	{hit:27, damage:10, speed:2, attacks:1.5},
	{hit:27, damage:10, speed:2, attacks:1.5},
	{hit:28, damage:10, speed:2, attacks:2}	
];

//helper methods
var getStrengthMods = function() {
	return STR_TABLE[character.strength];
};

var getConstitutionMods = function() {
	return CON_TABLE[character.constitution];
};

var getDexterityMods = function() {
	return DEX_TABLE[character.dexterity];
};

var getProblemSolvingMods = function() {
	return PS_TABLE[character.problemSolving];
};

var getRecallMods = function() {
	return RC_TABLE[character.recall];
};

var getWitMods = function() {
	return WIT_TABLE[character.wit];
};

var getRacialMods = function() {
	return RACE_TABLE[character.race];
};

var getWeaponMasteryLevel = function(weaponGroup) {
	var masteryLevel = character.weaponMasteryLevel[weaponGroup];
	if(!masteryLevel) {
		masteryLevel = 0;
	}
	return masteryLevel;
};

var getWeaponMasteryMods = function(weaponGroup) {
	var level = getWeaponMasteryLevel(weaponGroup);
	return WEAPON_MASTERY_TABLE[level];
};

var getWeapon = function(weaponId) {
	return weaponMap[weaponId];
};

var getDefenseFactor = function(defenseFactorId) {
	return defenseFactorMap[defenseFactorId];
};

var getWizardSpell = function(spellId) {
	return wizardSpellMap[spellId];
};

var getNonMartialSkill = function(skillId) {
	return nonMartialSkillMap[skillId];
};

var SAVING_BONUS_TABLE = [
	[],
	[2,1],
	[3,2,1],
	[4,3,2]
];

var getSavingThrowBonus = function(index, points) {
	return SAVING_BONUS_TABLE[points][index];
}

var WEAPON_SKILL_BONUS_TABLE = [
	[1,0],
	[1,1],
	[2,1],
	[3,2]
];

var getWeaponSkillBonus = function(index, points) {
	return WEAPON_SKILL_BONUS_TABLE[points][index];
};

var WIZARD_SCHOOLS = [
	'Abjuration',
	'Alteration',
	'Charm',
	'Demonology',
	'Divination',
	'Evocation',
	'Illusion',
	'Necromancy'
];

var WIZARD_SPELL_SLOTS = [
	[],//0
	[1],
	[2,1],
	[3,1],
	[4,1],
	[4,2],//5
	[5,2,1],
	[6,2,1],
	[6,3,1],
	[7,3,2],
	[7,3,2,1],//10
	[8,3,2,1],
	[8,4,2,1],
	[9,4,3,1],
	[9,4,3,2],
	[9,4,3,2,1],//15
	[10,4,3,2,1],
	[10,4,4,2,1],
	[10,5,4,3,2],
	[11,5,4,3,2],
	[11,5,4,3,2,1],//20
	[11,5,4,4,2,1],
	[12,5,5,4,3,1],
	[12,5,5,4,3,2],
	[12,5,5,4,3,2,1],
	[13,5,5,4,3,2,2],//25
	[13,5,5,5,4,2,2],
	[13,6,5,5,4,3,3],
	[14,6,6,5,4,3,3,1],
	[14,6,6,5,5,4,4,2],
	[18,6,6,6,5,5,4,3]//30
];

var PRIEST_RAMIFYING_LEVEL = [
	[0,0,0],//0
	[0,0,0],
	[2,0,0],
	[3,0,0],
	[3,0,0],
	[4,0,0],//5
	[4,0,25],
	[4,0,50],
	[5,0,75],
	[5,0,100],
	[5,0,125],//10
	[5,0,125],
	[6,0,150],
	[6,0,150],
	[6,1,175],
	[6,1,175],//15
	[6,2,200],
	[7,2,225],
	[7,2,225],
	[7,3,225],
	[7,3,250],//20
	[7,3,250],
	[7,4,250],
	[8,4,275],
	[8,4,275],
	[8,5,275],//25
	[8,5,300],
	[8,5,300],
	[8,6,300],
	[8,6,325],
	[9,7,350]//30
];

var getPriestRamifyingLevelAbilities = function() {
	return {
		'signs': PRIEST_RAMIFYING_LEVEL[character.ramifyingLevel][0],
		'wonders': PRIEST_RAMIFYING_LEVEL[character.ramifyingLevel][1],
		'chargePercentage': PRIEST_RAMIFYING_LEVEL[character.ramifyingLevel][2]
	};
};

var formulaCheck = /^[0-9 \+\-\*\/\(\)]*$/;

var evaluateCharacterFormula = function(formula) {

	var replacedFormula = formula.toUpperCase()
		   .replace('STR',character.strength)
		   .replace('CON',character.constitution)
	       .replace('DEX',character.dexterity)
	       .replace('PS',character.problemSolving)
	       .replace('RC',character.recall)
	       .replace('WIT',character.wit)
	       .replace('LD',character.leadership);
	
	if(formulaCheck.exec(replacedFormula)) {
		return eval(replacedFormula);
	} else {
		console.log("Bad formula: "+formula);
		return null;
	}
};

class CharacterProcessor {
	init(){}
	
	processBuy(buy){}
	
	postProcess(){}
}
