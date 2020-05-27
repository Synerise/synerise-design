import { boolean, text } from '@storybook/addon-knobs';
import * as React from 'react';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CheckS } from '@synerise/ds-icon/dist/icons';
import Menu from '@synerise/ds-menu';
import { getDefaultProps } from '../index.stories';

const withSelection = () => {
  const defaultProps = getDefaultProps();
  const props = {
    text: text('Set text', 'Option'),
    ...defaultProps,
  } as object;
  const [isSelected, setSelected] = React.useState<boolean>(false);
  const renderSuffix = (
    <div>{isSelected ? <Icon color={theme.palette['green-600']} component={<CheckS />} /> : 'select'}</div>
  );
  return (
    <div style={{ background: 'rgba(0,0,0,0)', width: '200px', borderRadius: '3px', overflow: 'hidden' }}>
      <Menu>
        <Menu.Item
          onClick={() => {
            setSelected(!isSelected);
          }}
          type={!isSelected ? 'select' : undefined}
          {...props}
          suffixel={renderSuffix}
        />
      </Menu>
    </div>
  );
};
export default withSelection;