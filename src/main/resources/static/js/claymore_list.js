var characterRow;

$(document).ready(
	function(){
		$('#new_character_button').click(createNewCharacter);
		characterRow = $('#character_row').clone();
		
		getCharacters();
	}
);

var getCharacters = function() {
	$.get(
			"/claymore/api/characters/search/findCharactersByActive?active=true&sort=name,lastModifiedTs", 
			showCharacters
		);	
};

var showCharacters = function(data) {
	var table = $("#character_table");
	table.empty();
	var characters = data._embedded.characters;
	for(var i=0; i<characters.length; i++) {
		var character = characters[i];
		var row = characterRow.clone();
		row.find('.character').text(character.name).attr('href','/claymore/character/'+character.characterId);
		row.find('.player').text(character.player.userName);
		row.find('.last_modified').text(moment(new Date(character.lastModifiedTs)).fromNow());
		table.append(row);
	}
};

var createNewCharacter = function() {
	$.get(
		"/claymore/api/characters/search/findFirstCharacterByName?name=Template", 
		function(character) {
			character.active=true;
			character.characterId=null;
			character.name='Beginner McNoob';
			saveCharacter(character);
		}
	);
};

var saveCharacter = function(character) {
	$.ajax({
		type: "POST",
		url: "/claymore/api/characters", 
		data: JSON.stringify(character, null, 2), 
		success: function(data) {
			var charUrl = data._links.self.href;//claymore/api/characters/6"
			var id = charUrl.substring(charUrl.lastIndexOf('/') + 1);
			window.location.replace('/claymore/character/'+id);
		},
		contentType: "application/json"
	});
};

