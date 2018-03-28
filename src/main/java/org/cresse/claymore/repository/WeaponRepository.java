package org.cresse.claymore.repository;

import org.cresse.claymore.model.Weapon;
import org.cresse.claymore.model.WeaponGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface WeaponRepository extends JpaRepository<Weapon, Long>{

	public Weapon findFirstWeaponByNameAndWeaponGroup(@Param("name") String name, @Param("weaponGroup") WeaponGroup weaponGroup);

}
