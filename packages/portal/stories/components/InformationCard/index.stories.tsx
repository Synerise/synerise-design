import * as React from 'react';
import { action } from '@storybook/addon-actions';
import Dropdown from '@synerise/ds-dropdown';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { boolean, text, select } from '@storybook/addon-knobs';

import InformationCard from '@synerise/ds-information-card';
import Modal from '@synerise/ds-modal';

import {
  buildExtraInfo,
  buildIconBadge,
  buildInitialsBadge,
  InformationCardProps,
} from '@synerise/ds-information-card';

import Icon, { NotificationsM, SegmentM, VarTypeStringM } from '@synerise/ds-icon/dist/cjs';
import { ObjectAvatar } from '@synerise/ds-avatar';

import { default as ConditionStories, Transform } from '../../components/Condition/index.stories';
import { Color } from '@synerise/ds-avatar/dist/Avatar.types';
import type { ConditionStep } from '@synerise/ds-condition';
import type { ContextItem } from '@synerise/ds-context-selector';

export type Story = () => InformationCardProps | React.ReactNode | object;

const knobHandlers = {
  boolean,
  text,
  select,
};

function defaultStory() {
  const iconColor = select('Icon color', ['mars', 'grey'] as Color[], 'grey');
  // note that colors provide to an icon will be overwritten, if provided, by iconColor's prop value
  const iconArray = [<SegmentM color="mars" />, <VarTypeStringM />];
  const icon = iconArray[select('Icon type', { segment: 0, 'icontype-string': 1 }, 0)];
  const avatarTooltipText = text('Icon tooltip text', 'Icon tooltip text');
  return wrapCardWithMenu(
    () => (
      <InformationCard
        title={text('Title', 'Title')}
        subtitle="subtitle"
        icon={icon}
        iconColor={iconColor}
        avatarTooltipText={avatarTooltipText}
        descriptionConfig={{ onChange: action('on change') }}
      />
    ),
    'Menu item'
  );
}

function minimalistic() {
  return wrapCardWithMenu(
    () => (
      <InformationCard
        title={text('Text', 'Name')}
        subtitle={text('Subtitle', 'object.key')}
        renderBadge={null}
        descriptionConfig={null}
      />
    ),
    'Mini info'
  );
}

/**
 * Returns case of a information card wrapped with ds-menu structure.
 * Helper for testing, pass popover content in `renderCard` prop.
 *
 * @param renderHoverTooltip `() => <InformationCardWithKnobs title={title} subtitle="someElement.key"/>`
 * @param title
 */
function wrapCardWithMenu(renderHoverTooltip, title) {
  const data: MenuItemProps[] = [
    {
      text: title,
      hoverTooltipProps: {
        defaultPopupVisible: true,
      },
      renderHoverTooltip: renderHoverTooltip,
    },
  ];
  return (
    <>
      <Menu dataSource={data} asDropdownMenu={true} style={{ width: '100%' }} showTextTooltip={true} />
    </>
  );
}

function WithMenu(menuEntryMapper = (menuEntry, idx) => menuEntry) {
  const data: MenuItemProps[] = [
    {
      text: 'Show',
      hoverTooltipProps: {
        defaultPopupVisible: true,
      },
      renderHoverTooltip: () => <InformationCard title="Show" subtitle="someElement.key" />,
    },
    {
      text: 'Edit',
      renderHoverTooltip: () => (
        <InformationCardWithKnobs title="Edit" subtitle="someElement.edit()">
          this is a custom content (editable textarea is by default)
        </InformationCardWithKnobs>
      ),
    },
    {
      text: 'Duplicate',
      renderHoverTooltip: () => (
        <InformationCardWithKnobs
          title="Duplicate"
          subtitle="someElement.duplicate()"
          footerText="Existing duplicates: 0"
        >
          note footer section with the description and action button below
        </InformationCardWithKnobs>
      ),
    },
    {
      type: 'divider',
      renderHoverTooltip: () => (
        <InformationCard title="Won't be shown" subtitle="so far only text elements might contin information-card" />
      ),
    },
    {
      text: 'Delete',
      type: 'danger',
      renderHoverTooltip: () => (
        <InformationCardWithKnobs
          title="Delete"
          subtitle="someElement.delete()"
          notice={buildExtraInfo('Note: cannot be undo', 'alert')}
        >
          {''}
        </InformationCardWithKnobs>
      ),
    },
  ];
  return (
    <>
      <Menu
        dataSource={data.map(menuEntryMapper)}
        asDropdownMenu={true}
        style={{ width: '100%' }}
        showTextTooltip={true}
      />
    </>
  );
}

