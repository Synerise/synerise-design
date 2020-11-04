import * as React from 'react';
import { useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import { Add3M } from '@synerise/ds-icon/dist/icons';
import { boolean, select } from '@storybook/addon-knobs';
import { renderFooter, typesFooter } from '../index.stories';

interface Props {
  onFooter?: React.ReactNode;
  onClickAction: () => void;
}

const Default: React.FC<Props> = () => {
  const data = [{ text: 'Preview' }, { text: 'Edit' }, { text: 'Duplicate' }];
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const footer = boolean('Set footer', false);
  const setTypeFooter = select('Set footer type', typesFooter, 'singleButton');
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  return (
    <div>
      <Dropdown
        visible={dropdownVisible}
        placement="bottomLeft"
        overlay={
          <Dropdown.Wrapper style={{ width: '220px' }} ref={ref}>
            <Menu style={{ padding: '8px' }} dataSource={data} />
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
