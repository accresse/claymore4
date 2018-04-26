var setupNonMartialSkillModal = function() {
	$('#nonMartialSkillModal_save').click(function(){
		var skill = {};
		
		skill.name = $('#nonMartialSkillModal_name').val();
		skill.baseSkillId = $('#nonMartialSkillModal_baseSkill').val();
		skill.formula = $('#nonMartialSkillModal_formual').val();
			  
		var index = $('#nonMartialSkillModal_index').val();
	    if(index!="") {
	    		index=parseInt(index);
	    		character.nonMartialSkills[index] = skill;
	    } else {
	    		character.nonMartialSkills.push(skill);
	    }

		updateJsonView();
		updateDerivedFields();
		$('#nonMartialSkillModal').modal('hide');
	});

	$('#nonMartialSkillModal_delete').click(function(){
		var index = $('#nonMartialSkillModal_index').val();
		character.nonMartialSkills.splice(index,1);
		updateJsonView();
		updateDerivedFields();
		$('#nonMartialSkillModal').modal('hide')
	});

	$('#nonMartialSkillModal').on('show.bs.modal', 
		function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var title = button.data('title'); // Extract info from data-* attributes
		  var index = button.data('nonMartialSkillIndex'); // Extract info from data-* attributes
		  var modal = $(this)
		  modal.find('.modal-title').text(title)

		  $('#nonMartialSkillModal_index').val("");
		  $('#nonMartialSkillModal_baseSkill').change();
		  
		  $('#nonMartialSkillModal_name').val("");
		  $('#nonMartialSkillModal_formula').val("");
		  
		  $('#nonMartialSkillModal_delete').hide();
		  
		  if(index || index==0) {
			  var skill = character.nonMartialSkills[index];
			  var baseSkill = getNonMartialSkill(skil.baseSkillId);
			  
			  $('#nonMartialSkillModal_index').val(index);
			  
			  $('#nonMartialSkillModal_baseSpell').val(baseSkill.skillId);
			  $('#nonMartialSkillModal_baseSpell').change();
			  
			  $('#nonMartialSkillModal_name').val(skill.name);
			  $('#nonMartialSkillModal_level').val(skill.formula);

			  $('#wizardSpellModal_delete').show();
		  }
		}
	);
		
	$('#nonMartialSkillModal_baseSkill').change(function(){
		var skillId = $('#nonMartialSkillModal_baseSkill').val();
		var skill = getNonMartialSkill(skillId);
		$('#nonMartialSkillModal_name').attr('placeholder',skill.name);
	    $('#nonMartialSkillModal_formula').attr('placeholder',skill.formula);
	});
	
};

var updateNonMartialSkills = function() {

	$('#nonMartialSkill_table').empty();
	for(var i=0; i<character.nonMartialSkills.length; i++) {
		var skill = character.nonMartialSkills[i];
		var baseSkill = getNonMartialSkill(skill.baseSkillId);
		var row = nonMartialSkillTemplate.clone();
		row.attr('id','nonMartialSkill_'+i);
		row.find('.nonMartialSkill_name').text(calculateValWithOverride(skill.name, baseSkill.name)).data('nonMartialSkillIndex',i);
		row.find('.nonMartialSkill_spend').val(skill.points).data('nonMartialSkillIndex',i).change(function(event) {
			var points = $(event.target).val();
			if(!points) {
				points = 0;
			}
			var index = $(event.target).data('nonMartialSkillIndex');
			character.nonMartialSkills[index].points = points;
			updateJsonView();
			updateDerivedFields();
		});
		var formula = calculateValWithOverride(skill.formula, baseSkill.formula);

		var check;
		if(formula == "1") {
			check = 100;
			row.find('.nonMartialSkill_formula').text("Free");
		} else {
			check = skill.points * evaluateCharacterFormula(formula); 
			row.find('.nonMartialSkill_formula').text(formula);
		}
		row.find('.nonMartialSkill_check').text(check+"%");

		row.find('.rollable_d100').click(rollable_d100);
		row.find('.rollable_literal').click(rollable_literal);
		row.appendTo('#nonMartialSkill_table');
		row.show();
	}
};
