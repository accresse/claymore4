package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Defense {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long defenseId;
    
	private String name;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id")
	private Character character;
	
	private String notes;

	public Long getDefenseId() {
		return defenseId;
	}

	public void setDefenseId(Long defenseId) {
		this.defenseId = defenseId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Character getCharacter() {
		return character;
	}

	public void setCharacter(Character character) {
		this.character = character;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	
}
