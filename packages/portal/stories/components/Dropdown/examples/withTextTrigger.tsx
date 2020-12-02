import * as React from 'react';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import { select } from '@storybook/addon-knobs';

const Default: React.FC = () => {
  const data = [{ text: 'Preview' }, { text: 'Edit' }, { text: 'Duplicate' }];
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  return (
    <div>
      <Dropdown
        trigger={['click']}
        overlayStyle={{ borderRadius: '3px' }}
        visible={dropdownVisible}
        placement="bottomLeft"
        overlay={
          <Dropdown.Wrapper
            style={{ width: '220px' }}
            onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
            ref={ref}
          >
            <Menu dataSource={data} asDropdownMenu={true} style={{ width: '204px' }} />
          </Dropdown.Wrapper>
        }
      >
        <Dropdown.TextTrigger
          onClick={() => setDropdownVisible(!dropdownVisible)}
          size={select('Select size of trigger', [1, 2, 3, 4, 5, 6], 5)}
          value={'Select'}
          inactiveColor={select('Select inactive color', ['blue-600', 'grey-600'], 'blue-600')}
        />
      </Dropdown>
    </div>
  );
};
export default Default;
