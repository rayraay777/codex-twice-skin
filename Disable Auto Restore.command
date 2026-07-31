#!/bin/zsh
set -eu
cd "${0:A:h}"
source scripts/check-node.zsh
node scripts/uninstall-persistence.mjs
echo
echo "Codex Twice auto-restore is disabled."
read -k 1 "?Press any key to close."
echo
