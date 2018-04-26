class RogueProcessor extends CharacterProcessor {
	
	init() {
		character.prestidigitation = (character.dexterity - 17) * 5;
		character.stealth = (character.dexterity - 15) * 3;
		character.mechanical = character.dexterity + character.problemSolving - 30;
		character.mechanicalDetection = character.wit + character.problemSolving - 15;
		character.scaleSheerSurface = (character.dexterity - 5) * 3 + character.wit;
		character.detectNoise = character.perception + 10;
		character.tracking = character.problemSolving + character.wit - 20;
	}
	
}

var rogueBuyProcessors = {
	Rogue: new RogueProcessor()
};
