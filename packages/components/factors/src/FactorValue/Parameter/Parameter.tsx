import Dropdown from '@synerise/ds-dropdown';
import * as React from 'react';

import Button from '@synerise/ds-button';
import Menu, { MenuItemProps } from '@synerise/ds-menu';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import { getPopupContainer } from '@synerise/ds-utils';
import InformationCard from '@synerise/ds-information-card';

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
  onDeactivate,
  readOnly = false,
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const { buttonIcon, buttonLabel, loading, ...restParameters } = parameters;
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const parameter = React.useMemo(() => value as ParameterValueType, [value]);
  const { parameterIcon, parameterName } = React.useMemo(
    () => ({
      parameterIcon: parameter?.icon || buttonIcon,
      parameterName: parameter?.name || buttonLabel,
    }),
    [parameter, buttonIcon, buttonLabel]
  );

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
      if (!newValue) {
        onDeactivate && onDeactivate();
        setDropdownVisible(false);
      }
    },
    [onActivate, onDeactivate]
  );

  const triggerMode = React.useMemo(() => {
    if (value) {
      return readOnly ? 'icon-label' : 'two-icons';
    }

    return readOnly ? 'simple' : 'label-icon';
  }, [value, readOnly]);

  const triggerButton = (
    <Button type="secondary" mode={triggerMode} onClick={!readOnly ? handleOnClick : undefined}>
      <Icon component={parameterIcon} />
      <Value>{parameterName}</Value>
      {!readOnly && <Icon component={<AngleDownS />} />}
    </Button>
  );

  const trigger = (
    <Menu
      asDropdownMenu
      showTextTooltip
      asInfoCardContainer
      dataSource={[
        {
          text: triggerButton,
          hoverTooltipProps: {
            popupPlacement: 'top',
            getPopupContainer: getPopupContainerOverride || getPopupContainer,
          } as MenuItemProps['hoverTooltipProps'],
          renderHoverTooltip: parameter.name
            ? (): JSX.Element => (
                <InformationCard
                  icon={parameterIcon}
                  subtitle={parameter.id.toString()}
                  title={parameterName}
                  descriptionConfig={
                    parameter.description
                      ? { value: parameter.description as string, disabled: true, label: undefined }
                      : undefined
                  }
                />
              )
            : undefined,
        },
      ]}
    />
  );

  return readOnly ? (
    trigger
  ) : (
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
        {trigger}
      </Dropdown>
    </div>
  );
};

export default ParameterInput;
