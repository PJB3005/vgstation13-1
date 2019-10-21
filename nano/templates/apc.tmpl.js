NanoTemplate.preloadTemplate("apc.tmpl", "<div class=\'notice\'>\n\t{{if data.siliconUser}}\n\t\t<div class=\"itemContentSmall\">\n\t\t\tInterface Lock:\n\t\t</div>\n\t\t<div class=\"itemContentFull\">\n\t\t\t{{:helper.link(\'Engaged\', \'locked\', {\'toggleaccess\' : 1}, data.locked ? \'selected\' : null)}}{{:helper.link(\'Disengaged\', \'unlocked\', {\'toggleaccess\' : 1}, data.malfStatus >= 2 ? \'linkOff\' : (data.locked ? null : \'selected\'))}}\n\t\t</div>\n\t\t<div class=\"clearBoth\"></div>\n\t{{else}}\n\t\t{{if data.locked}}\n\t\t\tSwipe an ID card to unlock this interface\n\t\t{{else}}\n\t\t\tSwipe an ID card to lock this interface\n\t\t{{/if}}\n\t{{/if}}\n</div>\n\n<div style=\"min-width: 480px\">\n\n\t<h3>Power Status</h3>\n\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tMain Breaker:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{if data.locked && !data.siliconUser}}\n\t\t\t\t{{if data.isOperating}}\n\t\t\t\t\t<span class=\'good\'>On</span>\n\t\t\t\t{{else}}\n\t\t\t\t\t<span class=\'bad\'>Off</span>\n\t\t\t\t{{/if}}\n\t\t\t{{else}}\n\t\t\t\t{{:helper.link(\'On\', \'power\', {\'breaker\' : 1}, data.isOperating ? \'selected\' : null)}}{{:helper.link(\'Off\', \'close\', {\'breaker\' : 1}, data.isOperating ? null : \'selected\')}}\n\t\t\t{{/if}}\n\t\t</div>\n\t</div>\n\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tExternal Power:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{if data.externalPower == 2}}\n\t\t\t\t<span class=\'good\'>Good</span>\n\t\t\t{{else data.externalPower == 1}}\n\t\t\t\t<span class=\'average\'>Low</span>\n\t\t\t{{else}}\n\t\t\t\t<span class=\'bad\'>None</span>\n\t\t\t{{/if}}\n\t\t</div>\n\t</div>\n\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tPower Cell:\n\t\t</div>\n\t\t{{if data.powerCellStatus == null}}\n\t\t\t<div class=\"itemContent bad\">\t\t\n\t\t\t\tPower cell removed.\n\t\t\t</div>\n\t\t{{else}}\n\t\t\t\n\t\t\t{{:helper.displayBar(data.powerCellStatus, 0, 100, (data.powerCellStatus >= 50) ? \'good\' : (data.powerCellStatus >= 25) ? \'average\' : \'bad\')}}\n\t\t\t<div class=\"itemContent\" style=\"width: 60px\">\t\t\n\t\t\t\t{{:helper.round(data.powerCellStatus*10)/10}}%\n\t\t\t</div>\t\n\t\t{{/if}}\n\t</div>\n\n\t{{if data.powerCellStatus != null}}\n\t\t<div class=\"item\">\n\t\t\t<div class=\"itemLabel\">\n\t\t\t\tCharge Mode:\n\t\t\t</div>\n\t\t\t<div class=\"itemContent\">\n\t\t\t\t{{if data.locked && !data.siliconUser}}\n\t\t\t\t\t{{if data.chargeMode}}\n\t\t\t\t\t\t<span class=\'good\'>Auto</span>\n\t\t\t\t\t{{else}}\n\t\t\t\t\t\t<span class=\'bad\'>Off</span>\n\t\t\t\t\t{{/if}}\t\t\t\t\n\t\t\t\t{{else}}\n\t\t\t\t\t{{:helper.link(\'Auto\', \'refresh\', {\'cmode\' : 1}, data.chargeMode ? \'selected\' : null)}}{{:helper.link(\'Off\', \'close\', {\'cmode\' : 1}, data.chargeMode ? null : \'selected\')}}\n\t\t\t\t{{/if}}\n\t\t\t\t&nbsp;\n\t\t\t\t{{if data.chargingStatus > 1}}\n\t\t\t\t\t[<span class=\'good\'>Fully Charged</span>]\n\t\t\t\t{{else data.chargingStatus == 1}}\n\t\t\t\t\t[<span class=\'average\'>Charging</span>]\n\t\t\t\t{{else}}\n\t\t\t\t\t[<span class=\'bad\'>Not Charging</span>]\n\t\t\t\t{{/if}}\n\t\t\t</div>\n\t\t</div>\n\t{{/if}}\n\n\n\t<h3>Power Channels</h3>\n\n\t{{for data.powerChannels}}\n\t\t<div class=\"item\">\n\t\t\t<div class=\"itemLabel\">\n\t\t\t\t{{:value.title}}:\n\t\t\t</div>\n\t\t\t<div class=\"itemContent\" style=\"width: 70px; text-align: right\">\n\t\t\t\t{{:value.powerLoad}} W\n\t\t\t</div>\n\t\t\t<div class=\"itemContent\" style=\"width: 105px\">\n\t\t\t\t&nbsp;&nbsp;\n\t\t\t\t{{if value.status <= 1}}\n\t\t\t\t\t<span class=\'bad\'>Off</span>\n\t\t\t\t{{else value.status >= 2}}\n\t\t\t\t\t<span class=\'good\'>On</span>\n\t\t\t\t{{/if}}\n\t\t\t\t{{if data.locked}}\n\t\t\t\t\t{{if value.status == 1 || value.status == 3}}\n\t\t\t\t\t\t&nbsp;&nbsp;Auto\n\t\t\t\t\t{{else}}\n\t\t\t\t\t\t&nbsp;&nbsp;Manual\n\t\t\t\t\t{{/if}}\t\t\n\t\t\t\t{{/if}}\n\t\t\t</div>\n\t\t\t{{if !data.locked || data.siliconUser}}\n\t\t\t\t<div class=\"itemContentFull\">\n\t\t\t\t\t{{:helper.link(\'Auto\', \'refresh\', value.topicParams.auto, (value.status == 1 || value.status == 3) ? \'selected\' : null)}}\n\t\t\t\t\t{{:helper.link(\'On\', \'power\', value.topicParams.on, (value.status == 2) ? \'selected\' : null)}}\n\t\t\t\t\t{{:helper.link(\'Off\', \'close\', value.topicParams.off, (value.status == 0) ? \'selected\' : null)}}\n\t\t\t\t</div>\n\t\t\t{{/if}}\n\t\t</div>\n\t{{/for}}\n\n\t<div class=\"item\" style=\"font-weight: bold\">\n\t\t<div class=\"itemLabel\">\n\t\t\tTotal Load:\n\t\t</div>\n\t\t<div class=\"itemContent\" style=\"width: 70px; text-align: right\">\n\t\t\t{{:data.totalLoad}} W\n\t\t</div>\n\t</div>\n\n\t<div class=\"item\">&nbsp;</div>\n\n\t<div class=\"item\">\n\t\t<div class=\"itemLabel\">\n\t\t\tCover Lock:\n\t\t</div>\n\t\t<div class=\"itemContent\">\n\t\t\t{{if data.locked && !data.siliconUser}}\n\t\t\t\t{{if data.coverLocked}}\n\t\t\t\t\t<span class=\'good\'>Engaged</span>\n\t\t\t\t{{else}}\n\t\t\t\t\t<span class=\'bad\'>Disengaged</span>\n\t\t\t\t{{/if}}\n\t\t\t{{else}}\n\t\t\t\t{{:helper.link(\'Engaged\', \'locked\', {\'lock\' : 1}, data.coverLocked ? \'selected\' : null)}}{{:helper.link(\'Disengaged\', \'unlocked\', {\'lock\' : 1}, data.coverLocked ? null : \'selected\')}}\n\t\t\t{{/if}}\n\t\t</div>\n\t</div>\n\n\t{{if data.siliconUser}}\n\t\t<h3>System Overrides</h3>\n\n\t\t<div class=\"item\">\n\t\t\t{{if data.malfStatus == 1}}\n\t\t\t\t{{:helper.link(\'Override Programming\', \'script\', {\'malfhack\' : 1})}}\n\t\t\t{{else data.malfStatus > 1}}\n\t\t\t\t<div class=\'notice\'>APC Hacked</div>\n\t\t\t\t{{:helper.link(\'Shunt Core Processes\', \'script\', {\'occupyapc\' : 1})}}\n\t\t\t{{/if}}\n\t\t\t{{:helper.link(\'Overload Lighting Circuit\', \'lightbulb\', {\'overload\' : 1})}}\n\t\t</div>\n\t\t{{if data.malfStatus > 1}}\n\t\t\t<div class=\'notice\'>\n\t\t\t\t<div class=\"itemContentSmall\">\n\t\t\t\t\tExclusive Control:\n\t\t\t\t</div>\n\t\t\t\t<div class=\"itemContentFull\">\n\t\t\t\t\t{{:helper.link(\'Enabled\', \'locked\', {\'malflock\' : 1}, data.malfLocked ? \'selected\' : null)}}{{:helper.link(\'Disabled\', \'unlocked\', {\'malflock\' : 1}, data.malfLocked ? null : \'selected\')}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"clearBoth\"></div>\n\t\t\t</div>\n\t\t{{/if}}\n\t{{/if}}\n\n</div>\n\t\t");