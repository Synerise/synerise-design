import { path } from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const getValueFromPath = (
  object: object,
  valuePath?: string | number | readonly (string | number)[]
): string | number | boolean => {
  if (typeof valuePath === 'string') return object[valuePath];
  if (Array.isArray(valuePath)) return path(valuePath, object) || '';
  return '';
};
