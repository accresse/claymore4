package org.cresse.claymore.config;

import org.cresse.claymore.model.Attack;
import org.cresse.claymore.model.DamageType;
import org.cresse.claymore.model.Defense;
import org.cresse.claymore.model.DefenseFactor;
import org.cresse.claymore.model.Gender;
import org.cresse.claymore.model.Player;
import org.cresse.claymore.model.Race;
import org.cresse.claymore.model.Size;
import org.cresse.claymore.model.SkillBuy;
import org.cresse.claymore.model.Weapon;
import org.cresse.claymore.model.WeaponGroup;
import org.cresse.claymore.model.WeaponSkillType;
import org.cresse.claymore.model.XpBuy;
import org.cresse.claymore.model.XpBuyCategory;
import org.cresse.claymore.repository.CharacterRepository;
import org.cresse.claymore.repository.DefenseFactorRepository;
import org.cresse.claymore.repository.PlayerRepository;
import org.cresse.claymore.repository.WeaponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("setup")
@Component
public class DataPrimer implements CommandLineRunner {

	@Autowired
	private CharacterRepository characterRepository;

	@Autowired
	private DefenseFactorRepository defenseFactorRepository;

	@Autowired
	private WeaponRepository weaponRepository;

	@Autowired
	private PlayerRepository playerRepository;

	private Weapon sword;

	private Weapon club;

	private Weapon bow;

	private DefenseFactor largeShield;

	private DefenseFactor chainMail;

	private DefenseFactor plateMail;

	private DefenseFactor other;

	@Override
	public void run(String... args) throws Exception {
		createWeapons();
		createDefenses();
		createSystemUser();
		createCharacterTemplate();
		createExampleCharacters();
	}

