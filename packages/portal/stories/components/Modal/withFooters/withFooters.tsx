import * as React from 'react';
import { propsWithKnobs, sizes } from '../index.stories';
import { boolean, select, text } from '@storybook/addon-knobs';
import Switch from '@synerise/ds-switch';
import Button from '@synerise/ds-button';
import ModalProxy from '@synerise/ds-modal';
import { action } from '@storybook/addon-actions';

const FooterTypes = {
  DEFAULT: 'DEFAULT',
  DEFAULT_WITH_BUTTON: 'DEFAULT_WITH_BUTTON',
  DEFAULT_WITH_SWITCH: 'DEFAULT_WITH_SWITCH',
  BLANK: 'BLANK',
};
const FooterKnobs = {
  Default: FooterTypes.DEFAULT,
  WithSwitch: FooterTypes.DEFAULT_WITH_SWITCH,
  WithButton: FooterTypes.DEFAULT_WITH_BUTTON,
  Blank: FooterTypes.BLANK
};

const customFooterProps = (headerType: string) => {
  switch (headerType) {
    case FooterTypes.DEFAULT: {
      return {
        onCancel: action('Cancel'),
        onOk: action('Ok'),
      }
    };
    case FooterTypes.DEFAULT_WITH_BUTTON:
      return {
        footer: <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <div style={{ width: '100%', display: 'flex' }}>
            <Button type="secondary">Settings</Button>
          </div>
          <div style={{ display: 'flex' }}>
            <Button type="ghost">Cancel</Button>

            <Button type="primary">
              Apply
            </Button>
          </div>
        </div>,
      };
    case FooterTypes.DEFAULT_WITH_SWITCH:
      return {
        footer: <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Switch label={text('Set switch label', 'Show property')} checked />
          </div>
          <div style={{ display: 'flex' }}>
            <Button type="ghost">Cancel</Button>

            <Button type="primary">
              Apply
            </Button>
          </div>
        </div>,
      };
    case FooterTypes.BLANK: {
      return { footer: true };
    }
    default: {
      return null
    }
  }
};

const withFooters = () => {
  const footer = select('Set footer type', FooterKnobs, FooterTypes.DEFAULT);
  return <ModalProxy
    size={select('Size', sizes, null)}
    visible={boolean('Set open', true)}
    title="Modal with footer"
    {...customFooterProps(footer)}
  >Modal content...</ModalProxy>;
};

export default withFooters;
