var setupDefenseModal = function() {
	$('#defenseModal_save').click(function(){
		var defense = {};
		
		defense.name = $('#defenseModal_name').val();
		defense.deflect = $('#defenseModal_ad').val();
		defense.adMod = $('#defenseModal_adMod').val();
		defense.absorb = $('#defenseModal_aa').val();
		defense.toughness = $('#defenseModal_t').val();
		defense.baseDefenseFactorId = $('#defenseModal_baseDefenseFactor').val();
		defense.notes = $('#defenseModal_notes').text();
			  
		var index = $('#defenseModal_index').val();
	    if(index!="") {
	    		index=parseInt(index);
	    		character.defenses[index] = defense;
	    } else {
	    		character.defenses.push(defense);
	    }

		updateJsonView();
		updateDerivedFields();
		$('#defenseModal').modal('hide');
	});

	$('#defenseModal_delete').click(function(){
		var index = $('#defenseModal_index').val();
		character.defenses.splice(index,1);
		updateJsonView();
		updateDerivedFields();
		$('#defenseModal').modal('hide')
	});

	$('#defenseModal').on('show.bs.modal', 
		function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var title = button.data('title'); // Extract info from data-* attributes
		  var index = button.data('defenseIndex'); // Extract info from data-* attributes
		  var modal = $(this)
		  modal.find('.modal-title').text(title)

		  $('#defenseModal_index').val("");
		  $('#defenseModal_name').val("");
		  $('#defenseModal_ad').val("");
		  $('#defenseModal_adMod').val("");
		  $('#defenseModal_aa').val("");
		  $('#defenseModal_t').val("");
		  $('#defenseModal_notes').text("");
		  $('#defenseModal_baseDefenseFactor').change();
		  $('#defenseModal_delete').hide();
		  
		  if(index || index==0) {
			  var defense = character.defenses[index];
			  var baseDefenseFactor = getDefenseFactor(defense.baseDefenseFactorId);
			  
			  $('#defenseModal_index').val(index);
			  
			  $('#defenseModal_baseDefenseFactor').val(baseDefenseFactor.defenseFactorId);
			  $('#defenseModal_baseDefenseFactor').change();
			  
			  $('#defenseModal_name').val(defense.name);
			  $('#defenseModal_ad').val(defense.deflect);
			  $('#defenseModal_adMod').val(defense.adMod);
			  $('#defenseModal_aa').val(defense.absorb);
			  $('#defenseModal_t').val(defense.toughness);
			  if(defense.notes) {
				  $('#defenseModal_notes').text(defense.notes);
			  }
			  $('#defenseModal_delete').show();

			  
		  }
		}
	);
		
	$('#defenseModal_baseDefenseFactor').change(function(){
		var defenseFactorId = $('#defenseModal_baseDefenseFactor').val();
		var defenseFactor = defenseFactorMap[defenseFactorId];
		$('#defenseModal_name').attr('placeholder',defenseFactor.name);
		$('#defenseModal_ad').attr('placeholder',defenseFactor.deflect);
		$('#defenseModal_adMod').attr('placeholder',defenseFactor.adMod);
		$('#defenseModal_aa').attr('placeholder',defenseFactor.absorb);
		$('#defenseModal_t').attr('placeholder',defenseFactor.toughness);
		$('#defenseModal_notes').attr('placeholder',defenseFactor.notes);
	});
};

var updateDefenses = function() {
	$('#defense_table').empty();
	
	addNaturalDefense();
	
	for(var i=0; i<character.defenses.length; i++) {
		var defense = character.defenses[i];
		var baseDefenseFactor = getDefenseFactor(defense.baseDefenseFactorId);
		var row = defenseTemplate.clone();
		row.attr('id','defense_'+i);
		row.find('.defense_name').text(calculateValWithOverride(defense.name, baseDefenseFactor.name)).data('defenseIndex',i);
		row.find('.defense_ad').text(calculateValWithOverride(defense.deflect, baseDefenseFactor.deflect));
		row.find('.defense_adMod').text(calculateValWithOverride(defense.adMod, baseDefenseFactor.adMod));
		row.find('.defense_aa').text(calculateValWithOverride(defense.absorb, baseDefenseFactor.absorb));
		row.find('.defense_t').text(calculateValWithOverride(defense.toughness,baseDefenseFactor.toughness));
		row.find('.defense_notes').html(getDefenseNotes(defense,baseDefenseFactor));
		row.find('.defense_active').change(calculateOverallDefense);
		row.appendTo('#defense_table');
		row.show();
	}
	
	calculateOverallDefense();
};

