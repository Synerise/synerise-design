import type { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import React, { useEffect, useState } from 'react';

import {
  type CheckboxTristateChangeEvent,
  type CheckboxTristateProps,
} from '../Checkbox.types';
import { checkedValue, nextCheckedValues } from '../utils';
import { CheckboxBase } from './CheckboxBase';

export const CheckboxTristate = (props: CheckboxTristateProps) => {
  const { checked, defaultChecked, onChange, tristate, ...restProps } = props;
  const initialChecked = 'checked' in props ? checked : defaultChecked;
  const isControlled = 'checked' in props;
  const [currentChecked, setChecked] = useState(initialChecked);
  const [indeterminate, setIndeterminate] = useState(
    initialChecked === undefined,
  );

  useEffect(() => {
    if (
      isControlled &&
      (checked !== currentChecked ||
        (checked === false && currentChecked === false))
    ) {
      if (checked === undefined) {
        setIndeterminate(true);
        setChecked(false);
      } else {
        setChecked(checked);
        setIndeterminate(false);
      }
    }
  }, [isControlled, checked, currentChecked]);

  const handleOnChange = (event: CheckboxChangeEvent) => {
    const [newChecked, newIndeterminate] = nextCheckedValues(
      currentChecked,
      indeterminate,
    );
    const tristateEvent = { ...event } as CheckboxTristateChangeEvent;

    tristateEvent.target.checked = checkedValue(newChecked, newIndeterminate);

    if (!isControlled) {
      setChecked(newChecked);
      setIndeterminate(newIndeterminate);
    }

    typeof onChange === 'function' && onChange(tristateEvent);
  };

  return (
    <CheckboxBase
      checked={currentChecked}
      indeterminate={indeterminate}
      onChange={handleOnChange}
      {...restProps}
    />
  );
};