	private void createWeapons() {
		sword = saveWeapon(new Weapon("Arming Sword",Size.Medium,			WeaponGroup.Blades_Slashing,		DamageType.Slashing,3,"2d8"));
		saveWeapon(new Weapon("Bastard Sword (S)",	Size.MediumPlus,		WeaponGroup.Blades_Slashing,		DamageType.Slashing,4,"2d10"));
		saveWeapon(new Weapon("Cutlass Sword",		Size.Medium,			WeaponGroup.Blades_Slashing,		DamageType.Slashing,2,"2d6+2"));
		saveWeapon(new Weapon("Dagger (S)",			Size.Small,			WeaponGroup.Blades_Slashing,		DamageType.Slashing,5,"2d4"));
		saveWeapon(new Weapon("Broad Sword",			Size.MediumPlus,		WeaponGroup.Blades_Slashing,		DamageType.Slashing,1,"2d8+1"));
		saveWeapon(new Weapon("Knife (S)",			Size.Small,			WeaponGroup.Blades_Slashing,		DamageType.Slashing,5,"2d3"));

		saveWeapon(new Weapon("Dagger (P)",			Size.Small,			WeaponGroup.Blades_Stabbing,		DamageType.Piercing,5,"2d4"));
		saveWeapon(new Weapon("Gladius Urnum",		Size.MediumMinus,	WeaponGroup.Blades_Stabbing,		DamageType.Piercing,5,"2d6+3"));
		saveWeapon(new Weapon("Knife (P)",			Size.Small,			WeaponGroup.Blades_Stabbing,		DamageType.Piercing,5,"2d3"));
		saveWeapon(new Weapon("Short Sword",			Size.MediumMinus,	WeaponGroup.Blades_Stabbing,		DamageType.Piercing,5,"2d6+1"));
		saveWeapon(new Weapon("Tuck",				Size.Medium,			WeaponGroup.Blades_Stabbing,		DamageType.Piercing,4,"2d8"));

		saveWeapon(new Weapon("Bastard Sword (2H)",	Size.MediumPlus,		WeaponGroup.Blades_Two_Handed,	DamageType.Slashing,4,"2d10"));
		saveWeapon(new Weapon("Claymore",			Size.LargeMinus,		WeaponGroup.Blades_Two_Handed,	DamageType.Slashing,2,"2d10"));
		saveWeapon(new Weapon("Two-handed",			Size.Large,			WeaponGroup.Blades_Two_Handed,	DamageType.Slashing,0,"2d12"));

		bow = saveWeapon(new Weapon("Long Bow - War",Size.Large,			WeaponGroup.Bows,				DamageType.Piercing,2,"2d8"));
		saveWeapon(new Weapon("Long Bow - Huntsman",	Size.Large,			WeaponGroup.Bows,				DamageType.Piercing,2,"2d10"));
		saveWeapon(new Weapon("Short Bow - War",		Size.Medium,			WeaponGroup.Bows,				DamageType.Piercing,2,"2d8"));
		saveWeapon(new Weapon("Short Bow - Huntsman",Size.Medium,			WeaponGroup.Bows,				DamageType.Piercing,2,"2d10"));

		saveWeapon(new Weapon("Hand Crossbow",		Size.Small,			WeaponGroup.Crossbows,			DamageType.Piercing,3,"2d3"));
		saveWeapon(new Weapon("Heavy Crossbow",		Size.Large,			WeaponGroup.Crossbows,			DamageType.Piercing,2,"2d8+1"));
		saveWeapon(new Weapon("Light Crossbow",		Size.Medium,			WeaponGroup.Crossbows,			DamageType.Piercing,3,"2d6+1"));

		saveWeapon(new Weapon("Battle Axe",			Size.MediumPlus,		WeaponGroup.Cleaving,			DamageType.Slashing,1,"2d8+1"));
		saveWeapon(new Weapon("Hand Axe",			Size.Medium,			WeaponGroup.Cleaving,			DamageType.Slashing,4,"2d6"));
		saveWeapon(new Weapon("Hatchet",				Size.Small,			WeaponGroup.Cleaving,			DamageType.Slashing,4,"2d4"));
		saveWeapon(new Weapon("Footman's Pick",		Size.Medium,			WeaponGroup.Cleaving,			DamageType.Piercing,2,"2d6"));
		saveWeapon(new Weapon("Pole Axe",			Size.Large,			WeaponGroup.Cleaving,			DamageType.Slashing,0,"2d12"));

		saveWeapon(new Weapon("Club",				Size.Medium,			WeaponGroup.Crushing,			DamageType.Bludgeoning,4,"3d6-H"));
		club = saveWeapon(new Weapon("Two-handed Club",Size.Large,		WeaponGroup.Crushing,			DamageType.Bludgeoning,2,"3d10-H"));
		saveWeapon(new Weapon("Footman's Mace",		Size.Medium,			WeaponGroup.Crushing,			DamageType.Bludgeoning,2,"3d8-H"));
		saveWeapon(new Weapon("Morningstar (B)",		Size.MediumPlus,		WeaponGroup.Crushing,			DamageType.Bludgeoning,1,"3d8+1-H"));
		saveWeapon(new Weapon("Morningstar (P)",		Size.MediumPlus,		WeaponGroup.Crushing,			DamageType.Piercing,	   1,"3d8+1-H"));
		saveWeapon(new Weapon("Pole Hammer",			Size.Large,			WeaponGroup.Crushing,			DamageType.Bludgeoning,-2,"3d12-H"));
		saveWeapon(new Weapon("Sap",					Size.Small,			WeaponGroup.Crushing,			DamageType.Bludgeoning,5,"3d4-H"));
		saveWeapon(new Weapon("Warhammer",			Size.MediumMinus,	WeaponGroup.Crushing,			DamageType.Bludgeoning,6,"3d6-H"));

		saveWeapon(new Weapon("Footman's Flail",		Size.Medium,			WeaponGroup.Flails,				DamageType.Bludgeoning,1,"3d8-H"));
		saveWeapon(new Weapon("Two-handed Flail",	Size.LargePlus,		WeaponGroup.Flails,				DamageType.Bludgeoning,-1,"3d12-H"));



saveWeapon(new Weapon("Light Lance",Size.Large,WeaponGroup.Lances,DamageType.Piercing,6,"2d6+2"));
saveWeapon(new Weapon("Heavy Lance",Size.Large,WeaponGroup.Lances,DamageType.Piercing,6,"2d10+2"));
saveWeapon(new Weapon("Jousting Lance",Size.Large,WeaponGroup.Lances,DamageType.Bludgeoning,6,"3d4DH"));

saveWeapon(new Weapon("Long Pole ax",Size.LargePlus,WeaponGroup.Polearms,DamageType.Slashing,-2,"2d10+1"));
saveWeapon(new Weapon("Long Pole fork",Size.LargePlus,WeaponGroup.Polearms,DamageType.Piercing,-1,"2d8"));
saveWeapon(new Weapon("Long Pole hammer",Size.LargePlus,WeaponGroup.Polearms,DamageType.Bludgeoning,-3,"3d12DH-1"));
saveWeapon(new Weapon("Long Pole pick",Size.LargePlus,WeaponGroup.Polearms,DamageType.Piercing,-3,"2d6+1"));
saveWeapon(new Weapon("Long Pole spear",Size.LargePlus,WeaponGroup.Polearms,DamageType.Piercing,-1,"2d10"));
saveWeapon(new Weapon("Pole axe",Size.Large,WeaponGroup.Polearms,DamageType.Slashing,0,"2d12"));
saveWeapon(new Weapon("Pole fork",Size.Large,WeaponGroup.Polearms,DamageType.Piercing,1,"2d8"));
saveWeapon(new Weapon("Pole hammer",Size.Large,WeaponGroup.Polearms,DamageType.Bludgeoning,-2,"3d12DH"));
saveWeapon(new Weapon("Pole pick",Size.Large,WeaponGroup.Polearms,DamageType.Piercing,-2,"2d8"));
saveWeapon(new Weapon("Pole spear",Size.Large,WeaponGroup.Polearms,DamageType.Piercing,1,"2d10+1"));
saveWeapon(new Weapon("Spear",Size.Medium,WeaponGroup.Polearms,DamageType.Piercing,5,"2d8"));
saveWeapon(new Weapon("Trident",Size.MediumPlus,WeaponGroup.Polearms,DamageType.Piercing,1,"2d6"));

saveWeapon(new Weapon("Javelin",Size.Medium,WeaponGroup.Spears,DamageType.Piercing,4,"2d6"));
saveWeapon(new Weapon("Pole fork",Size.Large,WeaponGroup.Spears,DamageType.Piercing,1,"2d8"));
saveWeapon(new Weapon("Pole spear",Size.Large,WeaponGroup.Spears,DamageType.Piercing,1,"2d10"));
saveWeapon(new Weapon("Spear",Size.Medium,WeaponGroup.Spears,DamageType.Piercing,5,"2d8"));
saveWeapon(new Weapon("Short Spear",Size.MediumMinus,WeaponGroup.Spears,DamageType.Piercing,5,"2d6+2"));
saveWeapon(new Weapon("Trident",Size.Medium,WeaponGroup.Spears,DamageType.Piercing,1,"2d6"));

saveWeapon(new Weapon("Brass Knuckles",Size.Small,WeaponGroup.Punching_Weapons,DamageType.Bludgeoning,3,"3d4DH"));
saveWeapon(new Weapon("Gauntlet",Size.Small,WeaponGroup.Punching_Weapons,DamageType.Bludgeoning,3,"3d4DH+2"));
saveWeapon(new Weapon("Cestus (P)",Size.Small,WeaponGroup.Punching_Weapons,DamageType.Piercing,3,"2d4"));
saveWeapon(new Weapon("Cestus (S)",Size.Small,WeaponGroup.Punching_Weapons,DamageType.Slashing,3,"2d4"));
saveWeapon(new Weapon("Punch Buckler",Size.SmallMinus,WeaponGroup.Punching_Weapons,DamageType.Bludgeoning,3,"3d4DH"));
saveWeapon(new Weapon("Punch Dagger",Size.Small,WeaponGroup.Punching_Weapons,DamageType.Piercing,3,"2d3"));

saveWeapon(new Weapon("Chain",Size.Large,WeaponGroup.Rope_like,DamageType.Bludgeoning,2,"3d10DH"));
saveWeapon(new Weapon("Short Chain",Size.Medium,WeaponGroup.Rope_like,DamageType.Bludgeoning,2,"3d8DH"));
saveWeapon(new Weapon("Scourge ",Size.Medium,WeaponGroup.Rope_like,DamageType.Slashing,2,"2d4+2"));
saveWeapon(new Weapon("Whip",Size.Medium,WeaponGroup.Rope_like,DamageType.Slashing,2,"2d2"));

saveWeapon(new Weapon("Sling - Bullet",Size.Medium,WeaponGroup.Slings,DamageType.Bludgeoning,1,"2d6+2"));
saveWeapon(new Weapon("Sling - Stone",Size.Medium,WeaponGroup.Slings,DamageType.Bludgeoning,1,"2d6+1"));
saveWeapon(new Weapon("Staff Sling - Bullet",Size.MediumPlus,WeaponGroup.Slings,DamageType.Bludgeoning,0,"2d6+4"));
saveWeapon(new Weapon("Staff Sling - Stone",Size.MediumPlus,WeaponGroup.Slings,DamageType.Bludgeoning,0,"2d6+3"));

saveWeapon(new Weapon("Dagger",Size.Small,WeaponGroup.Small_Throwing,DamageType.Piercing,5,"2d4"));
saveWeapon(new Weapon("Hatchet",Size.Small,WeaponGroup.Small_Throwing,DamageType.Slashing,4,"2d4"));
saveWeapon(new Weapon("Knife (S)",Size.Small,WeaponGroup.Small_Throwing,DamageType.Slashing,5,"2d3"));
saveWeapon(new Weapon("Knife (P)",Size.Small,WeaponGroup.Small_Throwing,DamageType.Piercing,5,"2d3"));
saveWeapon(new Weapon("Rock",Size.Small,WeaponGroup.Small_Throwing,DamageType.Bludgeoning,5,"3d4DH"));

saveWeapon(new Weapon("Quarterstaff ",Size.Large,WeaponGroup.Quarter_Staff,DamageType.Bludgeoning,4,"3d6DH"));

saveWeapon(new Weapon("Chair/Stool",Size.MediumMinus,WeaponGroup.Improvised,DamageType.Bludgeoning,0,"3d6DH"));
saveWeapon(new Weapon("Chisel/Ice Pick ",Size.SmallMinus,WeaponGroup.Improvised,DamageType.Piercing,2,"2d3"));
saveWeapon(new Weapon("Crowbar",Size.Medium,WeaponGroup.Improvised,DamageType.Bludgeoning,1,"3d8dH-1"));
saveWeapon(new Weapon("Machete",Size.Medium,WeaponGroup.Improvised,DamageType.Slashing,2,"2d8"));
saveWeapon(new Weapon("Molotov Cocktail",Size.Small,WeaponGroup.Improvised,DamageType.Bludgeoning,1,"0"));
saveWeapon(new Weapon("Pitch Fork",Size.Medium,WeaponGroup.Improvised,DamageType.Piercing,0,"2d6"));
saveWeapon(new Weapon("Pot, Heavy",Size.Medium,WeaponGroup.Improvised,DamageType.Bludgeoning,1,"3d6DH+1"));
saveWeapon(new Weapon("Rock",Size.Small,WeaponGroup.Improvised,DamageType.Bludgeoning,5,"3d4DH"));
saveWeapon(new Weapon("Rock, Robust",Size.Medium,WeaponGroup.Improvised,DamageType.Bludgeoning,3,"3d6DH"));
saveWeapon(new Weapon("Sickle",Size.Small,WeaponGroup.Improvised,DamageType.Slashing,2,"2d4+1"));
saveWeapon(new Weapon("Torch",Size.Medium,WeaponGroup.Improvised,DamageType.Bludgeoning,4,"3d6DH-1"));
saveWeapon(new Weapon("Torch, Thrown",Size.Medium,WeaponGroup.Improvised,DamageType.Bludgeoning,4,"0"));
saveWeapon(new Weapon("Vial",Size.Small,WeaponGroup.Improvised,DamageType.Bludgeoning,4,"0"));

saveWeapon(new Weapon("Buckler",Size.SmallMinus,WeaponGroup.Shields,DamageType.Bludgeoning,3,"3d4DH"));
saveWeapon(new Weapon("Small Shield",Size.Small,WeaponGroup.Shields,DamageType.Bludgeoning,2,"3d4DH"));
saveWeapon(new Weapon("Medium Shield",Size.Medium,WeaponGroup.Shields,DamageType.Bludgeoning,1,"3d4DH"));
saveWeapon(new Weapon("Kite Shield",Size.Medium,WeaponGroup.Shields,DamageType.Bludgeoning,1,"3d4DH"));
saveWeapon(new Weapon("Large Shield",Size.Medium,WeaponGroup.Shields,DamageType.Bludgeoning,0,"3d6DH"));
saveWeapon(new Weapon("Tower Shield",Size.Medium,WeaponGroup.Shields,DamageType.Bludgeoning,-1,"3d4DH"));
	}

