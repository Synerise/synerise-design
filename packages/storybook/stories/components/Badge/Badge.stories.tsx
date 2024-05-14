import React, { CSSProperties} from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Badge, { BadgeProps } from '@synerise/ds-badge';
import Icon, { FileM, IconProps } from '@synerise/ds-icon';
import Avatar, { AvatarProps } from '@synerise/ds-avatar';
import { theme } from '@synerise/ds-core';

import { statuses } from './constants';
import { BOOLEAN_CONTROL, COLOR_CONTROL, COLOR_HUE_CONTROL, controlFromOptionsArray, fixedWrapper200, fixedWrapper400, NUMBER_CONTROL, STRING_CONTROL } from '../../utils';
import { colorNames } from '../../constants/colors';
import { Status as StatusType } from '@synerise/ds-badge/dist/Badge.types';
import { Size } from '@synerise/ds-avatar/dist/Avatar.types';


export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  argTypes: {
    count: { ...NUMBER_CONTROL },
    offset: {
      control: 'array',
    },
    outlined: {
      ...BOOLEAN_CONTROL
    },
    overflowCount: {
      ...NUMBER_CONTROL
    },
    showZero: {
      ...BOOLEAN_CONTROL
    },
    title: {
      ...STRING_CONTROL
    },
    status: {
      ...controlFromOptionsArray('select', [...statuses])
    },
    pulsing: {
      ...BOOLEAN_CONTROL
    },
    backgroundColor: {
      ...controlFromOptionsArray('select', colorNames)
    },
    textColor: {
      ...COLOR_CONTROL
    },
    backgroundColorHue: {
      ...COLOR_HUE_CONTROL
    },
    textColorHue: {
      ...COLOR_HUE_CONTROL
    },
  },
} as Meta<BadgeProps>;


type Color = BadgeProps['textColor'];

export const Standalone: StoryObj<BadgeProps> = {
  render: (args) => {
    
    const defaultArgs = {
      count: 1,
      // offset: [0, 0],
      outlined: false,
      overflowCount: 99,
      showZero: false,
      title: 'text',
      textColor: 'white' as Color,
    };

    return (
      <>
        <div
          style={{
            display: 'flex',
            background: args.outlined ? theme.palette['grey-200'] : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Badge
            {...defaultArgs}
            backgroundColor={'red' as Color}
            {...args}
            style={{
              margin: '0 6px 0 6px',
            }}
          />
          <Badge
            
            {...defaultArgs}
            backgroundColor={'yellow' as Color}
            backgroundColorHue='600'
            {...args}
            style={{
              margin: '0 6px 0 6px',
              alignItems: 'center',
            }}
          />
          <Badge
            {...defaultArgs}
            backgroundColor={'green' as Color}
            backgroundColorHue='600'
            {...args}
            style={{
              margin: '0 6px 0 6px',
              alignItems: 'center',
            }}
          />
          <Badge
            
            {...defaultArgs}
            backgroundColor={'grey' as Color}
            backgroundColorHue='500'
            {...args}
            style={{
              margin: '0 4px 0 6px',
              alignItems: 'center',
            }}
          />
          <div
            style={{
              minWidth: '34px',
              minHeight: '34px',
              background: theme.palette['grey-200'],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Badge
              {...defaultArgs}
              backgroundColor={'white'}
              textColor={'grey'}
              textColorHue='500'
              {...args}
              style={{
                boxShadow: args.outlined ? `0 0 0 1px ${theme.palette['grey-500']}` : '',
                minWidth: '16px',
                minHeight: '16px',
                margin: '9px 8px 7px 8px',
                alignItems: 'center',
              }}
            />
            <Badge
              {...defaultArgs}
              backgroundColor={'transparent'}
              textColor={'white'}
              {...args}
              style={{
                margin: '0 11px 0 4px',
                alignItems: 'center',
              }}
            />
          </div>
        </div>
      </>
    )
  },
  args: {

  }
};

type StoryProps = {
  iconSize: number;
  iconColor: string;
  title: string;
}
export const Dot: StoryObj<StoryProps> = {
  decorators: [fixedWrapper200],
  render: ({title, iconColor, iconSize }) => (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <Badge dot title={title}>
        <Icon color={'#fcc600' ||iconColor} size={iconSize} component={<FileM />} />
      </Badge>
      
      <Badge dot>
        <a style={{ marginTop: '10px', display: 'block' }} href="#">
          Link something
        </a>
      </Badge>
    </div>
  ),
  args: {
    title: 'text',
    iconColor: '#6a7580',
    iconSize: 30,
  }
};



export const Count: StoryObj<BadgeProps> = {
  decorators: [fixedWrapper200],
  render: (args) => {
    const iconStyles: CSSProperties = {
      position: 'absolute',
      top: '14px',
      right: '2px',
    }
    return (
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <Badge
          {...args}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'grey',
              borderRadius: '5px',
            }}
          />
        </Badge>
        
        <Badge
          {...args}
          count={
            <Icon
              component={<FileM />}
              size={24}
              color="#f5222d"
              style={iconStyles}
            />
          }
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'grey',
              borderRadius: '5px',
              margin: '10px 0 10px 10px',
            }}
          />
        </Badge>
      </div>
    )
  },
  args: {
    count: 5,
    title: 'Title',
    showZero: false,
    outlined: false,
    overflowCount: 99
  }
};


