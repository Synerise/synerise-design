import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { CheckS } from '@synerise/ds-icon/dist/icons';
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
}) => {
  const typesList = React.useMemo(() => {
    let list = availableFactorTypes || ALL_FACTOR_TYPES;
    if (unavailableFactorTypes !== undefined) {
      list = [...list].filter(type => unavailableFactorTypes.indexOf(type) < 0);
    }

    return (list as FactorType[]).map((type: FactorType) => (
      <Menu.Item
        key={factorTypes[type].name}
        prefixel={<Icon component={factorTypes[type].icon} />}
        suffixel={type === selectedFactorType ? <Icon component={<CheckS />} color={theme.palette['green-600']} /> : ''}
        onClick={(): void => setSelectedFactorType(type)}
      >
        {factorTypes[type].name}
      </Menu.Item>
    ));
  }, [unavailableFactorTypes, availableFactorTypes, selectedFactorType, setSelectedFactorType]);

  return (
    <Tooltip title={selectedFactor.name} trigger={['hover']}>
      <Dropdown overlay={<S.FactorTypeList>{typesList}</S.FactorTypeList>} trigger={['click']}>
        <S.TriggerButton mode="single-icon">
          <Icon component={selectedFactor.icon} />
        </S.TriggerButton>
      </Dropdown>
    </Tooltip>
  );
};

export default FactorTypeSelector;
