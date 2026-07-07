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
  // getPortalSnapshot doubles as getServerSnapshot: it reads a module-scoped store with no
  // browser APIs, so it is safe on the server. Without the 3rd arg React throws "Missing
  // getServerSnapshot" (minified #407) during SSR and 500s every server-rendered page.
  const snapshot = useSyncExternalStore(
    subscribePortal,
    getPortalSnapshot,
    getPortalSnapshot,
  );

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
