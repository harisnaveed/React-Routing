export function lazyDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}