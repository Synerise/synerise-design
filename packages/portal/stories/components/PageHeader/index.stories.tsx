import PageHeader from '@synerise/ds-page-header';

import * as React from 'react';
import { action } from '@storybook/addon-actions';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';
import Icon from '@synerise/ds-icon/';
import { AngleDownS, ArrowRightCircleM, HelpM, MailM, MailS, OptionHorizontalM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import { boolean, select, text } from '@storybook/addon-knobs';
import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Stepper from '@synerise/ds-stepper';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import MenuItem from '@synerise/ds-menu/dist/Elements/Item/MenuItem';
import Radio from '@synerise/ds-radio';

const shapes = ['circle', 'square'] as const;
const statuses = ['active', 'inactive', 'blocked'] as const;
const backgroundColors = [
  'red',
  'green',
  'grey',
  'yellow',
  'blue',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
] as const;
const tabs = [
  {
    label: 'Tab first',
  },
  {
    label: 'Tab second',
  },
  {
    label: 'Tab Third',
  },
];

const steps = [
  {
    number: 1,
    label: 'Details',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    number: 2,
    label: 'Settings',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    number: 3,
    label: 'Filters & Facets',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    number: 4,
    label: 'Ranking',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
];

const stories = {
  default: {
    title: 'Default Main page header',
  },
  withTooltip: {
    title: 'Default Main page header',
    tooltip: {
      trigger: ['hover'],
      title: text('Set tooltip title', 'Tooltip title'),
    },
    tooltipIcon: <HelpM />,
    handleTooltipClick: action('Tooltip click'),
  },
  description: {
    title: 'Main page header with description',
    description: 'Description',
  },
  optionBar: {
    title: 'Main page header with option bar',
    bar: <Button>Function</Button>,
  },
  tabs: withState({
    activeTab: 0,
  })(({ store }) => (
    <PageHeader
      title="Main page header with tabs"
      tabs={
        <Tabs
          tabs={tabs}
          activeTab={store.state.activeTab}
          handleTabClick={(index: number) => store.set({ activeTab: index })}
          configuration={{
            label: 'Manage dashboards',
            action: action('Manage dashboards click'),
          }}
        />
      }
    />
  )),
  isolated: () => {
    const isolated = boolean('Isolated', true);
    return <PageHeader title="Nav can be isolated from header's wrapper" isolated={isolated} />;
  },
  backButton: {
    title: 'Main page header witch back button',
    onGoBack: action('goBack'),
  },
  closeButton: {
    title: 'Main page header witch close button',
    onClose: action('onClick'),
  },
  examples: withState({
    activeTab: 0,
    value: '',
  })(({ store }) => (
    <PageHeader
      onGoBack={action('goBack')}
      bar={
        <>
          <Button type="tertiary">Function</Button>
        </>
      }
      inlineEdit={{
        name: 'name-of-input',
        value: store.state.value,
        maxLength: 60,
        handleOnChange: event => {
          store.set({ value: event.target.value });
        },
        handleOnBlur: () => action('onBlur'),
        handleOnEnterPress: () => action('onEnterPress'),
        placeholder: 'Example text',
        size: 'normal',
      }}
      more={
        <Button type="ghost" mode="icon-label">
          <Icon component={<ArrowRightCircleM />} color={theme.palette['grey-600']} />
          More details
        </Button>
      }
      avatar={
        <Badge status="active">
          <Avatar
            backgroundColor={select('backgroundColors', backgroundColors, 'red')}
            backgroundColorHue={'100'}
            disabled={boolean('disabled', false)}
            hasStatus
            shape={select('shape', shapes, 'circle')}
            size={select('size', ['small', 'medium', 'large', 'extraLarge'], 'large')}
          >
            <Icon component={<MailM />} color={theme.palette['red-600']} />
          </Avatar>
        </Badge>
      }
      tabs={
        <Tabs
          tabs={tabs}
          activeTab={store.state.activeTab}
          handleTabClick={(index: number) => store.set({ activeTab: index })}
          configuration={{
            label: 'Manage dashboards',
            action: action('Manage dashboards click'),
          }}
        />
      }
      rightSide={
        <>
          <Button>Duplicate</Button>
          <Button mode={'split'} type={'primary'}>
            Edit
            <Icon component={<AngleDownS />} color={'#ffffff'} />
          </Button>
        </>
      }
    />
  )),
  withDropdown: withState({
    activeTab: 0,
    value: '',
    dropdownVisible: false,
    selectedSpace: 'CRM',
  })(({ store }) => {
    const avatarSize = select('size', ['small', 'medium', 'large', 'extraLarge'], 'large');
    return (
      <PageHeader
        onGoBack={action('goBack')}
        bar={
          <>
            <Button type="tertiary">Function</Button>
          </>
        }
        inlineEdit={{
          name: 'name-of-input',
          value: store.state.value,
          maxLength: 60,
          handleOnChange: event => {
            store.set({ value: event.target.value });
          },
          handleOnBlur: () => action('onBlur'),
          handleOnEnterPress: () => action('onEnterPress'),
          placeholder: 'Example text',
          size: 'normal',
        }}
        more={
          <Dropdown
            overlay={
              <Menu asDropdownMenu>
                <MenuItem onClick={() => store.set({ selectedSpace: 'CRM', dropdownVisible: false })}>CRM</MenuItem>
                <MenuItem onClick={() => store.set({ selectedSpace: 'Campaign', dropdownVisible: false })}>
                  Campaign
                </MenuItem>
                <MenuItem onClick={() => store.set({ selectedSpace: 'Automation', dropdownVisible: false })}>
                  Automation
                </MenuItem>
              </Menu>
            }
            visible={store.state.dropdownVisible}
          >
            <Dropdown.TextTrigger
              size={2}
              inactiveColor="blue-600"
              value={store.state.selectedSpace}
              onClick={() => store.set({ dropdownVisible: !store.state.dropdownVisible })}
            />
          </Dropdown>
        }
        avatar={
          <Badge status="active">
            <Avatar
              backgroundColor={select('backgroundColors', backgroundColors, 'red')}
              backgroundColorHue={'100'}
              disabled={boolean('disabled', false)}
              hasStatus
              shape={select('shape', shapes, 'circle')}
              size={avatarSize}
            >
              <Icon component={avatarSize === 'small' ? <MailS /> : <MailM />} color={theme.palette['red-600']} />
            </Avatar>
          </Badge>
        }
        tabs={
          <Tabs
            tabs={tabs}
            activeTab={store.state.activeTab}
            handleTabClick={(index: number) => store.set({ activeTab: index })}
            configuration={{
              label: 'Manage dashboards',
              action: action('Manage dashboards click'),
            }}
          />
        }
        rightSide={
          <>
            <Button>Duplicate</Button>
            <Button mode={'split'} type={'primary'}>
              Edit
              <Icon component={<AngleDownS />} color={'#ffffff'} />
            </Button>
          </>
        }
      />
    );
  }),
  withStepper: withState({
    activeStep: 0,
    name: 'Example',
  })(({ store }) => {
    const avatarSize = select('size', ['small', 'medium', 'large', 'extraLarge'], 'large');
    const showTooltip = boolean('Show step tooltip', false);
    const invalidStep = select('Set index of invalid step', [0, 1, 2, 3, '-'], '-');

    const handleChangeName = e => {
      store.set({ name: e.target.value });
    };

    return (
      <PageHeader
        avatar={
          <Badge status="active">
            <Avatar
              backgroundColor={select('backgroundColors', backgroundColors, 'red')}
              backgroundColorHue={'100'}
              disabled={boolean('disabled', false)}
              hasStatus
              shape={select('shape', shapes, 'circle')}
              size={avatarSize}
            >
              <Icon component={avatarSize === 'small' ? <MailS /> : <MailM />} color={theme.palette['red-600']} />
            </Avatar>
          </Badge>
        }
        inlineEdit={{
          name: 'name-of-input',
          value: store.state.name,
          maxLength: 60,
          handleOnChange: handleChangeName,
          handleOnBlur: () => action('onBlur'),
          handleOnEnterPress: () => action('onEnterPress'),
          placeholder: 'Example text',
          size: 'normal',
        }}
        rightSide={
          <>
            <Stepper style={{ flex: '1', justifyContent: 'flex-end', marginRight: '16px' }}>
              {steps.map((step, index) => (
                <Stepper.Step
                  onClick={() => store.set({ activeStep: index })}
                  label={step.label}
                  stepNumber={step.number}
                  active={index === store.state.activeStep}
                  done={index < store.state.activeStep || boolean('All steps done', false)}
                  validated={invalidStep === index}
                  tooltip={showTooltip && text('Set tooltip text', 'Tooltip info')}
                  children={step.children}
                />
              ))}
            </Stepper>
            <Button>Cancel</Button>
            <Button type={'primary'}>Save</Button>
            <Button type="ghost" mode="single-icon">
              <Icon component={<OptionHorizontalM />} />
            </Button>
          </>
        }
      />
    );
  }),
};

export default {
  name: 'Components/Page Header',
  withoutCenter: true,
  stories,
  Component: PageHeader,
};
