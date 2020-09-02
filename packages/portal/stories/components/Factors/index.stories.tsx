import * as React from 'react';

import Factors from '@synerise/ds-factors';
import { withState } from '@dump247/storybook-state';
import { boolean } from '@storybook/addon-knobs';
import { VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import { FACTORS_GROUPS, FACTORS_ITEMS, FACTORS_TEXTS } from './data/index.data';

const DEFAULT_STATE = {
  selectedFactorType: undefined,
  value: ''
}

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const setSelectedFactor = (type) => store.set({selectedFactorType: type, value: ''});
    const changeHandler = (val) => {
      store.set({ value: val });
    };

    return (
      <Factors
        selectedFactorType={store.state.selectedFactorType}
        setSelectedFactorType={setSelectedFactor}
        value={store.state.value}
        onChangeValue={changeHandler}
        expansibleText={boolean('Expansible text', true)}
        defaultFactorType='text'
        autocompleteText={boolean('Enable autocomplete', true) && {
          options: ['First name', 'Last name', 'City', 'Age', 'Points']
        }}
        parameters={{
          buttonLabel: 'Parameter',
          buttonIcon: <VarTypeStringM />,
          groups: FACTORS_GROUPS,
          items: FACTORS_ITEMS
        }}
        withoutTypeSelector={boolean('Hide type selector', false)}
        texts={FACTORS_TEXTS}
      />
    )
  }
)};

export default {
name: 'Components/Factors',
  config: {},
  stories,
  Component: Factors,
}
