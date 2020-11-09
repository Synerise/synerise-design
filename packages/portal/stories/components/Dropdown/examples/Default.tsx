import * as React from 'react';
import { useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import { boolean, select } from '@storybook/addon-knobs';
import { renderFooter, typesFooter } from '../index.stories';


const Default: React.FC = () => {
  const data = [{ text: 'Preview' }, { text: 'Edit' }, { text: 'Duplicate' }];
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
        overlayStyle={{borderRadius: '3px'}}
        visible={dropdownVisible}
        placement="bottomLeft"
        overlay={
          <Dropdown.Wrapper style={{ width: '220px', borderRadius: '3px' }} ref={ref}>
            {navigation &&
            <Dropdown.BackAction label="Attributes" onClick={() => alert('BackAction clicked')} />}
            <Menu dataSource={data} asDropdownMenu={true}  style={{ width: '204px' }} />
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
export default Default;
