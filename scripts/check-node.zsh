if ! command -v node >/dev/null 2>&1; then
  echo "Codex Twice requires Node.js 22 or newer. Install it from https://nodejs.org and try again."
  return 1
fi

node_major="$(node -p 'Number(process.versions.node.split(".")[0])')"
if (( node_major < 22 )); then
  echo "Codex Twice requires Node.js 22 or newer. Found Node.js $(node --version)."
  return 1
fi
