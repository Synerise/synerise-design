import React from 'react';

import Factors from '@synerise/ds-factors';
import { withState } from '@dump247/storybook-state';
import { boolean, number, object, select } from '@storybook/addon-knobs';
import { VarTypeStringM } from '@synerise/ds-icon';
import { FACTORS_GROUPS, FACTORS_ITEMS, FACTORS_TEXTS } from './data/index.data';
import { action } from '@storybook/addon-actions';
import type { MenuItemProps } from '@synerise/ds-menu';
import type { FactorsProps } from '@synerise/ds-factors/dist/Factors.types';
import type { AutoResizeProp } from '@synerise/ds-input';

const DEFAULT_STATE = {
  selectedFactorType: undefined,
  value: '',
};

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const setSelectedFactor = type => store.set({ selectedFactorType: type, value: '' });
    const changeHandler = val => {
      store.set({ value: val });
      action('onChange')(val);
    };

    const typeOfTooltip = select('Popover type', ['information-card', 'tooltip', 'none'], 'information-card');

    const additionalProps: Record<string, FactorsProps> = {
      ['tooltip']: {
        getMenuEntryProps: arg =>
          ({
            renderHoverTooltip: () => (
              <span title={JSON.stringify(arg)}>
                Tooltip text{' '}
                <u>
                  {arg.name}: {arg.id}
                </u>
              </span>
            ),
            hoverTooltipProps: {
              popupPlacement: 'bottom',
            },
          } as MenuItemProps),
      },
      none: {
        getMenuEntryProps: () => ({
          renderHoverTooltip: undefined,
        }),
      },
    }[typeOfTooltip];

    let containerWidth = 0;
    const autoResize = boolean('Set autoResize', true, 'autoresize');
    const autoResizeStretchToParent = boolean('Set autoResize max width to stretch to parent', true, 'autoresize');
    const autoResizeProp: AutoResizeProp = {
      minWidth: `${number('Set autoResize min width', 150, undefined, 'autoresize')}px`,
      stretchToFit: autoResizeStretchToParent,
    };
    if (autoResizeStretchToParent) {
      containerWidth = number('Set container width', 400, undefined, 'autoresize');
    } else {
      autoResizeProp.maxWidth = `${number('Set autoResize max width', 300, undefined, 'autoresize')}px`;
    }

    return (
      <div style={containerWidth ? { width: `${containerWidth}px`, border: 'dashed 1px #ddd' } : undefined}>
        <Factors
          error={boolean('Set validation state', false)}
          selectedFactorType={store.state.selectedFactorType}
          setSelectedFactorType={setSelectedFactor}
          inputProps={autoResize ? { autoResize: autoResizeProp } : undefined}
          value={store.state.value}
          onChangeValue={changeHandler}
          textType={select('Select type of text input', ['autocomplete', 'expansible', 'default'], 'default')}
          defaultFactorType="text"
          autocompleteText={{
            options: ['First name', 'Last name', 'City', 'Age', 'Points'],
          }}
          unavailableFactorTypes={object(
            'Unavailable factor types (text, number, parameter, contextParameter, dynamicKey, formula, array, date, dateRange)',
            []
          )}
          parameters={{
            buttonLabel: 'Parameter',
            buttonIcon: <VarTypeStringM />,
            groups: FACTORS_GROUPS,
            items: FACTORS_ITEMS,
            recentItems: FACTORS_ITEMS.slice(0, 3),
          }}
          withoutTypeSelector={boolean('Hide type selector', false)}
          formulaEditor={<div>Formula editor</div>}
          texts={FACTORS_TEXTS}
          onDeactivate={action('onDeactivate')}
          readOnly={boolean('Set readOnly', false)}
          loading={boolean('Set loading', false)}
          {...additionalProps}
        />
      </div>
    );
  }),
};

export default {
  name: 'Components/Filter/Factors',
  config: {},
  stories,
  Component: Factors,
};
