import React, { useMemo, useState } from 'react';

import { theme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { CheckS } from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';
import Tooltip from '@synerise/ds-tooltip';

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
  texts,
  readOnly,
}: FactorTypeSelectorProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const typesList = useMemo(() => {
    let list = availableFactorTypes || ALL_FACTOR_TYPES;
    if (unavailableFactorTypes !== undefined) {
      list = [...list].filter(
        (type) => unavailableFactorTypes.indexOf(type) < 0,
      );
    }

    return (list as DefinedFactorTypes[]).map((type) => {
      const typeData = factorTypeMapping[type];
      return (
        <ListItem
          className="ds-factor-type"
          key={typeData.name}
          prefixel={<Icon component={typeData.icon} />}
          suffixel={
            type === selectedFactorType ? (
              <Icon component={<CheckS />} color={theme.palette['green-600']} />
            ) : (
              ''
            )
          }
          onClick={() => {
            setSelectedFactorType(type);
            setDropdownOpen(false);
          }}
        >
          {texts[type]}
        </ListItem>
      );
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
      <Dropdown
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        dropdownRender={() => <S.FactorTypeList>{typesList}</S.FactorTypeList>}
        trigger={['click']}
        disabled={readOnly}
      >
        {trigger}
      </Dropdown>
    </Tooltip>
  );
};

export default FactorTypeSelector;
