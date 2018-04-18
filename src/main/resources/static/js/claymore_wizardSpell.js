var setupWizardSpellModal = function() {
	$('#wizardSpellModal_save').click(function(){
		var wizardSpell = {};
		
		wizardSpell.name = $('#wizardSpellModal_name').val();
		wizardSpell.baseSpellId = $('#wizardSpellModal_baseSpell').val();
		wizardSpell.level = $('#wizardSpellModal_level').val();
		wizardSpell.school = $('#wizardSpellModal_school').val();
		wizardSpell.speed = $('#wizardSpellModal_speed').val();
		wizardSpell.damage = $('#wizardSpellModal_damage').val();
		wizardSpell.range = $('#wizardSpellModal_range').val();
		wizardSpell.areaOfEffect = $('#wizardSpellModal_aoe').val();
		wizardSpell.duration = $('#wizardSpellModal_duration').val();
		wizardSpell.components = $('#wizardSpellModal_components').val();
		wizardSpell.resist = $('#wizardSpellModal_resist').val();
		wizardSpell.known = $('#wizardSpellModal_known').prop('checked');
		wizardSpell.copied = $('#wizardSpellModal_copied').prop('checked');
		wizardSpell.notes = $('#wizardSpellModal_notes').val();
			  
		var index = $('#wizardSpellModal_index').val();
	    if(index!="") {
	    		index=parseInt(index);
	    		character.wizardSpells[index] = wizardSpell;
	    } else {
	    		character.wizardSpells.push(wizardSpell);
	    }

		updateJsonView();
		updateDerivedFields();
		$('#wizardSpellModal').modal('hide');
	});

	$('#wizardSpellModal_delete').click(function(){
		var index = $('#wizardSpellModal_index').val();
		character.wizardSpells.splice(index,1);
		updateJsonView();
		updateDerivedFields();
		$('#wizardSpellModal').modal('hide')
	});

	$('#wizardSpellModal').on('show.bs.modal', 
		function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var title = button.data('title'); // Extract info from data-* attributes
		  var index = button.data('wizardSpellIndex'); // Extract info from data-* attributes
		  var modal = $(this)
		  modal.find('.modal-title').text(title)

		  $('#wizardSpellModal_index').val("");
		  $('#wizardSpellModal_baseSpell').change();
		  $('#wizardSpellModal_delete').hide();
		  
		  if(index || index==0) {
			  var wizardSpell = character.wizardSpells[index];
			  var baseSpell = getWizardSpell(wizardSpell.baseSpellId);
			  
			  $('#wizardSpellModal_index').val(index);
			  
			  $('#wizardSpellModal_baseSpell').val(baseSpell.spellId);
			  $('#wizardSpellModal_baseSpell').change();
			  
			  $('#wizardSpellModal_name').val(wizardSpell.name);
			  $('#wizardSpellModal_baseSpell').val(wizardSpell.baseSpellId);
			  $('#wizardSpellModal_level').val(wizardSpell.level);
			  $('#wizardSpellModal_school').val(wizardSpell.school);
			  $('#wizardSpellModal_speed').val(wizardSpell.speed);
			  $('#wizardSpellModal_damage').val(wizardSpell.damage);
			  $('#wizardSpellModal_range').val(wizardSpell.range);
			  $('#wizardSpellModal_aoe').val(wizardSpell.areaOfEffect);
			  $('#wizardSpellModal_duration').val(wizardSpell.duration);
			  $('#wizardSpellModal_components').val(wizardSpell.components);
			  $('#wizardSpellModal_resist').val(wizardSpell.resist);
			  $('#wizardSpellModal_known').prop('checked',wizardSpell.known);
			  $('#wizardSpellModal_copied').prop('checked',wizardSpell.copied);
			  $('#wizardSpellModal_notes').val(wizardSpell.notes);

			  $('#wizardSpellModal_delete').show();
		  }
		}
	);
		
	$('#wizardSpellModal_baseSpell').change(function(){
		var spellId = $('#wizardSpellModal_baseSpell').val();
		var wizardSpell = wizardSpellMap[spellId];
		$('#wizardSpellModal_name').attr('placeholder',wizardSpell.name);
	    $('#wizardSpellModal_level').attr('placeholder',wizardSpell.level);
	    $('#wizardSpellModal_school').val(wizardSpell.school);
	    $('#wizardSpellModal_speed').attr('placeholder',wizardSpell.speed);
	    $('#wizardSpellModal_damage').attr('placeholder',wizardSpell.damage);
	    $('#wizardSpellModal_range').attr('placeholder',wizardSpell.range);
	    $('#wizardSpellModal_aoe').attr('placeholder',wizardSpell.areaOfEffect);
	    $('#wizardSpellModal_duration').attr('placeholder',wizardSpell.duration);
	    $('#wizardSpellModal_components').attr('placeholder',wizardSpell.components);
	    $('#wizardSpellModal_resist').attr('placeholder',wizardSpell.resist);
	});
	
	for(var i=0; i<WIZARD_SCHOOLS.length; i++) {
		var school = WIZARD_SCHOOLS[i];
		$('#wizardSpellModal_school').append($('<option>').text(school).attr('value', school));
	}
};

