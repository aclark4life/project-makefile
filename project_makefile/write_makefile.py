import os
import shutil


def write_makefile():
    current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    makefile_src = os.path.join(current_dir, "Makefile")
    makefile_dst = os.path.join(os.getcwd(), "Makefile")

    shutil.copyfile(makefile_src, makefile_dst)
    print(f"Makefile has been written to {makefile_dst}")


if __name__ == "__main__":
    write_makefile()
