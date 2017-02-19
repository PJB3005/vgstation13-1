/obj/machinery/computer/telecomms/monitor
	name = "telecommunications network monitor"
	desc = "Shows the network graph of all machinery on a network."
	icon_state = "comm_serv"
	circuit = "/obj/item/weapon/circuitboard/comm_monitor"
	light_color = LIGHT_COLOR_GREEN

	// Which screen we're currently on.
	var/screen = SCREEN_MAIN
	// List of found machines.
	var/list/machinelist = list()
	var/obj/machinery/telecomms/selected

	// the network to probe
	var/network = "NULL"
	// temporary feedback messages
	var/temp = ""				

	

/obj/machinery/computer/telecomms/monitor/attack_hand(var/mob/user)
	if(stat & (BROKEN|NOPOWER))
		return
	user.set_machine(src)
	var/dat = {"
	<div id='logtemp'>
		[temp]
	</div>
	<hr />
	"}

	switch(screen)
		if(SCREEN_MAIN)
			dat += {"
				<form id='network-form' action="?src=\ref[src]" method="get">
					<input type="hidden" name="src" value="\ref[src]"/>
					<input type="hidden" name="scan" value="1"/>
					<label id='network'>
						Current Network: <input class='network-input' type="textbox" name="network" value='[network]'/ />
					</label>
					<input type="submit" value="save"/>
				</form>
			"}

			if(machinelist.len)
				dat += {"
					<b>Detected Network Entities:</b>
					<ul>
				"}
				for(var/obj/machinery/telecomms/T in machinelist)
					// Cut out brackets.
					var/ref = copytext("\ref[src]", 2, -1)
					dat += {"
						<li>
							<span class="code">[ref]</span>
							<a class='vert' href='?src=\ref[src];viewmachine=\ref[T]'>[T.name]</a>
						</li>
					"}

				dat += {"
					</ul>
					<a id='flush' href='?src=\ref[src];flush=1'>Flush Buffer</a>
				"}
			else
				dat += "<b>No network entities detected. Scan for entities:</b> <a href='?src=\ref[src];scan=1'>Scan</a>"

		if(SCREEN_SELECTED)
			dat += {"
				<div id='listcontrols'>
					<a href='?src=\ref[src];mainmenu=1'>Main Menu</a>
					<a href='?src=\ref[src];refresh=1'>Refresh</a>
				</div>

				<table>
					<tr>
						<td><b>Current Network:</b></td>
						<td class="right"><span class="code">[network]</span></td>
					</tr>
					<tr>
						<td><b>Currently Selected Entity:</b></td>
						<td class="right">[selected.name]</td>
					</tr>
				</table>

				<b id="logsmessage">Linked entities:</b><br />
				<ol>
			"}

			for(var/obj/machinery/telecomms/T in selected.links)
				if(!T.hide)
					// Cut off brackets.
					var/ref = copytext("\ref[src]", 2, -1)
					dat += {"
						<li>
							<span class="code">[ref]</span>
							<a class='vert' href='?src=\ref[src];viewmachine=\ref[T]'>[T.name]</a>
						</li>
					"}
			dat += "</ol>"


	var/datum/browser/B = new(user, "\ref[src]", "Telecommunications Network Monitor", 575, 400, src)
	B.add_stylesheet("logbrowser.css", 'html/browser/logbrowser.css')
	B.set_content(dat)
	B.open()
	temp = "&nbsp;"


/obj/machinery/computer/telecomms/monitor/Topic(href, href_list)
	. = ..()
	if (.)
		return

	add_fingerprint(usr)
	usr.set_machine(src)


	if(href_list["viewmachine"])
		var/obj/machinery/telecomms/T = locate(href_list["viewmachine"]) in machinelist
		if (T)
			screen = SCREEN_SELECTED
			selected = T

		. = TRUE

	if (href_list["flush"])
		machinelist.Cut()
		screen = SCREEN_MAIN
		. = TRUE

	if (href_list["mainmenu"])
		screen = SCREEN_MAIN
		. = TRUE

	if (href_list["network"])
		var/newnet = reject_bad_text(href_list["network"])
		if (length(newnet) > 15)
			set_temp("FAILED: NETWORK TAG STRING TOO LENGHTLY", BAD)

		else
			network = newnet
			machinelist.Cut()
			screen = SCREEN_MAIN
		. = TRUE

	// This MUST be below network setting, because the form also does a rescan.
	if (href_list["scan"])
		if (machinelist.len)
			set_temp("FAILED: CANNOT PROBE WHEN BUFFER FULL", BAD)

		else
			for (var/obj/machinery/telecomms/T in range(25, src))
				if (T.network == network)
					machinelist.Add(T)

			if (!machinelist.len)
				set_temp("FAILED: UNABLE TO LOCATE NETWORK ENTITIES IN <span class='code'>[network]</span>", BAD)
			else
				set_temp("[machinelist.len] ENTITIES PROBED & BUFFERED", NEUTRAL)

			screen = SCREEN_MAIN
		. = TRUE

	if (href_list["refresh"])
		. = TRUE

	if(.)
		updateUsrDialog()

/obj/machinery/computer/telecomms/monitor/attackby(var/obj/item/weapon/D as obj, var/mob/user as mob)
	if(..())
		return 1
	src.updateUsrDialog()

/obj/machinery/computer/telecomms/monitor/proc/set_temp(var/message, var/class = NEUTRAL)
	temp = "<span class='[class] tempmsg'>[message]</span>"