import * as React from 'react';
import Alert from '@synerise/ds-alert';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import {
  Add3M,
  AppleFillM,
  ArrowUpCircleM,
  DollarCircleM,
  RefreshM,
} from '@synerise/ds-icon/dist/icons';
import AlertInfo from '@synerise/ds-alert/dist/AlertInfo/AlertInfo';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';

const decorator = storyFn => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }}
  >
    {storyFn()}
  </div>
);
const getDefaultProps = () => ({
  type: select('Select type', types, 'error'),
});
const iconSizes = {
  Large: 'L',
  ExtraLarge: 'XL',
};
const fontSizes = {
  Small: 'small',
  Medium: 'medium',
};
const types = {
  success: 'success',
  warning: 'warning',
  error: 'error',
};
const typesText = {
  success: 'Campaign has been send to the customers.',
  warning: 'The form must be completed before sending the campaign.',
  error: 'Please reload this content or notify our helpdesk.',
};
const typesHeaders = {
  success: 'Campaign successful send',
  warning: 'Please fill the form.',
  error: 'Some problem occured',
};
const buttonSetExample = (
  <>
    <Button mode="icon-label" type="ghost" onClick={action('onClick: Cancel')}>
      <Icon component={<RefreshM />} />
      Refresh list
    </Button>
  </>
);

const ALERT_TYPES = ['success', 'warning', 'error', 'info'];

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
  'violet',
];

const MODES = ['', 'background', 'background-outline', 'outline', 'clear'];

const CUSTOM_ICONS = ['default', 'Add3M', 'AppleFillM', 'ArrowUpCircleM', 'DollarCircleM'];

const ICONS = {
  default: null,
  Add3M: <Add3M />,
  AppleFillM: <AppleFillM />,
  ArrowUpCircleM: <ArrowUpCircleM />,
  DollarCircleM: <DollarCircleM />,
};

const stories = {
  default: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
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
    );
  },
  inlineAlerts: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '400px',
          height: '100%',
          margin: '0 auto',
        }}
      >
        <Alert.InlineAlert type="warning" message="Inline warning" />
        <Alert.InlineAlert type="alert" message="Inline alert" />
        <Alert.InlineAlert type="success" message="Inline success" />
      </div>
    );
  },
  allSizes: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
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
    );
  },
  allModes: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
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
    );
  },
  allTypes: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
      </div>
    );
  },
  alertWithIcon: () => {
    const props = getDefaultProps();
    const Description = select(
      'Description',
      typesText,typesText.error
    );
    const Header = select('Title', typesHeaders,typesHeaders.error);
    const iconSize = select('Size of icon', iconSizes,iconSizes.Large);
    const fontSize = select('Set size of text',fontSizes, fontSizes.Small);
    const showButton = boolean('Set button', true);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <AlertInfo
          {...props}
          fontSize={fontSize}
          text={Header}
          size={iconSize}
          label={Description}
          button={ showButton ? buttonSetExample : null}
          labelPosition="bottom"
        />
      </div>
    );
  },
};

export default {
  name: 'Components/Alert',
  config: {},
  decorator,
  stories,
  Component: Alert,
};
