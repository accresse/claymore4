package org.cresse.claymore.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;


@Transactional
public interface CharacterRepository extends JpaRepository<org.cresse.claymore.model.Character, Long> {

	public org.cresse.claymore.model.Character findFirstCharacterByName(@Param("name") String name);

	public List<org.cresse.claymore.model.Character> findCharactersByActive(@Param("active") boolean active, Pageable pageable);
}
