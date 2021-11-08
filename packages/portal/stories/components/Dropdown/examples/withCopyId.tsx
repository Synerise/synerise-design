import * as React from 'react';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import { boolean, select,number } from '@storybook/addon-knobs';
import { renderFooter, typesFooter } from '../index.stories';
import Icon, {
    CopyClipboardM,
    DuplicateM,
    EditM,
    FolderM,
    TrashM,
  } from '@synerise/ds-icon';
  
const WithCopyID: React.FC = () => {
    const data = [
        { text: 'Edit', prefixel:<Icon component={<EditM />}/> },
        { text: 'Duplicate' , prefixel:<Icon component={<DuplicateM />}/> },
        { text: 'Move To' , prefixel:<Icon component={<FolderM />}/>},
        { text: 'Delete', type: 'danger',prefixel:<Icon component={<TrashM />}/>},
        { type: 'divider' },
        { text: 'ID:6b7c3084-b6c...', copyHint: 'Copy ID',
        copyTooltip: 'Copied!',
        copyValue: 'Fake ID',
        copyable: true,
        prefixel: <Icon component={<CopyClipboardM />}/>, 
        timeToHideTooltip:number("Time to hide tooltip(ms)",3000)},
    ];
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const footer = boolean('Set footer', false);
  const navigation = boolean('Set navigation', false);
  const setTypeFooter = select('Set footer type', typesFooter, 'singleButton');
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  return (
    <div>
      <Dropdown
        overlayStyle={{ borderRadius: '3px' }}
        visible={dropdownVisible}
        placement="bottomLeft"
        overlay={
          <Dropdown.Wrapper
            style={{ width: '200px' }}
            onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
            ref={ref}
          >
            {navigation && <Dropdown.BackAction label="Attributes" onClick={() => alert('BackAction clicked')} />}
            <Menu dataSource={data} asDropdownMenu={true} style={{ width: '100%' }} />
            {footer && renderFooter(setTypeFooter)}
          </Dropdown.Wrapper>
        }
      >
        <Button onClick={() => setDropdownVisible(!dropdownVisible)} type="primary">
          Dropdown
        </Button>
      </Dropdown>
    </div>
  );
};
export default WithCopyID;
