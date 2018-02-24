var path = window.location.pathname;
var id = path.substring(path.lastIndexOf('/') + 1);

var weaponList = null;
var weaponMap = {};

var character = null;

var attackTemplate;
var dice = new DiceRoller();

$(document).ready(
	function(){
		attackTemplate = $('#attack_template').clone();
		loadWeaponsFromServer();
		loadCharFromServer();
		
		$("#save_json_button").click(saveCharacter);
		$("#clone_json_button").click(cloneCharacter);
		
		$('.rollable_d100').click(rollable_d100);
		$('.rollable_literal').click(rollable_literal);
		
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

	}
);

var saveCharacter = function() {
	var jqxhr = $.ajax({
			type: "PUT",
			url: "/claymore/api/characters/" + id, 
			data: JSON.stringify(character, null, 2), 
			success: function(data) {
				alert('success');
			},
			contentType: "application/json"
	});
}

var cloneCharacter = function() {
	var jqxhr = $.ajax({
			type: "POST",
			url: "/claymore/api/characters", 
			data: JSON.stringify(character, null, 2), 
			success: function(data) {
				alert('success');
			},
			contentType: "application/json"
	});
}

var rollable_d100 = function(event){
	var text = event.target.textContent;
	text = text.replace('%','');
	var roll = dice.roll('d100').getTotal();
	var diff = text - roll;
	if(diff > 0) {
		alert('Roll: '+roll+'\nPass by: '+diff);
	} else {
		alert('Roll: '+roll+'\nFail by: '+Math.abs(diff));
	}
	return false;
};

var rollable_literal = function(event){
	var text = event.target.textContent;
	var roll = dice.roll(text);
	alert(roll);
	return false;
};

var loadWeaponsFromServer = function() {
	var jqxhr = $.get(
		"/claymore/api/weapons?sort=name", 
		function(data) {
			weaponList = data._embedded.weapons;
			for(var i=0; i< weaponList.length; i++) {
				var weapon = weaponList[i];
				$('#attackModal_baseWeapon').append($('<option>').text(weapon.name).attr('value', weapon.weaponId));
				weaponMap[weapon.weaponId] = weapon;
			}
		}
	);
};

var loadCharFromServer = function() {
	var jqxhr = $.get(
		"/claymore/api/characters/" + id, 
		function(data) {
			character = data;
			createFormFromModel();
			updateJsonView();
			updateDerivedFields();
		}
	);
};

var createFormFromModel = function() {
	for ( var prop in character) {
		if (!prop.startsWith("_")) {
			$("#raw_div").append(
					'<div class="row"><div class="col-md-2 text-right">' + prop
							+ ': </div><div class="col-md-2"><input id="raw_'
							+ prop + '" name="raw_' + prop
							+ '" class="raw" value="' + character[prop]
							+ '"/></div></div>');
		}
	}
	$(".raw").change(updateModel);
};

var updateModel = function(event) {
	var prop = event.target.id.substring(4);
	character[prop] = event.target.value;
	updateJsonView();
	updateDerivedFields();
};

var updateJsonView = function() {
	$("#json_text").text(JSON.stringify(character, null, 2));
};

var updateDerivedFields = function() {
	processXpBuys();
	processSkillBuys();
	showRelaventClassSections();
	
	$("#character_name").text(character.name);
	$("#character_race").text(character.race);
	$("#character_gender").text(character.gender);
	$("#character_age").text(character.age);
	$("#character_height").text(Math.floor(character.height/12)+"' "+character.height%12+'"');
	$("#character_weight").text(character.weight);
	
	$("#character_level").text(character.level);
	$("#character_xp").text(character.xp);	
	$("#character_unspentXp").text(character.unspentXp);
	$("#character_spendableXp").text(character.spendableXp);
	
	updateHpCard();
	
	$("#character_might").text(character.might+"%");
	$("#character_fortitude").text(character.fortitude+"%");
	$("#character_agility").text(character.agility+"%");
	$("#character_will").text(character.will+"%");
	$("#character_identity").text(character.identity+"%");
	$("#character_surprise").text(character.surprise+"%");
	$("#character_perception").text(character.perception+"%");
	$("#character_passiveId").text(character.passiveId+"%");
	$("#character_weightLimit").text(character.weightLimit);
	$("#character_maxLift").text(character.maxLift);

	$("#character_mws").text(character.mws+"%");
	$("#character_bws").text(character.bws+"%");
	
	updateAttacks();

};

var showRelaventClassSections = function() {
	for (var className in character.classes) {
		$("#section_"+className).show();
	}
};

