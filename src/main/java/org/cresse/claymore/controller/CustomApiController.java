package org.cresse.claymore.controller;

import java.security.Principal;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.cresse.claymore.model.Player;
import org.cresse.claymore.repository.PlayerRepository;
import org.cresse.claymore.services.PlayerConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomApiController {

	private Log log = LogFactory.getLog(CustomApiController.class);

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private PlayerConverter playerConverter;

	@RequestMapping("/api/user")
	@ResponseBody
	public Principal user(OAuth2Authentication principal) {
		log.info("/api/user: "+principal);
		Player player = playerConverter.convertAuthentication(principal);
		playerRepository.save(player);
		return principal;
	}


}
