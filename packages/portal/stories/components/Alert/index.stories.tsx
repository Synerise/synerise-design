import * as React from 'react';
import Alert from '@synerise/ds-alert';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import {
  Add3M,
  AppleFillM,
  ArrowUpCircleM, Check3M,
  DollarCircleM, HelpFillM, InfoFillM,
  RefreshM, WarningFillM,
} from '@synerise/ds-icon/dist/icons';
import AlertInfo from '@synerise/ds-alert/dist/AlertInfo/AlertInfo';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import AlertSemanticColor from '@synerise/ds-alert/dist/ColorSemantic/AlertSemanticColor';
import UserCheckM from '@synerise/ds-icon/dist/icons/UserCheckM';
import NotificationsReceiveM from '@synerise/ds-icon/dist/icons/NotificationsReceiveM';
import UpdateDataM from '@synerise/ds-icon/dist/icons/UpdateDataM';
import mdx from './Alert.mdx';

const getDefaultProps = () => ({
  type: select('Select type', types, 'error'),
});
const sizes = {
  Small: 'small',
  Medium: 'medium',
};
const types = {
  success: 'success',
  warning: 'warning',
  error: 'error',
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
const SEMANTIC_COLOR_TYPES = ['positive', 'notice' , 'negative' , 'informative' , 'neutral','supply' , 'service' , 'entity'];


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

const additionalMapper = {
  positive: {color:'green',icon: <Check3M />},
  notice: {color:'yellow',icon: <WarningFillM />},
  negative: {color:'red',icon: <WarningFillM />},
  informative: {color:'blue',icon: <InfoFillM />},
  neutral: {color:'grey',icon: <HelpFillM/>},
  supply: {color:'violet',icon: <UserCheckM/>},
  service: {color:'purple',icon: <UpdateDataM/>},
  entity: {color:'cyan',icon: <NotificationsReceiveM/>},
};

const MODES = ['', 'background', 'background-outline', 'outline', 'clear'];

const CUSTOM_ICONS = ['default', 'Add3M', 'AppleFillM', 'ArrowUpCircleM', 'DollarCircleM'];

const ICONS = {
  default: null,
  Add3M: <Add3M />,
  AppleFillM: <AppleFillM />,
  ArrowUpCircleM: <ArrowUpCircleM />,
  DollarCircleM: <DollarCircleM />,
};

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters:{
    docs:{
      page:mdx,
      inlineStories: false,
      // iframe: {
      //   height: '750px'
      // }
    }
  },
  decorators: [
    (Story) => (
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
      }}>
        <Story/>
      </div>
    )
  ] 
};

export const Basic = () => {
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
  };

 export const inlineAlerts = () => {
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
        <Alert.InlineAlert type="info" message="Inline info" />
      </div>
    );
  };
export const allSizes = () => {
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
  };

  export const allModes = () => {
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
  };

  export const allTypes = () => {
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
  };

export const alertWithIcon = () => {
    const props = getDefaultProps();
    const Description = text(
      'Description',
      'Please reload this content or notify our helpdesk.'
    );
    const Header = text('Title', 'Some problem occured');
    const size = select('Set size',sizes, sizes.Small);
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
          fontSize={size}
          text={Header}
          size={size}
          label={Description}
          button={ showButton ? buttonSetExample : null}
          labelPosition="bottom"
        />
      </div>
    );
  };
export const AlertSemanticColors = () => {
    const type = select('Set type', SEMANTIC_COLOR_TYPES, 'positive')
    const showMore = boolean('Set one more', true)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <AlertSemanticColor type={type} color={additionalMapper[type].color} mode='background-outline'/>
        <br />
        <AlertSemanticColor type={type} color={additionalMapper[type].color} mode='background'/>
        <br />
        <AlertSemanticColor type={type} color={additionalMapper[type].color} mode='clear'/>
        <br />
        {showMore && (
        <AlertSemanticColor type={type} color={additionalMapper[type].color} mode='shadow'/>)}
      </div>
    );
  };