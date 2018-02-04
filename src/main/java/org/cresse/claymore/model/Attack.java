package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Attack {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long attackId;
    
	private String name;
	private String hit;
	private String damage;
	private int speed;
	private float attacks;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id")
	private Character character;
	
	private String notes;

	public Long getAttackId() {
		return attackId;
	}

	public void setAttackId(Long attackId) {
		this.attackId = attackId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHit() {
		return hit;
	}

	public void setHit(String hit) {
		this.hit = hit;
	}

	public String getDamage() {
		return damage;
	}

	public void setDamage(String damage) {
		this.damage = damage;
	}

	public int getSpeed() {
		return speed;
	}

	public void setSpeed(int speed) {
		this.speed = speed;
	}

	public float getAttacks() {
		return attacks;
	}

	public void setAttacks(float attacks) {
		this.attacks = attacks;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Character getCharacter() {
		return character;
	}

	public void setCharacter(Character character) {
		this.character = character;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((attackId == null) ? 0 : attackId.hashCode());
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
		Attack other = (Attack) obj;
		if (attackId == null) {
			if (other.attackId != null)
				return false;
		} else if (!attackId.equals(other.attackId))
			return false;
		return true;
	}

	
	
}
