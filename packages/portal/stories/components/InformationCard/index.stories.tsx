import * as React from 'react';
import { action } from '@storybook/addon-actions';
import Dropdown from '@synerise/ds-dropdown';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { boolean, text, select } from '@storybook/addon-knobs';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

import InformationCard from '@synerise/ds-information-card';

import { buildExtraInfo, buildIconBadge, buildInitialsBadge, InformationCardProps } from '@synerise/ds-information-card';

import Icon, { NotificationsM, SegmentM, VarTypeStringM } from '@synerise/ds-icon/dist/cjs';
import { ObjectAvatar } from '@synerise/ds-avatar'

import {default as ConditionStories, transformsType} from '../../components/Condition/index.stories'
import { DEFAULT_COLOR_HUE } from '@synerise/ds-avatar/dist/ObjectAvatar/ObjectAvatar';
import { Color } from '@synerise/ds-avatar/dist/Avatar.types';

export type Story = () => (InformationCardProps | React.ReactNode | object);

const knobHandlers = {
  boolean,
  text,
  select,
}

function defaultStory() {
  const iconColor = select('Icon color', ['mars', 'grey'] as Color[], 'grey')
  // note that colors provide to an icon will be overwritten, if provided, by iconColor's prop value
  const iconArray = [<SegmentM color="mars"/>, <VarTypeStringM/>]
  const icon = iconArray[select('Icon type', {'segment': 0, 'icontype-string': 1}, 0)];
  const avatarTooltipText = text('Icon tooltip text', 'Icon tooltip text')
  return <InformationCard
    title={text('Title', 'Title')}
    subtitle="subtitle"
    icon={icon}
    iconColor={iconColor}
    avatarTooltipText={avatarTooltipText}
    descriptionConfig={{onChange: action('on change')}}
    />
}

function minimalistic() {
  return <InformationCard
    title={text('Text', 'Name')}
    subtitle={text('Subtitle', 'object.key')}
    renderBadge={null}
    descriptionConfig={null}/>
}

function WithMenu() {
  const data: MenuItemProps[] = [
    {
      text: 'Show',
      popoverProps: {
        defaultVisible: true,
      },
      renderInformationCard: () => <InformationCardWithKnobs title="Show" subtitle="someElement.key"/>,
    },
    {
      text: 'Edit',
      renderInformationCard: () => <InformationCardWithKnobs title="Edit" subtitle="someElement.edit()">this is a custom content (editable textarea is by default)</InformationCardWithKnobs>,
    },
    {
      text: 'Duplicate',
      renderInformationCard: () => <InformationCardWithKnobs
        title="Duplicate"
        subtitle="someElement.duplicate()"
        footerText="Existing duplicates: 0"
        >note footer section with the description and action button below</InformationCardWithKnobs>,
    },
    {
      type: 'divider',
      renderInformationCard: () => <InformationCardWithKnobs
        title="Won't be shown"
        subtitle="so far only text elements might contin information-card"/>
    },
    {
      text: 'Delete',
      type: 'danger',
      renderInformationCard: () => <InformationCardWithKnobs title="Delete" subtitle="someElement.delete()" notice={buildExtraInfo('Note: cannot be undo', 'alert')}>{''}</InformationCardWithKnobs>,
    },
  ];
  return <>
    <Menu dataSource={data} asDropdownMenu={true} style={{ width: '100%' }}
      showTextTooltip={true}
      />
  </>;
}

function WithDropdown() {
  const [dropdownVisible, setDropdownVisible] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  return <Dropdown
    overlayStyle={{ borderRadius: '3px' }}
    visible={dropdownVisible}
    placement="bottomLeft"
    overlay={
      <Dropdown.Wrapper
        style={{ width: '220px' }}
        onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
        ref={ref}
      >
        {WithMenu()}
      </Dropdown.Wrapper>
    }
  >
    <Button onClick={() => setDropdownVisible(!dropdownVisible)} type="primary">
      Dropdown
    </Button>
  </Dropdown>
}

function WithConditionFilter(): JSX.Element {
  // TODO inline this story
  const storyDef = ConditionStories.stories.default;
  return storyDef({
    props: {
      defaultDropdownVisibility: true,
    },
    transformStep(step) {
      step.context.onClickOutside = () => {
        // disables hiding dropdown on otuside menu click
        return true
      }
      step.context.items.forEach((item, idx) => {
        // apply these modifications to each of entries in the menu
        item.renderInformationCard = () => <InformationCardWithKnobs title={item.name} subtitle={item.id} icon={item.icon}/>
        item.popoverProps = {
          placement: 'right',
          destroyTooltipOnHide: {keepParent: false},
        }
      })
      step.context.items[0].popoverProps.defaultVisible = boolean('By default display first tooltip', true);
      step.context.items[1].renderInformationCard = () => <textarea></textarea>
      return step
    },
  } as transformsType)
}

