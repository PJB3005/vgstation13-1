/obj/machinery/computer/telecomms/server
	name = "telecommunications server monitor"
	icon_state = "comm_monitor"

	var/screen = SCREEN_MAIN        // the screen number:
	var/list/servers = list()       // the servers located by the computer
	var/obj/machinery/telecomms/server/SelectedServer

	var/network = "NULL"            // the network to probe
	var/temp = ""                   // temporary feedback messages

	var/universal_translate = FALSE // set to TRUE if it can translate nonhuman speech

	circuit = "/obj/item/weapon/circuitboard/comm_server"

	req_access = list(access_tcomsat)


/obj/machinery/computer/telecomms/server/Destroy()
	servers = null
	SelectedServer = null
	return ..()


/obj/machinery/computer/telecomms/server/attack_hand(var/mob/user)
	if(stat & (BROKEN|NOPOWER))
		return

	user.set_machine(src)
	var/dat = {"
	<div id='logtemp'>
		[temp]
	</div>
	<hr />
	"}

	switch (screen)
		if (SCREEN_MAIN)
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

			if (servers.len)
				dat += {"
					<b>Detected Telecommunication Servers:</b>
					<ul>
				"}
				for (var/obj/machinery/telecomms/T in servers)
					var/ref = copytext("\ref[src]", 2, -1) // Cut out brackets.
					dat += {"
						<li>
							<span class="code">[ref]</span>
							<a class='vert' href='?src=\ref[src];viewserver=\ref[T]'>[T.name]</a>
						</li>
					"}

				dat += {"
					</ul>
					<a id='flush' href='?src=\ref[src];flush=1'>Flush Buffer</a>
				"}
			else
				dat += "<b>No servers detected. Scan for servers:</b> <a href='?src=\ref[src];scan=1'>Scan</a>"


		if (SCREEN_SERVER)
			// --- Viewing Server ---
			var/traffic = ""
			if (SelectedServer.totaltraffic >= 1024)
				traffic = "[round(SelectedServer.totaltraffic / 1024)] TiB"
			else
				traffic = "[SelectedServer.totaltraffic] GiB"

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
						<td><b>Currently Selected Server:</b></td>
						<td class="right">[SelectedServer.id]</td>
					</tr>
					<tr>
						<td><b>Total Recorded Traffic:</b></td>
						<td class="right">[traffic]</td>
					</tr>
				</table>

				<b id="logsmessage">Stored Logs:</b><br />
				<table id="logs">
			"}

			var/i = 0
			for(var/datum/comm_log_entry/C in SelectedServer.log_entries)
				i++
				switch(C.input_type)
					if("Speech File")
						var/contents = "\"[C.parameters["message"]]\""
						var/source = "[C.parameters["name"]] (Job: [C.parameters["job"]])"
						var/type = C.input_type
						var/race               // The actual race of the mob
						var/language = "Human" // MMIs, pAIs, Cyborgs and humans all speak Human
						var/mobtype = C.parameters["mobtype"]

						var/static/list/humans = typesof(/mob/living/carbon/human, /mob/living/carbon/brain)
						var/static/list/monkeys = typesof(/mob/living/carbon/monkey)
						var/static/list/silicons = typesof(/mob/living/silicon)
						var/static/list/slimes = typesof(/mob/living/carbon/slime)
						var/static/list/animals = typesof(/mob/living/simple_animal)

						// Determine race of orator
						// Jesus Fuck.
						if (mobtype in humans)
							race = "Human"
							language = race

						else if (mobtype in monkeys)
							race = "Monkey"
							language = race

						else if (mobtype in silicons || C.parameters["job"] == "AI") // sometimes M gets deleted prematurely for AIs... just check the job
							race = "Artificial Life"

						else if (mobtype in slimes) // NT knows a lot about slimes, but not aliens. Can identify slimes
							race = "slime"
							language = race

						else if (istype(mobtype, /obj))
							race = "Machinery"
							language = race

						else if (mobtype in animals)
							race = "Domestic Animal"
							language = race

						else
							race = "<i>Unidentifiable</i>"
							language = race

						// -- If the orator is a human, or universal translate is active, OR mob has universal speech on --

						if (language != "Human" && !universal_translate && !C.parameters["uspeech"])
							contents = "<i>Unintelligble</i>"
							source   = "<i>Unidentifiable</i>"
							type     = "Audio File"

						dat += {"
							<tr>
								<td class="messageid">[i].</td>
								<td class="packettype">
									<a href='?src=\ref[src];delete=[i]'>X</a>
									<span class="packet">[type]</span>
								</td>
								<td>
									<span class="code">[C.hash]</span>
								</td>
							</tr>

							<tr>
								<td></td>
								<td><b>Source:</b></td>
								<td class="right">[source]</td>
							</tr>

							<tr>
								<td></td>
								<td><b>Class:</b></td>
								<td class="right">[race]</td>
							</tr>

							<tr class="rowspacing">
								<td></td>
								<td><b>Contents:</b></td>
								<td class="right">[contents]</td>
							</tr>
						"}

					if ("Execution Error")
						dat += {"
							<tr>
								<td class="messageid">[i].</td>
								<td class="packettype">
									<a href='?src=\ref[src];delete=[i]'>X</a>
									<span class="error">Execution Error</span>
								</td>
								<td>
									<span class="code">[C.hash]</span>
								</td>
							</tr>
							<tr class="rowspacing">
								<td></td>
								<td>
									<b>Output:</b>
								</td>
								<td>
									"DivideByZeroError: \"[C.parameters["message"]]\"
								</td>
							</tr>
						"}

			dat += "</table>"

	var/datum/browser/B = new(user, "\ref[src]", "Telecommunications Server Monitor", 575, 400, src)
	B.add_stylesheet("logbrowser.css", 'code/game/machinery/telecomms/logbrowser.css')
	B.set_content(dat)
	B.open()
	temp = "&nbsp;"

/obj/machinery/computer/telecomms/server/Topic(href, href_list)
	. = ..()
	if (.)
		return

	add_fingerprint(usr)
	usr.set_machine(src)


	if (href_list["viewserver"])
		var/obj/machinery/telecomms/T = locate(href_list["viewserver"]) in servers
		if(T)
			SelectedServer = T
			screen = SCREEN_SERVER
		. = TRUE


	if (href_list["flush"])
		servers.Cut()
		screen = SCREEN_MAIN
		. = TRUE


	if (href_list["mainmenu"])
		screen = SCREEN_MAIN
		. = TRUE


	if (href_list["delete"])
		if (!allowed(usr))
			set_temp("<span class='warning'>FAILED: ACCESS DENIED.</span>", BAD)

		else if (SelectedServer)
			var/datum/comm_log_entry/D
			try
				D = SelectedServer.log_entries[text2num(href_list["delete"])]
			catch
				// Could be Out of Bounds, turning it into a float because of href exploits, anything.
				return TRUE

			if (!D)
				return TRUE

			set_temp("DELETED ENTRY: [D.name]", NEUTRAL)

			SelectedServer.log_entries.Remove(D)
			qdel(D)

		else
			set_temp("FAILED: NO SELECTED MACHINE", BAD)
		. = TRUE


	if (href_list["network"])
		var/newnet = reject_bad_text(href_list["network"])
		if (length(newnet) > 15)
			set_temp("FAILED: NETWORK TAG STRING TOO LENGHTLY", BAD)

		else
			network = newnet
			servers.Cut()
			screen = SCREEN_MAIN
		. = TRUE

	// This MUST be below network setting, because the form also does a rescan.
	if (href_list["scan"])
		if (servers.len)
			set_temp("FAILED: CANNOT PROBE WHEN BUFFER FULL", BAD)

		else
			for (var/obj/machinery/telecomms/server/T in range(25, src))
				if (T.network == network)
					servers.Add(T)

			if (!servers.len)
				set_temp("FAILED: UNABLE TO LOCATE SERVERS IN <span class='code'[network]</span>", BAD)
			else
				set_temp("[servers.len] SERVERS PROBED & BUFFERED", NEUTRAL)

			screen = SCREEN_MAIN
		. = TRUE

	if (.)
		updateUsrDialog()

/obj/machinery/computer/telecomms/server/attackby(var/obj/item/weapon/D as obj, var/mob/user as mob)
	if (..())
		return TRUE

	updateUsrDialog()


/obj/machinery/computer/telecomms/server/emag(mob/user)
	if (!emagged)
		playsound(get_turf(src), 'sound/effects/sparks4.ogg', 75, 1)
		emagged = TRUE
		req_access.Cut()
		to_chat(user, "<span class='notice'>You you disable the security protocols</span>")
		return TRUE


/obj/machinery/computer/telecomms/server/proc/set_temp(var/message, var/class = NEUTRAL)
	temp = "<span class='[class] tempmsg'>[message]</span>"


#undef BAD
#undef NEUTRAL

#undef SCREEN_MAIN
#undef SCREEN_SERVER
