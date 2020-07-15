import Menu from '@synerise/ds-menu';
import { action } from '@storybook/addon-actions';
import Icon from '@synerise/ds-icon';
import { FileM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';
import { getDefaultProps } from '../index.stories';

const withMenuItemAsChild = () => {
  const defaultProps = getDefaultProps();
  return (
    <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
      <Menu selectable={false}>
        <Menu.Item onClick={action('onSelect')} key="test" {...defaultProps} prefixel={<Icon component={<FileM />} />}>
          Option
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default withMenuItemAsChild;
