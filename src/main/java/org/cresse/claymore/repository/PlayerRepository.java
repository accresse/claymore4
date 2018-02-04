package org.cresse.claymore.repository;

import org.cresse.claymore.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PlayerRepository extends JpaRepository<Player, Long>{
}
