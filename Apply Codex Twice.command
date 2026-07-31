#!/bin/zsh
set -eu
cd "${0:A:h}"
source scripts/check-node.zsh
echo "Codex Twice will safely quit and reopen Codex for this session."
node src/cli.mjs apply --restart
echo
echo "Applied. Keep this folder to use Restore Codex.command later."
read -k 1 "?Press any key to close."
echo
