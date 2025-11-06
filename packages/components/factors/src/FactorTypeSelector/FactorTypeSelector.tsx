import React, { useMemo } from 'react';

import { theme } from '@synerise/ds-core';
import { DropdownMenu } from '@synerise/ds-dropdown';
import Icon, { CheckS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { getPopupContainer } from '@synerise/ds-utils';

import {
  ALL_FACTOR_TYPES,
  type DefinedFactorTypes,
  type FactorTypeSelectorProps,
} from '../Factors.types';
import * as S from './FactorTypeSelector.styles';

const FactorTypeSelector = ({
  selectedFactorType,
  setSelectedFactorType,
  unavailableFactorTypes,
  availableFactorTypes,
  factorTypeMapping,
  selectedFactor,
  getPopupContainerOverride,
  texts,
  readOnly,
}: FactorTypeSelectorProps) => {
  const typesListData = useMemo(() => {
    let list = availableFactorTypes || ALL_FACTOR_TYPES;
    if (unavailableFactorTypes !== undefined) {
      list = [...list].filter(
        (type) => unavailableFactorTypes.indexOf(type) < 0,
      );
    }

    return (list as DefinedFactorTypes[]).map((type) => {
      const typeData = factorTypeMapping[type];
      return {
        className: 'ds-factor-type',
        key: typeData.name,
        prefixel: <Icon component={typeData.icon} />,
        suffixel:
          type === selectedFactorType ? (
            <Icon component={<CheckS />} color={theme.palette['green-600']} />
          ) : (
            ''
          ),
        onClick: () => {
          setSelectedFactorType(type);
        },
        text: texts[type],
      };
    });
  }, [
    availableFactorTypes,
    unavailableFactorTypes,
    factorTypeMapping,
    selectedFactorType,
    texts,
    setSelectedFactorType,
  ]);

  const trigger = (
    <S.TriggerButton
      mode="single-icon"
      className="ds-factors-type-selector"
      data-testid="ds-factors-type-selector"
      readOnly={readOnly}
    >
      <Icon component={selectedFactor.icon} />
    </S.TriggerButton>
  );

  if (readOnly) {
    return trigger;
  }

  return (
    // @ts-expect-error selectedFactorType can be any string - requires type refactor in analytics-core
    <Tooltip title={texts[selectedFactorType]} trigger={['hover']}>
      <DropdownMenu
        dataSource={typesListData}
        trigger={['click']}
        disabled={readOnly}
        getPopupContainer={getPopupContainerOverride || getPopupContainer}
        popoverProps={{
          testId: 'factors-types',
        }}
        asChild
      >
        {trigger}
      </DropdownMenu>
    </Tooltip>
  );
};

export default FactorTypeSelector;
