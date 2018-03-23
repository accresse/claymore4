package org.cresse.claymore;

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
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	private CharacterRepository characterRepository;

	@Autowired
	private DefenseFactorRepository armorRepository;

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
		sword = new Weapon("Arming Sword",Size.Medium,WeaponGroup.Blades_Slashing,DamageType.Slashing,3,"2d8");
		weaponRepository.save(sword);

		club = new Weapon("2H Club",Size.Large,WeaponGroup.Crushing,DamageType.Bludgeoning,2,"3d10-H");
		weaponRepository.save(club);

		bow = new Weapon("Long Bow",Size.Medium,WeaponGroup.Bows,DamageType.Piercing,2,"2d6");
		weaponRepository.save(bow);

		chainMail = new DefenseFactor("Armor - Chain Mail","=16","+4","0");
		armorRepository.save(chainMail);

		plateMail = new DefenseFactor("Armor - Plate Mail","=24","+6","-8");
		armorRepository.save(plateMail);

		largeShield = new DefenseFactor("Shield - Large","+16","+0","-1");
		armorRepository.save(largeShield);

		other = new DefenseFactor("Other","+0","+0","0");
		armorRepository.save(other);


		template();
		quin();
		adny();
	}

	private void template() {
		Player system = new Player("system");
		playerRepository.save(system);

		org.cresse.claymore.model.Character template = new org.cresse.claymore.model.Character();
		template.setName("Template");
		template.setPlayer(system);
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

	private void quin() {
		Player adam = new Player("adam");
		playerRepository.save(adam);

		org.cresse.claymore.model.Character quin = new org.cresse.claymore.model.Character();
		quin.setName("Quin");
		quin.setPlayer(adam);
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

	private void adny() {
		Player colin = new Player("colin");
		playerRepository.save(colin);

		org.cresse.claymore.model.Character adny = new org.cresse.claymore.model.Character();
		adny.setName("Adny");
		adny.setPlayer(colin);
		adny.setGender(Gender.Other);
		adny.setAge(30);
		adny.setHeight(60);
		adny.setWeight(140);
		adny.setRace(Race.Halfling);
		adny.setCurrentHp(150);

		characterRepository.save(adny);
	}

	public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