var updateHpCard = function() {
	var currentHp = $("#raw_currentHp").val();
	var maxHp = character.maxHp;
	var hpPercent = Math.round(currentHp / maxHp * 100);
	$("#character_currentHp").text(currentHp);
	$("#character_maxHp").text(maxHp);
	$("#hpBar").attr("aria-valuenow", currentHp);
	$("#hpBar").attr("aria-valuemax", maxHp);
	$("#hpBar").css("width", hpPercent + "%");
	$("#hpBar").text(hpPercent + "%");
};

var processXpBuys = function() {
	character.level = 0;
	
	character.levelToXpBuyMap = {};
	
	for(var name in xpBuyProcessors) {
		var processor = xpBuyProcessors[name];
		processor.init();
	}

	for(var i = 0; i < character.xpBuys.length; i++) {
		var xpBuy = character.xpBuys[i];
		character.level = Math.max(character.level, xpBuy.level);
		var processor = xpBuyProcessors[xpBuy.category];
		if(processor) {
			processor.processBuy(xpBuy);
		}
		indexXpBuy(xpBuy);
	}
	
	for(var name in xpBuyProcessors) {
		var processor = xpBuyProcessors[name];
		processor.postProcess();
	}
	
};

//{level: {category: [buy1, buy2]}
var indexXpBuy = function(xpBuy) {
	var level = xpBuy.level;
	var category = xpBuy.category;
	
	if(!character.levelToXpBuyMap[level]) {
		character.levelToXpBuyMap[level] = {};
	}
	if(!character.levelToXpBuyMap[level][category]) {
		character.levelToXpBuyMap[level][category] = [];
	}
	character.levelToXpBuyMap[level][category].push(xpBuy);
};

var processSkillBuys = function() {
	
	for(var name in skillBuyProcessors) {
		var processor = skillBuyProcessors[name];
		processor.init();
	}

	for(var i = 0; i < character.skillBuys.length; i++) {
		var skillBuy = character.skillBuys[i];
		var processor = skillBuyProcessors[skillBuy.category];
		if(processor) {
			processor.processBuy(skillBuy);
		}
	}
	
	for(var name in skillBuyProcessors) {
		var processor = skillBuyProcessors[name];
		processor.postProcess();
	}

};



var getXpBuys = function(level, category) {
	if(!character.levelToXpBuyMap[level] || !character.levelToXpBuyMap[level][category]) {
		return null;
	} else {
		return character.levelToXpBuyMap[level][category];
	}
};

var updateAttacks = function() {
	$('#attack_table').empty();
	for(var i=0; i<character.attacks.length; i++) {
		var attack = character.attacks[i];
		var baseWeapon = getWeapon(attack.baseWeaponId);
		var row = attackTemplate.clone();
		var masteryBonus = getWeaponMasteryMods(baseWeapon.weaponGroup);
		row.attr('id','attack.'+i);
		row.find('.attack_name').text(calculateNameForAttack(attack, baseWeapon)).data('attackIndex',i);
		row.find('.attack_hit').text(calculateHitForAttack(attack, baseWeapon, masteryBonus)+'%');
		row.find('.attack_damage').text(calculateDamageForAttack(attack, baseWeapon, masteryBonus));
		row.find('.attack_speed').text(getAttackValSum(attack.speed,baseWeapon.speed, masteryBonus.speed));
		row.find('.attack_attacks').text(getAttackValSum(attack.attacks,1,masteryBonus.attacks));
		row.find('.attack_notes').html(getAttackValNotes(attack,baseWeapon));
		row.find('.rollable_d100').click(rollable_d100);
		row.find('.rollable_literal').click(rollable_literal);
		row.appendTo('#attack_table');
		row.show();
	}
};

var calculateNameForAttack = function(attack, baseWeapon) {
	return attack.name ? attack.name : baseWeapon.name;
};

var calculateHitForAttack = function(attack, baseWeapon, masteryBonus) {
	
	//start with base MWS/BWS
	var hit = character[attack.weaponSkill.toLowerCase()];
	
	//add bonus/penalty for weapon group proficiency
	var wgs = character.weaponGroupSkill[baseWeapon.weaponGroup]
	if(wgs || wgs==0) {
		hit += wgs;
	} else {
		hit += character.unskilledPenalty;
	}
	
	//add any bonus/override from this attack
	hit = getAttackValSum(attack.hit, hit, masteryBonus.hit);
	
	return hit;
	
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

var getAttackValSum = function(attackVal, baseVal, masteryVal) {
	if(attackVal && attackVal.startsWith('=')) {
		return attackVal.substring(1);
	}
	baseVal = baseVal ? baseVal : 0;
	attackVal = attackVal ? parseFloat(attackVal.replace('+','')) : 0;
	return baseVal + attackVal + masteryVal;
};

var getAttackValNotes = function(attack, baseWeapon) {
	return attack.notes;
};

