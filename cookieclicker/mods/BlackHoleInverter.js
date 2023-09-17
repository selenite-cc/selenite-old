Game.Win('Third-party');
if(BlackholeInverter === undefined) var BlackholeInverter = {};
if(typeof CCSE == 'undefined') Game.LoadMod('mods/CCSE.js');
BlackholeInverter.name = 'Black Hole Inverter';
BlackholeInverter.version = '1.14';
BlackholeInverter.GameVersion = '2.052';

BlackholeInverter.launch = function(){
	BlackholeInverter.init = function(){
		var iconsURL = 'https://klattmose.github.io/CookieClicker/img/customIcons.png';
		
		CCSE.NewBuilding('Black hole inverter',
			'black hole inverter|black hole inverters|extracted|[X]% larger event horizon|[X]% larger event horizon',
			'Inverts the flow of gravity to get the infinitely delicious cookies from an infinitely dense singularity.',
			1,
			2,
			{
				base:'https://klattmose.github.io/CookieClicker/img/blackholeinverter',
				xV:8,
				yV:32,
				w:128,
				rows:1,
				x:0,
				y:0,
				customBuildingPic:'mods/img/blackholebuilding.png',
				customIconsPic:iconsURL
			},
			"doesn't matter what you put here",
			function(me){
				var mult = 1;
				mult *= Game.GetTieredCpsMult(me);
				mult *= Game.magicCpS(me.name);
				return me.baseCps * mult;
			},
			function(){
				Game.UnlockTiered(this);
				if(this.amount >= Game.SpecialGrandmaUnlock && Game.Objects['Grandma'].amount > 0) Game.Unlock(this.grandma.name);
			},
			{
				name:'Hypnodrone',
				desc:'Autonomous aerial brand ambassadors to "encourage" more sales!',
				icon:1
			},
			['Kugelblitz', 'Spaghettification']
		);
		
		Game.Objects['Black hole inverter'].displayName='<span style="font-size:80%;position:relative;bottom:4px;">Black hole inverter</span>'; // Shrink the name since it's so large
		
		
		// Upgrades
		var last; var i = 0; var order = BlackholeInverter.getTieredUpgradeOrder();
		Game.TieredUpgrade('Blacker holes', '<q>Blacker than black!</q>', 'Black hole inverter', 1); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('More Mass', '<q>Big holes.</q>', 'Black hole inverter', 2); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Stronger Pull', '<q>No escape.</q>', 'Black hole inverter', 3); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Dead Space', '<q>You stare into the abyss and the abyss stares back at you.</q>', 'Black hole inverter', 4); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Cookiefication', '<q>Yum!</q>', 'Black hole inverter', 5); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('White Hole Inverters', '<q>How does this one even make sense?</q>', 'Black hole inverter', 6); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Merging', '<q>Combine!</q>', 'Black hole inverter', 7); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Worm holes', '<q>You go in one end, you come out the other. Easy as that.</q>', 'Black hole inverter', 8); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Micro black holes', '<q>Tiny, but deadly.</q>', 'Black hole inverter', 9); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Radio-Rings', '<q>Insanely radioactive, and extremely deadly!</q>', 'Black hole inverter', 10); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Reality-Bending Holes', '<q>Now you can see how close you are to certain doom! Two of them put together!</q>', 'Black hole inverter', 11); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Moving Black Holes', "<q>They can move now.</q>", 'Black hole inverter', 12); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('Permanent Holes', "<q>They'll never disappear!</q>", 'Black hole inverter', 13); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		Game.TieredUpgrade('It has pockets!', "<q>Also known as a pants hole</q>", 'Black hole inverter', 14); last = Game.last; last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		
		order = BlackholeInverter.getGrandmaUpgradeOrder();
		last = Game.GrandmaSynergy('Heavy grandmas', 'A dense grandma to accrete more cookies.', 'Black hole inverter'); last.order = order;
		
		order = BlackholeInverter.getSynergyUpgradeOrder();
		last = Game.SynergyUpgrade('Daring pilots', "<q>You've never heard of the Millennium Falcon? It's the ship that made the Kessel Run in less than twelve parsecs.</q>", 'Black hole inverter', 'Shipment', 'synergy1'); last.icon[2] = iconsURL; last.order = order;
		last = Game.SynergyUpgrade('General relativity', '<q>Space is time. Time is space</q>', 'Black hole inverter', 'Time machine', 'synergy2'); last.icon[2] = iconsURL; last.order = order + 0.01;
		
		
		// Achievements
		order = BlackholeInverter.getAchievementOrder(); i = 0;
		last = Game.TieredAchievement('Single singularity', '', 'Black hole inverter', 1); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Penrose diagram', '', 'Black hole inverter', 2); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Schwarzschild', '', 'Black hole inverter', 3); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Holes in holes', '', 'Black hole inverter', 4); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('No-hair theorem', '', 'Black hole inverter', 5); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Photon sphere', '', 'Black hole inverter', 6); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Information paradox', '', 'Black hole inverter', 7); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Gravitaional lensing', '', 'Black hole inverter', 8); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Galactic nuclei', '', 'Black hole inverter', 9); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Sagittarius A*', '', 'Black hole inverter', 10); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Hey now, you\'re a dead star', '', 'Black hole inverter', 11); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Incredibly dense', '', 'Black hole inverter', 12); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Infinitely dense', '', 'Black hole inverter', 13); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Quasi-stellar radio source', '', 'Black hole inverter', 14); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		
		last = Game.ProductionAchievement('Relativistic jets', 'Black hole inverter', 1); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.ProductionAchievement('Primordial black holes', 'Black hole inverter', 2); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.ProductionAchievement('Naked singularity', 'Black hole inverter', 3); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		
		last = CCSE.NewAchievement('M87', 'Reach level <b>10</b> black hole inverters.', [1, 26, iconsURL]); 
			Game.Objects['Black hole inverter'].levelAchiev10 = last; last.order = order + i / 100; i++;
		
		
		
		Game.customStatsMenu.push(function(){
			CCSE.AppendStatsVersionNumber(BlackholeInverter.name, BlackholeInverter.version);
		});
		
		// Finish up
		BlackholeInverter.isLoaded = 1;
		if(BlackholeInverter.postloadHooks){
			for(var i = 0; i < BlackholeInverter.postloadHooks.length; ++i) BlackholeInverter.postloadHooks[i]();
		}
		
		if (Game.prefs.popups) Game.Popup(BlackholeInverter.name + ' loaded!');
		else Game.Notify(BlackholeInverter.name + ' loaded!', '', '', 1, 1);
	}
	
	
	BlackholeInverter.getTieredUpgradeOrder = function(){
		function isNumber(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
		
		var res = 0;
		for(var i = 0; i < Game.ObjectsN; i++){
			var me = Game.ObjectsById[i];
			for(var ii in me.tieredUpgrades){
				if(isNumber(ii)) res = Math.max(me.tieredUpgrades[ii].order, res);
			}
		}
		
		return res + 0.01;
	}
	
	BlackholeInverter.getGrandmaUpgradeOrder = function(){
		var res = 0;
		for(var i in Game.GrandmaSynergies){
			res = Math.max(Game.Upgrades[Game.GrandmaSynergies[i]].order, res);
		}
		
		return res + 0.01;
	}
	
	BlackholeInverter.getSynergyUpgradeOrder = function(){
		var res = 0;
		for(var i = 0; i < Game.ObjectsN; i++){
			var me = Game.ObjectsById[i];
			for(var ii in me.synergies){
				res = Math.max(me.synergies[ii].order, res);
			}
		}
		
		return res + 0.01;
	}
	
	BlackholeInverter.getAchievementOrder = function(){
		var res = 0;
		for(var i = 0; i < Game.ObjectsN-1; i++){
			var me = Game.ObjectsById[i];
			
			for(var ii in me.tieredAchievs){
				res = Math.max(me.tieredAchievs[ii].order, res);
			}
			
			for(var ii in me.productionAchievs){
				res = Math.max(me.productionAchievs[ii].achiev.order, res);
			}
			
			if(me.levelAchiev10) res = Math.max(me.levelAchiev10.order, res);
		}
		
		return res + 0.01;
	}
	
	
	ModLanguage('*',{
		
		"%1 black hole inverter": [
			"%1 black hole inverter",
			"%1 black hole inverters"
		],
		"[Black hole inverter quote]Inverts the flow of gravity to get the infinitely delicious cookies from an infinitely dense singularity.": "Inverts the flow of gravity to get the infinitely delicious cookies from an infinitely dense singularity.",
		"[Black hole inverter business name]Hypnodrone": "Hypnodrone",
		'[Black hole inverter business quote]Autonomous aerial brand ambassadors to "encourage" more sales!': 'Autonomous aerial brand ambassadors to "encourage" more sales!',
		
	});
	
	if(CCSE.ConfirmGameVersion(BlackholeInverter.name, BlackholeInverter.version, BlackholeInverter.GameVersion)) BlackholeInverter.init();
}


if(!BlackholeInverter.isLoaded){
	if(CCSE && CCSE.isLoaded){
		BlackholeInverter.launch();
	}
	else{
		if(!CCSE) var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(BlackholeInverter.launch);
	}
}