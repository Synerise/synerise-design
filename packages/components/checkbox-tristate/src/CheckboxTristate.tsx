import React from 'react';

import Checkbox, { type CheckboxTristateProps } from '@synerise/ds-checkbox';

/**
 * @deprecated - use <Checkbox tristate /> from @synerise/ds-checkbox instead
 */
const CheckboxTristate = (props: Omit<CheckboxTristateProps, 'tristate'>) => {
  return <Checkbox tristate {...props} />;
};

export default CheckboxTristate;
