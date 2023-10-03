#! /bin/bash

set -e
set -x

cat << EOF >> ~/.bashrc
export PATH="$PATH:~/.local/bin"

alias npm='echo use yarn #'
EOF

mkdir -p ~/.local/bin

yarn install
