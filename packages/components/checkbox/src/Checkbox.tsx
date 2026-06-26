import React from 'react';

import { type CheckboxProps } from './Checkbox.types';
import CheckboxGroup from './CheckboxGroup';
import { CheckboxBase, CheckboxTristate } from './components';
import { isTristateCheckbox } from './utils';

export const Checkbox = (props: CheckboxProps) => {
  if (isTristateCheckbox(props)) {
    return <CheckboxTristate {...props} />;
  }
  return <CheckboxBase {...props} />;
};

Checkbox.Group = CheckboxGroup;

export default Checkbox;
