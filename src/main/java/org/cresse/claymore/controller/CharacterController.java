package org.cresse.claymore.controller;

import java.util.List;

import org.cresse.claymore.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/character")
public class CharacterController {

	@Autowired
	private CharacterRepository characterRepository;

	@RequestMapping(path= {"","/","index"})
	public ModelAndView listCharacters(@RequestParam(name="active", required=false) Boolean active) {
		if(active == null) {
			active = true;
		}
		ModelAndView mav = new ModelAndView("character/list");
		List<org.cresse.claymore.model.Character> characters = characterRepository.findCharactersByActive(active, new PageRequest(0, 1000, new Sort("name","characterId")));
		mav.addObject("characters", characters);
		return mav;
	}

	@RequestMapping(value = "/{id}", method=RequestMethod.GET)
	public ModelAndView getCharacter(@PathVariable("id") Long id) {
		ModelAndView mav = new ModelAndView("character/sheet");
		//org.cresse.claymore.model.Character character = characterRepository.findOne(id);
		//mav.addObject("character", character);
		return mav;
	}

}
