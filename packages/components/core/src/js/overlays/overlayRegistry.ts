export type OverlayKind =
  | 'modal'
  | 'drawer'
  | 'popover'
  | 'dropdown'
  | 'tooltip'
  | 'popconfirm';

export type OverlayEntry = {
  kind: OverlayKind;
  close: () => void | Promise<void>;
};

export type CloseAllOverlaysOptions = {
  /** Restrict the sweep to these kinds. Omit to close every registered overlay. */
  kinds?: OverlayKind[];
};

type RegisteredOverlay = OverlayEntry & { closed: boolean };

// Insertion-ordered, so iterating in reverse closes the most recently opened
// overlay first (a dropdown opened inside a modal closes before the modal).
const overlays = new Map<symbol, RegisteredOverlay>();

/**
 * Called by overlay components while they are open. The returned function
 * unregisters the entry and must be used as the effect cleanup.
 */
export const registerOverlay = (entry: OverlayEntry): (() => void) => {
  const id = Symbol('ds-overlay');
  overlays.set(id, { ...entry, closed: false });
  return () => {
    overlays.delete(id);
  };
};

/**
 * Closes every registered overlay through its own close path, so consumer
 * handlers (`onCancel` / `onOpenChange` / `onClose`) fire, exit transitions run
 * and focus is restored. Safe to call when nothing is open and safe to repeat.
 *
 * Each registration is closed at most once. An overlay re-registers whenever it
 * re-opens, so a repeat call cannot fire the same `onCancel` twice even before
 * React has flushed the first close.
 */
export const closeAllOverlays = async (
  options: CloseAllOverlaysOptions = {},
): Promise<void> => {
  const { kinds } = options;
  const ids = [...overlays.keys()].reverse();

  // Sequential rather than parallel: closing a parent can unmount its children
  // mid-sweep, and `ds-modal`'s `onCancel` may be async.
  for (const id of ids) {
    // Read live: an earlier close may already have unregistered this overlay.
    const entry = overlays.get(id);
    if (entry && !entry.closed && (!kinds || kinds.includes(entry.kind))) {
      entry.closed = true;
      try {
        await entry.close();
      } catch {
        // One misbehaving handler must not strand the remaining overlays open.
      }
    }
  }
};

/**
 * `Modal.onCancel` and `Drawer.onClose` are typed to receive an event. A
 * programmatic close has none, and passing `null` would break any consumer that
 * reads `event.currentTarget`, so hand them a minimal stand-in. The cast is
 * contained here rather than at each call site.
 */
export const createOverlayCloseEvent = <T>(target: HTMLElement | null): T =>
  ({
    type: 'ds-close-all-overlays',
    target,
    currentTarget: target,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    preventDefault: () => undefined,
    stopPropagation: () => undefined,
    isPropagationStopped: () => false,
    isDefaultPrevented: () => false,
    persist: () => undefined,
  }) as unknown as T;
