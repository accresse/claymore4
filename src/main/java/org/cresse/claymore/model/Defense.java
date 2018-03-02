package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Defense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long defenseId;

    private Long baseDefenseFactorId;

    private String name;

    private String deflect;

    private String adMod;

    private String absorb;

    private String toughness;

	private String notes;

	public Defense() {}

	public Defense(DefenseFactor defenseFactor) {
		this.setBaseDefenseFactorId(defenseFactor.getDefenseFactorId());
	}

	public Long getDefenseId() {
		return defenseId;
	}

	public void setDefenseId(Long defenseId) {
		this.defenseId = defenseId;
	}

	public Long getBaseDefenseFactorId() {
		return baseDefenseFactorId;
	}

	public void setBaseDefenseFactorId(Long baseDefenseFactorId) {
		this.baseDefenseFactorId = baseDefenseFactorId;
	}

	public void setBaseDefenseFactor(DefenseFactor defenseFactor) {
		this.setBaseDefenseFactorId(defenseFactor.getDefenseFactorId());
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDeflect() {
		return deflect;
	}

	public void setDeflect(String deflect) {
		this.deflect = deflect;
	}

	public String getAdMod() {
		return adMod;
	}

	public void setAdMod(String adMod) {
		this.adMod = adMod;
	}

	public String getAbsorb() {
		return absorb;
	}

	public void setAbsorb(String absorb) {
		this.absorb = absorb;
	}

	public String getToughness() {
		return toughness;
	}

	public void setToughness(String toughness) {
		this.toughness = toughness;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}


}
