package org.cresse.claymore.repository;

import org.cresse.claymore.model.Character;

public interface CharacterRepositoryCustom {

	<S extends org.cresse.claymore.model.Character> S save(S entity);

	void delete(Character character);

}
