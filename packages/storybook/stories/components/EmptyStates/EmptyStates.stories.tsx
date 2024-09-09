import React from 'react';

import type { StoryObj, Meta } from '@storybook/react';

import EmptyStates, { EmptyStatesProps } from '@synerise/ds-empty-states';
import Button from '@synerise/ds-button';
import Icon, { IconProps } from '@synerise/ds-icon';
import * as allIconsL from '@synerise/ds-icon/dist/icons/L';

import {
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray, reactNodeAsSelect,
} from '../../utils';


const fontSizes = {
  Small: 'small',
  Medium: 'medium',
};

const iconSizes = {
  Large: 'small',
  ExtraLarge: 'medium',
};

const iconNames = Object.keys(allIconsL);
const iconOptions = iconNames.reduce((icons, current) => ({ ...icons, [current]: current }), {});

const renderSingleIcon = ({ component }: IconProps) => (
  <>
    <Icon component={component} />
  </>
);


export default {
  title: "Components/EmptyStates",
  tags: ['autodocs'],
  component: EmptyStates,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    text: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    labelPosition: {
      ...controlFromOptionsArray('select', ['bottom', 'right'])
    },
    fontSize: {
      ...controlFromOptionsArray('select', Object.keys(fontSizes)),
      mapping: fontSizes
    },
    size: {
      ...controlFromOptionsArray('select', Object.keys(iconSizes)),
      mapping: iconSizes
    },
    customIcon: {
      ...reactNodeAsSelect(
        iconNames,
        iconOptions
      ),
    },
    button: {
      ...reactNodeAsSelect(
        ['singleButtonPrimary', 'singleButtonGhostPrimary', 'twoButtons'],
        {
          singleButtonPrimary: <div style={{marginTop: '-8px'}}>
            <Button mode="label" type="ghost-primary" >
              New segmentation
            </Button>
          </div>,
          singleButtonGhostPrimary: <>
            <Button mode="label" type="primary" >
              New segmentation
            </Button>
          </>,
          twoButtons: <>
            <div>
              <Button type="ghost" >
                Cancel
              </Button>
            </div>
            <div style={{paddingLeft: '8px'}}>
              <Button type="primary" >
                New segmentation
              </Button>
            </div>
          </>
        },
      ),
    },
  },
} as Meta<EmptyStatesProps>;


export const Default: StoryObj<EmptyStatesProps> = {
  render: (args) => {
    const IconComponent = allIconsL[args.customIcon];
    const ComponentWithStroke = () => <IconComponent />;
    return <EmptyStates {...args} customIcon={renderSingleIcon({
      component: <ComponentWithStroke />,
    })}/>
  },
  args: {
    label: 'Currently you have no Segmentations saved. Get started with a new one to analyze your database.',
    text: 'Create new segmentation',
    labelPosition: 'bottom',
    fontSize: 'small',
    size: 'small',
    button: 'singleButtonPrimary',
    customIcon: iconNames[0],
  },
};




