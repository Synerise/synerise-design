import * as React from 'react';
import ItemPicker from '@synerise/ds-item-picker';
import { boolean, text } from '@storybook/addon-knobs';
import Menu from '@synerise/ds-menu';
import { MobileM, UserM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { dataSource } from './dataset';
import { withState } from '@dump247/storybook-state';

const stories = {
  default: withState({selected: null})(({ store }) => {
    const handleChange = (item) => {
      store.set({selected: item});
    };

    return (<ItemPicker
      dataSource={dataSource}
      renderMenuItem={(item) => <Menu.Item prefixel={<Icon component={<MobileM/>}/>}>{item.name}</Menu.Item>}
      searchPlaceholder={text('Set search placeholder', 'Search')}
      label={text('Set label', 'Label')}
      description={text('Set description', 'Description')}
      tooltip={text('Set tooltip', 'Tooltip')}
      placeholder={text('Set placeholder', 'Set customer')}
      placeholderIcon={<Icon component={<UserM/>}/>}
      selectedItem={store.state.selected}
      onChange={handleChange}
      clear={text('Set clear tooltip', 'Remove')}
      onClear={() => store.set({selected: null})}
      disabled={boolean('Disabled', false)}
      error={boolean('Has error?', false)}
      errorMessage={text('Error message', 'Error')}
    />)
    }
  ),
};

export default {
  name: 'Components|ItemPicker',
  config: {},
  stories,
  Component: ItemPicker,
}