var updateWizardSpells = function() {
	var minCastingLevel = 10;
	var maxCastingLevel = 0;
	var levelToSchoolMap = [[],[],[],[],[],[],[],[]];
	for(var school in character.wizardCastingLevels) {
		var schoolLevel = character.wizardCastingLevels[school];
		levelToSchoolMap[schoolLevel].push(school);
		minCastingLevel = Math.min(minCastingLevel,schoolLevel);
		maxCastingLevel = Math.max(maxCastingLevel,schoolLevel);
	}
	var slots = WIZARD_SPELL_SLOTS[maxCastingLevel];
	for(var i=0; i<8; i++) {
		var val = slots[i] ? slots[i] : 0;
		$('#wizard_spells_slots_'+i).text(val);
	}

	$('#wizardSpell_table').empty();
	for(var i=0; i<character.wizardSpells.length; i++) {
		var wizardSpell = character.wizardSpells[i];
		var baseSpell = getWizardSpell(wizardSpell.baseSpellId);
		var row = wizardSpellTemplate.clone();
		row.attr('id','wizardSpell_'+i);
		row.find('.wizardSpell_name').text(calculateValWithOverride(wizardSpell.name, baseSpell.name)).data('wizardSpellIndex',i);
		row.find('.wizardSpell_level').text(calculateValWithOverride(wizardSpell.level, baseSpell.level));
		row.find('.wizardSpell_school').text(calculateValWithOverride(wizardSpell.school, baseSpell.school));
		row.find('.wizardSpell_speed').text(calculateValWithOverride(wizardSpell.speed, baseSpell.speed));
		row.find('.wizardSpell_damage').text(calculateValWithOverride(wizardSpell.damage, baseSpell.damage));
		row.find('.wizardSpell_range').text(calculateValWithOverride(wizardSpell.range, baseSpell.range));
		row.find('.wizardSpell_aoe').text(calculateValWithOverride(wizardSpell.areaOfEffect, baseSpell.areaOfEffect));
		row.find('.wizardSpell_duration').text(calculateValWithOverride(wizardSpell.duration, baseSpell.duration));
		row.find('.wizardSpell_components').text(calculateValWithOverride(wizardSpell.components, baseSpell.components));
		row.find('.wizardSpell_resist').text(calculateValWithOverride(wizardSpell.resist, baseSpell.resist));
		row.find('.wizardSpell_known').text(wizardSpell.known);
		row.find('.wizardSpell_copied').text(wizardSpell.copied);
		row.find('.wizardSpell_notes').text(wizardSpell.notes);
		row.find('.wizardSpell_memorized').val(wizardSpell.memorized).data('wizardSpellIndex',i).change(function(event) {
			var memorized = $(event.target).val();
			var index = $(event.target).data('wizardSpellIndex');
			character.wizardSpells[index].memorized = memorized;
			updateJsonView();
			updateDerivedFields();
		});		

		row.find('.rollable_d100').click(rollable_d100);
		row.find('.rollable_literal').click(rollable_literal);
		row.appendTo('#wizardSpell_table');
		row.show();
	}
};
