SRC=/build
DIR=/Volumes/bootQLA2/Library/WebServer/Documents/tempkit/0
mkdir -p "$DIR"
visdiff   $(dirname "$0")/$SRC  "$DIR"
