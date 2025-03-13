import React, { useEffect, useState } from 'react';
import Checkbox from '@synerise/ds-checkbox';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import { CheckboxTristateChangeEvent, CheckboxTristateProps } from './CheckboxTristate.types';

export * from './CheckboxTristate.types';

export function nextCheckedValues(checked: boolean | undefined, indeterminate: boolean): [boolean, boolean] {
  if (checked === false) {
    return [true, false];
  }
  if (checked === true && !indeterminate) {
    return [true, true];
  }
  return [false, false];
}

export function checkedValue(checked: boolean, indeterminate: boolean): boolean | undefined {
  return indeterminate ? undefined : checked;
}

const CheckboxTristate = (props: CheckboxTristateProps) => {
  const { checked, defaultChecked, onChange, ...restProps } = props;
  const initialChecked = 'checked' in props ? checked : defaultChecked;
  const isControlled = 'checked' in props;
  const [currentChecked, setChecked] = useState(initialChecked);
  const [indeterminate, setIndeterminate] = useState(initialChecked === undefined);

  useEffect(() => {
    if (isControlled && (checked !== currentChecked || (checked === false && currentChecked === false))) {
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
    const [newChecked, newIndeterminate] = nextCheckedValues(currentChecked, indeterminate);
    const tristateEvent = { ...event } as CheckboxTristateChangeEvent;

    tristateEvent.target.checked = checkedValue(newChecked, newIndeterminate);

    if (!isControlled) {
      setChecked(newChecked);
      setIndeterminate(newIndeterminate);
    }

    typeof onChange === 'function' && onChange(tristateEvent);
  };

  return <Checkbox checked={currentChecked} indeterminate={indeterminate} onChange={handleOnChange} {...restProps} />;
};

export default CheckboxTristate;
