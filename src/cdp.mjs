const LOOPBACK = "127.0.0.1";

export async function listTargets(port) {
  const response = await fetch(`http://${LOOPBACK}:${port}/json/list`, {
    signal: AbortSignal.timeout(1800),
  });
  if (!response.ok) throw new Error(`CDP target list returned HTTP ${response.status}`);
  const targets = await response.json();
  if (!Array.isArray(targets)) throw new Error("CDP target list is invalid");
  return targets.filter((target) => {
    if (target?.type !== "page" || typeof target.webSocketDebuggerUrl !== "string") return false;
    if (!target.webSocketDebuggerUrl.startsWith(`ws://${LOOPBACK}:${port}/`)) return false;
    try {
      const url = new URL(target.url);
      return url.protocol === "app:" && url.pathname === "/index.html"
        && url.searchParams.get("initialRoute") !== "/avatar-overlay";
    } catch {
      return false;
    }
  });
}

export async function evaluate(target, expression) {
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  let sequence = 0;
  const pending = new Map();

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("CDP connection timed out")), 2500);
    socket.addEventListener("open", () => { clearTimeout(timer); resolve(); }, { once: true });
    socket.addEventListener("error", () => { clearTimeout(timer); reject(new Error("CDP connection failed")); }, { once: true });
  });

  socket.addEventListener("message", (event) => {
    let message;
    try { message = JSON.parse(String(event.data)); } catch { return; }
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message || "CDP request failed"));
    else waiter.resolve(message.result);
  });

  const id = ++sequence;
  const result = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error("CDP evaluation timed out"));
    }, 5000);
    pending.set(id, {
      resolve: (value) => { clearTimeout(timer); resolve(value); },
      reject: (error) => { clearTimeout(timer); reject(error); },
    });
    socket.send(JSON.stringify({
      id,
      method: "Runtime.evaluate",
      params: { expression, awaitPromise: true, returnByValue: true },
    }));
  });
  socket.close();
  if (result?.exceptionDetails) throw new Error(result.exceptionDetails.text || "Renderer injection failed");
  return result?.result?.value;
}
