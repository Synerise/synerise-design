import { useEffect, useRef } from 'react';

export const useTraceUpdate = (props: Record<string, unknown>): void => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce(
      (ps, [k, v]) => {
        if (prev.current[k] !== v) {
          ps[k] = [prev.current[k], v];
        }
        return ps;
      },
      {} as Record<string, unknown>,
    );
    if (Object.keys(changedProps).length > 0) {
      // biome-ignore lint/suspicious/noConsole: deliberate developer-facing log
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
};
