import type { ReactNode } from 'react';

type Listener = () => void;

type Snapshot = {
  content: ReactNode | null;
  owner: symbol | null;
};

let content: ReactNode | null = null;
let owner: symbol | null = null;
let snapshot: Snapshot = { content, owner };
const listeners = new Set<Listener>();

const emitIfChanged = (): void => {
  const next = { content, owner };
  if (next.content === snapshot.content && next.owner === snapshot.owner) {
    return;
  }
  snapshot = next;
  listeners.forEach((listener) => listener());
};

export const setPortalContent = (next: ReactNode | null): void => {
  content = next;
  emitIfChanged();
};

export const setPortalOwner = (next: symbol): void => {
  owner = next;
  emitIfChanged();
};

export const clearPortalOwner = (id: symbol): void => {
  if (owner === id) {
    owner = null;
    emitIfChanged();
  }
};

export const getPortalSnapshot = (): Snapshot => snapshot;

export const subscribePortal = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
