import * as React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components'
import Dropdown from '@synerise/ds-dropdown';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { boolean, text, select } from '@storybook/addon-knobs';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

import InformationCard from '@synerise/ds-information-card';
import Modal from '@synerise/ds-modal';

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
  return wrapCardWithMenu(() => <InformationCard
    title={text('Title', 'Title')}
    subtitle="subtitle"
    icon={icon}
    iconColor={iconColor}
    avatarTooltipText={avatarTooltipText}
    descriptionConfig={{onChange: action('on change')}}
    />, 'Menu item')
}

function minimalistic() {
  return wrapCardWithMenu(() => <InformationCard
    title={text('Text', 'Name')}
    subtitle={text('Subtitle', 'object.key')}
    renderBadge={null}
    descriptionConfig={null}/>, 'Mini info')
}

/**
 *
 * @param renderCard `() => <InformationCardWithKnobs title={title} subtitle="someElement.key"/>`
 * @param title
 */
function wrapCardWithMenu(renderCard, title) {
  const data: MenuItemProps[] = [
    {
      text: title,
      popoverProps: {
        defaultVisible: true,
      },
      renderInformationCard: renderCard,
    }
  ];
  return <>
    <Menu dataSource={data} asDropdownMenu={true} style={{ width: '100%' }}
      showTextTooltip={true}
      />
  </>;
}

function WithMenu(menuEntryMapper = (menuEntry, idx) => menuEntry) {
  const data: MenuItemProps[] = [
    {
      text: 'Show',
      popoverProps: {
        defaultVisible: true,
      },
      renderInformationCard: () => <InformationCard title="Show" subtitle="someElement.key"/>,
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
      renderInformationCard: () => <InformationCard
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
    <Menu dataSource={data.map(menuEntryMapper)} asDropdownMenu={true} style={{ width: '100%' }}
      showTextTooltip={true}
      />
  </>;
}

function WithDropdown(numberOfElements = 1) {
  const [dropdownVisible, setDropdownVisible] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  }, undefined, ['.ignore-click-outside']);
  const defaultMenuEntry = {
    text: 'Show',
    popoverProps: {
      defaultVisible: true,
    },
    renderInformationCard: () => <InformationCard title="Show" subtitle="someElement.key"/>,
  }
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
        <Menu dataSource={Array.from(Array(numberOfElements)).map(e => defaultMenuEntry)}
          asDropdownMenu={true}
          style={{ width: '100%' }}
          showTextTooltip={true}
        />
      </Dropdown.Wrapper>
    }
  >
    <Button onClick={() => setDropdownVisible(!dropdownVisible)} type="primary">
      Dropdown
    </Button>
  </Dropdown>
}

const SelectWithoutAnimation = styled.div`
  .ant-select-dropdown.slide-up-enter.slide-up-enter,
  .ant-select-dropdown.slide-up-appear.slide-up-appear {
    -webkit-animation-name: unset;
    animation-name: unset;
  }
  .slide-down.slide-down,
  .slide-up.slide-up {
    -webkit-animation-name: unset;
    animation-name: unset;
  }
`;

function WithConditionFilter(): JSX.Element {
  // TODO inline this story
  const storyDef = ConditionStories.stories.default;
  return storyDef({
    props: {
      defaultDropdownVisibility: true,
    },
    wrap: (el) => {
      // return <div>{el}</div>;
      // const SelectWithoutAnimation = styled.div`
      //   .ant {}
      // `;
      return <SelectWithoutAnimation>{el}</SelectWithoutAnimation>;
    },
    transformStep(step) {
      step.context.onClickOutside = () => {
        // used in ContextSelector > ContextSelectorDropdown component
        // disables hiding dropdown on outside menu click
        // return true // not needed, because getPopupContainer is set to overlayRef
      }
      const items = [...step.context.items].map((item, idx) => {
        // apply these modifications to each of entries in the menu
        return {
          ...item,
          renderInformationCard: () => <InformationCardWithKnobs title={item.name} subtitle={item.id} icon={item.icon}/>,
          popoverProps: {
            getPopupContainer: null,
            ...(item.popoverProps || {}),
            placement: 'right',
            // destroyTooltipOnHide: {keepParent: false}, // resets popover state
            // popupContainer // should be set to dropdown container
          }
        }
      })
      items[0].popoverProps.defaultVisible = boolean('By default display first tooltip', false);
      return {
        ...step,
        context: {
          ...step.context,
          items
        },
      }
    },
  } as transformsType)
}