	private Weapon saveWeapon(Weapon weapon) {
		Weapon dbWeapon = weaponRepository.findFirstWeaponByNameAndWeaponGroup(weapon.getName(), weapon.getWeaponGroup());
		if(dbWeapon != null) {
			weapon.setWeaponId(dbWeapon.getWeaponId());
		}
		return weaponRepository.save(weapon);
	}

	private void createDefenses() {
		chainMail = saveDefenseFactor(new DefenseFactor("Armor - Chain Mail","=16","+4","0"));

		plateMail = saveDefenseFactor(new DefenseFactor("Armor - Plate Mail","=24","+6","-8"));

		largeShield = saveDefenseFactor(new DefenseFactor("Shield - Large","+16","+0","-1"));

		other = saveDefenseFactor(new DefenseFactor("Other","+0","+0","0"));
	}

	private DefenseFactor saveDefenseFactor(DefenseFactor defenseFactor) {
		DefenseFactor dbDefenseFactor = defenseFactorRepository.findFirstDefenseFactorByName(defenseFactor.getName());
		if(dbDefenseFactor != null) {
			defenseFactor.setDefenseFactorId(dbDefenseFactor.getDefenseFactorId());
		}
		return defenseFactorRepository.save(defenseFactor);
	}

	private void createSystemUser() {
		playerRepository.save(new Player("system", "System User"));
	}

