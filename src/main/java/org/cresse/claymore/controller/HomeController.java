package org.cresse.claymore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping(path= {"","/","index"})
	public String index() {
		return "index";
	}

}
