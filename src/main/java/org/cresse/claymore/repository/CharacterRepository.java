package org.cresse.claymore.repository;

import javax.transaction.Transactional;

import org.cresse.claymore.model.Character;
import org.springframework.data.jpa.repository.JpaRepository;


@Transactional
public interface CharacterRepository extends JpaRepository<Character, Long>{
}
