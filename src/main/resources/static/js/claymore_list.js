$(document).ready(
	function(){
		$('#new_character_button').click(createNewCharacter);
	}
);

var createNewCharacter = function() {
	$.get(
		"/claymore/api/characters/search/findFirstCharacterByName?name=Template", 
		function(character) {
			character.active=true;
			//data.player=logged in user
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

