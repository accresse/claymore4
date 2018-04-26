package org.cresse.claymore.model;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.rest.core.annotation.RestResource;

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
	private WeaponSkillType primaryWeaponSkill;

	@ManyToOne
	@RestResource(exported=false)
	private Player player;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name = "character_id")
	@RestResource(exported=false)
	private List<Attack> attacks = new LinkedList<>();

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name = "character_id")
	@RestResource(exported=false)
	private List<Defense> defenses = new LinkedList<>();

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name = "character_id")
	@RestResource(exported=false)
	private List<CustomizedWizardSpell> wizardSpells = new LinkedList<>();

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name = "character_id")
	@OrderBy("level, category")
	@RestResource(exported=false)
	private List<XpBuy> xpBuys = new LinkedList<>();

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name = "character_id")
	@RestResource(exported=false)
	private List<SkillBuy> skillBuys = new LinkedList<>();

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name = "character_id")
	@RestResource(exported=false)
	private List<CustomizedNonMartialSkill> nonMartialSkills = new LinkedList<>();

	@Temporal(TemporalType.TIMESTAMP)
	private Date lastModifiedTs;

	private boolean active = true;

	@PreUpdate
	@PrePersist
	public void updateTimeStamp() {
		lastModifiedTs = new Date();
	}

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

	public WeaponSkillType getPrimaryWeaponSkill() {
		return primaryWeaponSkill;
	}

	public void setPrimaryWeaponSkill(WeaponSkillType primaryWeaponSkill) {
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
	}

	public void removeAttack(Attack attack) {
		this.attacks.remove(attack);
	}

	public List<Defense> getDefenses() {
		return defenses;
	}

	public void addDefense(Defense defense) {
		this.defenses.add(defense);
	}

	public void removeDefense(Defense defense) {
		this.defenses.remove(defense);
	}

	public List<CustomizedWizardSpell> getWizardSpells() {
		return wizardSpells;
	}

	public void addWizardSpell(CustomizedWizardSpell spell) {
		this.wizardSpells.add(spell);
	}

	public void removeWizardSpell(CustomizedWizardSpell spell) {
		this.wizardSpells.remove(spell);
	}

	public List<CustomizedNonMartialSkill> getNonMartialSkills() {
		return nonMartialSkills;
	}

	public void addNonMartialSkill(CustomizedNonMartialSkill skill) {
		this.nonMartialSkills.add(skill);
	}

	public void removeNonMartialSkill(CustomizedNonMartialSkill skill) {
		this.nonMartialSkills.remove(skill);
	}

	public List<XpBuy> getXpBuys() {
		return xpBuys;
	}

	public void addXpBuy(XpBuy xpBuy) {
		this.xpBuys.add(xpBuy);
	}

	public void removeXpBuy(XpBuy xpBuy) {
		this.xpBuys.remove(xpBuy);
	}

	public List<SkillBuy> getSkillBuys() {
		return skillBuys;
	}

	public void addSkillBuy(SkillBuy skillBuy) {
		this.skillBuys.add(skillBuy);
	}

	public void removeSkillBuy(SkillBuy skillBuy) {
		this.skillBuys.remove(skillBuy);
	}

	public Date getLastModifiedTs() {
		return lastModifiedTs;
	}

	public void setLastModifiedTs(Date lastModifiedTs) {
		this.lastModifiedTs = lastModifiedTs;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
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
