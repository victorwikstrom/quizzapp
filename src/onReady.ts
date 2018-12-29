export function onReady(action: () => void) {
  const isReady = document.readyState === "interactive" ||
                  document.readyState === "complete";
  isReady
    ? action()
    : document.addEventListener("DOMContentLoaded", action);
}
