package org.cresse.claymore.repository;

import org.cresse.claymore.model.DefenseFactor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;


public interface DefenseFactorRepository extends JpaRepository<DefenseFactor, Long>{

	DefenseFactor findFirstDefenseFactorByName(@Param("name") String name);
}
