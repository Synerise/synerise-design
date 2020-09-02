import Dropdown from '@synerise/ds-dropdown';
import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import { InputProps, ParameterValueType } from '../../Factors.types';
import ParameterDropdown from './ParameterDropdown';

const ParameterInput: React.FC<InputProps> = ({ value, onChange, parameters, texts }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const { buttonIcon, buttonLabel, ...restParameters } = parameters;
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const handleChange = React.useCallback(
    val => {
      onChange(val);
    },
    [onChange]
  );

  return (
    <Dropdown
      visible={dropdownVisible}
      overlay={
        <ParameterDropdown
          setDropdownVisible={setDropdownVisible}
          setSelected={handleChange}
          {...restParameters}
          texts={texts}
        />
      }
    >
      <Button type="secondary" mode="two-icons" onClick={(): void => setDropdownVisible(true)}>
        <Icon component={(value as ParameterValueType).icon || buttonIcon} />
        {(value as ParameterValueType).name || buttonLabel}
        <Icon component={<AngleDownS />} />
      </Button>
    </Dropdown>
  );
};

export default ParameterInput;
