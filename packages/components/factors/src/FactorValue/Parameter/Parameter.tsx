import Dropdown from '@synerise/ds-dropdown';
import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon, { AngleDownS } from '@synerise/ds-icon';
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
  getPopupContainerOverride,
  onActivate,
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
    onActivate && onActivate();
  }, [onParamsClick, onActivate]);

  React.useEffect(() => {
    console.log('parameter test', opened, dropdownVisible);
    setDropdownVisible(Boolean(opened));
    if (opened) {
      onParamsClick && onParamsClick();
      onActivate && onActivate();
    }
    // eslint-disable-next-line
  }, [opened]);

  React.useEffect(() => {
    !preventAutoloadData && onParamsClick && onParamsClick();
    // eslint-disable-next-line
  }, []);

  const onDropdownVisibilityChange = React.useCallback(
    (newValue: boolean) => {
      newValue && onActivate && onActivate();
      !newValue && setDropdownVisible(false);
    },
    [onActivate]
  );

  return (
    <div data-popup-container>
      <Dropdown
        visible={dropdownVisible}
        getPopupContainer={getPopupContainerOverride || getPopupContainer}
        onVisibleChange={onDropdownVisibilityChange}
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
        <Tooltip
          getPopupContainer={getPopupContainerOverride || getPopupContainer}
          title={(value as ParameterValueType)?.name || ''}
          trigger={['hover']}
        >
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
