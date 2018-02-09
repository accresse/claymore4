package org.cresse.claymore;

import org.cresse.claymore.model.AbilityCategory;
import org.cresse.claymore.model.Attack;
import org.cresse.claymore.model.DamageType;
import org.cresse.claymore.model.Defense;
import org.cresse.claymore.model.Gender;
import org.cresse.claymore.model.Player;
import org.cresse.claymore.model.Race;
import org.cresse.claymore.model.Size;
import org.cresse.claymore.model.Weapon;
import org.cresse.claymore.model.WeaponGroup;
import org.cresse.claymore.model.WeaponSkill;
import org.cresse.claymore.model.XpBuy;
import org.cresse.claymore.repository.CharacterRepository;
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
	private WeaponRepository weaponRepository;

	private Weapon sword;

	private Weapon club;

	@Override
	public void run(String... args) throws Exception {
		sword = new Weapon("Arming Sword",Size.Medium,WeaponGroup.Blades_Slashing,DamageType.Slashing,3,"2d8");
		//weaponRepository.save(sword);

		club = new Weapon("2H Club",Size.Large,WeaponGroup.Crushing,DamageType.Bludgeoning,2,"3d10-H");
		//weaponRepository.save(club);

		quin();
		adny();
	}

	private void quin() {
		Player adam = new Player("adam");		
		
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
		quin.setPrimaryWeaponSkill(WeaponSkill.MWS);
		
		Attack clubAttack = new Attack(this.club, WeaponSkill.MWS);
		clubAttack.setNotes("this is a <b>note</b>");
		clubAttack.setDamage("+1");
		quin.addAttack(clubAttack);
		
		Attack swordAttack1 = new Attack(this.sword, WeaponSkill.MWS);
		quin.addAttack(swordAttack1);
		
		Attack swordAttack2 = new Attack(this.sword, WeaponSkill.MWS);
		swordAttack2.setName("Sword2");
		swordAttack2.setHit("+2");
		swordAttack2.setDamage("+1");
		swordAttack2.setSpeed("+1");
		swordAttack2.setAttacks("+.5");
		quin.addAttack(swordAttack2);
		
		Attack swordAttack3 = new Attack(this.sword, WeaponSkill.BWS);
		swordAttack3.setName("Sword3");
		swordAttack3.setHit("-1");
		swordAttack3.setDamage("-2");
		swordAttack3.setSpeed("-3");
		swordAttack3.setAttacks("-1.5");
		quin.addAttack(swordAttack3);
		
		Attack swordAttack4 = new Attack(this.sword, WeaponSkill.MWS);
		swordAttack4.setName("Sword4");
		swordAttack4.setHit("=10");
		swordAttack4.setDamage("=3d12");
		swordAttack4.setSpeed("=7");
		swordAttack4.setAttacks("=2");
		quin.addAttack(swordAttack4);
		
		Defense defense = new Defense();
		defense.setName("Natural");
		quin.addDefense(defense);
		
		//level 1
		quin.addXpBuy(new XpBuy(1,1,AbilityCategory.Class,"Fighter"));
		quin.addXpBuy(new XpBuy(1,5,AbilityCategory.HP,null));
		quin.addXpBuy(new XpBuy(1,2,AbilityCategory.WeaponSkill,"{\"mws\":2, \"bws\":1}"));
		quin.addXpBuy(new XpBuy(1,2,AbilityCategory.WeaponMastery,"['Blades, Slashing','Bows']"));
		
		//level 2
		quin.addXpBuy(new XpBuy(2,5,AbilityCategory.HP,null));
		quin.addXpBuy(new XpBuy(2,2,AbilityCategory.WeaponSkill,"{\"mws\":2,\"bws\":1}"));
		quin.addXpBuy(new XpBuy(2,1,AbilityCategory.ClassSavingThrow,"{\"fortitude\": 15, \"identity\": -5}"));
		quin.addXpBuy(new XpBuy(2,2,AbilityCategory.WeaponMastery,"['Blades, Slashing','Bows']"));

		//level 3
		quin.addXpBuy(new XpBuy(3,1,AbilityCategory.SkillPoints,null));
		quin.addXpBuy(new XpBuy(3,1,AbilityCategory.SavingThrow,"{\"agility\":2,\"fortitude\":1}"));
		quin.addXpBuy(new XpBuy(3,1,AbilityCategory.ClassSavingThrow,"{\"might\": 10}"));
		quin.addXpBuy(new XpBuy(3,1,AbilityCategory.FighterClassAbility,"Weapon Appraisal"));

		characterRepository.save(quin);
	}

	private void adny() {
		Player colin = new Player("colin");

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
