import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import Menu from '@synerise/ds-menu';
import {
  DESCRIPTION_PLACEHOLDER,
  renderSuffix,
  suffixType,
  TEXT_PLACEHOLDER,
  suffixVisibilityTrigger,
} from './dataset';
import { focusWithArrowKeys } from '@synerise/ds-utils';
import withLabel from './withLabel/withLabel';
import withParent from './withParent/withParent';
import withIconAndLabel from './withIconAndLabel/withIconAndLabel';
import withOrderedList from './withOrderedList/withOrderedList';
import withCheckbox from './withCheckbox/withCheckbox';
import withSquareAvatar from './withSquareAvatar/withSquareAvatar';
import withSmallAvatar from './withSmallAvatar/withSmallAvatar';
import withMediumAvatar from './withMediumAvatar/withMediumAvatar';
import withDelete from './withDelete/withDelete';
import withSwitch from './withSwitch/withSwitch';
import withSubmenu from './withSubmenu/withSubmenu';
import withCopyable from './withCopyable/withCopyable';
import withoutHover from './withoutHover/withoutHover';
import withMenuItemAsChild from './withMenuItemAsChild/withMenuItemAsChild';
import withIndent from './withIndent/withIndent';
import withHighlighting from './withHighlighting/withHighlighting';
import withBreadcrumb from './withBreadcrumb/withBreadcrumb';
import withSelection from './withSelection/withSelection';
import withFlag from './withFlag/withFlag';
import * as S from './stories.styles';
import { v4 as uuid } from 'uuid';

export const decorator = props => {
  const { dataSource, ...rest } = props;
  return (
    <div
      style={{ width: '200px', borderRadius: '3px', overflow: 'hidden' }}
      onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
    >
      <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
        <Menu {...props}>
          {props.dataSource.map(item => (
            <S.StyledMenuItem {...rest} {...item} key={!!item.key ? item.key :  uuid()} className="ds-menu-item" />
          ))}
        </Menu>
      </div>
    </div>
  );
};

export const getSuffixElement = () => {
  const selectedSuffix = select('Set suffix type', suffixType, suffixType.none);
  return renderSuffix(selectedSuffix);
};

export const getSuffixTrigger = () => {
  const selectedSuffix = select(
    'Set suffix visibility trigger',
    suffixVisibilityTrigger,
    suffixVisibilityTrigger.default
  );
  return selectedSuffix;
};

export const getDefaultProps = () => ({
  disabled: boolean('Set disabled', false),
});

export const attachKnobsToDataSource = data =>
  data.map(item => ({
    ...item,
    text: text('Set text', TEXT_PLACEHOLDER),
    disabled: boolean('Set disabled', false),
    ...(item.description && { description: text('Set description', DESCRIPTION_PLACEHOLDER) }),
  }));

const stories = {
  withLabel,
  withParent,
  withIconAndLabel,
  withCheckbox,
  withOrderedList,
  withSquareAvatar,
  withSmallAvatar,
  withMediumAvatar,
  withDelete,
  withSwitch,
  withSubmenu,
  withCopyable,
  withoutHover,
  withMenuItemAsChild,
  withIndent,
  withHighlighting,
  withBreadcrumb,
  withSelection,
  withFlag,
};

export default {
name: 'Components/Menu',
  stories,
  Component: Menu,
};
