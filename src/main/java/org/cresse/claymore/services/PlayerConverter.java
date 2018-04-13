package org.cresse.claymore.services;

import java.util.Map;

import org.cresse.claymore.model.Player;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

public class PlayerConverter {

	public final static Player SYSTEM = new Player("system", "System User");

	public Player convertAuthentication(Authentication principal) {
		if(principal==null) {
			return SYSTEM;
		} else {
			Authentication authentication = ((OAuth2Authentication)principal).getUserAuthentication();
			@SuppressWarnings("unchecked")
			Map<String,String> details = (Map<String, String>) authentication.getDetails();
			return new Player(details.get("id"), details.get("name"));
		}
	}

}
