package org.cresse.claymore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WizardSpell {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long spellId;

    private int level;

    private String name;

    @Enumerated(EnumType.STRING)
    private WizardSchool school;

    private int speed;

    @Column(name="spell_range")
    private String range;

    private String areaOfEffect;

    private String duration;

    private String components;

    private String resist;

    private String damage;

	public Long getSpellId() {
		return spellId;
	}

	public void setSpellId(Long spellId) {
		this.spellId = spellId;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public WizardSchool getSchool() {
		return school;
	}

	public void setSchool(WizardSchool school) {
		this.school = school;
	}

	public int getSpeed() {
		return speed;
	}

	public void setSpeed(int speed) {
		this.speed = speed;
	}

	public String getRange() {
		return range;
	}

	public void setRange(String range) {
		this.range = range;
	}

	public String getAreaOfEffect() {
		return areaOfEffect;
	}

	public void setAreaOfEffect(String areaOfEffect) {
		this.areaOfEffect = areaOfEffect;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getComponents() {
		return components;
	}

	public void setComponents(String components) {
		this.components = components;
	}

	public String getResist() {
		return resist;
	}

	public void setResist(String resist) {
		this.resist = resist;
	}

	public String getDamage() {
		return damage;
	}

	public void setDamage(String damage) {
		this.damage = damage;
	}


}