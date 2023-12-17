INSTALL_DIR="/usr/local/share/project-makefile"
SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Create the installation directory
mkdir -p "$INSTALL_DIR"

# Copy base.mk and Makefile to the installation directory
cp "$SOURCE_DIR/base.mk" "$INSTALL_DIR"
cp "$SOURCE_DIR/Makefile" "$INSTALL_DIR"

# Set appropriate permissions
chmod 644 "$INSTALL_DIR/base.mk" "$INSTALL_DIR/Makefile"

echo "Project Makefiles installed to: $INSTALL_DIR"
