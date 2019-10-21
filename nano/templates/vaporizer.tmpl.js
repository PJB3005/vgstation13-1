NanoTemplate.preloadTemplate("vaporizer.tmpl", "{{if data.awaiting_ID}}\n\t<h3>Preparing for Dump</h3>\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tMaintenance:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:helper.link(\'Dump\', \'trash\', {\'dump_contents\' : 1})}}\n\t\t\t{{:helper.link(\'Force Reaction\', \'transferthick-e-w\', {\'force\' : 1})}}\n\t\t\t{{:helper.link(\'Back\', \'eject\', {\'prepare_dump\' : 1})}}\n\t\t</div>\n\t</div>\n{{else}}\n\t<div class=\"notice\">The vaporizer can be {{:data.unlocked ? \"locked\" : \"unlocked\"}} with a valid ID card.</div>\n\t<h3>Machinery Status</h3>\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tPower Status:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:data.powered ? \'<span class=\"good\">Good</span>\' : \'<span class=\"average\">No External Power</span>\'}}\n\t\t</div>\n\t</div>\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tPower Consumption:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:data.powerConsumption}} watts\n\t\t</div>\n\t</div>\n\n\t<h3>Reservoir Status</h3>\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tCurrent Volume:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:data.tankVolume}} units {{:helper.link(\'Maintenance\', \'key\', {\'prepare_dump\' : 1})}}\n\t\t\t{{:helper.link(\'Collapse\', \'suitcase\', {\'collapse\' : 1})}}\n\t\t</div>\n\t</div>\n\n\n\t<h3>Mixing Valve Status</h3>\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tMix Rate:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:helper.displayBar(data.mixrate, 0, 50)}}\n\t\t\t{{:helper.link(data.mixrate+\" units\", \'carat-2-n-s\', {\'set_mixrate\': 1})}}\n\t\t</div>\n\t\t<div class=\"itemLabel\">\n\t\t\tMix Ratio:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:helper.link(data.mixratio+\"% Oxygen\", \'carat-2-n-s\', {\'set_mixratio\': 1})}}\n\t\t</div>\n\t\t\n\t</div>\n\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tMixing Valve:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:data.valveOpen ? \'<span class=\"good\">Open</span>\' : \'<span class=\"average\">Closed</span>\'}}\n\t\t\t{{:helper.link(\'Toggle Valve\', \'valveOpen\', {\'toggle\' : 1})}}\n\t\t</div>\n\t</div>\n{{/if}}\n");