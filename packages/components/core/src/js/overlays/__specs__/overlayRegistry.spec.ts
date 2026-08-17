import {
  closeAllOverlays,
  createOverlayCloseEvent,
  registerOverlay,
} from '../overlayRegistry';

// The registry is a module-scoped singleton shared across tests in this file,
// so every registration has to be undone before the next test.
const unregisterAll: Array<() => void> = [];

const register = (
  ...args: Parameters<typeof registerOverlay>
): (() => void) => {
  const unregister = registerOverlay(...args);
  unregisterAll.push(unregister);
  return unregister;
};

afterEach(() => {
  unregisterAll.splice(0).forEach((unregister) => unregister());
});

describe('overlayRegistry', () => {
  describe('closeAllOverlays', () => {
    it('resolves without throwing when nothing is registered', async () => {
      await expect(closeAllOverlays()).resolves.toBeUndefined();
    });

    it('closes a single registered overlay', async () => {
      const close = vi.fn();
      register({ kind: 'modal', close });

      await closeAllOverlays();

      expect(close).toHaveBeenCalledTimes(1);
    });

    it('closes the most recently registered overlay first', async () => {
      const order: string[] = [];
      register({ kind: 'modal', close: () => void order.push('modal') });
      register({ kind: 'dropdown', close: () => void order.push('dropdown') });

      await closeAllOverlays();

      expect(order).toEqual(['dropdown', 'modal']);
    });

    it('closes only the requested kinds', async () => {
      const closeModal = vi.fn();
      const closeTooltip = vi.fn();
      register({ kind: 'modal', close: closeModal });
      register({ kind: 'tooltip', close: closeTooltip });

      await closeAllOverlays({ kinds: ['modal'] });

      expect(closeModal).toHaveBeenCalledTimes(1);
      expect(closeTooltip).not.toHaveBeenCalled();
    });

    it('does not close an overlay that has unregistered', async () => {
      const close = vi.fn();
      const unregister = register({ kind: 'modal', close });

      unregister();
      await closeAllOverlays();

      expect(close).not.toHaveBeenCalled();
    });

    it('skips overlays unregistered by an earlier close in the same sweep', async () => {
      const closeChild = vi.fn();
      const unregisterChild = register({ kind: 'dropdown', close: closeChild });
      // Registered last, so it closes first — as a parent modal would, taking
      // its child dropdown down with it.
      register({ kind: 'modal', close: () => unregisterChild() });

      await closeAllOverlays();

      expect(closeChild).not.toHaveBeenCalled();
    });

    it('does not close a registration twice, even before it unregisters', async () => {
      // A real overlay unregisters in its effect cleanup, which React may not
      // have flushed by the time a second sweep runs.
      const close = vi.fn();
      register({ kind: 'modal', close });

      await closeAllOverlays();
      await closeAllOverlays();

      expect(close).toHaveBeenCalledTimes(1);
    });

    it('closes an overlay again once it has re-registered', async () => {
      const close = vi.fn();
      const unregister = register({ kind: 'modal', close });
      await closeAllOverlays();

      unregister();
      register({ kind: 'modal', close });
      await closeAllOverlays();

      expect(close).toHaveBeenCalledTimes(2);
    });

    it('awaits an async close before resolving', async () => {
      let resolved = false;
      register({
        kind: 'modal',
        close: async () => {
          await Promise.resolve();
          resolved = true;
        },
      });

      await closeAllOverlays();

      expect(resolved).toBe(true);
    });

    it('keeps closing the rest when one handler throws', async () => {
      const close = vi.fn();
      register({ kind: 'modal', close });
      register({
        kind: 'dropdown',
        close: () => {
          throw new Error('boom');
        },
      });

      await expect(closeAllOverlays()).resolves.toBeUndefined();
      expect(close).toHaveBeenCalledTimes(1);
    });

    it('keeps closing the rest when one handler rejects', async () => {
      const close = vi.fn();
      register({ kind: 'modal', close });
      register({ kind: 'dropdown', close: () => Promise.reject(new Error()) });

      await expect(closeAllOverlays()).resolves.toBeUndefined();
      expect(close).toHaveBeenCalledTimes(1);
    });
  });

  describe('createOverlayCloseEvent', () => {
    it('exposes the overlay root as target and currentTarget', () => {
      const element = document.createElement('div');

      const event = createOverlayCloseEvent<{
        target: HTMLElement;
        currentTarget: HTMLElement;
      }>(element);

      expect(event.target).toBe(element);
      expect(event.currentTarget).toBe(element);
    });

    it('provides no-op preventDefault and stopPropagation', () => {
      const event = createOverlayCloseEvent<{
        preventDefault: () => void;
        stopPropagation: () => void;
      }>(null);

      expect(() => {
        event.preventDefault();
        event.stopPropagation();
      }).not.toThrow();
    });
  });
});
