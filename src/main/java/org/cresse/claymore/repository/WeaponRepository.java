package org.cresse.claymore.repository;

import org.cresse.claymore.model.Weapon;
import org.springframework.data.jpa.repository.JpaRepository;


public interface WeaponRepository extends JpaRepository<Weapon, Long>{
}
