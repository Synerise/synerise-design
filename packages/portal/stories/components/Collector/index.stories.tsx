import React from 'react';

import Collector, { CollectorValue } from '@synerise/ds-collector';
import { boolean, text, select } from '@storybook/addon-knobs';
import Icon, { InfoFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { theme } from '@synerise/ds-core';
import { action } from '@storybook/addon-actions';

import { HeaderWrapper } from './stories.styles';

const decorator = storyFn => <div style={{ width: '588px' }}>{storyFn()}</div>;
const getSuggestions = () => {
  const result = [];
  for (let i = 10; i < 36; i++) {
    for (let j = 0; j < 36; j++) {
      result.push({
        text: `Option ${i.toString(36).toUpperCase()}${j.toString(36).toUpperCase()}`,
      });
    }
  }
  return result;
};
const renderLabel = (text: string, tooltip: string) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '26px' }}>
      {!!text && (
        <span
          style={{
            maxWidth: '200px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            color: theme.palette['grey-800'],
            display: 'block',
          }}
        >
          {text}
        </span>
      )}
      {!!tooltip && !!text && (
        <Tooltip title={tooltip}>
          <Icon component={<InfoFillS />} color={theme.palette['grey-400']} />
        </Tooltip>
      )}
    </div>
  );
};
const stories = {
  default: () => {
    const tooltipText = text('Set tooltip text', 'Tooltip');
    const labelText = text('Set label', 'Label');
    const separators = [';', '|', ','];
    const [selected, setSelected] = React.useState<CollectorValue[]>([]);
    const allowMultiple = boolean('Allow multiple values', true);
    const allowCustomValues = boolean('Allow custom values', true);
    const allowPaste = allowMultiple && boolean('Allow multi-item paste', true);
    const valuesSeparator = allowPaste && select('Separator', separators, ';');
    return (
      <Collector
        keepSearchQueryOnSelect={boolean('Keep Search Query On Select', false)}
        showCount={allowMultiple && boolean('Show counter', true)}
        allowCustomValue={allowCustomValues}
        allowMultipleValues={allowMultiple}
        selected={selected}
        label={renderLabel(labelText, tooltipText)}
        disabled={boolean('Set disabled', false)}
        description={text('Set description', 'Description')}
        errorText={text('Set error text', '')}
        suggestions={getSuggestions().filter(suggestion => !selected.includes(suggestion))}
        fixedHeight={boolean('Set fixed height', false)}
        onItemAdd={value => ({
          text: value,
        })}
        onItemSelect={item => {
          action('onItemSelect')(item);
          if (!selected.find(i => i.text === item.text)) {
            setSelected([...selected, item]);
          }
        }}
        allowPaste={allowPaste}
        valuesSeparator={valuesSeparator}
        onMultipleItemsSelect={items => {
          action('onMultipleItemsSelect')(items);
          const itemsToAdd = items.filter(item => {
            return !selected.find(i => i.text === item.text);
          });
          setSelected([...selected, ...itemsToAdd]);
        }}
        onItemDeselect={item => {
          action('onItemDeselect')(item);
          setSelected(selected.filter(i => i.text !== item.text));
        }}
        onCancel={() => setSelected([])}
        showNavigationHints={boolean('Show navigation hints', true)}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: 'Type value',
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
        enableCustomFilteringSuggestions={boolean('Enable Custom Filtering Suggestions', false)}
        onConfirm={items => {
          action('onConfirm')(items);
          setSelected([]);
        }}
        scrollbarProps={
          boolean('additional scrollbar props', true)
            ? {
                onYReachEnd: action('Reached end of Y scrollbar'),
                loading: boolean('Show loading state', false),
              }
            : {}
        }
      />
    );
  },
  listHeader: () => {
    const [selected, setSelected] = React.useState<CollectorValue[]>([]);
    return (
      <Collector
        selected={selected}
        suggestions={getSuggestions().filter(suggestion => !selected.includes(suggestion))}
        onItemSelect={item => {
          action('onItemSelect')(item);
          if (!selected.find(i => i.text === item.text)) {
            setSelected([...selected, item]);
          }
        }}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: 'Type value',
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
        listHeader={<HeaderWrapper>Custom list header</HeaderWrapper>}
      />
    );
  },
};

export default {
  name: 'Components/Collector',
  config: {},
  stories,
  decorator,
};
