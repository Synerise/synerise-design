import Dropdown from '@synerise/ds-dropdown';
import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import Tooltip from '@synerise/ds-tooltip';
import { getPopupContainer } from '@synerise/ds-utils';
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
  preventAutoloadData,
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const { buttonIcon, buttonLabel, loading, ...restParameters } = parameters;
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
    if (opened) {
      setDropdownVisible(true);
      onParamsClick && onParamsClick();
    }
  }, [opened]);

  React.useEffect(() => {
    !preventAutoloadData && onParamsClick && onParamsClick();
  }, []);

  return (
    <div data-popup-container>
      <Dropdown
        visible={dropdownVisible}
        getPopupContainer={getPopupContainer}
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
    </div>
  );
};

export default ParameterInput;
