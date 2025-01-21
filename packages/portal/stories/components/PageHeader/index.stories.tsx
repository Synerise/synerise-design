import PageHeader from '@synerise/ds-page-header';

import React from 'react';
import { action } from '@storybook/addon-actions';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';
import Icon, {
  AngleDownS,
  ArrowRightCircleM, EditM,
  HelpM,
  MailM,
  OptionHorizontalM,
} from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import { boolean, select, text } from '@storybook/addon-knobs';
import { ObjectAvatar } from '@synerise/ds-avatar';
import { theme } from '@synerise/ds-core';
import Stepper from '@synerise/ds-stepper';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import MenuItem from '@synerise/ds-menu/dist/Elements/Item/MenuItem';
import Radio from '@synerise/ds-radio';
import { useOnClickOutside } from '@synerise/ds-utils';
import Skeleton from '@synerise/ds-skeleton';
import SkeletonAvatar from '@synerise/ds-skeleton/dist/SkeletonAvatar/SkeletonAvatar';

const shapes = ['circle', 'square'] as const;

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
const tabsSkeleton = [
  {
    label: <div style={{width: '66px'}}>
      <Skeleton numberOfSkeletons={1} width='M'/>
    </div>,
  },
  {
    label: <div style={{width: '66px'}}>
      <Skeleton numberOfSkeletons={1} width='M'/>
    </div>,
  },
  {
    label: <div style={{width: '66px'}}>
      <Skeleton numberOfSkeletons={1} width='M'/>
    </div>,
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
  withTooltip: () => ({
    title: text('Set page title', 'Default Main page header'),
    tooltip: {
      trigger: ['hover'],
      title: text('Set tooltip title', 'Tooltip title'),
    },
    tooltipIcon: <HelpM />,
    handleTooltipClick: action('Tooltip click'),
  }),
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
        customIcon: <EditM/>,
      }}
      more={
        <Button type="ghost" mode="icon-label">
          <Icon component={<ArrowRightCircleM />} color={theme.palette['grey-600']} />
          More details
        </Button>
      }
      avatar={
        <ObjectAvatar iconComponent={<Icon component={<MailM />} color={theme.palette['red-600']} />} badgeStatus="active" />
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
  withDropdown: () => {
    const [value, setValue] = React.useState('');
    const [selectedSpace, setSelectedSpace] = React.useState('CRM');
    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [isFocused, setFocused] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
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
          value: value,
          maxLength: 60,
          handleOnChange: event => {
            setValue(event.target.value);
          },
          handleOnBlur: () => action('onBlur'),
          handleOnEnterPress: () => action('onEnterPress'),
          placeholder: 'Example text',
          size: 'normal',
        }}
        more={
          <Dropdown
            overlay={
              <div ref={ref}>
                <Menu selectable={true} asDropdownMenu>
                  <MenuItem
                    onClick={() => {
                      setSelectedSpace('CRM');
                      setDropdownVisible(false);
                    }}
                    checked={selectedSpace==='CRM'}
                  >
                    CRM
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSelectedSpace('Campaign');
                      setDropdownVisible(false);
                    }}
                    checked={selectedSpace==='Campaign'}
                  >
                    Campaign
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSelectedSpace('Automation');
                      setDropdownVisible(false);
                    }}
                    checked={selectedSpace==='Automation'}
                  >
                    Automation
                  </MenuItem>
                </Menu>
              </div>
            }
            visible={dropdownVisible}
          >
            <Dropdown.TextTrigger
              size={2}
              expanded={dropdownVisible}
              inactiveColor="blue-600"
              value={selectedSpace}
              onFocus={()=> setFocused(isFocused)}
              onClick={() => setDropdownVisible(true)}
            />
          </Dropdown>
        }
        avatar={
          <ObjectAvatar iconComponent={<Icon component={<MailM />} color={theme.palette['red-600']} />} badgeStatus="active" />
        }
        tabs={
          <Tabs
            tabs={tabs}
            activeTab={0}
            handleTabClick={(index: number) => {}}
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
  },
  withSkeleton: () => {
    return (
      <PageHeader
        bar={
          <div style={{width: '150px'}}>
            <Skeleton numberOfSkeletons={1}/>
          </div>
        }

        more={
          <div style={{width: '150px'}}>
            <Skeleton numberOfSkeletons={1}/>
          </div>
        }
        avatar={
          <SkeletonAvatar size='M' shape={true} />
        }
        tabs={
          <Tabs
            tabs={tabsSkeleton}
          />
        }
        rightSide={
          <>
            <div style={{width: '150px'}}>
              <Skeleton numberOfSkeletons={1}/>
            </div>
            <div style={{width: '66px'}}>
              <Skeleton numberOfSkeletons={1} width='M'/>
            </div>
          </>
        }
      />
    )
  },
  withStepper: withState({
    activeStep: 0,
    name: 'Example',
  })(({ store }) => {
    const showTooltip = boolean('Show step tooltip', false);
    const invalidStep = select('Set index of invalid step', [0, 1, 2, 3, '-'], '-');

    const handleChangeName = e => {
      store.set({ name: e.target.value });
    };

    return (
      <PageHeader
        avatar={
          <ObjectAvatar iconComponent={<Icon component={<MailM />} color={theme.palette['red-600']} />} badgeStatus="active" />
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
