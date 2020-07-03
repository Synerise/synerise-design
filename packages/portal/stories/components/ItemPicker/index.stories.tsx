import * as React from 'react';
import ItemPicker from '@synerise/ds-item-picker';
import { boolean, select, text } from '@storybook/addon-knobs';
import { UserM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { dataSource } from './dataset';
import { withState } from '@dump247/storybook-state';
import { ItemPickerSize } from '@synerise/ds-item-picker/dist/ItemPicker';
import { action } from '@storybook/addon-actions';

const SIZES = ['small', 'large'];

const stories = {
  default: withState({selected: null})(({ store }) => {
    const handleChange = (item) => {
      store.set({selected: item});
    };

    const handleClear = () => {
      store.set({selected: null});
    };

    return (<ItemPicker
      dataSource={dataSource}
      searchPlaceholder={text('Set search placeholder', 'Search')}
      label={text('Set label', 'Label')}
      description={text('Set description', 'Description')}
      tooltip={text('Set tooltip', 'Tooltip')}
      placeholder={text('Set placeholder', 'Set customer')}
      placeholderIcon={<Icon component={<UserM/>}/>}
      selectedItem={store.state.selected}
      onChange={handleChange}
      clear={text('Set clear tooltip', 'Remove')}
      onClear={handleClear}
      disabled={boolean('Disabled', false)}
      error={boolean('Has error?', false)}
      errorMessage={text('Error message', 'Error')}
      size={select('Select size', SIZES, 'small') as ItemPickerSize}
      changeButtonLabel={text('Set change button label', 'Change')}
      onChangeButtonClick={boolean('With change button', false) && action('Change button custom action')}
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
