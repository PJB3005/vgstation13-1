NanoTemplate.preloadTemplate("canister.tmpl", "<h3>Tank Status</h3>\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tTank Label:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t<div style=\"float: left; width: 180px;\">{{:data.name}}</div> {{:helper.link(\'Relabel\', \'pencil\', {\'relabel\' : 1}, data.canLabel ? null : \'disabled\')}}\n\t</div>\n</div>\n\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tTank Pressure:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:data.tankPressure}} kPa\n\t</div>\n</div>\n\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tPort Status:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:data.portConnected ? \'<span class=\"good\">Connected</span>\' : \'<span class=\"average\">Disconnected</span>\'}}\n\t</div>\n</div>\n\n<h3>Holding Tank Status</h3>\n{{if data.hasHoldingTank}}\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tTank Label:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t<div style=\"float: left; width: 180px;\">{{:data.holdingTank.name}}</div> {{:helper.link(\'Eject\', \'eject\', {\'remove_tank\' : 1})}}\n\t\t</div>\n\t</div>\n\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tTank Pressure:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:data.holdingTank.tankPressure}} kPa\n\t\t</div>\n\t</div>\n{{else}}\n\t<div class=\"item\"><span class=\"average\"><i>No holding tank inserted.</i></span></div>\n\t<div class=\"item\">&nbsp;</div>\n{{/if}}\n\n\n<h3>Release Valve Status</h3>\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tRelease Pressure:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.displayBar(data.releasePressure, data.minReleasePressure, data.maxReleasePressure)}}\n\t\t<div style=\"clear: both; padding-top: 4px;\">\n\t\t\t{{:helper.link(\'-\', null, {\'pressure_adj\' : -1000}, (data.releasePressure > data.minReleasePressure) ? null : \'disabled\')}}\n\t\t\t{{:helper.link(\'-\', null, {\'pressure_adj\' : -100}, (data.releasePressure > data.minReleasePressure) ? null : \'disabled\')}}\n\t\t\t{{:helper.link(\'-\', null, {\'pressure_adj\' : -10}, (data.releasePressure > data.minReleasePressure) ? null : \'disabled\')}}\n\t\t\t{{:helper.link(\'-\', null, {\'pressure_adj\' : -1}, (data.releasePressure > data.minReleasePressure) ? null : \'disabled\')}}\n\t\t\t<div style=\"float: left; width: 80px; text-align: center;\">&nbsp;{{:data.releasePressure}} kPa&nbsp;</div>\n\t\t\t{{:helper.link(\'+\', null, {\'pressure_adj\' : 1}, (data.releasePressure < data.maxReleasePressure) ? null : \'disabled\')}}\n\t\t\t{{:helper.link(\'+\', null, {\'pressure_adj\' : 10}, (data.releasePressure < data.maxReleasePressure) ? null : \'disabled\')}}\n\t\t\t{{:helper.link(\'+\', null, {\'pressure_adj\' : 100}, (data.releasePressure < data.maxReleasePressure) ? null : \'disabled\')}}\n\t\t\t{{:helper.link(\'+\', null, {\'pressure_adj\' : 1000}, (data.releasePressure < data.maxReleasePressure) ? null : \'disabled\')}}\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tRelease Valve:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.link(\'Open\', \'unlocked\', {\'toggle\' : 1}, data.valveOpen ? \'selected\' : null)}}{{:helper.link(\'Close\', \'locked\', {\'toggle\' : 1}, data.valveOpen ? null : \'selected\')}}\n\t</div>\n</div>\n\n");