package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.data.rest.core.annotation.RestResource;

@Entity
public class Attack {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long attackId;

	private String name;

	@ManyToOne
	@RestResource(exported=false)
	private Weapon baseWeapon;

	@Enumerated(EnumType.STRING)
	private WeaponSkillType weaponSkill;

	private String hit;
	private String damage;
	private String speed;
	private String attacks;

	public Attack() {}

	public Attack(Weapon baseWeapon, WeaponSkillType weaponSkill) {
		this.setBaseWeapon(baseWeapon);
		this.setWeaponSkill(weaponSkill);
	}

	private String notes;

	public Long getAttackId() {
		return attackId;
	}

	public void setAttackId(Long attackId) {
		this.attackId = attackId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Weapon getBaseWeapon() {
		return baseWeapon;
	}

	public void setBaseWeapon(Weapon baseWeapon) {
		this.baseWeapon = baseWeapon;
	}

	public WeaponSkillType getWeaponSkill() {
		return weaponSkill;
	}

	public void setWeaponSkill(WeaponSkillType weaponSkill) {
		this.weaponSkill = weaponSkill;
	}

	public String getHit() {
		return hit;
	}

	public void setHit(String hit) {
		this.hit = hit;
	}

	public String getDamage() {
		return damage;
	}

	public void setDamage(String damage) {
		this.damage = damage;
	}

	public String getSpeed() {
		return speed;
	}

	public void setSpeed(String speed) {
		this.speed = speed;
	}

	public String getAttacks() {
		return attacks;
	}

	public void setAttacks(String attacks) {
		this.attacks = attacks;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((attackId == null) ? 0 : attackId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Attack other = (Attack) obj;
		if (attackId == null) {
			if (other.attackId != null)
				return false;
		} else if (!attackId.equals(other.attackId))
			return false;
		return true;
	}



}
