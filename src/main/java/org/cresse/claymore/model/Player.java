package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Player {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long playerId;
    
	private String userName;
	
	public Player() {}
	
	public Player(String userName) {
		this.userName = userName;
	}
	
	public Long getPlayerId() {
		return playerId;
	}
	
	public void setPlayerId(Long playerId) {
		this.playerId = playerId;
	}
	
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
