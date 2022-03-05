#!/usr/bin/env python

import os
import subprocess
import sys

VERSION = "0.0.6"


def main():

    print("Project Makefile")
    if len(sys.argv) != 2:
        print("Usage: project-makefile <project_dir>")
        sys.exit(1)

    project_dir = sys.argv[1]

    try:
        print("- Create %s" % project_dir)
        os.mkdir(project_dir)
        print("  - Done!")
    except FileExistsError:
        print("  - Done (already exists)")

    print("- Change dir")
    os.chdir(project_dir)
    print("  - Done!")

    print("- Download files")
    subprocess.run(
        [
            "curl",
            "-O",
            "https://raw.githubusercontent.com/aclark4life/project-makefile/%s/base.mk"
            % VERSION,
        ]
    )
    subprocess.run(
        [
            "curl",
            "-O",
            "https://raw.githubusercontent.com/aclark4life/project-makefile/%s/Makefile"
            % VERSION,
        ]
    )
    print("  - Done!")
    print("Now run `make` from %s" % project_dir)


if __name__ == "__MAIN__":
    main()
