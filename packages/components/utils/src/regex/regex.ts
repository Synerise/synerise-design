const escapeRegEx = (s: string): string =>
  s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

export default escapeRegEx;
