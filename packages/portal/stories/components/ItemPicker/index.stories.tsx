import React from 'react';
import Button from '@synerise/ds-button';
import ItemPicker from '@synerise/ds-item-picker';
import { boolean, select, text } from '@storybook/addon-knobs';
import Icon, { Add3M, FileM, UserM } from '@synerise/ds-icon';
import { dataSource } from './dataset';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';

const PLACEHOLDER_ICONS = ['none', 'user', 'add', 'file'];
const ICONS = {
  none: null,
  user: <Icon component={<UserM />} />,
  add: <Icon component={<Add3M />} />,
  file: <Icon component={<FileM />} />,
};

const stories = {
  default: withState({ selected: undefined })(({ store }) => {
    const handleChange = item => {
      store.set({ selected: item });
    };

    const handleClear = () => {
      store.set({ selected: undefined });
    };

    const getPlaceholderIcon = icon => {
      return ICONS[icon];
    };

    return (
      <div style={{ width: 282 }}>
        <ItemPicker
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
          onClear={boolean('Enable clear', false) ? handleClear : undefined}
          onFocus={() => console.log('onFocus')}
          onBlur={() => console.log('onBlur')}
          disabled={boolean('Disabled', false)}
          error={boolean('Has error?', false)}
          errorMessage={text('Error message', 'Error')}
          size={'small'}
          withClearConfirmation={boolean('With clear confirmation', false)}
          yesText={text('Yes button label', 'Yes')}
          noText={text('No button label', 'No')}
          noResults={text('No search results info', 'No results')}
          clearConfirmTitle={text('Clear confirm title', 'Are you sure to remove this selection?')}
          dropdownVisibleRows={6}
          dropdownProps={{
            getPopupContainer: () => document.querySelector('.ds-items-picker'),
          }}
          hideSearchBar={boolean('Hide search bar', false)}
          scrollbarProps={
            boolean('additional scrollbar props', true)
              ? {
                  onYReachEnd: action('Reached end of Y scrollbar'),
                  loading: boolean('Show loading state', false),
                }
              : {}
          }
        />
      </div>
    );
  }),
  large: withState({ selected: undefined })(({ store }) => {
    const handleChange = item => {
      store.set({ selected: item });
    };

    const handleClear = () => {
      store.set({ selected: undefined });
    };

    const getPlaceholderIcon = icon => {
      return ICONS[icon];
    };

    return (
      <div style={{ width: 282 }}>
        <ItemPicker
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
          onClear={boolean('Enable clear', false) ? handleClear : undefined}
          disabled={boolean('Disabled', false)}
          error={boolean('Has error?', false)}
          errorMessage={text('Error message', 'Error')}
          size={'large'}
          changeButtonLabel={text('Set change button label', 'Change')}
          withClearConfirmation={boolean('With clear confirmation', false)}
          yesText={text('Yes button label', 'Yes')}
          noText={text('No button label', 'No')}
          noResults={text('No search results info', 'No results')}
          clearConfirmTitle={text('Clear confirm title', 'Are you sure to remove this selection?')}
          closeOnBottomAction={boolean('Close dropdown on bottom action', true)}
          dropdownBottomAction={
            <Button type="ghost" mode={'icon-label'} onClick={action('bottom action')}>
              <Icon component={<Add3M />} />
              {text('Set bottom action label', 'Bottom action label')}
            </Button>
          }
        />
      </div>
    );
  }),
};

export default {
  name: 'Components/Pickers/ItemPicker',
  config: {},
  stories,
  Component: ItemPicker,
};
