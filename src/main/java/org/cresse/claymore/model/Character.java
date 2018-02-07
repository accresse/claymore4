package org.cresse.claymore.model;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import javax.persistence.Table;

@Entity
@Table(name="claymore_character")
public class Character {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long characterId;
    
	private String name;
	
	@Enumerated(EnumType.STRING)
	private Race race;

	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	private int age;//years
	private int height;//inches
	private int weight;//lbs
	
	private int currentHp;	
	private int xp;
	
	private int strength;
	private int constitution;
	private int dexterity;
	private int problemSolving;
	private int recall;
	private int wit;
	private int leadership;
	
	@Enumerated(EnumType.STRING)
	private WeaponSkill primaryWeaponSkill;
	
	@ManyToOne(cascade = {CascadeType.ALL})
	private Player player;
	
	@OneToMany(
	        mappedBy = "character", 
	        cascade = CascadeType.ALL
	    )
	private List<Attack> attacks = new LinkedList<>();

	@OneToMany(
	        mappedBy = "character", 
	        cascade = CascadeType.ALL
	    )
	private List<Defense> defenses = new LinkedList<>();

	@OneToMany(
	        mappedBy = "character", 
	        cascade = CascadeType.ALL
	    )
	private List<XpBuy> xpBuys = new LinkedList<>();

	@OneToMany(
	        mappedBy = "character", 
	        cascade = CascadeType.ALL
	    )
	private List<Skill> skills = new LinkedList<>();

	public Long getCharacterId() {
		return characterId;
	}

	public void setCharacterId(Long characterId) {
		this.characterId = characterId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Race getRace() {
		return race;
	}

	public void setRace(Race race) {
		this.race = race;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public int getCurrentHp() {
		return currentHp;
	}

	public void setCurrentHp(int currentHp) {
		this.currentHp = currentHp;
	}

	public int getXp() {
		return xp;
	}

	public void setXp(int xp) {
		this.xp = xp;
	}

	public int getStrength() {
		return strength;
	}

	public void setStrength(int strength) {
		this.strength = strength;
	}

	public int getConstitution() {
		return constitution;
	}

	public void setConstitution(int constitution) {
		this.constitution = constitution;
	}

	public int getDexterity() {
		return dexterity;
	}

	public void setDexterity(int dexterity) {
		this.dexterity = dexterity;
	}

	public int getProblemSolving() {
		return problemSolving;
	}

	public void setProblemSolving(int problemSolving) {
		this.problemSolving = problemSolving;
	}

	public int getRecall() {
		return recall;
	}

	public void setRecall(int recall) {
		this.recall = recall;
	}

	public int getWit() {
		return wit;
	}

	public void setWit(int wit) {
		this.wit = wit;
	}

	public int getLeadership() {
		return leadership;
	}

	public void setLeadership(int leadership) {
		this.leadership = leadership;
	}

	public WeaponSkill getPrimaryWeaponSkill() {
		return primaryWeaponSkill;
	}

	public void setPrimaryWeaponSkill(WeaponSkill primaryWeaponSkill) {
		this.primaryWeaponSkill = primaryWeaponSkill;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public List<Attack> getAttacks() {
		return attacks;
	}

	public void addAttack(Attack attack) {
		this.attacks.add(attack);
		attack.setCharacter(this);
	}
	
	public void removeAttack(Attack attack) {
		this.attacks.remove(attack);
		attack.setCharacter(null);
	}

	public List<Defense> getDefenses() {
		return defenses;
	}

	public void addDefense(Defense defense) {
		this.defenses.add(defense);
		defense.setCharacter(this);
	}
	
	public void removeDefense(Defense defense) {
		this.defenses.remove(defense);
		defense.setCharacter(null);
	}

	public List<XpBuy> getXpBuys() {
		return xpBuys;
	}

	public void addXpBuy(XpBuy xpBuy) {
		this.xpBuys.add(xpBuy);
		xpBuy.setCharacter(this);
	}
	
	public void removeXpBuy(XpBuy xpBuy) {
		this.xpBuys.remove(xpBuy);
		xpBuy.setCharacter(null);
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void addSkill(Skill skill) {
		this.skills.add(skill);
		skill.setCharacter(this);
	}
	
	public void removeSkill(Skill skill) {
		this.skills.remove(skill);
		skill.setCharacter(null);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((characterId == null) ? 0 : characterId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Character other = (Character) obj;
		if (characterId == null) {
			if (other.characterId != null)
				return false;
		} else if (!characterId.equals(other.characterId))
			return false;
		return true;
	}
	
}