function WithModal(): JSX.Element {
  const [isVisible, setIsVisible] = React.useState<boolean>(true)
  const dropdownSlot = WithDropdown(5)
  return <>
    <button onClick={() => setIsVisible(true)}>Show modal</button>
    <Modal
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      mask={boolean('modal overlay mask', false, 'Modal')}
      maskClosable={boolean('modal closes on background click', false, 'Modal')}
      >
        {dropdownSlot}
    </Modal>
  </>
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
    const iconType = select('Icon type', {'grey icon': 1, 'red icon': 2}, 2);
    const getTitle = () => text('Title', 'Title');
    const getSubtitle = () => text('Subtitle', 'Subtitle');
    const iconElement = <>Other IconType={iconType}</>
    preset.renderBadge = () => ({
      1: buildIconBadge({
        iconColor: 'grey',
        iconElement: <VarTypeStringM/>,
      }),
      2: buildIconBadge({
        iconColor: 'mars',
        iconElement: <SegmentM/>,
      }),
    }[iconType])
    preset.title = getTitle();
    preset.subtitle = getSubtitle();
  }
  let  customActionButtonContent, actionButtonText, actionButtonTooltipText, avatarTooltipText;
  if (iconSlotType !== 'empty') {
    avatarTooltipText = text('Icon tooltip text', 'Icon tooltip text');
  }
  let actionButton = boolean('Show action button', true)
  if (actionButton) {
    customActionButtonContent = boolean('Custom action button content', '');
  }
  if (actionButton) {
    actionButtonText = text('Action button tooltip title text', 'You can set title')
  }
  const descriptionProps = {} as any;
  let hideDescription;
  const hasCustomDescription = boolean('Has custom description', false);
  let customDescription, usePlainTextArea = false;
  if (hasCustomDescription) {
    usePlainTextArea = boolean('Use plain HTML <textarea> in the description', false);
    if (usePlainTextArea) {
      customDescription = ({onChange} = {} as any) => <textarea onChange={onChange}></textarea>
    } else {
      customDescription = text('Description content', 'custom description')
    }
  } else {
    hideDescription = boolean('Hide description', false);
    if (!hideDescription) {
      descriptionProps.error = boolean('Set validation state as error', false);
      descriptionProps.disabled = boolean('Disable editing textarea', false);
    }
  }
  return <InformationCard
    renderBadge={preset.renderBadge}
    footerText={footerText}
    title="Title"
    subtitle="key.name"
    actionButton={customActionButtonContent ? () => <>Content</> : actionButton}
    actionButtonText={actionButtonText}
    actionButtonTooltipText={actionButtonTooltipText}
    avatarTooltipText={avatarTooltipText}
    {...preset}
    {...props}
    ref={props.ref}
    {...hideDescription ? {
      descriptionConfig: null,
    } : {
      descriptionConfig: {
        onChange: action('on change'),
        ...descriptionProps,
      }
    }}
    {...(hasCustomDescription || hideDescription) ? {
      // null is used to signalise children to divider in case of hide description
      children: customDescription || null,
    } : {}}
  />
}

const stories: Record<string, Story> = {
  default: defaultStory,
  minimalistic,
  customize: () => {
    return wrapCardWithMenu(() => <InformationCardWithKnobs/>, 'Customized info-card')
  },
  withMenu: WithMenu,
  WithDropdown,
  WithConditionFilter,
  WithModal,
};

export default {
  name: 'Components/InformationCard',
  config: {},
  stories,
  Component: InformationCardWithKnobs,
}
