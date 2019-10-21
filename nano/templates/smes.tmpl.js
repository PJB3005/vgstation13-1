NanoTemplate.preloadTemplate("smes.tmpl", "<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tStored Capacity:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.displayBar(data.storedCapacity, 0, 100, data.charging ? \'good\' : \'average\')}}\n\t\t<div class=\"statusValue\">\n\t\t\t{{:helper.round(data.storedCapacity)}}%\n\t\t</div>\n\t</div>\n</div>\n\n<h3>Input Management</h3>\n{{if data.hasInput}}\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tCharge Mode:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.link(\'Auto\', \'refresh\', {\'cmode\' : \'auto\'}, data.chargeMode == 2 ? \'selected\' : null)}}\n\t\t{{:helper.link(\'Manual\', \'refresh\', {\'cmode\' : \'manual\'}, data.chargeMode == 1 ? \'selected\' : null)}}\n\t\t{{:helper.link(\'Off\', \'close\', {\'cmode\' : \'off\'}, data.chargeMode ? null : \'selected\')}}\n\t\t&nbsp;\n\t\t{{if data.charging}}\n\t\t\t[<span class=\'good\'>Charging</span>]\n\t\t{{else}}\n\t\t\t[<span class=\'average\'>Not Charging</span>]\n\t\t{{/if}}\n\t</div>\n</div>\n\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tInput Level:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.displayBar(data.chargeLevel, 0, data.chargeMax)}}\n\t\t<div style=\"clear: both; padding-top: 4px;\">\n\t\t\t{{:helper.link(\'MIN\', null, {\'input\' : \'min\'}, (data.chargeLevel > 0) ? null : \'disabled\')}}\n\t\t\t{{:helper.link(\'SET\', null, {\'input\' : \'set\'}, null)}}\n\t\t\t{{:helper.link(\'MAX\', null, {\'input\' : \'max\'}, (data.chargeLevel < data.chargeMax) ? null : \'disabled\')}}\n\t\t\t<div style=\"float: left; width: 80px; text-align: center;\">&nbsp;{{:data.chargeLevel}} W&nbsp;</div>\n\t\t</div>\n\t</div>\n</div>\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tInput Charge:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{if data.chargeLoad > 0}}\n\t\t\t<span class=\'good\'>+{{:data.chargeLoad}} W</span>\n\t\t{{else}}\n\t\t\t<span class=\'average\'>0 W</span>\n\t\t{{/if}}\n\t</div>\n{{else}}\n<div class=\"item\">\n\t<div class=\"itemContent\">\n\t\t<div class=\'notice\'>No input terminal detected!</div>\n\t</div>\n</div>\n{{/if}}\n\n<h3>Output Management</h3>\n{{if data.hasOutput}}\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tOutput Status:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.link(\'Online\', \'power\', {\'online\' : 1}, data.outputOnline ? \'selected\' : null)}}{{:helper.link(\'Offline\', \'close\', {\'online\' : 1}, data.outputOnline ? null : \'selected\')}}\n\t</div>\n</div>\n\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tOutput Level:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.displayBar(data.outputLevel, 0, data.outputMax)}}\n\t\t<div style=\"clear: both; padding-top: 4px;\">\n\t\t\t{{:helper.link(\'MIN\', null, {\'output\' : \'min\'}, (data.outputLevel > 0) ? null : \'disabled\')}}\n\t\t\t{{:helper.link(\'SET\', null, {\'output\' : \'set\'}, null)}}\n\t\t\t{{:helper.link(\'MAX\', null, {\'output\' : \'max\'}, (data.outputLevel < data.outputMax) ? null : \'disabled\')}}\n\t\t\t<div style=\"float: left; width: 80px; text-align: center;\">&nbsp;{{:data.outputLevel}} W&nbsp;</div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"item\">\n\t<div class=\"itemLabel\">\n\t\tOutput Load:\n\t</div>\n\t<div class=\"itemContent\">\n\t\t{{:helper.displayBar(data.outputLoad, 0, data.outputMax, (data.outputLoad < data.outputLevel) ? \'good\' : \'average\')}}\n\t\t<div class=\"statusValue\">\n\t\t\t{{:data.outputLoad}} W\n\t\t</div>\n\t</div>\n</div>\n{{else}}\n<div class=\"item\">\n\t<div class=\"itemContent\">\n\t\t<div class=\'notice\'>No output power cable connected!</div>\n\t</div>\n</div>\n{{/if}}\n");