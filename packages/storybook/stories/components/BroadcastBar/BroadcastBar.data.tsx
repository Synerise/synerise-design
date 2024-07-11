import React from 'react';
import { controlFromOptionsArray } from '../../utils';


export const type = {
  ...controlFromOptionsArray('select', ['success', 'warning' , 'negative']),
};
export const color = {
  ...controlFromOptionsArray('select', ['red', 'green', 'yellow']),
};