function WithDropdown(numberOfElements = 1) {
  const [dropdownVisible, setDropdownVisible] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  const popoverProps = React.useCallback(
    visible => ({ defaultPopupVisible: dropdownVisible && (visible ?? true) }),
    [dropdownVisible]
  );
  const buildMenuEntry = (visible): Partial<MenuItemProps> => ({
    text: 'Show',
    hoverTooltipProps: popoverProps(visible),
    renderHoverTooltip: () => (
      <InformationCard title="Show" subtitle="someElement.key" descriptionConfig={{ onChange: action('onChange') }} />
    ),
  });
  return (
    <Dropdown
      overlayStyle={{ borderRadius: '3px' }}
      visible={dropdownVisible}
      placement="bottomLeft"
      overlay={
        <Dropdown.Wrapper
          style={{ width: '220px' }}
          onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
          ref={ref}
        >
          <Menu
            dataSource={Array.from(Array(numberOfElements)).map((e, i) => buildMenuEntry(i === 0))}
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
  );
}

function WithConditionFilter(): JSX.Element {
  const storyDef = ConditionStories.stories.default;
  return storyDef({
    props: {
      defaultDropdownVisibility: true,
      defaultPopupVisible: true,
    },
    transformStep(step: ConditionStep) {
      step.context.onClickOutside = () => {};
      const items = [...step.context.items].map((item, idx): ContextItem => {
        return {
          hoverTooltipProps: {},
          ...item,
          renderHoverTooltip: () => <InformationCardWithKnobs title={item.name} subtitle={item.id} icon={item.icon} />,
        };
      });

      items[0].hoverTooltipProps.defaultPopupVisible = boolean('By default display first tooltip', false);
      console.log(step);
      return {
        ...step,
        context: {
          ...step.context,
          items,
        },
        conditions: step.conditions.map(condition => ({
          ...condition,
          parameter: {
            ...condition.parameter,
            parameters: {
              ...condition.parameter.parameters,
              items: condition.parameter.parameters.items.map(item => ({
                ...item,
                renderHoverTooltip: () => (
                  <InformationCardWithKnobs title={item.name} subtitle={item.id} icon={item.icon} />
                ),
              })),
            },
          },
        })),
      };
    },
  } as Transform);
}

function WithModal(): JSX.Element {
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const dropdownSlot = WithDropdown(5);
  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show modal</Button>
      <Modal
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        mask={boolean('Modal overlay mask', true, 'Modal')}
        maskClosable={boolean('Modal closes on background click', true, 'Modal')}
      >
        {dropdownSlot}
      </Modal>
    </>
  );
}

