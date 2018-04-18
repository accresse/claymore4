package org.cresse.claymore.repository;

import org.cresse.claymore.model.WizardSpell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;


public interface WizardSpellRepository extends JpaRepository<WizardSpell, Long>{

	WizardSpell findFirstWizardSpellByName(@Param("name") String name);
}
