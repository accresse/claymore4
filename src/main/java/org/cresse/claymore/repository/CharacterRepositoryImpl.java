package org.cresse.claymore.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.cresse.claymore.model.Player;
import org.cresse.claymore.services.PlayerConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

@Transactional
public class CharacterRepositoryImpl implements CharacterRepositoryCustom {

	@PersistenceContext
    private EntityManager entityManager;

	@Autowired
	private PlayerConverter playerConverter;

	@Override
	public <S extends org.cresse.claymore.model.Character> S save(S character) {
		OAuth2Authentication principal = (OAuth2Authentication) SecurityContextHolder.getContext().getAuthentication();
		Player player = playerConverter.convertAuthentication(principal);
		if(character.getCharacterId()!=null) {
			org.cresse.claymore.model.Character existing = entityManager.find(org.cresse.claymore.model.Character.class, character.getCharacterId());
			if(!existing.getPlayer().getPlayerId().equals(player.getPlayerId())) {
				throw new org.springframework.security.access.AccessDeniedException("You do not have permission to update this Character");
			}
		}
		character.setPlayer(player);
		entityManager.persist(character);
		return character;
	}

	@Override
	public void delete(org.cresse.claymore.model.Character character) {
		throw new UnsupportedOperationException("Deletion is not supported for Characters");
	}

}