function InformationCardWithKnobs(props = {} as Partial<InformationCardProps>) {
  // wrappers for register-knobs-calls with given groupId for this component
  const boolean = (a, b) => knobHandlers.boolean(a, b, 'InformationCard');
  const text = (a, b) => knobHandlers.text(a, b, 'InformationCard');
  const select = (a, b, c) => knobHandlers.select(a, b, c, 'InformationCard');
  const presets = [
    {
      name: 'events',
      optionDesc: 'For events/parameters',
      title: 'City',
      subtitle: 'customer.city',
      renderBadge: () =>
        buildIconBadge({
          iconElement: <VarTypeStringM />,
          iconColor: 'grey',
          avatarTooltipText: text('Avatar description', 'Description string'),
        }),
    },
    {
      name: 'analytics',
      optionDesc: 'For analytics objects',
      renderBadge: () =>
        buildIconBadge({
          iconColor: 'mars',
          iconElement: <SegmentM />,
        }),
      title: 'Best buyers',
      subtitle: '2534-343435-3434-534-2345',
    },
    {
      name: 'customers',
      optionDesc: 'For customers',
      renderBadge: () => buildInitialsBadge('Steve K'),
      title: 'Steve Krug',
      subtitle: 'steveo@krugltd.com',
    },
    {
      name: 'action',
      optionDesc: 'Events removed from terrarium',
      renderBadge: () => (
        <ObjectAvatar color="grey" iconComponent={<Icon size="small" component={<NotificationsM />} />} />
      ),
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
  ];
  const iconSlotType = select(
    'Icon slot type',
    {
      [presets[0].optionDesc]: 'events',
      [presets[1].optionDesc]: 'analytics',
      [presets[2].optionDesc]: 'customers',
      [presets[3].optionDesc]: 'action',
      [presets[4].optionDesc]: 'other',
      [presets[5].optionDesc]: 'empty',
    },
    'events'
  );
  const footerText = text('Footer text', 'Last changed: 3 weeks ago');
  const preset = { ...presets.find(e => e.name === iconSlotType) };
  if (iconSlotType === 'other') {
    const iconType = select('Icon type', { 'grey icon': 1, 'red icon': 2 }, 2);
    const getTitle = () => text('Title', 'Title');
    const getSubtitle = () => text('Subtitle', 'Subtitle');
    const iconElement = <>Other IconType={iconType}</>;
    preset.renderBadge = () =>
      ({
        1: buildIconBadge({
          iconColor: 'grey',
          iconElement: <VarTypeStringM />,
        }),
        2: buildIconBadge({
          iconColor: 'mars',
          iconElement: <SegmentM />,
        }),
      }[iconType]);
    preset.title = getTitle();
    preset.subtitle = getSubtitle();
  }
  let customActionButtonContent, actionButtonTooltipText, avatarTooltipText;
  if (iconSlotType !== 'empty') {
    avatarTooltipText = text('Icon tooltip text', 'Icon tooltip text');
  }
  let actionButton = boolean('Show action button', true);
  if (actionButton) {
    customActionButtonContent = boolean('Custom action button content', '');
  }
  if (actionButton) {
    actionButtonTooltipText = text('Action button tooltip title text', 'You can set title');
  }
  const descriptionProps = {} as any;
  let hideDescription;
  const hasCustomDescription = boolean('Has custom description', false);
  let customDescription,
    usePlainTextArea = false;
  if (hasCustomDescription) {
    usePlainTextArea = boolean('Use plain HTML <textarea> in the description', false);
    if (usePlainTextArea) {
      customDescription = ({ onChange } = {} as any) => <textarea onChange={onChange} />;
    } else {
      customDescription = text('Description content', 'custom description');
    }
  } else {
    hideDescription = boolean('Hide description', false);
    if (!hideDescription) {
      descriptionProps.error = boolean('Set validation state as error', false);
      descriptionProps.disabled = boolean('Disable editing textarea', false);
    }
  }
  return (
    <InformationCard
      renderBadge={preset.renderBadge}
      footerText={footerText}
      title="Title"
      subtitle="key.name"
      actionButton={customActionButtonContent ? () => <>Content</> : actionButton}
      actionButtonTooltipText={actionButtonTooltipText}
      avatarTooltipText={avatarTooltipText}
      {...preset}
      {...props}
      {...(hideDescription
        ? {
            descriptionConfig: null,
          }
        : {
            descriptionConfig: {
              onChange: action('on change'),
              ...descriptionProps,
            },
          })}
      {...(hasCustomDescription || hideDescription
        ? {
            children: customDescription || null,
          }
        : {})}
    />
  );
}

const stories: Record<string, Story> = {
  default: defaultStory,
  minimalistic,
  customize: () => {
    return wrapCardWithMenu(() => <InformationCardWithKnobs />, 'Customized info-card');
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
};
