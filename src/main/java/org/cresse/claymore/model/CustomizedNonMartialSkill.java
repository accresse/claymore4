package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CustomizedNonMartialSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long skillId;

	private Long baseSkillId;
	private String name;
	private String formula;
	private int points;

	public Long getSkillId() {
		return skillId;
	}
	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}
	public Long getBaseSkillId() {
		return baseSkillId;
	}
	public void setBaseSkillId(Long baseSkillId) {
		this.baseSkillId = baseSkillId;
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
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}

}