function InformationCardWithKnobs(props = {} as Partial<InformationCardProps>) {
  // wrappers for register-knobs-calls with given groupId for this component
  const boolean = (a, b) => knobHandlers.boolean(a, b, 'InformationCard')
  const text = (a, b) => knobHandlers.text(a, b, 'InformationCard')
  const select = (a, b, c) => knobHandlers.select(a, b, c, 'InformationCard')
  const presets =
    [
      {
        name: 'events',
        optionDesc: 'For events/parameters',
        title: 'City',
        subtitle: 'customer.city',
        renderBadge: () => buildIconBadge({
          iconElement: <VarTypeStringM/>,
          iconColor: 'grey',
          avatarTooltipText: text('Avatar description', 'Description string'),
        })
      },
      {
        name: 'analytics',
        optionDesc: 'For analytics objects',
        renderBadge: () => buildIconBadge({
          iconColor: 'mars',
          iconElement: <SegmentM/>,
        }),
        title: 'Best buyers',
        subtitle: '2534-343435-3434-534-2345'
      },
      {
        name: 'customers',
        optionDesc: 'For customers',
        renderBadge: () => buildInitialsBadge('Steve K'),
        title: 'Steve Krug',
        subtitle: 'steveo@krugltd.com'
      },
      {
        name: 'action',
        optionDesc: 'Events removed from terrarium',
        renderBadge: () => <ObjectAvatar
          color="grey"
          iconComponent={<Icon size="small" component={<NotificationsM/>}/>}
        />,
        title: 'Session end',
        subtitle: 'synerise.session.end',
        notice: buildExtraInfo('Event removed from terrarium'),
      },
      {
        name: 'other',
        optionDesc: 'Other',
        renderBadge: () => <>Other</>,
        title: undefined,
        subtitle: undefined,
      },
      {
        name: 'empty',
        optionDesc: 'Empty card',
        renderBadge: null,
        title: 'Title',
        subtitle: 'key.desc',
        description: null,
        footerText: '',
      },
  ]
  const iconSlotType = select('Icon slot type', {
    [presets[0].optionDesc]: 'events',
    [presets[1].optionDesc]: 'analytics',
    [presets[2].optionDesc]: 'customers',
    [presets[3].optionDesc]: 'action',
    [presets[4].optionDesc]: 'other',
    [presets[5].optionDesc]: 'empty',
  }, 'events');
  const footerText = text('Footer text', 'Last changed: 3 weeks ago')
  const preset = {...presets.find(e => e.name === iconSlotType)};
  if (iconSlotType === 'other') {
    const iconType = select('Icon type', {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}, 3)
    const getTitle = () => text('Title', 'Title');
    const getSubtitle = () => text('Subtitle', 'Subtitle');
    const iconElement = <>Other IconType={iconType}</>
    preset.renderBadge = () => ({
      1: <SegmentM color="mars"/>,
      2: <VarTypeStringM/>,
      3: <Icon color="mars" component={<SegmentM/>}></Icon>,
      4: <Icon color={theme.palette['mars-'+DEFAULT_COLOR_HUE]} component={<SegmentM/>}></Icon>,
      5: buildIconBadge({
        iconElement: <Icon component={<SegmentM/>}/>,
        iconColor: 'mars',
      }),
      6: buildIconBadge({
        iconColor: 'mars',
        iconElement: <SegmentM/>,
      }),
    }[iconType])
    preset.title = getTitle();
    preset.subtitle = getSubtitle();
  }
  let actionButtonTooltipType, customActionButtonContent, actionButtonText, actionButtonTooltipText, avatarTooltipText;
  if (iconSlotType !== 'empty') {
    avatarTooltipText = text('Icon tooltip text', 'Icon tooltip text');
  }
  let actionButton = boolean('Show action button', true)
  if (actionButton) {
    customActionButtonContent = boolean('Custom action button content', '')
  }
  if (actionButton) {
    actionButtonTooltipType = select('Action button tooltip type', {'Header+label': 'header-label', 'Default': 'default'}, 'default')
    actionButtonText = text('Action button tooltip title text', 'You can set title')
    if (actionButtonTooltipType !== 'default') {
      actionButtonTooltipText = text('Action button tooltip desc text', 'You can set description')
    }
  }
  const descriptionProps = {} as any;
  const hideDescription = boolean('Hide description', false);
  const hasCustomDescription = boolean('Has custom description', false);
  let customDescription, usePlainTextArea = false;
  if (hasCustomDescription) {
    usePlainTextArea = boolean('Use plain HTML <textarea> in the description', false);
    if (usePlainTextArea) {
      customDescription = ({onChange} = {} as any) => <textarea onChange={onChange}></textarea>
    } else {
      customDescription = text('Description content', 'custom description')
    }
    descriptionProps.error = boolean('Set validation state as error', false);
    descriptionProps.disabled = boolean('Disable editing textarea', false);
  }
  return <InformationCard
    renderBadge={preset.renderBadge}
    footerText={footerText}
    title="Title"
    subtitle="key.name"
    actionButton={customActionButtonContent ? () => <>Content</> : actionButton}
    actionButtonText={actionButtonText}
    actionButtonTooltipType={actionButtonTooltipType}
    actionButtonTooltipText={actionButtonTooltipText}
    avatarTooltipText={avatarTooltipText}
    {...preset}
    {...props}
    {...hideDescription ? {
      descriptionConfig: null,
    } : {
      descriptionConfig: {
        onChange: action('on change'),
      }
    }}
    {...hasCustomDescription ? {
      children: customDescription,
    } : {}}
  />
}

const stories: Record<string, Story> = {
  default: defaultStory,
  minimalistic,
  customize: () => {
    return <InformationCardWithKnobs/>
  },
  withMenu: WithMenu,
  WithDropdown,
  WithConditionFilter,
};

export default {
  name: 'Components/InformationCard',
  config: {},
  stories,
  Component: InformationCardWithKnobs,
}
