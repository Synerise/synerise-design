import React, { MouseEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { fn } from '@storybook/test';

import Icon, { AngleDownS, CheckS } from '@synerise/ds-icon';
import { ButtonToggle } from '@synerise/ds-button';
import type { ButtonToggleProps } from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { theme } from '@synerise/ds-core';

import {
    buttonDecorator,
    BOOLEAN_CONTROL,
    CLASSNAME_ARG_CONTROL,
    PREFIXCLS_ARG_CONTROL,
    reactNodeAsSelect,
    controlFromOptionsArray,
} from '../../utils';


type Story = StoryObj<ButtonToggleProps>;

const meta: Meta<ButtonToggleProps> = {
    title: 'Components/Button/ButtonToggle',
    render: ({ children, ...args }) => {
        const [{ activated }, updateArgs] = useArgs()
        const handleClick = (event: MouseEvent<HTMLElement>) => {
            args.onClick?.(event);
            updateArgs({ activated: !activated });

        }
        return <ButtonToggle {...args} activated={activated} onClick={handleClick}>{children}</ButtonToggle>
    },
    tags: ['autodocs'],
    component: ButtonToggle,
    decorators: [buttonDecorator],
    parameters: {
        layout: 'fullscreen',
        controls: {
            exclude: ['href', 'target', 'htmlType', 'groupVariant', 'justifyContent', 'shape'],
        },
    },
    argTypes: {
        activated: BOOLEAN_CONTROL,
        error: BOOLEAN_CONTROL,
        readOnly: BOOLEAN_CONTROL,
        loading: BOOLEAN_CONTROL,
        disabled: BOOLEAN_CONTROL,
        icon: {
            ...reactNodeAsSelect(['AngleDownS', 'CheckS'], {
                AngleDownS: <Icon component={<AngleDownS />} />,
                CheckS: <Icon component={<CheckS />} />,
            }),
        },
        tagProps: {
            ...reactNodeAsSelect(['none', 'tag 1', 'tag 2'], {
                none: undefined,
                'tag 1': {
                    name: 'ON',
                    color: theme.palette['green-600'],
                },
                'tag 2': {
                    name: '5/12 HRS',
                    color: theme.palette['grey-400'],
                },
                'tag 3': {
                    name: '5/12 HRS',
                    color: theme.palette['grey-400'],
                },
            }),
        },
        className: CLASSNAME_ARG_CONTROL,
        prefixCls: PREFIXCLS_ARG_CONTROL,
        size: {
            table: {
                defaultValue: {
                    summary: 'undefined',
                },
            },
            ...controlFromOptionsArray('inline-radio', ['', 'large']),
        },

        block: {
            description: 'Display as a block element',
            ...BOOLEAN_CONTROL,
        },

        type: {
            ...controlFromOptionsArray('radio', ['solid', 'ghost']),
        },
        mode: {
            table: {
                disable: true,
            },
        },
        children: {
            name: 'children',
            description: 'Button label',
            control: false,
            table: {
                type: {
                    summary: 'ReactNode',
                },
            },
        },
    },
    args: {
        type: 'solid',
        onClick: fn()
    }
};

export default meta;

export const Simple: Story = {
    parameters: {
        controls: {
            exclude: [...meta?.parameters?.controls.exclude, 'icon', 'iconColor'],
        },
    },
    args: {
        children: 'Label',
        type: 'primary',
    },
};

export const IconSolo: Story = {
    ...Simple,
    args: {
        type: 'primary',
        mode: 'single-icon',
        children: <Icon component={<AngleDownS />} />,
    },
};

export const IconLeft: Story = {
    ...IconSolo,
    args: {
        children: (
            <>
                <Icon component={<AngleDownS />} />
                Label
            </>
        ),
        mode: 'icon-label',
    },
};

export const IconRight: Story = {
    ...IconLeft,
    render: ({ icon, children, ...args }) => {
        const [{ activated }, updateArgs] = useArgs()
        const handleClick = (event: MouseEvent<HTMLElement>) => {
            args.onClick?.(event);
            updateArgs({ activated: !activated });

        }
        return (
            <ButtonToggle {...args} activated={activated} onClick={handleClick}>
                {children}
                {icon}
            </ButtonToggle>
        )
    },
    args: {
        children: 'Label',
        icon: <Icon component={<AngleDownS />} />,
        mode: 'label-icon',
    },
};

export const TwoIcons: Story = {
    ...IconLeft,
    render: ({ icon, children, ...args }) => {
        const [{ activated }, updateArgs] = useArgs()
        const handleClick = (event: MouseEvent<HTMLElement>) => {
            args.onClick?.(event);
            updateArgs({ activated: !activated });

        }
        return (
            <ButtonToggle {...args} activated={activated} onClick={handleClick}>
                {icon}
                {children}
                {icon}
            </ButtonToggle>
        )
    },
    args: {
        icon: <Icon component={<AngleDownS />} />,
        children: 'Label',
        mode: 'two-icons',
    },
};

export const SplitRight: Story = {
    args: {
        children: (
            <>
                Label <Icon component={<AngleDownS />} />{' '}
            </>
        ),
        mode: 'split',
    },
};

export const CustomLabel: Story = {
    parameters: {
        controls: {
            exclude: [...meta?.parameters?.controls.exclude, 'icon', 'iconColor'],
        },
    },
    argTypes: {
        children: {
            control: false,
        },
    },
    args: {
        children: (
            <span style={{ fontWeight: 400 }}>
                <span style={{ display: 'inline' }}>Show</span>{' '}
                <strong style={{ display: 'inline', fontWeight: 500 }}>10</strong>{' '}
                <span style={{ display: 'inline' }}>more</span>
            </span>
        ),
        type: 'primary',
    },
};

export const DisabledTooltip: Story = {
    render: args => {
        const { disabled } = args;
        const buttonElement = <ButtonToggle {...args} disabled={disabled} />;
        return disabled ? (
            <Tooltip title="This element is disabled">
                <span data-testid="button-disabled-wrapper">{buttonElement}</span>
            </Tooltip>
        ) : (
            buttonElement
        );
    },
    args: {
        children: 'Label',
        disabled: true,
        type: 'primary',
    },
};
