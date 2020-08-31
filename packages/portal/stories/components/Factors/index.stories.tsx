import * as React from 'react';

import Factors from '@synerise/ds-factors';
import { withState } from '@dump247/storybook-state';
import { boolean } from '@storybook/addon-knobs';
import { ExpressionM, FolderM, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon/dist/icons';

const DEFAULT_STATE = {
  selectedFactorType: undefined,
  value: ''
}

const GROUPS = [
  {
    name: 'Recent',
    id: 1,
    defaultGroup: true,
  },{
    name: 'All',
    id: 2,
    subGroups: [{
      name: 'Attributes',
      id: 3,
      icon: <FolderM />
    },
    {
      name: 'Expressions',
      id: 4,
      icon: <FolderM />
    },
    {
      name: 'Aggregates',
      id: 3,
      icon: <FolderM />
    },
    ]
  }
];

const ITEMS = [
  {
    id: 0,
    name: 'First name',
    groupId: 1,
    icon: <VarTypeStringM />,
  },
  {
    id: 1,
    name: 'Last name',
    groupId: 1,
    icon: <VarTypeStringM />,
  },
  {
    id: 2,
    name: 'City',
    groupId: 1,
    icon: <VarTypeStringM />,
  },
  {
    id: 3,
    name: 'Loyality score',
    groupId: 1,
    icon: <ExpressionM />,
  },
  {
    id: 4,
    name: 'Points',
    groupId: 1,
    icon: <VarTypeNumberM />,
  },
  {
    id: 110,
    name: 'First name',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 4,
    name: 'Attribute #1',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 5,
    name: 'Attribute #2',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 6,
    name: 'Attribute #3',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 7,
    name: 'Attribute #4',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 8,
    name: 'Expression #1',
    groupId: 4,
    icon: <VarTypeStringM />,
  },
  {
    id: 9,
    name: 'Expression #2',
    groupId: 4,
    icon: <VarTypeStringM />,
  },
  {
    id: 10,
    name: 'Expression #3',
    groupId: 4,
    icon: <VarTypeStringM />,
  },
  {
    id: 11,
    name: 'Expression #4',
    groupId: 4,
    icon: <VarTypeStringM />,
  },
  {
    id: 12,
    name: 'Aggregate #1',
    groupId: 5,
    icon: <VarTypeStringM />,
  },
  {
    id: 13,
    name: 'Aggregate #2',
    groupId: 5,
    icon: <VarTypeStringM />,
  },
  {
    id: 14,
    name: 'Aggregate #3',
    groupId: 5,
    icon: <VarTypeStringM />,
  },
  {
    id: 15,
    name: 'Aggregate #4',
    groupId: 5,
    icon: <VarTypeStringM />,
  },
]

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
          groups: GROUPS,
          items: ITEMS
        }}
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
