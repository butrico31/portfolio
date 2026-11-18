export function sculpturePose(progress, elapsed = 0, still = false) {
  const scroll = still ? 0 : Math.min(1, Math.max(0, progress))
  const phase = Math.min(1, scroll / 0.4) - Math.max(0, (scroll - 0.6) / 0.4)
  const scrollOpening = phase * phase * (3 - 2 * phase)
  const idleOpening = (1 - Math.cos((elapsed * Math.PI * 2) / 24)) / 2
  const opening = still
    ? 0
    : Math.max(scrollOpening, idleOpening * (1 - scroll))
  return {
    opening,
    rotationX: 0.32 + opening * 0.25,
    rotationY: -0.55 + scroll * 0.85 + (still ? 0 : elapsed * 0.035),
    rotationZ: -0.14 + opening * 0.2,
    spread: 1 + opening * 0.95,
    twist: opening * 0.42,
    y: still ? 0 : Math.sin(elapsed * 0.35) * 0.07,
  }
}