var addNaturalDefense = function() {
	
	var row = defenseTemplate.clone();
	row.attr('id','defense_natural');
	row.find('.defense_active').attr('disabled',true);
	row.find('.defense_name_cell').html('Natural');
	row.find('.defense_ad').text('0');

	var dexAd = getDexterityMods().aglMod + getRacialMods().aglMod;
	row.find('.defense_adMod').text(dexAd);
	
	row.find('.defense_aa').text('0');

	var conT = getConstitutionMods().tMod + getRacialMods().tMod;
	row.find('.defense_t').text(conT);
	
	row.find('.defense_notes_cell').html('');
	row.appendTo('#defense_table');
	row.show();
};

var getDefenseNotes = function(defense, baseDefenseFactor) {
	return defense.notes;
};

var calculateOverallDefense = function() {
	var overallDefense = {
		adBonus: 0,
		adModBonus: 0,
		aaBonus: 0,
		tBonus: 0
	};
	
	processDefenseRow('#defense_natural', overallDefense);
	
	for(var i=0; i<character.defenses.length; i++) {
		processDefenseRow('#defense_'+i, overallDefense);
	}
		
	var row = $('#defense_total');
	
	var adTotal = combineDefenseValues(overallDefense,'ad','adBonus');
	row.find('.defense_ad').text(adTotal);
	
	//this doesn't currently take into account if you have a natural Ad<0
	var adModTotal = Math.max(0, combineDefenseValues(overallDefense,'adMod','adModBonus'));
	row.find('.defense_adMod').text(adModTotal);
	
	var aaTotal = combineDefenseValues(overallDefense,'aa','aaBonus');
	row.find('.defense_aa').text(aaTotal);
	
	var tTotal = combineDefenseValues(overallDefense,'t','tBonus');
	row.find('.defense_t').text(tTotal);

	$('#defense_sum_ad').text(adTotal + adModTotal);
	$('#defense_sum_reduction').text(aaTotal + tTotal);
};

var processDefenseRow = function(selector, overallDefense) {
	var row = $(selector);
	
	if( row.find('.defense_active').prop('checked') ) {
		processDefenseValue(row, overallDefense, '.defense_ad', 'ad', 'adBonus');
		processDefenseValue(row, overallDefense, '.defense_adMod', 'adMod', 'adModBonus');
		processDefenseValue(row, overallDefense, '.defense_aa', 'aa', 'aaBonus');
		processDefenseValue(row, overallDefense, '.defense_t', 't', 'tBonus');
	}
	
};

var processDefenseValue = function(row, overallDefense, selector, flatKey, bonusKey) {
	var value = row.find(selector).text();
	if(! (value === undefined)) {
		if(value.startsWith('=')) {
			value = parseInt(value.substring(1));
			if(overallDefense[flatKey]===undefined) {
				overallDefense[flatKey] = value;
			} else {
				overallDefense[flatKey] = Math.max(overallDefense[flatKey], value);
			}
		} else {
			value = parseInt(value.replace('+',''));
			overallDefense[bonusKey] += value;
		}
	}
};

var combineDefenseValues = function(overallDefense, flatKey, bonusKey) {
	var flatValue = overallDefense[flatKey]===undefined ? 0 : overallDefense[flatKey];
	var bonusValue = overallDefense[bonusKey]===undefined ? 0 : overallDefense[bonusKey];
	return flatValue+bonusValue;
}