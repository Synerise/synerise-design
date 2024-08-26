import { controlFromOptionsArray } from '../../utils';

export const size = {
  ...controlFromOptionsArray('select', ['S', 'M', 'L']),
};