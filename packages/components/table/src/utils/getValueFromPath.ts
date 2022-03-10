import { get } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const getValueFromPath = (
  object: object,
  path?: string | number | (string | number)[]
): string | number | boolean => {
  if (typeof path === 'string') return object[path];
  if (Array.isArray(path)) return get(object, path.join('.')) || '';
  return '';
};
