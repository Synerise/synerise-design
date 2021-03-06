import Dropdown from '@synerise/ds-dropdown';
import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import Tooltip from '@synerise/ds-tooltip';
import { InputProps, ParameterValueType } from '../../Factors.types';
import { Value } from './Parameter.style';
import ParameterDropdown from './ParameterDropdown';

const ParameterInput: React.FC<InputProps> = ({
  value,
  onChange,
  onParamsClick,
  parameters,
  texts,
  opened,
  loading,
}) => {
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

  const handleOnClick = React.useCallback(() => {
    onParamsClick && onParamsClick();
    setDropdownVisible(true);
  }, [onParamsClick]);

  React.useEffect(() => {
    setDropdownVisible(!!opened);
  }, [opened]);

  return (
    <Dropdown
      visible={dropdownVisible}
      overlay={
        <ParameterDropdown
          setDropdownVisible={setDropdownVisible}
          setSelected={handleChange}
          {...restParameters}
          texts={texts}
          loading={loading}
        />
      }
    >
      <Tooltip title={(value as ParameterValueType)?.name || ''} trigger={['hover']}>
        <Button type="secondary" mode="two-icons" onClick={handleOnClick}>
          <Icon component={(value as ParameterValueType)?.icon || buttonIcon} />
          <Value>{(value as ParameterValueType)?.name || buttonLabel}</Value>
          <Icon component={<AngleDownS />} />
        </Button>
      </Tooltip>
    </Dropdown>
  );
};

export default ParameterInput;
