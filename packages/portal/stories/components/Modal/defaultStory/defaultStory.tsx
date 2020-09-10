import * as React from 'react';
import Modal from '@synerise/ds-modal/dist/Modal';
import Button from '@synerise/ds-button';
import { propsWithKnobs } from '../index.stories';
import { withState } from '@dump247/storybook-state';

const DEFAULT_STATE = {
  visible: false,
};

const defaultStory = withState(DEFAULT_STATE)(({ store }) => {
    const spread = propsWithKnobs();

    return (
      <div style={{width: '100%', left: 0, top: 0, position: 'absolute', height: '100%', padding: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
        <Button type={'primary'} onClick={() => store.set({visible: true})}>
          Show modal
        </Button>
        <Modal
          {...spread}
          visible={store.state.visible}
          onCancel={() => store.set({visible: false})}
          footer={
            spread.removeFooter ? null : !spread.renderCustomFooter ? (
              undefined
            ) : (
              <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <div style={{ width: '100%', display: 'flex' }}>
                  <Button type="secondary">Settings</Button>
                </div>

                <div style={{ display: 'flex' }}>
                  <Button type="ghost">Cancel</Button>

                  <Button type="primary" loading={propsWithKnobs().confirmLoading}>
                    Apply
                  </Button>
                </div>
              </div>
            )
          }
          headerActions={
            propsWithKnobs().showHeaderAction && (
              <Button type="ghost" onClick={() => window.alert('You just clicked on an additional header button')}>
                Additional Button
              </Button>
            )
          }
        >
          Some contents...
        </Modal>
      </div>
    )
  })

export default defaultStory;
