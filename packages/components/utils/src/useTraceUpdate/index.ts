import { useEffect, useRef } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useTraceUpdate = (props: {}): void => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        // eslint-disable-next-line no-param-reassign
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
};
