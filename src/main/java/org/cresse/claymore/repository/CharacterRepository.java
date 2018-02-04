package org.cresse.claymore.repository;

import org.cresse.claymore.model.Character;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CharacterRepository extends JpaRepository<Character, Long>{
}
