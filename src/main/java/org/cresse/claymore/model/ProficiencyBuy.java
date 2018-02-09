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
public class ProficiencyBuy {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long buyId;
    
    private int level;
    private int points;
    
    @Enumerated(EnumType.STRING)
    private ProficiencyCategory category;
    
    private String ability;
	
	public ProficiencyBuy() {}

	public ProficiencyBuy(int level, int points, ProficiencyCategory category, String ability) {
		this.level = level;
		this.points = points;
		this.category = category;
		this.ability = ability;
	}

	public Long getBuyId() {
		return buyId;
	}

	public void setBuyId(Long buyId) {
		this.buyId = buyId;
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

	public ProficiencyCategory getCategory() {
		return category;
	}

	public void setCategory(ProficiencyCategory category) {
		this.category = category;
	}

	public String getAbility() {
		return ability;
	}

	public void setAbility(String ability) {
		this.ability = ability;
	}
}
