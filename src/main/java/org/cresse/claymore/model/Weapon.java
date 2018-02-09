package org.cresse.claymore.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.UniqueConstraint;

@Entity
public class Weapon {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long weaponId;
    
	private String name;
	
	private float weight;
	
	@Enumerated(EnumType.STRING)
	private Size size;
	
	@Enumerated(EnumType.STRING)
	private WeaponGroup weaponGroup;

	@Enumerated(EnumType.STRING)
	private DamageType type;

	private int speed;
	private int reach;
	private String rateOfFire;
	private String range;
	private String damage;
	private String special;
	
	public Weapon() {}
	
	public Weapon(String name, Size size, WeaponGroup weaponGroup, DamageType type, int speed, String damage) {
		this.name = name;
		this.size = size;
		this.weaponGroup = weaponGroup;
		this.type = type;
		this.speed = speed;
		this.damage = damage;
	}
	
	public Long getWeaponId() {
		return weaponId;
	}
	public void setWeaponId(Long weaponId) {
		this.weaponId = weaponId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public Size getSize() {
		return size;
	}
	public void setSize(Size size) {
		this.size = size;
	}
	public WeaponGroup getWeaponGroup() {
		return weaponGroup;
	}
	public void setWeaponGroup(WeaponGroup weaponGroup) {
		this.weaponGroup = weaponGroup;
	}
	public DamageType getType() {
		return type;
	}
	public void setType(DamageType type) {
		this.type = type;
	}
	public int getSpeed() {
		return speed;
	}
	public void setSpeed(int speed) {
		this.speed = speed;
	}
	public int getReach() {
		return reach;
	}
	public void setReach(int reach) {
		this.reach = reach;
	}
	public String getRateOfFire() {
		return rateOfFire;
	}
	public void setRateOfFire(String rateOfFire) {
		this.rateOfFire = rateOfFire;
	}
	public String getRange() {
		return range;
	}
	public void setRange(String range) {
		this.range = range;
	}
	public String getDamage() {
		return damage;
	}
	public void setDamage(String damage) {
		this.damage = damage;
	}
	public String getSpecial() {
		return special;
	}
	public void setSpecial(String special) {
		this.special = special;
	}

}
