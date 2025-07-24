import { path } from 'ramda';

export const getValueFromPath = <T extends object>(
  object: T,
  valuePath?: string | number | readonly (string | number)[],
) => {
  if (typeof valuePath === 'string') {
    return object[valuePath as keyof T];
  }
  if (Array.isArray(valuePath)) {
    return path(valuePath, object) || '';
  }
  return '';
};
