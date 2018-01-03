#!/usr/bin/env python3
import argparse
import asyncio
import distutils.spawn
import re
import sys
import typing

MAP_INCLUDE_RE = re.compile(r"#include \"maps\\[a-zA-Z0-9][a-zA-Z0-9_]*\.dm\"")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("dme", help="The DME file to compile.")
    parser.add_argument("-M", "--mapfile", nargs="*", help="Extra map files to replace the regular map file in the DME with.")
    args = parser.parse_args()

    dme = args.dme
    if args.mapfile is not None:
        # Handle map file replacement.
        with open(dme, "r") as f:
            content = f.read()

        # Make string to replace the map include with.
        includes = ""
        for arg in args.mapfile:
            includes += "#include \"maps\\\\{}.dm\"\n".format(arg)

        content = MAP_INCLUDE_RE.sub(includes, content, count=1)
        dme = "{}.mdme".format(dme)
        with open(dme, "w") as f:
            f.write(content)

    compiler = "DreamMaker"
    if sys.platform == "win32" or sys.platform == "cygwin":
        compiler = "dm"

    compiler = distutils.spawn.find_executable(compiler)
    if not compiler:
        print("Unable to find DM compiler.")
        exit(1)

    loop = asyncio.get_event_loop()
    code = loop.run_until_complete([compiler, *args])
    exit(code)

# DM SOMEHOW manages to go 10 minutes without logging anything nowadays.
# So... Travis kills it.
# Thanks DM.
# This repeats messages like travis_wait (which I couldn't get working) does to prevent that.
async def run_compiler(args) -> int:
    compiler_process = await asyncio.create_subprocess_exec(*args)
    task = asyncio.ensure_future(print_timeout_guards())

    ret = await compiler_process.wait()
    task.cancel()
    return ret

async def print_timeout_guards():
    while True:
        print("Keeping Travis alive. Ignore this!")
        await asyncio.sleep(120)

if __name__ == "__main__":
    main()
