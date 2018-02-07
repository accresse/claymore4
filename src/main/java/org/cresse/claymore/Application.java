package org.cresse.claymore;

import org.cresse.claymore.model.AbilityCategory;
import org.cresse.claymore.model.Attack;
import org.cresse.claymore.model.Defense;
import org.cresse.claymore.model.Gender;
import org.cresse.claymore.model.Player;
import org.cresse.claymore.model.Race;
import org.cresse.claymore.model.WeaponSkill;
import org.cresse.claymore.model.XpBuy;
import org.cresse.claymore.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application implements CommandLineRunner {
	
	@Autowired
	private CharacterRepository characterRepository;

	@Override
	public void run(String... args) throws Exception {
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
		
		Attack club = new Attack();
		club.setName("2H Club");
		club.setHit("103");
		club.setDamage("2d12+8");
		club.setAttacks(2.5f);
		club.setSpeed(5);
		club.setNotes("this is a <b>note</b>");
		quin.addAttack(club);
		
		Attack chain = new Attack();
		chain.setName("Chain");
		chain.setHit("100");
		chain.setDamage("2d12+8");
		chain.setAttacks(2.5f);
		chain.setSpeed(5);
		chain.setNotes("this is another <b>note</b>");
		quin.addAttack(chain);
		
		Attack dagger = new Attack();
		dagger.setName("Dagger");
		dagger.setHit("100");
		dagger.setDamage("d4");
		dagger.setAttacks(2.5f);
		dagger.setSpeed(5);
		dagger.setNotes("this is another <b>note</b>");
		quin.addAttack(dagger);
		
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
