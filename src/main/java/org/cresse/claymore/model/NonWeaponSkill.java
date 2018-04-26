package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class NonWeaponSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long skillId;

	private String name;
	private String formula;

	public NonWeaponSkill() {}

	public NonWeaponSkill(String name, String formula) {
		this.name = name;
		this.formula = formula;
	}

	public Long getSkillId() {
		return skillId;
	}

	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFormula() {
		return formula;
	}

	public void setFormula(String formula) {
		this.formula = formula;
	}

}
