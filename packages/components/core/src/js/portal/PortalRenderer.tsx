import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import {
  clearPortalOwner,
  getPortalSnapshot,
  setPortalOwner,
  subscribePortal,
} from './portalStore';

const PortalRenderer = () => {
  const id = useMemo(() => Symbol('portal-owner'), []);
  const snapshot = useSyncExternalStore(subscribePortal, getPortalSnapshot);

  useEffect(() => {
    setPortalOwner(id);
    return () => clearPortalOwner(id);
  }, [id]);

  useEffect(() => {
    if (snapshot.owner === null) {
      setPortalOwner(id);
    }
  }, [id, snapshot.owner]);

  if (snapshot.owner !== id) {
    return null;
  }
  if (!snapshot.content) {
    return null;
  }
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(snapshot.content, document.body);
};

export default PortalRenderer;
