import * as React from 'react';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';

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
        <Dropdown.TextTrigger size={5} value={'Select'} />
      </Dropdown>
    </div>
  );
};
export default Default;
