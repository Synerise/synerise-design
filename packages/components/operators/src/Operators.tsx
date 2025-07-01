import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { getPopupContainer } from '@synerise/ds-utils';

import {
  type OperatorsGroup,
  type OperatorsItem,
  type OperatorsProps,
} from './Operator.types';
import * as S from './Operators.style';
import OperatorsDropdown from './OperatorsDropdown/OperatorsDropdown';
import {
  DROPDOWN_HEIGHT,
  DROPDOWN_HEIGHT_BELOW_THRESHOLD,
  DROPDOWN_HEIGHT_THRESHOLD,
} from './constants';

const isOperatorItem = (
  item: OperatorsGroup | OperatorsItem,
): item is OperatorsItem => {
  return 'groupId' in item;
};

const Operators = ({
  value,
  onChange,
  groups,
  items,
  texts,
  opened,
  getPopupContainerOverride,
  onActivate,
  onDeactivate,
  readOnly = false,
  errorText,
  dropdownDimensionsConfig,
}: OperatorsProps) => {
  const dimensionsConfig = {
    defaultHeight: DROPDOWN_HEIGHT,
    lowerHeight: DROPDOWN_HEIGHT_BELOW_THRESHOLD,
    threshold: DROPDOWN_HEIGHT_THRESHOLD,
    ...dropdownDimensionsConfig,
  };

  const { formatMessage } = useIntl();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [outerHeight, setOuterHeight] = useState(
    dimensionsConfig.defaultHeight,
  );
  const text = useMemo(
    () => ({
      buttonLabel: formatMessage({
        id: 'DS.OPERATORS.BUTTON_LABEL',
        defaultMessage: 'Choose',
      }),
      searchPlaceholder: formatMessage({
        id: 'DS.OPERATORS.SEARCH_PLACEHOLDER',
        defaultMessage: 'Search',
      }),
      noResults: formatMessage({
        id: 'DS.OPERATORS.NO_RESULTS',
        defaultMessage: 'No results',
      }),
      ...texts,
    }),
    [texts, formatMessage],
  );
  const handleChange = useCallback(
    (val: OperatorsItem | OperatorsGroup) => {
      (!val || isOperatorItem(val)) && onChange(val);
    },
    [onChange],
  );

  useEffect(() => {
    setDropdownVisible(Boolean(opened));
    if (opened) {
      onActivate && onActivate();
    }
  }, [onActivate, opened]);

  const handleClick = useCallback(() => {
    onActivate && onActivate();
    setDropdownVisible(true);
  }, [onActivate]);

  const onDropdownVisibilityChange = useCallback(
    (newValue: boolean) => {
      newValue && onActivate && onActivate();
      !newValue && onDeactivate && onDeactivate();
    },
    [onActivate, onDeactivate],
  );

  const triggerMode = useMemo(() => {
    if (value) {
      return readOnly ? 'icon-label' : 'two-icons';
    }

    return readOnly ? 'simple' : 'label-icon';
  }, [value, readOnly]);

  const dropdownTrigger = (
    <Tooltip
      getPopupContainer={getPopupContainerOverride || getPopupContainer}
      title={(value as OperatorsItem)?.name || ''}
      trigger={['hover']}
    >
      <Button
        error={Boolean(errorText)}
        type="secondary"
        mode={triggerMode}
        onClick={!readOnly ? handleClick : undefined}
        readOnly={readOnly}
      >
        {value && <Icon component={(value as OperatorsItem).icon} />}
        <S.Value>
          {value ? (value as OperatorsItem).name : text.buttonLabel}
        </S.Value>
        {!readOnly && <Icon component={<AngleDownS />} />}
      </Button>
    </Tooltip>
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

  const content = readOnly ? (
    dropdownTrigger
  ) : (
    <Dropdown
      visible={dropdownVisible}
      onVisibleChange={onDropdownVisibilityChange}
      getPopupContainer={getPopupContainerOverride || getPopupContainer}
      overlay={
        <OperatorsDropdown
          value={value}
          setDropdownVisible={setDropdownVisible}
          setSelected={handleChange}
          groups={groups}
          items={items}
          texts={text}
          outerHeight={outerHeight}
        />
      }
    >
      {dropdownTrigger}
    </Dropdown>
  );

  return content;
};
export default Operators;
