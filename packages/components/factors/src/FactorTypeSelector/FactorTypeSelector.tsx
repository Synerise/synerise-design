import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { CheckS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './FactorTypeSelector.styles';
import { ALL_FACTOR_TYPES, FactorType, FactorTypeSelectorProps } from '../Factors.types';
import { factorTypes } from '../Factors';

const FactorTypeSelector: React.FC<FactorTypeSelectorProps> = ({
  selectedFactorType,
  setSelectedFactorType,
  unavailableFactorTypes,
  availableFactorTypes,
  selectedFactor,
  texts,
  readOnly,
}) => {
  const typesList = React.useMemo(() => {
    let list = availableFactorTypes || ALL_FACTOR_TYPES;
    if (unavailableFactorTypes !== undefined) {
      list = [...list].filter(type => unavailableFactorTypes.indexOf(type) < 0);
    }

    return (list as FactorType[]).map((type: FactorType) => (
      <Menu.Item
        className="ds-factor-type"
        key={factorTypes[type].name}
        prefixel={<Icon component={factorTypes[type].icon} />}
        suffixel={type === selectedFactorType ? <Icon component={<CheckS />} color={theme.palette['green-600']} /> : ''}
        onClick={(): void => setSelectedFactorType(type)}
      >
        {texts[type]}
      </Menu.Item>
    ));
  }, [availableFactorTypes, unavailableFactorTypes, selectedFactorType, texts, setSelectedFactorType]);

  const trigger = (
    <S.TriggerButton mode="single-icon" className="ds-factors-type-selector" readOnly={readOnly}>
      <Icon component={selectedFactor.icon} />
    </S.TriggerButton>
  );

  if (readOnly) return trigger;

  return (
    <Tooltip title={texts[selectedFactorType]} trigger={['hover']}>
      <Dropdown overlay={<S.FactorTypeList>{typesList}</S.FactorTypeList>} trigger={['click']} disabled={readOnly}>
        {trigger}
      </Dropdown>
    </Tooltip>
  );
};

export default FactorTypeSelector;
