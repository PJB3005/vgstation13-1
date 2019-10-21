NanoTemplate.preloadTemplate("portscrubber.tmpl", "<h3>Scrubber Status</h3>\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tTank Pressure:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:data.tankPressure}} kPa\n\t</div>\n</div>\n\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tPort Status:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:data.portConnected ? \'<span class=\"good\">Connected</span>\' : \'<span class=\"average\">Disconnected</span>\'}}\n\t</div>\n</div>\n\n<h3>Holding Tank Status</h3>\n{{if data.hasHoldingTank}}\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tTank Label:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t<div style=\"float: left; width: 180px;\">{{:data.holdingTank.name}}</div> {{:helper.link(\'Eject\', \'eject\', {\'remove_tank\' : 1})}}\n\t\t</div>\n\t</div>\n\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tTank Pressure:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:data.holdingTank.tankPressure}} kPa\n\t\t</div>\n\t</div>\n{{else}}\n\t<div class=\"item\"><span class=\"average\"><i>No holding tank inserted.</i></span></div>\n\t<div class=\"item\">&nbsp;</div>\n{{/if}}\n\n<h3>Power Regulator Status</h3>\n\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tScrubbing Gases:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.link(\'CO<sub>2</sub>\', null, {\'scrub_toggle\': \'co2\'}, null, data.scrub_co2 ? \'greenBackground\' : null)}}\n\t\t{{:helper.link(\'Plasma\', null, {\'scrub_toggle\': \'plasma\'}, null, data.scrub_plasma ? \'greenBackground\' : null)}}\n\t\t{{:helper.link(\'N<sub>2</sub>O\', null, {\'scrub_toggle\': \'n2o\'}, null, data.scrub_n2o ? \'greenBackground\' : null)}}\n\t\t{{:helper.link(\'N<sub>2</sub>\', null, {\'scrub_toggle\': \'n2\'}, null, data.scrub_n2 ? \'greenBackground\' : null)}}\n\t\t{{:helper.link(\'O<sub>2</sub>\', null, {\'scrub_toggle\': \'o2\'}, null, data.scrub_o2 ? \'greenBackground\' : null)}}\n\t</div>\n</div>\n\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tPower Switch:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.link(\'On\', \'unlocked\', {\'power\' : 1}, data.on ? \'selected\' : null)}}{{:helper.link(\'Off\', \'locked\', {\'power\' : 1}, data.on ? null : \'selected\')}}\n\t</div>\n</div>\n\n");