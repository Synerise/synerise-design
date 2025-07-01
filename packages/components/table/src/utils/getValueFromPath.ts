import { path } from 'ramda';

export const getValueFromPath = (
  object: object,
  valuePath?: string | number | readonly (string | number)[],
): string | number | boolean => {
  if (typeof valuePath === 'string') {
    return object[valuePath];
  }
  if (Array.isArray(valuePath)) {
    return path(valuePath, object) || '';
  }
  return '';
};
