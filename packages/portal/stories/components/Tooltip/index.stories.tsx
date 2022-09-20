import * as React from 'react';
import { boolean, text, select, number } from '@storybook/addon-knobs';

import Tooltip from '@synerise/ds-tooltip';
import { UserAvatar } from '@synerise/ds-avatar';
import Icon, { InfoFillS, InfoM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import { action } from '@storybook/addon-actions';
import Status from '@synerise/ds-status';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const decorator = storyFn => <div style={{ padding: '60px' }}>{storyFn()}</div>;

const TUTORIALS = [
  {
    title: 'Tip for you - 1',
    description: 'You can change profile name later in your profile settings.',
  },
  {
    title: 'Tip for you - 2',
    description: 'You can change avatar later in your profile settings.',
  },
  {
    title: 'Tip for you - 3',
    description: 'You can change password later in your profile settings.',
  },
];

const props = () => ({
  placement: select(
    'Placement',
    [
      'top',
      'left',
      'right',
      'bottom',
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
      'leftTop',
      'leftBottom',
      'rightTop',
      'rightBottom',
    ],
    'top'
  ),
  trigger: select('Trigger', ['hover', 'focus', 'click', 'contextMenu'], 'hover'),
});

const tutorialProps = () => ({
  tutorialAutoplay: boolean('Enable tutorial autoplay', true),
  tutorialAutoplaySpeed: number('Set speed of tutorial [ms]', 5000),
  tutorials: TUTORIALS,
});

const stories = {
  default: () => (
    <div>
      <Tooltip {...props()} type="default" title={text('Set tooltip title', 'More than just example text')}>
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  ),
  icon: () => (
    <div>
      <Tooltip
        {...props()}
        type="icon"
        title={text('Set tooltip title', 'More than just example text')}
        description={text(
          'Set tooltip description',
          'You can change profile name later in your profile settings. More info'
        )}
      >
        <Button type="primary">Show more</Button>
      </Tooltip>
    </div>
  ),
  large: () => (
    <div>
      <Tooltip
        {...props()}
        type="largeSimple"
        description={text(
          'Set tooltip description',
          'You can change profile name later in your profile settings. More info'
        )}
        offset="small"
      >
        <span style={{ display: 'flex' }}>
          <Icon component={<InfoFillS />} color={theme.palette['grey-400']} />
        </span>
      </Tooltip>
    </div>
  ),
  WithHeaderAndLabel: () => (
    <div>
      <Tooltip
        {...props()}
        type="header-label"
        offset="small"
        title={text('Set tooltip title', 'Icon tooltip')}
        description={text('Set tooltip description', 'You can change profile name later in your profile settings.')}
      >
        <span style={{ display: 'flex' }}>
          <Icon component={<InfoFillS />} color={theme.palette['grey-400']} />
        </span>
      </Tooltip>
    </div>
  ),
  withAPI: () => (
    <div>
      <Tooltip
        {...props()}
        status={<Status type="disabled" label="API" />}
        type="status"
        title={text('Set tooltip title', 'Shovel Import')}
        description={text('Set tooltip description', '2••••00b97')}
      >
        <span style={{ display: 'flex' }}>
          <Icon component={<InfoFillS />} color={theme.palette['grey-400']} />
        </span>
      </Tooltip>
    </div>
  ),
  avatar: () => {
    const tooltipProps = props();
    const firstName = text('Set first name', 'Jan');
    const lastName = text('Set last name', 'Nowak');
    const tooltip = {
      title: `${firstName} ${lastName}`,
      description: text('Set email', 'jan.nowak@gmail.com'),
      ...tooltipProps,
    };
    const user = { firstName, lastName };

    return <UserAvatar backgroundColor="blue" user={user} tooltip={tooltip} />;
  },
  tutorial: () => (
    <div>
      <Tooltip {...props()} {...tutorialProps()} type="tutorial" tutorials={TUTORIALS}>
        <Button type="primary">Show tips</Button>
      </Tooltip>
    </div>
  ),
  button: () => (
    <div>
      <Tooltip
        {...props()}
        title={text('Set title', 'Tip for you')}
        description={text('Set description', 'You can change profile name later in your profile settings')}
        type="button"
        button={{
          label: text('Set button label', 'More info'),
          onClick: action('click'),
          buttonIcon: boolean('Show button icon', true) && <Icon component={<InfoM />} />,
        }}
      >
        <Button type="primary">Show tips</Button>
      </Tooltip>
    </div>
  ),
};

export default {
  name: 'Components/Tooltip',
  decorator,
  stories,
  Component: Tooltip,
};
