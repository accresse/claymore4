package org.cresse.claymore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CharacterController {


	@RequestMapping(value = "/character/{id}", method=RequestMethod.GET)
	public ModelAndView getCharacter(@PathVariable("id") Long id) {
		ModelAndView mav = new ModelAndView("character/sheet");
		//org.cresse.claymore.model.Character character = characterRepository.findOne(id);
		//mav.addObject("character", character);
		return mav;
	}

}
