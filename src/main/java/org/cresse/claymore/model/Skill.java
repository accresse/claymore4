package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Skill {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long skillId;
    
    private int level;
    private int points;
    
    @Enumerated(EnumType.STRING)
    private SkillType category;
    
    private String skillName;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id")
	private Character character;

	public Long getSkillId() {
		return skillId;
	}

	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public SkillType getCategory() {
		return category;
	}

	public void setCategory(SkillType category) {
		this.category = category;
	}

	public String getSkillName() {
		return skillName;
	}

	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}

	public Character getCharacter() {
		return character;
	}

	public void setCharacter(Character character) {
		this.character = character;
	}

}