export const StatusDot: StoryObj<{status: StatusType}> = {
  render: ({ status }) => (
    <Badge status={status} text='test'/>
  ),
  args: {
    status: 'active'
  }
};


export const StatusDotWithAvatar: StoryObj<{status: StatusType} & AvatarProps> = {
  render: ({ status = 'active', size = 'extraLarge', shape = 'circle' }) => (
    <Badge status={status}>
      <Avatar
        size={size}
        shape={shape}
        src={'https://www.w3schools.com/howto/img_avatar.png'}
        hasStatus
      />
    </Badge>
  ),
  parameters: {
    controls: {
      include: ['size', 'shape', 'status']
    }
  },
  argTypes: {
    size: {
      defaultValue: 'default',
      ...controlFromOptionsArray('select', ['extraLarge', 'large', 'default', 'small'])
    },
    shape: {
      defaultValue: 'circle',
      ...controlFromOptionsArray('select', ['circle', 'square']),
    },
  },
  args: {
    status: 'active',
    shape: 'circle',
    size: 'medium'
  }
}


export const StatusDotPulsing: StoryObj<BadgeProps> = {

  parameters: {
    controls: {
      include: ['status']
    }
  },
  render: (args) => (
    <Badge
      {...args}
      pulsing={true}
      flag={true}
    />
  ),
  args: {
    status: 'active'
  }
};

export const StatusDotPulsingWithLabel: StoryObj<BadgeProps> = {
  parameters: {
    controls: {
      include: ['status']
    }
  },
  render: (args) => (
    <Badge
      {...args}
      text={"Success"}
      pulsing={true}
      flag={true}
    />
  ),
  args: {
    status: 'active'
  }
};

export const StatusDotPulsingWithElement: StoryObj<BadgeProps> = {
  parameters: {
    controls: {
      include: ['status']
    }
  },
  render: (args) => (
    <Badge {...args} pulsing={true} flag={true}>
      <div style={{width: '48px', height: '48px', background: 'grey', borderRadius: '5px'}} />
    </Badge>
  ),
  args: {
    status: 'active'
  }
};

export const StatusDotPulsingWithIcon: StoryObj<Pick<BadgeProps, 'status' | 'pulsing'> & Pick<IconProps, 'color' | 'size'>> = {
  parameters: {
    controls: {
      include: ['status', 'color', 'size']
    }
  },
  render: (args) => {
    const { color, size, ...badgeProps } = args;
    return (
    <Badge {...badgeProps} flag={true}>
      <Icon color={'#fcc600' || color } size={size} component={<FileM />} />
    </Badge>
  )},
  argTypes: {
    size: {
      description: 'Icon size',
      ...NUMBER_CONTROL
    },
    color: {
      description: 'Icon color',
      ...NUMBER_CONTROL
    }
  },
  args: {
    status: 'active', 
    pulsing: true, 
    color: '#6a7580', 
    size: 24 
  }
}

export const StatusDotPulsingWithAvatar: StoryObj<Pick<BadgeProps, 'status' | 'pulsing'> & AvatarProps> = {
  parameters: {
    controls: {
      include: ['status', 'size', 'shape', 'pulsing']
    }
  },
  render: ({ status, pulsing, size, shape }) => {
    return (
      <Badge status={status} pulsing={pulsing} flag={true}>
        <Avatar
          size={size}
          shape={'circle' || shape}
          src={'https://www.w3schools.com/howto/img_avatar.png'}
          hasStatus
        />
      </Badge>
    )
  },
  argTypes: {
    size: {
      defaultValue: 'default',
      ...controlFromOptionsArray('select', ['extraLarge', 'large', 'default', 'small'])
    },
    shape: {
      defaultValue: 'circle',
      ...controlFromOptionsArray('select', ['circle', 'square']),
    },
  },
  args: {
    status: 'active',
    shape: 'circle',
    size: 'medium' as Size
  }
}

