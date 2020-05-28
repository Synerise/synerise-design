import { select } from '@storybook/addon-knobs';
import { iconPrefixType, renderPrefixIcon, submenu } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CheckS, FolderM } from '@synerise/ds-icon/dist/icons';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import * as React from 'react';

const withSubmenu = () => {
  const defaultProps = getDefaultProps();
  const prefixKnob = select('Set prefix type', iconPrefixType, iconPrefixType.singleIcon);

  const props = {
    dataSource: [
      {
        text: 'Option 3',
        suffixel: <Icon color={theme.palette['green-600']} component={<CheckS />} />,
        subMenu: [
          { text: 'Child 1', suffixel: <Icon color={theme.palette['green-600']} component={<CheckS />} /> },
          { text: 'Child 2', suffixel: <Icon color={theme.palette['green-600']} component={<CheckS />} /> },
          { text: 'Child 3', suffixel: <Icon color={theme.palette['green-600']} component={<CheckS />} /> },
        ],
      },
      { text: 'Option 4', subMenu: [{ text: 'Child 1' }] },
    ],
    prefixel: renderPrefixIcon(prefixKnob),
    ordered: true,
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withSubmenu;
