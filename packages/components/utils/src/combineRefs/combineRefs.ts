import * as React from 'react';

const combineRefs = <T extends unknown>(forwardedRef: React.Ref<T>, targetRef: React.MutableRefObject<T | null>): React.MutableRefObject<T | null> => {
  if (typeof forwardedRef === 'function') {
    forwardedRef(targetRef.current);
  } else {
    // eslint-disable-next-line no-param-reassign
    (forwardedRef as React.MutableRefObject<T | null>).current = targetRef.current;
  }

  return targetRef;
};

export default combineRefs;