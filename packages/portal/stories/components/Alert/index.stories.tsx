import * as React from 'react';
import Alert from '@synerise/ds-alert';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { Add3M, AppleFillM, ArrowUpCircleM, CartM, DollarCircleM } from '@synerise/ds-icon/dist/icons';

const decorator = storyFn => <div style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>{storyFn()}</div>;

const ALERT_TYPES = [
  'success',
  'warning',
  'error',
  'info',
];

const CUSTOM_COLORS = [
  '',
  'blue',
  'grey',
  'red',
  'green',
  'yellow',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet'
];

const MODES = [
  '',
  'background',
  'background-outline',
  'outline',
  'clear',
];

const CUSTOM_ICONS = [
  'default',
  'Add3M',
  'AppleFillM',
  'ArrowUpCircleM',
  'DollarCircleM',
];

const ICONS = {
  'default': null,
  'Add3M': <Add3M />,
  'AppleFillM': <AppleFillM />,
  'ArrowUpCircleM': <ArrowUpCircleM />,
  'DollarCircleM': <DollarCircleM />,
};


const stories = {
  default: () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
        <Alert
          showIcon={boolean('Show icon', true)}
          closeText={text('Close text', '')}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type={select('Set type', ALERT_TYPES, 'success')}
          mode={select('Set mode', MODES, '')}
          color={select('Set custom color', CUSTOM_COLORS, '')}
          icon={ICONS[select('Set custom icon', CUSTOM_ICONS, 'default')]}
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
      </div>
    )
  },
  allSizes: () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type={select('Set type', ALERT_TYPES, 'success')}
          mode="background"
          color={select('Set custom color', CUSTOM_COLORS, '')}
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br />
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type={select('Set type', ALERT_TYPES, 'success')}
          mode="background"
          color={select('Set custom color', CUSTOM_COLORS, '')}
        />
        <br />
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          type={select('Set type', ALERT_TYPES, 'success')}
          mode="background"
          color={select('Set custom color', CUSTOM_COLORS, '')}
        />
      </div>
    )
  },
  allModes: () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type={select('Set type', ALERT_TYPES, 'success')}
          mode="background"
          color={select('Set custom color', CUSTOM_COLORS, '')}
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br />
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type={select('Set type', ALERT_TYPES, 'success')}
          mode="background-outline"
          color={select('Set custom color', CUSTOM_COLORS, '')}
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br />
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type={select('Set type', ALERT_TYPES, 'success')}
          mode="outline"
          color={select('Set custom color', CUSTOM_COLORS, '')}
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br />
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type={select('Set type', ALERT_TYPES, 'success')}
          mode="clear"
          color={select('Set custom color', CUSTOM_COLORS, '')}
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
      </div>
    )
  },
  allTypes: () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
      }}>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="blue"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="grey"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="red"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="green"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="yellow"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="pink"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="mars"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="orange"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="fern"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="cyan"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="purple"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
        <Alert
          showIcon={boolean('Show icon', true)}
          description={text('Description', 'This simple modal alert description')}
          message={text('Message', 'Success!')}
          type="custom"
          mode={select('Set mode', MODES, '')}
          color="violet"
          showMoreLabel={text('Show more', 'Show more')}
          onShowMore={boolean('Enable show more', true) && action('Show more')}
        />
        <br/>
      </div>
    )
  },
};

export default {
  name: 'Components|Alert',
  config: {},
  decorator,
  stories,
  Component: Alert,
}
