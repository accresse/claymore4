package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DefenseFactor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long defenseFactorId;

    private String name;

    private String deflect;

    private String absorb;

    private String toughness = "+0";

    private String adMod;

    public DefenseFactor() {}

    public DefenseFactor(String name, String ad, String aa, String adMod) {
    		this.name=name;
    		this.deflect = ad;
    		this.absorb = aa;
    		this.adMod=adMod;
    }

	public Long getDefenseFactorId() {
		return defenseFactorId;
	}

	public void setDefenseFactorId(Long defenseFactorId) {
		this.defenseFactorId = defenseFactorId;
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

	public String getAdMod() {
		return adMod;
	}

	public void setAdMod(String adMod) {
		this.adMod = adMod;
	}


}
