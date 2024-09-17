import React from 'react';
import { propsWithKnobs, sizes } from '../index.stories';
import { boolean, select, text } from '@storybook/addon-knobs';
import Switch from '@synerise/ds-switch';
import Button from '@synerise/ds-button';
import Modal, { buildModalFooter } from '@synerise/ds-modal';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

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
  Blank: FooterTypes.BLANK,
};

const mockModalProps = {
  // since we do not offer closing the modal feature in this story - lets keep it disbaled
  okButtonProps: { disabled: true },
  cancelButtonProps: { disabled: true },
};

const customFooterProps = (headerType: string, switchEnabled: boolean, setSwitchEnabled: (state: boolean) => void) => {
  switch (headerType) {
    case FooterTypes.DEFAULT: {
      return {
        ...(boolean('Clickable OK, Close buttons', false)
          ? {
              onCancel: action('Cancel'),
              onOk: action('Ok'),
            }
          : {}),
      };
    }
    case FooterTypes.DEFAULT_WITH_BUTTON:
      // in this case we replace only prefix with a additional button
      return {
        footer: buildModalFooter({
          ...(propsWithKnobs() as any),
          ...mockModalProps,
          CustomFooterButton: <button>Custom button</button>,
          // CustomFooterButton: <button>Custom button</button>,
          prefix: (
            <div style={{ width: '100%', display: 'flex' }}>
              <Button type="secondary">{propsWithKnobs().settingButton}</Button>
            </div>
          ),
        }),
      };
    case FooterTypes.DEFAULT_WITH_SWITCH:
      return {
        // in this case we set prefix as a switch component
        footer: buildModalFooter({
          ...(propsWithKnobs() as any),
          ...mockModalProps,
          prefix: (
            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Switch
                onChange={setSwitchEnabled}
                label={text('Set switch label', 'Show property')}
                checked={switchEnabled}
              />
            </div>
          ),
        }),
      };
    case FooterTypes.BLANK: {
      return { footer: null };
    }
    default: {
      return null;
    }
  }
};

const DEFAULT_STATE = {
  switchEnabled: false,
};

const withFooters = withState(DEFAULT_STATE)(({ store }) => {
  const footer = select('Set footer type', FooterKnobs, FooterTypes.DEFAULT);
  return (
    <Modal
      size={select('Size', sizes, null)}
      visible={boolean('Set open', true)}
      title="Modal with footer"
      {...customFooterProps(footer, store.state.switchEnabled, switchEnabled => store.set({ switchEnabled }))}
    >
      Modal content...
    </Modal>
  );
});

export default withFooters;
