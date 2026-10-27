/**
 * Spread into a story's `parameters` when another snapshotted story already shows what it renders:
 * a single variant a matrix story covers, or a `play` story whose end state is not visually new.
 * Import it from this file, not the `utils` barrel: TurboSnap re-snapshots every story importing a
 * changed module, and the barrel is imported by nearly all of them.
 */
export const NO_SNAPSHOT = {
  chromatic: { disableSnapshot: true },
} as const;
