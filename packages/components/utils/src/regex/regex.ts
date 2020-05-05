// eslint-disable-next-line no-useless-escape
const escapeRegEx = (s: string): string => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

export default escapeRegEx;
