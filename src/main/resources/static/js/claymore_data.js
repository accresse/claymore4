var MAX_HP_BUY_PER_LEVEL = 10;
var HP_BASE = 6;
var PWS_BASE = 50;
var SWS_BASE = 45;

var HP_BUY_TABLE = {
	lowLevel:  {0:1,2:3,5:6},
	highLevel: {0:1,2:2,5:3}
};

var STR_TABLE = [
	{},
	{mwsMod:-22, damMod:-9, might:-40, maxLift:3},
	{mwsMod:-16, damMod:-6, might:-32, maxLift:5},
	{mwsMod:-13, damMod:-5, might:-28, maxLift:10},
	{mwsMod:-11, damMod:-4, might:-26, maxLift:15},
	{mwsMod:-8, damMod:-3, might:-24, maxLift:25},
	{mwsMod:-6, damMod:-2, might:-20, maxLift:55},
	{mwsMod:-4, damMod:-1, might:-15, maxLift:90},
	{mwsMod:-2, damMod:0, might:-8, maxLift:110},
	{mwsMod:-2, damMod:0, might:-8, maxLift:110},
	{mwsMod:-1, damMod:0, might:-5, maxLift:140},
	{mwsMod:-1, damMod:0, might:-5, maxLift:140},
	{mwsMod:-1, damMod:0, might:-5, maxLift:140},
	{mwsMod:0, damMod:0, might:0, maxLift:170},
	{mwsMod:0, damMod:0, might:0, maxLift:170},
	{mwsMod:0, damMod:0, might:0, maxLift:170},
	{mwsMod:1, damMod:0, might:2, maxLift:200},
	{mwsMod:1, damMod:0, might:2, maxLift:200},
	{mwsMod:1, damMod:0, might:6, maxLift:225},
	{mwsMod:1, damMod:0, might:10, maxLift:260},
	{mwsMod:2, damMod:1, might:14, maxLift:280},
	{mwsMod:3, damMod:2, might:18, maxLift:300},
	{mwsMod:3, damMod:3, might:22, maxLift:330},
	{mwsMod:4, damMod:4, might:26, maxLift:380},
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

var DEX_TABLE = [
	{},
	{bwsMod:-42, aglMod:-25, iMod:-12},
	{bwsMod:-30, aglMod:-20, iMod:-6},
	{bwsMod:-25, aglMod:-17, iMod:-4},
	{bwsMod:-20, aglMod:-13, iMod:-3},
	{bwsMod:-15, aglMod:-11, iMod:-2},
	{bwsMod:-10, aglMod:-8, iMod:-2},
	{bwsMod:-5, aglMod:-5, iMod:-1},
	{bwsMod:-2, aglMod:-2, iMod:-1},
	{bwsMod:-1, aglMod:-1, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:0, aglMod:0, iMod:0},
	{bwsMod:1, aglMod:2, iMod:0},
	{bwsMod:2, aglMod:3, iMod:0},
	{bwsMod:3, aglMod:6, iMod:1},
	{bwsMod:5, aglMod:9, iMod:1},
	{bwsMod:7, aglMod:12, iMod:1},
	{bwsMod:9, aglMod:14, iMod:1},
	{bwsMod:10, aglMod:17, iMod:2},
	{bwsMod:13, aglMod:20, iMod:2},
	{bwsMod:16, aglMod:22, iMod:2},
	{bwsMod:19, aglMod:23, iMod:2},
	{bwsMod:22, aglMod:24, iMod:3},
	{bwsMod:28, aglMod:24, iMod:4},
	{bwsMod:34, aglMod:26, iMod:6},
	{bwsMod:41, aglMod:33, iMod:10}	
];

var PS_TABLE = [
	{},
	{skillPoints:-6, wilMod:-25, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-6, wilMod:-20, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-5, wilMod:-17, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-4, wilMod:-13, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-3, wilMod:-8, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-3, wilMod:-5, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-2, wilMod:-2, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-2, wilMod:-1, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-2, wilMod:0, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-1, wilMod:0, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-1, wilMod:0, bonusPriestSpells:{}, learnSpell:25},
	{skillPoints:-1, wilMod:0, bonusPriestSpells:{}, learnSpell:26},
	{skillPoints:0, wilMod:0, bonusPriestSpells:{}, learnSpell:28},
	{skillPoints:0, wilMod:0, bonusPriestSpells:{}, learnSpell:29},
	{skillPoints:0, wilMod:0, bonusPriestSpells:{}, learnSpell:30},
	{skillPoints:1, wilMod:0, bonusPriestSpells:{}, learnSpell:31},
	{skillPoints:1, wilMod:1, bonusPriestSpells:{}, learnSpell:32},
	{skillPoints:1, wilMod:2, bonusPriestSpells:{1:1}, learnSpell:33},
	{skillPoints:1, wilMod:5, bonusPriestSpells:{1:1}, learnSpell:34},
	{skillPoints:2, wilMod:8, bonusPriestSpells:{1:1}, learnSpell:36},
	{skillPoints:2, wilMod:11, bonusPriestSpells:{1:1}, learnSpell:40},
	{skillPoints:2, wilMod:13, bonusPriestSpells:{1:1,2:1}, learnSpell:48},
	{skillPoints:3, wilMod:17, bonusPriestSpells:{1:1,2:1}, learnSpell:54},
	{skillPoints:3, wilMod:20, bonusPriestSpells:{1:1,2:1}, learnSpell:64},
	{skillPoints:3, wilMod:22, bonusPriestSpells:{1:1,2:1,3:1}, learnSpell:75},
	{skillPoints:4, wilMod:23, bonusPriestSpells:{1:1,2:1,3:1}, learnSpell:100},
	{skillPoints:4, wilMod:25, bonusPriestSpells:{1:1,2:1,3:1,4:1}, learnSpell:125},
	{skillPoints:5, wilMod:27, bonusPriestSpells:{1:2,2:1,3:1,4:1,5:1}, learnSpell:125},
	{skillPoints:8, wilMod:33, bonusPriestSpells:{1:2,2:2,3:1,4:1,5:1,6:1}, learnSpell:125},
	{skillPoints:14, wilMod:37, bonusPriestSpells:{1:2,2:2,3:2,4:1,5:1,6:1,7:1}, learnSpell:125}
];

var RC_TABLE = [
	{},
	{skillPoints:-65, idnMod:-25, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-60, idnMod:-20, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-55, idnMod:-17, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-50, idnMod:-13, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-45, idnMod:-11, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-40, idnMod:-8, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-35, idnMod:-5, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-30, idnMod:-2, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-20, idnMod:-1, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-15, idnMod:0, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-10, idnMod:0, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-6, idnMod:0, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:-4, idnMod:0, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:0, idnMod:0, bonusPriestSpells:{}, learnSpell:0},
	{skillPoints:2, idnMod:0, bonusPriestSpells:{1:1}, learnSpell:5},
	{skillPoints:4, idnMod:0, bonusPriestSpells:{1:1}, learnSpell:6},
	{skillPoints:6, idnMod:1, bonusPriestSpells:{1:1}, learnSpell:7},
	{skillPoints:8, idnMod:2, bonusPriestSpells:{1:1}, learnSpell:8},
	{skillPoints:10, idnMod:5, bonusPriestSpells:{1:1}, learnSpell:10},
	{skillPoints:12, idnMod:8, bonusPriestSpells:{1:1,2:1}, learnSpell:12},
	{skillPoints:16, idnMod:11, bonusPriestSpells:{1:1,2:1}, learnSpell:14},
	{skillPoints:20, idnMod:13, bonusPriestSpells:{1:1,2:1}, learnSpell:16},
	{skillPoints:25, idnMod:17, bonusPriestSpells:{1:1,2:1,3:1}, learnSpell:18},
	{skillPoints:30, idnMod:20, bonusPriestSpells:{1:2,2:1,3:1}, learnSpell:20},
	{skillPoints:50, idnMod:22, bonusPriestSpells:{1:2,2:1,3:1,4:1}, learnSpell:22},
	{skillPoints:70, idnMod:23, bonusPriestSpells:{1:2,2:2,3:1,4:1}, learnSpell:25},
	{skillPoints:100, idnMod:25, bonusPriestSpells:{1:2,2:2,3:1,4:1,5:1}, learnSpell:30},
	{skillPoints:150, idnMod:27, bonusPriestSpells:{1:2,2:2,3:2,4:1,5:1}, learnSpell:35},
	{skillPoints:200, idnMod:23, bonusPriestSpells:{1:2,2:2,3:2,4:1,5:1,6:1,7:1}, learnSpell:40},
	{skillPoints:300, idnMod:27, bonusPriestSpells:{1:2,2:2,3:2,4:2,5:2,6:1,7:1}, learnSpell:50}
];

var WIT_TABLE = [
	{},
	{weaponMod:-24, aglMod:-14, percMod:-14, spellFailure:100},
	{weaponMod:-20, aglMod:-10, percMod:-10, spellFailure:100},
	{weaponMod:-16, aglMod:-6, percMod:-6, spellFailure:100},
	{weaponMod:-12, aglMod:-4, percMod:-4, spellFailure:100},
	{weaponMod:-10, aglMod:-3, percMod:-3, spellFailure:75},
	{weaponMod:-8, aglMod:-2, percMod:-2, spellFailure:50},
	{weaponMod:-6, aglMod:-1, percMod:-1, spellFailure:43},
	{weaponMod:-4, aglMod:-1, percMod:-1, spellFailure:32},
	{weaponMod:-3, aglMod:0, percMod:0, spellFailure:25},
	{weaponMod:-2, aglMod:0, percMod:0, spellFailure:19},
	{weaponMod:-1, aglMod:0, percMod:0, spellFailure:14},
	{weaponMod:0, aglMod:0, percMod:0, spellFailure:11},
	{weaponMod:0, aglMod:0, percMod:0, spellFailure:7},
	{weaponMod:0, aglMod:0, percMod:0, spellFailure:5},
	{weaponMod:0, aglMod:0, percMod:0, spellFailure:3},
	{weaponMod:1, aglMod:0, percMod:1, spellFailure:2},
	{weaponMod:1, aglMod:0, percMod:1, spellFailure:1},
	{weaponMod:1, aglMod:0, percMod:2, spellFailure:0},
	{weaponMod:1, aglMod:0, percMod:2, spellFailure:0},
	{weaponMod:2, aglMod:1, percMod:3, spellFailure:0},
	{weaponMod:2, aglMod:1, percMod:3, spellFailure:0},
	{weaponMod:3, aglMod:2, percMod:4, spellFailure:0},
	{weaponMod:4, aglMod:2, percMod:4, spellFailure:0},
	{weaponMod:5, aglMod:2, percMod:5, spellFailure:0},
	{weaponMod:7, aglMod:3, percMod:5, spellFailure:0},
	{weaponMod:9, aglMod:3, percMod:6, spellFailure:0},
	{weaponMod:12, aglMod:3, percMod:7, spellFailure:0},
	{weaponMod:16, aglMod:4, percMod:8, spellFailure:0},
	{weaponMod:21, aglMod:4, percMod:10, spellFailure:0},
	{weaponMod:27, aglMod:4, percMod:14, spellFailure:0},
];

var UNSKILLED_TABLE = {
	Fighter:	-10,
	Priest:-15,
	Rogue:-15,
	Wizard:-20,
	None:-25	
};

var WEAPON_GROUP_COST_TABLE = {
	'Blades_Slashing':14,
	'Blades_Stabbing':12,
	'Blades_Two_Handed':16,
	'Bows':14,
	'Crossbows':6,
	'Cleaving':10,
	'Crushing':8,
	'Flails':16,
	'Lances':14,
	'Polearms':14,
	'Spears':10,
	'Punching_Weapons':4,
	'Rope_like':14,
	'Slings':14,
	'Small_Throwing':8,
	'Quarter_Staff':12,
	'Improvised':10,
	'Shields	':4		
};

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

class CharacterProcessor {
	init(){}
	
	processBuy(buy){}
	
	postProcess(){}
}
