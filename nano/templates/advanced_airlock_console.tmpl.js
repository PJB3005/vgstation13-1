NanoTemplate.preloadTemplate("advanced_airlock_console.tmpl", "<div class=\"item\" style=\"padding-top: 10px\">\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tExternal Pressure:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:helper.displayBar(data.external_pressure, 0, 200, (data.external_pressure < 80 || data.external_pressure > 120) ? \'bad\' : (data.external_pressure < 95 || data.external_pressure > 110) ? \'average\' : \'good\')}}\n\t\t\t<div class=\"statusValue\">\n\t\t\t\t{{:data.external_pressure}} kPa\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tChamber Pressure:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:helper.displayBar(data.chamber_pressure, 0, 200, (data.chamber_pressure < 80 || data.chamber_pressure > 120) ? \'bad\' : (data.chamber_pressure < 95 || data.chamber_pressure > 110) ? \'average\' : \'good\')}}\n\t\t\t<div class=\"statusValue\">\n\t\t\t\t{{:data.chamber_pressure}} kPa\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tInternal Pressure:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{:helper.displayBar(data.internal_pressure, 0, 200, (data.internal_pressure < 80 || data.internal_pressure > 120) ? \'bad\' : (data.internal_pressure < 95 || data.internal_pressure > 110) ? \'average\' : \'good\')}}\n\t\t\t<div class=\"statusValue\">\n\t\t\t\t{{:data.internal_pressure}} kPa\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<div class=\"item\" style=\"padding-top: 10px\">\n\t<div class=\"item\" style=\"width: auto; float: left\">\n\t\t<div class=\"itemContent\">\n\t\t\t{{:helper.link(\'Cycle to Exterior\', \'arrowthickstop-1-w\', {\'command\' : \'cycle_ext\'}, data.processing ? \'disabled\' : null)}}\n\t\t\t{{:helper.link(\'Cycle to Interior\', \'arrowthickstop-1-e\', {\'command\' : \'cycle_int\'}, data.processing ? \'disabled\' : null)}}\n\t\t</div>\n\t\t<div class=\"itemContent\" style=\"padding-top: 2px\">\n\t\t\t{{:helper.link(\'Force exterior door\', \'alert\', {\'command\' : \'force_ext\'}, null, data.processing ? \'yellowBackground\' : null)}}\n\t\t\t{{:helper.link(\'Force interior door\', \'alert\', {\'command\' : \'force_int\'}, null, data.processing ? \'yellowBackground\' : null)}}\n\t\t</div>\n\t</div>\n\t<div style=\"padding-left: 10px; width: 80px; float: left\">\n\t\t<div class=\"item\">\n\t\t\t<div class=\"itemContent\" style=\"padding-bottom: 2px; width: auto\">\n\t\t\t\t{{:helper.link(\'Purge\', \'refresh\', {\'command\' : \'purge\'}, data.processing ? \'disabled\' : null, data.purge ? \'linkOn\' : null)}}\n\t\t\t</div>\n\t\t\t<div class=\"itemContent\" style=\"width: auto\">\n\t\t\t\t{{:helper.link(\'Secure\', data.secure ? \'locked\' : \'unlocked\', {\'command\' : \'secure\'}, data.processing ? \'disabled\' : null, data.secure ? \'linkOn\' : null)}}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"item\" style=\"padding-top: 10px\">\n\t\t\t{{:helper.link(\'Abort\', \'cancel\', {\'command\' : \'abort\'}, data.processing ? null : \'disabled\', data.processing ? \'redBackground\' : null)}}\n\t</div>\n</div>");