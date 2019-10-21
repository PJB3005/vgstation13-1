NanoTemplate.preloadTemplate("apprentice_contract.tmpl", "<!-- code\\game\\gamemodes\\wizard\\apprentice_contract.dm -->\n{{:helper.syndicateMode()}}\n{{if data.summoning}}\n\t<div class=\"mask\">\n\t\t<div class=\"maskContent\" style=\"margin: 160px 0\">\n\t\t\t<h1>SUMMONING</h1>\n\t\t\t<h3>Summoning {{>data.summoning}} apprentice...</h3>\n\t\t</div>\n\t</div>\n{{/if}}\n\n<div class=\"item\">\n    <div class=\"itemLabel\">Forced name:</div>\n    <div class=\"itemContent\">\n        {{:helper.link(data.forced_name || \'Unspecified\', \'pencil\', {\'set_name\' : \'1\'}, null)}}\n    </div>\n</div>\n\n<div class=\"item\">\n    <div class=\"itemLabel\">Forced gender:</div>\n    <div class=\"itemContent\">\n        {{:helper.link(\'Unspecified\', null, {\'unset_gender\' : \'1\'}, data.forced_gender ? null : \'disabled\')}}\n        {{:helper.link(\'Male\', null, {\'set_gender\' : \'male\'}, data.forced_gender != \'male\' ? null : \'disabled\')}}\n        {{:helper.link(\'Female\', null, {\'set_gender\' : \'female\'}, data.forced_gender != \'female\' ? null : \'disabled\')}}\n    </div>\n</div>\n\n{{for data.setups}}\n    <div class=\"item\">\n        {{:helper.link(value.name + \': \'+value.desc, null, {\'summon\':value.name})}}\n    </div>\n{{/for}}\n");