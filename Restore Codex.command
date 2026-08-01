#!/bin/zsh
set -eu
cd "${0:A:h}"
source scripts/check-node.zsh
node src/cli.mjs restore
echo
echo "The native Codex appearance has been restored."
read -k 1 "?Press any key to close."
echo
