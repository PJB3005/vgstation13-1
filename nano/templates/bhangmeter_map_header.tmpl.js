NanoTemplate.preloadTemplate("bhangmeter_map_header.tmpl", "<!--\nTitle: Bhangmeter UI (map header)\nUsed In File(s): /code/game/machinery/doppler_array.dm\n -->\n{{:helper.link(\'Show Detail List\', \'script\', {\'showMap\' : 0})}}\n<div style=\"float: right; width: 365px;\">\n    {{:helper.link(\'Change Z-Level\', \'script\', {\'zlevel\' : 1})}}\n    <span style=\"float: left;\">Zoom Level:&nbsp;</span>\n    <div unselectable=\"on\" class=\"link zoomLink\" data-zoom-level=\"4\">x1.0</div>\n    <div unselectable=\"on\" class=\"link zoomLink\" data-zoom-level=\"6\">x1.5</div>\n    <div unselectable=\"on\" class=\"link zoomLink\" data-zoom-level=\"8\">x2.0</div>\n    <div unselectable=\"on\" class=\"link zoomLink\" data-zoom-level=\"12\">x2.5</div>\n</div>");