import React, { useState } from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';

import PageHeader from '@synerise/ds-page-header';
import { theme }from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import Skeleton, { SkeletonAvatar } from '@synerise/ds-skeleton';
import Icon, { AngleDownS, EditM, HelpM, MailM, OptionHorizontalM } from '@synerise/ds-icon';

import Tabs from '@synerise/ds-tabs';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import { ObjectAvatar } from '@synerise/ds-avatar';
import Stepper from '@synerise/ds-stepper';
import { useOnClickOutside } from '@synerise/ds-utils';

import { tabsSkeleton, tabs, steps, StepData } from './PageHeader.data';

import {
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  BOOLEAN_CONTROL, reactNodeAsSelect, headerWrapper,
} from '../../utils';






export default {
  title: "Components/PageHeader",
  tags: ['autodocs'],
  component: PageHeader,
  decorators: [headerWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    title: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    onClose: BOOLEAN_CONTROL,
    onGoBack: BOOLEAN_CONTROL,
    isolated: BOOLEAN_CONTROL,
    tooltip: {
      trigger:{...reactNodeAsSelect([ 'hover', 'click'], {hover: 'hover', click: 'click'})},
      title: REACT_NODE_AS_STRING,
    },
    tooltipIcon: REACT_NODE_AS_STRING,
    bar: { ...reactNodeAsSelect([ 'Button', 'None', 'Skeleton'], {
        Button: <>
          <Button type="tertiary">Function</Button>
        </>,
        None: undefined,
        Skeleton: <div style={{width: '150px'}}>
          <Skeleton numberOfSkeletons={1}/>
        </div>,
      })
    },
  },
} as Meta<typeof PageHeader>;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Default Main page header',
    onClose: false,
    onGoBack: false,
  },
};

export const withTooltip: Story = {
  ...Default,
  args: {
    ...Default.args,
    title: 'Default Main page header',
    tooltip: {
      trigger: 'hover',
      title: 'Tooltip title',
    },
    tooltipIcon: <HelpM />,
  },
};

export const withDescription: Story = {
  ...Default,
  args: {
    ...Default.args,
    title: 'Default Main page header',
    description: 'Description',
  },
};

export const withButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    title: 'Default Main page header',
    bar: 'Button',
  },
};

export const isolated: Story = {
  ...Default,
  args: {
    ...Default.args,
    title: 'Default Main page header',
    isolated: true,
  },
};

export const withBack: Story = {
  args: {
    title: 'Default Main page header',
    onClose: false,
    onGoBack: true,
  },
};

export const withClose: Story = {
  args: {
    title: 'Default Main page header',
    onClose: true,
    onGoBack: false,
  },
};


export const withDropdown: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [selectedSpace, setSelectedSpace] = React.useState('CRM');
    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [isFocused, setFocused] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });

    const menuData = [
      { text: 'CRM' , onClick: () => {
          setSelectedSpace('CRM');
          setDropdownVisible(false);
        }, checked: selectedSpace === 'CRM' },
      { text: 'Campaign', onClick: () => {
          setSelectedSpace('Campaign');
          setDropdownVisible(false);
        }, checked: selectedSpace === 'Campaign'  },
      { text: 'Automation', onClick: () => {
          setSelectedSpace('Automation');
          setDropdownVisible(false);
        }, checked: selectedSpace === 'Automation'  },
    ];
    return (
    <PageHeader
      onGoBack={true}
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
        placeholder: 'Example text',
        size: 'normal',
        customIcon: <EditM/>,
      }}
      more={
        <Dropdown
          overlay={
            <div ref={ref}>
              <Menu dataSource={menuData} selectable={true} asDropdownMenu/>
            </div>
          }
          visible={dropdownVisible}
        >
          <Dropdown.TextTrigger
            size={2}
            expanded={dropdownVisible}
            inactiveColor="blue-600"
            value={selectedSpace}
            onFocus={() => setFocused(isFocused)}
            onClick={() => setDropdownVisible(true)}
          />
        </Dropdown>
      }
      avatar={
        <ObjectAvatar iconComponent={<Icon component={<MailM/>} color={theme.palette['red-600']}/>}
                      badgeStatus="active"/>
      }
      tabs={
        <Tabs
          tabs={tabs}
          activeTab={0}
          handleTabClick={(index: number) => {
          }}
          configuration={{
            label: 'Manage dashboards',
          }}
        />
      }
      rightSide={
        <>
          <Button>Duplicate</Button>
          <Button mode={'split'} type={'primary'}>
            Edit
            <Icon component={<AngleDownS/>} color={'#ffffff'}/>
          </Button>
        </>
      }
    />
    )
  },
  args: {
  },
};

export const withStepper: Story = {
  render: ({ activeIndex, ...args }) => {
    const [activeStep, setActiveStep] = useState(activeIndex);
    const handleStepClick = index => setActiveStep(index);
    const [value, setValue] = React.useState('');

    return (
      <PageHeader
        avatar={
          <ObjectAvatar iconComponent={<Icon component={<MailM />} color={theme.palette['red-600']} />} badgeStatus="active" />
        }
        inlineEdit={{
          name: 'name-of-input',
          value: value,
          maxLength: 60,
          handleOnChange: event => {
            setValue(event.target.value);
          },
          placeholder: 'Example text',
          size: 'normal',
        }}
        rightSide={
          <>
            <Stepper {...args}>
              {steps.map((step: StepData, index: number) => (
                <Stepper.Step
                  {...step}
                  onClick={() => handleStepClick(index)}
                  active={index === activeStep}
                  done={index < activeStep}
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
    },
  args: {

  },
};

export const withSkeleton: Story = {
  render: () => <PageHeader
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
  />,
  args: {
  },
};

