package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Player {

    @Id
	private String playerId;

	private String userName;

	public Player() {}

	public Player(String playerId, String userName) {
		this.playerId = playerId;
		this.userName = userName;
	}

	public String getPlayerId() {
		return playerId;
	}

	public void setPlayerId(String playerId) {
		this.playerId = playerId;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
