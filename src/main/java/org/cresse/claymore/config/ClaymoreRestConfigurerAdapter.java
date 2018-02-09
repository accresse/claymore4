package org.cresse.claymore.config;

import org.cresse.claymore.model.Player;
import org.cresse.claymore.model.Weapon;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

@Component
public class ClaymoreRestConfigurerAdapter extends RepositoryRestConfigurerAdapter {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.exposeIdsFor(Player.class);
		config.exposeIdsFor(Weapon.class);
	}
}