	private void createCharacterTemplate() {
		if(characterRepository.findFirstCharacterByName("Template") == null) {
			template();
		}
	}

	private void template() {
		org.cresse.claymore.model.Character template = new org.cresse.claymore.model.Character();
		template.setName("Template");
		template.setGender(Gender.Male);
		template.setAge(20);
		template.setHeight(68);
		template.setWeight(160);
		template.setRace(Race.Human);
		template.setCurrentHp(0);
		template.setXp(0);
		template.setStrength(15);
		template.setDexterity(15);
		template.setConstitution(15);
		template.setProblemSolving(15);
		template.setRecall(15);
		template.setWit(15);
		template.setLeadership(15);
		template.setPrimaryWeaponSkill(WeaponSkillType.MWS);
		template.setActive(false);

		template.addXpBuy(new XpBuy(1,0,XpBuyCategory.HP,null));
		template.addXpBuy(new XpBuy(1,0,XpBuyCategory.WeaponSkill,"MWS"));
		template.addXpBuy(new XpBuy(1,0,XpBuyCategory.SkillPoints,null));
		template.addXpBuy(new XpBuy(1,0,XpBuyCategory.SavingThrow,null));

		characterRepository.save(template);
	}

	private void createExampleCharacters() {
		quin();
	}

	private void quin() {
		org.cresse.claymore.model.Character quin = new org.cresse.claymore.model.Character();
		quin.setName("Quin");
		quin.setGender(Gender.Male);
		quin.setAge(20);
		quin.setHeight(72);
		quin.setWeight(200);
		quin.setRace(Race.Human);
		quin.setCurrentHp(8);
		quin.setXp(30);
		quin.setStrength(18);
		quin.setDexterity(18);
		quin.setConstitution(18);
		quin.setProblemSolving(18);
		quin.setRecall(18);
		quin.setWit(18);
		quin.setLeadership(18);
		quin.setPrimaryWeaponSkill(WeaponSkillType.MWS);

		//hit=56 (mws) -10 (unskilled) +1 (prof) +0 (mastery)
		//damage=3d10-H (base) +1 (attack) +0 (mastery)
		//attacks=1 (base) +0 (mastery)
		//speed=2 (base) +0 (mastery)
		Attack clubAttack = new Attack(this.club, WeaponSkillType.MWS);
		clubAttack.setNotes("this is a <b>note</b>");
		clubAttack.setDamage("+1");
		quin.addAttack(clubAttack);

		//hit=56 (mws) -10 (unskilled) +10 (prof) +4 (L2 mastery)
		//damage=2d8 (base) +0 (attack) +2 (L2 mastery)
		//attacks=1 (base) +0 (mastery) +0 (L2 mastery)
		//speed=3 (base) +0 (mastery) +0 (L2 mastery)
		Attack swordAttack1 = new Attack(this.sword, WeaponSkillType.MWS);
		quin.addAttack(swordAttack1);

		//hit=56 (mws) +2 (attack) -10 (unskilled) +10 (prof) +4 (L2 mastery)
		//damage=2d8 (base) +1 (attack) +2 (L2 mastery)
		//attacks=1 (base) +.5 (attack) +0 (mastery) +0 (L2 mastery)
		//speed=3 (base) +1 (attack) +0 (mastery) +0 (L2 mastery)
		Attack swordAttack2 = new Attack(this.sword, WeaponSkillType.MWS);
		swordAttack2.setName("Sword2");
		swordAttack2.setHit("+2");
		swordAttack2.setDamage("+1");
		swordAttack2.setSpeed("+1");
		swordAttack2.setAttacks("+.5");
		quin.addAttack(swordAttack2);

		Attack swordAttack3 = new Attack(this.sword, WeaponSkillType.BWS);
		swordAttack3.setName("Sword3");
		swordAttack3.setHit("-1");
		swordAttack3.setDamage("-2");
		swordAttack3.setSpeed("-3");
		swordAttack3.setAttacks("-1.5");
		quin.addAttack(swordAttack3);

		Attack swordAttack4 = new Attack(this.sword, WeaponSkillType.MWS);
		swordAttack4.setName("Sword4");
		swordAttack4.setHit("=10");
		swordAttack4.setDamage("=3d12");
		swordAttack4.setSpeed("=7");
		swordAttack4.setAttacks("=2");
		quin.addAttack(swordAttack4);

		Attack bowAttack = new Attack(this.bow, WeaponSkillType.BWS);
		quin.addAttack(bowAttack);

		quin.addDefense(new Defense(chainMail));
		quin.addDefense(new Defense(plateMail));
		quin.addDefense(new Defense(largeShield));

		//level 1
		quin.addXpBuy(new XpBuy(1,5,XpBuyCategory.HP,null));
		quin.addXpBuy(new XpBuy(1,2,XpBuyCategory.WeaponSkill,"MWS"));
		quin.addXpBuy(new XpBuy(1,0,XpBuyCategory.SkillPoints,null));
		quin.addXpBuy(new XpBuy(1,0,XpBuyCategory.SavingThrow,null));

		quin.addXpBuy(new XpBuy(1,1,XpBuyCategory.Class,"Fighter"));
		quin.addXpBuy(new XpBuy(1,2,XpBuyCategory.WeaponMastery,WeaponGroup.Blades_Slashing+","+WeaponGroup.Bows));
		quin.addSkillBuy(new SkillBuy(1,14, WeaponGroup.Blades_Slashing));
		quin.addSkillBuy(new SkillBuy(1,3, WeaponGroup.Crushing));
		quin.addSkillBuy(new SkillBuy(1,14, WeaponGroup.Bows));

		//level 2
		quin.addXpBuy(new XpBuy(2,5,XpBuyCategory.HP,null));
		quin.addXpBuy(new XpBuy(2,2,XpBuyCategory.WeaponSkill,"MWS"));
		quin.addXpBuy(new XpBuy(2,0,XpBuyCategory.SkillPoints,null));
		quin.addXpBuy(new XpBuy(2,0,XpBuyCategory.SavingThrow,null));

		quin.addXpBuy(new XpBuy(2,1,XpBuyCategory.ClassSavingThrow,"fortitude,identity"));
		quin.addXpBuy(new XpBuy(2,2,XpBuyCategory.WeaponMastery,WeaponGroup.Blades_Slashing+","+WeaponGroup.Bows));

		//level 3
		quin.addXpBuy(new XpBuy(3,5,XpBuyCategory.HP,null));
		quin.addXpBuy(new XpBuy(3,0,XpBuyCategory.WeaponSkill,"MWS"));
		quin.addXpBuy(new XpBuy(3,1,XpBuyCategory.SkillPoints,null));
		quin.addXpBuy(new XpBuy(3,1,XpBuyCategory.SavingThrow,"agility,fortitude"));

		quin.addXpBuy(new XpBuy(3,1,XpBuyCategory.ClassSavingThrow,"might"));
		//quin.addXpBuy(new XpBuy(3,1,XpBuyCategory.FighterClassAbility,"Weapon Appraisal"));
		quin.addXpBuy(new XpBuy(3,2,XpBuyCategory.WeaponMastery,WeaponGroup.Blades_Slashing+","+WeaponGroup.Bows));

		characterRepository.save(quin);
	}

}
