import React from 'react';

import {
  clearPortalOwner,
  getPortalSnapshot,
  setPortalContent,
  setPortalOwner,
  subscribePortal,
} from '../portalStore';

const resetStoreState = (): void => {
  setPortalContent(null);
  const resetId = Symbol('reset');
  setPortalOwner(resetId);
  clearPortalOwner(resetId);
};

beforeEach(() => {
  resetStoreState();
});

describe('portalStore', () => {
  describe('setPortalContent', () => {
    it('updates snapshot content', () => {
      const node = <span />;
      setPortalContent(node);
      expect(getPortalSnapshot().content).toBe(node);
    });

    it('notifies subscribers when content changes', () => {
      const listener = vi.fn();
      const unsubscribe = subscribePortal(listener);
      setPortalContent(<div />);
      expect(listener).toHaveBeenCalledTimes(1);
      unsubscribe();
    });

    it('does not notify subscribers when content is the same reference', () => {
      const node = <span />;
      setPortalContent(node);
      const listener = vi.fn();
      const unsubscribe = subscribePortal(listener);
      setPortalContent(node);
      expect(listener).not.toHaveBeenCalled();
      unsubscribe();
    });

    it('accepts null to clear content', () => {
      setPortalContent(<div />);
      setPortalContent(null);
      expect(getPortalSnapshot().content).toBeNull();
    });
  });

  describe('setPortalOwner', () => {
    it('updates snapshot owner', () => {
      const id = Symbol('test');
      setPortalOwner(id);
      expect(getPortalSnapshot().owner).toBe(id);
    });

    it('notifies subscribers when owner changes', () => {
      const listener = vi.fn();
      const unsubscribe = subscribePortal(listener);
      setPortalOwner(Symbol('test'));
      expect(listener).toHaveBeenCalledTimes(1);
      unsubscribe();
    });

    it('does not notify subscribers when owner is the same symbol', () => {
      const id = Symbol('test');
      setPortalOwner(id);
      const listener = vi.fn();
      const unsubscribe = subscribePortal(listener);
      setPortalOwner(id);
      expect(listener).not.toHaveBeenCalled();
      unsubscribe();
    });
  });

  describe('clearPortalOwner', () => {
    it('clears owner when id matches current owner', () => {
      const id = Symbol('test');
      setPortalOwner(id);
      clearPortalOwner(id);
      expect(getPortalSnapshot().owner).toBeNull();
    });

    it('does not clear owner when id does not match', () => {
      const id = Symbol('owner');
      setPortalOwner(id);
      clearPortalOwner(Symbol('other'));
      expect(getPortalSnapshot().owner).toBe(id);
    });

    it('notifies subscribers when owner is cleared', () => {
      const id = Symbol('test');
      setPortalOwner(id);
      const listener = vi.fn();
      const unsubscribe = subscribePortal(listener);
      clearPortalOwner(id);
      expect(listener).toHaveBeenCalledTimes(1);
      unsubscribe();
    });

    it('does not notify when id does not match', () => {
      const id = Symbol('owner');
      setPortalOwner(id);
      const listener = vi.fn();
      const unsubscribe = subscribePortal(listener);
      clearPortalOwner(Symbol('other'));
      expect(listener).not.toHaveBeenCalled();
      unsubscribe();
    });
  });

  describe('subscribePortal', () => {
    it('returns an unsubscribe function that stops notifications', () => {
      const listener = vi.fn();
      const unsubscribe = subscribePortal(listener);
      unsubscribe();
      setPortalContent(<div />);
      expect(listener).not.toHaveBeenCalled();
    });

    it('supports multiple concurrent listeners', () => {
      const a = vi.fn();
      const b = vi.fn();
      const unsubA = subscribePortal(a);
      const unsubB = subscribePortal(b);
      setPortalContent(<div />);
      expect(a).toHaveBeenCalledTimes(1);
      expect(b).toHaveBeenCalledTimes(1);
      unsubA();
      unsubB();
    });
  });

  describe('getPortalSnapshot', () => {
    it('returns the same object reference when nothing changed', () => {
      const s1 = getPortalSnapshot();
      const s2 = getPortalSnapshot();
      expect(s1).toBe(s2);
    });

    it('returns a new object reference after a change', () => {
      const s1 = getPortalSnapshot();
      setPortalContent(<div />);
      const s2 = getPortalSnapshot();
      expect(s1).not.toBe(s2);
    });
  });
});
