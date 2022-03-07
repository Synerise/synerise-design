import * as React from 'react';

import Collector from '@synerise/ds-collector';
import { boolean, text } from '@storybook/addon-knobs';
import Icon, { InfoFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

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
    const [selected, setSelected] = React.useState<any[]>([]);

    return (
      <Collector
        allowCustomValue={boolean('Allow custom values', true)}
        allowMultipleValues={boolean('Allow multiple values', true)}
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
          console.log('onItemSelect');
          if (!selected.find(i => i.text === item.text)) {
            setSelected([...selected, item]);
          }
        }}
        onItemDeselect={item => {
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
        onConfirm={() => setSelected(selected)}
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
