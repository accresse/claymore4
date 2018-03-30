var setupAttackModal = function() {
	$('#attackModal_save').click(function(){
		var attack = {};
		
		attack.name = $('#attackModal_name').val();
		if($('#attackModal_weaponSkill_MWS').prop('checked')) {
			attack.weaponSkill = 'MWS';
		} else {
			attack.weaponSkill = 'BWS';
		}
		attack.hit = $('#attackModal_hit').val();
		attack.damage = $('#attackModal_damage').val();
		attack.speed = $('#attackModal_speed').val();
		attack.attacks = $('#attackModal_attacks').val();
		attack.baseWeaponId = $('#attackModal_baseWeapon').val();
		attack.notes = $('#attackModal_notes').text();
			  
		var index = $('#attackModal_index').val();
	    if(index!="") {
	    		index=parseInt(index);
	    		character.attacks[index] = attack;
	    } else {
	    		character.attacks.push(attack);
	    }

		updateJsonView();
		updateDerivedFields();
		$('#attackModal').modal('hide');
	});

	$('#attackModal_delete').click(function(){
		var index = $('#attackModal_index').val();
		character.attacks.splice(index,1);
		updateJsonView();
		updateDerivedFields();
		$('#attackModal').modal('hide')
	});

	$('#attackModal').on('show.bs.modal', 
		function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var title = button.data('title'); // Extract info from data-* attributes
		  var index = button.data('attackIndex'); // Extract info from data-* attributes
		  var modal = $(this)
		  modal.find('.modal-title').text(title)

		  $('#attackModal_index').val("");
		  $('#attackModal_name').val("");
		  $('#attackModal_weaponSkill_MWS').prop('checked',true);
		  $('#attackModal_hit').val("");
		  $('#attackModal_damage').val("");
		  $('#attackModal_speed').val("");
		  $('#attackModal_attacks').val("");
		  $('#attackModal_notes').text("");
		  $('#attackModal_baseWeapon').change();
		  $('#attackModal_delete').hide();
		  
		  if(index || index==0) {
			  var attack = character.attacks[index];
			  var baseWeapon = getWeapon(attack.baseWeaponId);
			  
			  $('#attackModal_index').val(index);
			  
			  $('#attackModal_baseWeapon').val(baseWeapon.weaponId);
			  $('#attackModal_baseWeapon').change();
			  
			  $('#attackModal_weaponSkill_'+attack.weaponSkill).prop('checked',true);
			  $('#attackModal_name').val(attack.name);
			  $('#attackModal_hit').val(attack.hit);
			  $('#attackModal_damage').val(attack.damage);
			  $('#attackModal_speed').val(attack.speed);
			  $('#attackModal_attacks').val(attack.attacks);
			  if(attack.notes) {
				  $('#attackModal_notes').text(attack.notes);
			  }
			  $('#attackModal_delete').show();

			  
		  }
		}
	);
		
	$('#attackModal_baseWeapon').change(function(){
		var weaponId = $('#attackModal_baseWeapon').val();
		var weapon = weaponMap[weaponId];
		$('#attackModal_name').attr('placeholder',weapon.name);
		$('#attackModal_hit').attr('placeholder',weapon.hit);
		$('#attackModal_damage').attr('placeholder',weapon.damage);
		$('#attackModal_speed').attr('placeholder',weapon.speed);
		$('#attackModal_attacks').attr('placeholder',weapon.attacks);
		$('#attackModal_notes').attr('placeholder',weapon.notes);
	});
};

var updateAttacks = function() {
	$('#attack_table').empty();
	for(var i=0; i<character.attacks.length; i++) {
		var attack = character.attacks[i];
		var baseWeapon = getWeapon(attack.baseWeaponId);
		var row = attackTemplate.clone();
		var masteryBonus = getWeaponMasteryMods(baseWeapon.weaponGroup);
		row.attr('id','attack_'+i);
		row.find('.attack_name').text(calculateValWithOverride(attack.name, baseWeapon.name)).data('attackIndex',i);
		var hit = calculateHitForAttack(attack, baseWeapon, masteryBonus);
		row.find('.attack_hit').text(hit.value+'%');
		row.find('.attack_plan').attr('id','attack_plan_'+i).data('plan',formatPlanMessage(hit.plan)).click(
			function(event){
				alert($('#'+event.target.id).data('plan'));
				return false;
			}
		);
		row.find('.attack_damage').text(calculateDamageForAttack(attack, baseWeapon, masteryBonus));
		row.find('.attack_speed').text(getAttackValSum(attack.speed,baseWeapon.speed, masteryBonus.speed,[]));
		row.find('.attack_attacks').text(getAttackValSum(attack.attacks,1,masteryBonus.attacks,[]));
		row.find('.attack_notes').html(getAttackValNotes(attack,baseWeapon));
		row.find('.rollable_d100').click(rollable_d100);
		row.find('.rollable_literal').click(rollable_literal);
		row.appendTo('#attack_table');
		row.show();
	}
};

var calculateHitForAttack = function(attack, baseWeapon, masteryBonus) {
	var plan = [];
	
	//start with base MWS/BWS
	var hit = character[attack.weaponSkill.toLowerCase()];
	plan.push([hit,"Base "+attack.weaponSkill]);
	
	//add bonus/penalty for weapon group proficiency
	var wgs = character.weaponGroupSkill[baseWeapon.weaponGroup]
	if(wgs || wgs==0) {
		hit += wgs;
		plan.push([wgs,"WeaponGroup Bonus"]);
	} else {
		hit += character.unskilledPenalty;
		plan.push([character.unskilledPenalty,"Unskilled"]);
	}
	
	//add any bonus/override from this attack
	hit = getAttackValSum(attack.hit, hit, masteryBonus.hit, plan);
	
	return {value:hit,plan:plan};
	
};

var calculateDamageForAttack = function(attack, baseWeapon, masteryBonus) {
	var attackDamage = attack.damage;
	if(attackDamage && attackDamage.startsWith('=')) {
		return attackDamage.substring(1);
	} 
	var retVal = baseWeapon.damage;
	
	var bonus = masteryBonus.damage;
	if(attackDamage) {
		attackDamage = parseInt(attackDamage.replace('+',''));
		bonus += attackDamage;
	}
	if(bonus>0) {
		retVal = retVal + '+' + bonus;
	} else if(bonus<0) {
		retVal = retVal + bonus;
	}
	return retVal;
};

var getAttackValSum = function(attackVal, baseVal, masteryVal, plan) {
	if(attackVal && attackVal.startsWith('=')) {
		plan.splice(0,plan.length);
		plan.push([attackVal.substring(1),"Weapon Hardcoded Value"])
		return attackVal.substring(1);
	}
	baseVal = baseVal ? baseVal : 0;
	attackVal = attackVal ? parseFloat(attackVal.replace('+','')) : 0;
	plan.push([attackVal,"Weapon Bonus"])
	plan.push([masteryVal,"Mastery Bonus"])
	return baseVal + attackVal + masteryVal;
};

var getAttackValNotes = function(attack, baseWeapon) {
	return attack.notes;
};