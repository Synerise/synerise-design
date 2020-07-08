import * as React from 'react';
import ItemPicker from '@synerise/ds-item-picker';
import { boolean, select, text } from '@storybook/addon-knobs';
import { Add3M, FileM, UserM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { dataSource } from './dataset';
import { withState } from '@dump247/storybook-state';
import { ItemPickerSize } from '@synerise/ds-item-picker/dist/ItemPicker';

const SIZES = ['small', 'large'];
const PLACEHOLDER_ICONS = ['none', 'user', 'add', 'file'];
const ICONS = {
  'none': null,
  'user': (<Icon component={<UserM/>}/>),
  'add': (<Icon component={<Add3M/>}/>),
  'file': (<Icon component={<FileM />}/>)
};

const stories = {
  default: withState({selected: null})(({ store }) => {
    const handleChange = (item) => {
      store.set({selected: item});
    };

    const handleClear = () => {
      store.set({selected: null});
    };

    const getPlaceholderIcon = (icon) => {
      return ICONS[icon];
    };

    return (<ItemPicker
      dataSource={dataSource}
      searchPlaceholder={text('Set search placeholder', 'Search')}
      label={text('Set label', 'Label')}
      description={text('Set description', 'Description')}
      tooltip={text('Set tooltip', 'Tooltip')}
      placeholder={text('Set placeholder', 'Set customer')}
      placeholderIcon={getPlaceholderIcon(select('Choose placeholder icon', PLACEHOLDER_ICONS, 'none'))}
      selectedItem={store.state.selected}
      onChange={handleChange}
      clear={text('Set clear tooltip', 'Remove')}
      onClear={handleClear}
      disabled={boolean('Disabled', false)}
      error={boolean('Has error?', false)}
      errorMessage={text('Error message', 'Error')}
      size={select('Select size', SIZES, 'small') as ItemPickerSize}
      changeButtonLabel={text('Set change button label', 'Change')}
      withChangeButton={boolean('With change button', false)}
      withClearConfirmation={boolean('With clear confirmation', false)}
      yesText={text('Yes button label', 'Yes')}
      noText={text('No button label', 'No')}
      clearConfirmTitle={text('Clear confirm title', 'Are you sure to remove this selection?')}
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
