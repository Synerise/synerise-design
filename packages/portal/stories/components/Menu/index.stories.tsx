import * as React from 'react';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Checkbox from '@synerise/ds-checkbox';
import Icon from '@synerise/ds-icon';
import { DeleteM, FileM } from '@synerise/ds-icon/dist/icons';
import Menu from '@synerise/ds-menu';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

import {
  avatar,
  avatarMedium,
  avatarSmall,
  deleteState,
  DESCRIPTION_PLACEHOLDER,
  ExtendedAntdSwitchComponent,
  iconPrefixType,
  largeList,
  ordered,
  parent,
  parentWithIcon,
  remapCopyValueFromText,
  renderPrefixIcon,
  renderSuffix,
  simpleText,
  suffixType,
  TEXT_PLACEHOLDER,
  textWithIcon,
  withCheckBox,
  withCopyable, withCascader, withSelect, suffixVisibilityTrigger,
} from './dataset';
import Label from '@synerise/ds-input/dist/Label/Label';

const decorator = props => (
  <div style={{ width: '200px' }}>
    <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
      <Menu {...props} />
    </div>
  </div>
);

const getSuffixElement = () => {
  const selectedSuffix = select('Set suffix type', suffixType, suffixType.none);
  return renderSuffix(selectedSuffix);
};

const getSuffixTrigger = () => {
  const selectedSuffix = select('Set suffix visibility trigger', suffixVisibilityTrigger, suffixVisibilityTrigger.default);
  return selectedSuffix;
}

const getDefaultProps = () => ({
  disabled: boolean('Set disabled', false),
});

const attachKnobsToDataSource = data =>
  data.map(item => ({
    ...item,
    text: text('Set text', TEXT_PLACEHOLDER),
    disabled: boolean('Set disabled', false),
    ...(item.description && { description: text('Set description', DESCRIPTION_PLACEHOLDER) }),
  }));

const stories = {
  withLabel: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(simpleText),
      suffixel: getSuffixElement(),
      suffixVisibilityTrigger: getSuffixTrigger(),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withIconAndLabel: () => {
    const defaultProps = getDefaultProps();
    const singleIcon = select('Set prefix type', iconPrefixType, iconPrefixType.singleIcon);
    const props = {
      dataSource: attachKnobsToDataSource(textWithIcon),
      prefixel: renderPrefixIcon(singleIcon),
      suffixel: getSuffixElement(),
      suffixVisibilityTrigger: getSuffixTrigger(),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withCheckbox: () => {
    const defaultProps = getDefaultProps();
    const [isChecked, setChecked] = React.useState(false);
    const props = {
      dataSource: attachKnobsToDataSource(withCheckBox),
      suffixel: getSuffixElement(),
      suffixVisibilityTrigger: getSuffixTrigger(),
      prefixel: <Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)} />,
      onClick: () => setChecked(!isChecked),
      ...defaultProps,
    };
    return decorator(props);
  },
  withOrderedList: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(ordered),
      ordered: true,
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withLargeList: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(largeList),
      ordered: true,
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withSubmenu: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(parent),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withSubmenuAndIcon: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: parentWithIcon,
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withSquareAvatar: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(avatar),
      suffixel: getSuffixElement(),
      suffixVisibilityTrigger: getSuffixTrigger(),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withSmallAvatar: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(avatarSmall),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withMediumAvatar: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(avatarMedium),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withDelete: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(deleteState),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withSwitch: () => {
    const defaultProps = getDefaultProps();
    const [isChecked, setChecked] = React.useState(false);
    const prefixel = (
      <ExtendedAntdSwitchComponent id={'toggle'} checked={isChecked} onChange={() => setChecked(!isChecked)} />
    );
    const props = {
      dataSource: attachKnobsToDataSource(simpleText),
      prefixel,
      onClick: () => setChecked(!isChecked),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withCopyable: () => {
    const defaultProps = getDefaultProps();
    const knobs = attachKnobsToDataSource(withCopyable);
    const props = {
      dataSource: remapCopyValueFromText(knobs),
      ...defaultProps,
    } as object;
    return (
      <Tooltip type="default" trigger={'click'} title={'Copied!'}>
        <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
          <Menu {...props} />
        </div>
      </Tooltip>
    );
  },
  withMenuItemAsChild: () => {
    const defaultProps = getDefaultProps();
    return (
      <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
        <Menu>
          <Menu.Item
            onClick={action('onSelect')}
            key="test"
            {...defaultProps}
            prefixel={<Icon component={<FileM />} />}
          >
            Option
          </Menu.Item>
        </Menu>
      </div>
    );
  },
  withCascader: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(withCascader),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withSelect: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(withSelect),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withIndent: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(simpleText),
      indentLevel: number('Set indent level',0,{min:0,max:10}),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
  withHighlighting: () => {
    const defaultProps = getDefaultProps();
    const props = {
      dataSource: attachKnobsToDataSource(simpleText),
      highlight: text('Set text to be highlighted', 'Opt'),
      ...defaultProps,
    } as object;
    return decorator(props);
  },
};

export default {
  name: 'Components|Menu',
  stories,
  Component: Menu,
};
