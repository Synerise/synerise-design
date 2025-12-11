import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import InformationCard from '@synerise/ds-information-card';
import Menu, { type MenuItemProps } from '@synerise/ds-menu';
import { getPopupContainer } from '@synerise/ds-utils';

import {
  type FactorValueComponentProps,
  type ParameterItem,
  type ParameterValueType,
} from '../../Factors.types';
import {
  DROPDOWN_HEIGHT,
  DROPDOWN_HEIGHT_BELOW_THRESHOLD,
  DROPDOWN_HEIGHT_THRESHOLD,
} from './Parameter.constants';
import { ParameterButton, Value } from './Parameter.style';
import ParameterDropdown from './ParameterDropdown';

const ParameterInput = ({
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
  error,
  loading,
  getMenuEntryProps,
}: FactorValueComponentProps) => {
  const {
    buttonIcon,
    buttonLabel,
    selectedButtonColored,
    dropdownDimensionsConfig,
    ...restParameters
  } = parameters || {};
  const dimensionsConfig = {
    defaultHeight: DROPDOWN_HEIGHT,
    lowerHeight: DROPDOWN_HEIGHT_BELOW_THRESHOLD,
    threshold: DROPDOWN_HEIGHT_THRESHOLD,
    ...dropdownDimensionsConfig,
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [outerHeight, setOuterHeight] = useState(
    dimensionsConfig.defaultHeight,
  );
  const parameter = useMemo(() => value as ParameterValueType, [value]);
  const { parameterIcon, parameterName, isSelected } = useMemo(
    () => ({
      isSelected: Boolean(parameter?.icon || parameter?.name),
      parameterIcon: parameter?.icon || buttonIcon,
      parameterName: parameter?.name || buttonLabel,
    }),
    [parameter, buttonIcon, buttonLabel],
  );

  const handleChange = useCallback(
    (val: ParameterItem) => {
      onChange(val as ParameterValueType);
    },
    [onChange],
  );

  const handleOnClick = useCallback(() => {
    onParamsClick && onParamsClick();
    setDropdownVisible(true);
    onActivate && onActivate();
  }, [onParamsClick, onActivate]);

  useEffect(() => {
    setDropdownVisible(Boolean(opened));
    if (opened) {
      onParamsClick && onParamsClick();
      onActivate && onActivate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  useEffect(() => {
    !preventAutoloadData && onParamsClick && onParamsClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDropdownVisibilityChange = useCallback(
    (newValue: boolean) => {
      newValue && onActivate && onActivate();
      setDropdownVisible(newValue);
      // if (!newValue) {
      //   // onDeactivate && onDeactivate();
      //   setDropdownVisible(false);
      // }
    },
    [onActivate],
  );

  const triggerMode = useMemo(() => {
    if (parameterIcon) {
      return readOnly ? 'icon-label' : 'two-icons';
    }

    return readOnly ? 'simple' : 'label-icon';
  }, [parameterIcon, readOnly]);

  const triggerButton = (
    <ParameterButton
      error={error}
      type={isSelected && selectedButtonColored ? 'custom-color' : 'secondary'}
      color={isSelected && selectedButtonColored ? 'green' : undefined}
      mode={triggerMode}
      onClick={!readOnly ? handleOnClick : undefined}
      readOnly={readOnly}
    >
      {parameterIcon && <Icon component={parameterIcon} />}
      <Value>{parameterName}</Value>
      {!readOnly && <Icon component={<AngleDownS />} />}
    </ParameterButton>
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
          renderHoverTooltip: isSelected
            ? parameter?.renderHoverTooltip ||
              (() => (
                <InformationCard
                  icon={parameterIcon}
                  subtitle={parameter.id?.toString()}
                  title={parameterName as string}
                  descriptionConfig={
                    parameter.description
                      ? {
                          value: parameter.description as string,
                          disabled: true,
                          label: undefined,
                        }
                      : undefined
                  }
                  {...parameter.informationCardProps}
                />
              ))
            : undefined,
          ...getMenuEntryProps?.(parameter),
        },
      ]}
    />
  );

  useEffect(() => {
    const checkViewportHeight = () =>
      setOuterHeight(
        window.innerHeight < dimensionsConfig.threshold
          ? dimensionsConfig.lowerHeight
          : dimensionsConfig.defaultHeight,
      );
    checkViewportHeight();
    window.addEventListener('resize', checkViewportHeight);
    return () => {
      window.removeEventListener('resize', checkViewportHeight);
    };
  }, [
    dimensionsConfig.defaultHeight,
    dimensionsConfig.lowerHeight,
    dimensionsConfig.threshold,
  ]);

  return readOnly ? (
    trigger
  ) : (
    <div data-popup-container data-testid="ds-factors-parameter">
      <Dropdown
        open={dropdownVisible}
        getPopupContainer={getPopupContainerOverride || getPopupContainer}
        onOpenChange={onDropdownVisibilityChange}
        asChild={false}
        size={300}
        onDismiss={onDeactivate}
        overlay={
          <ParameterDropdown
            setDropdownVisible={setDropdownVisible}
            setSelected={handleChange}
            {...restParameters}
            texts={texts}
            loading={loading}
            outerHeight={outerHeight}
            value={isSelected ? parameter : undefined}
          />
        }
        popoverProps={{
          testId: 'factors-parameters',
          returnFocus: false,
        }}
      >
        {trigger}
      </Dropdown>
    </div>
  );
};

export default ParameterInput;
