#! /bin/bash

set -e
set -x

cat << EOF >> ~/.bashrc
export PATH="$PATH:~/.local/bin"
EOF

mkdir -p ~/.local/bin

npm ci
