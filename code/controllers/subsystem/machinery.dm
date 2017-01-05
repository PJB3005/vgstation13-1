var/datum/subsystem/machinery/SSmachinery

var/list/machines = list()


/datum/subsystem/machinery
	name = "Machinery"
	wait = 2.3 SECONDS
	flags = SS_NO_INIT

	var/list/currentrun


/datum/subsystem/machinery/New()
	NEW_SS_GLOBAL(SSmachinery)


// This is to allow the near identical fast machinery process to use it.
/datum/subsystem/machinery/proc/get_currenrun()
	return machines.Copy()


/datum/subsystem/machinery/fire(resumed = FALSE)
	if (!resumed)
		currentrun = get_currenrun()

	while (currentrun.len)
		var/obj/machinery/M = currentrun[currentrun.len]
		currentrun.len--

		if (!M || M.gcDestroyed || M.disposed || M.timestopped)
			continue

		if (M.process() == PROCESS_KILL)
			M.inMachineList = 0
			machines.Remove(M)
			continue

		if (M.use_power)
			M.auto_use_power()

		if (MC_TICK_CHECK)
			return
