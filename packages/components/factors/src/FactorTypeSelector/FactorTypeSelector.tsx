import React, { useMemo, useState } from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { CheckS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import ListItem from '@synerise/ds-list-item';
import { theme } from '@synerise/ds-core';
import * as S from './FactorTypeSelector.styles';
import { ALL_FACTOR_TYPES, FactorType, FactorTypeSelectorProps } from '../Factors.types';

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
      list = [...list].filter(type => unavailableFactorTypes.indexOf(type) < 0);
    }

    return (list as FactorType[]).map((type: FactorType) => (
      <ListItem
        className="ds-factor-type"
        key={factorTypeMapping[type].name}
        prefixel={<Icon component={factorTypeMapping[type].icon} />}
        suffixel={type === selectedFactorType ? <Icon component={<CheckS />} color={theme.palette['green-600']} /> : ''}
        onClick={() => {
          setSelectedFactorType(type);
          setDropdownOpen(false);
        }}
      >
        {texts[type]}
      </ListItem>
    ));
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

  if (readOnly) return trigger;

  return (
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
