import React from 'react';

import '@synerise/ds-core/dist/js/style';

import * as S from './Checkbox.styles';
import { type CheckboxProps } from './Checkbox.types';
import { CheckboxBase, CheckboxTristate } from './components';
import './style/index.less';
import { isTristateCheckbox } from './utils';

export const Checkbox = (props: CheckboxProps) => {
  if (isTristateCheckbox(props)) {
    return <CheckboxTristate {...props} />;
  }
  return <CheckboxBase {...props} />;
};

Checkbox.Group = S.AntdCheckbox.Group;

export default Checkbox;
