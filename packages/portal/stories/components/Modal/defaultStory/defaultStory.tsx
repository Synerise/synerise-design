import * as React from 'react';
import Modal from '@synerise/ds-modal/dist/Modal';
import Button from '@synerise/ds-button';
import { propsWithKnobs } from '../index.stories';

const defaultStory = () => {
  const spread = propsWithKnobs();

  return (
    <React.Fragment>
      Some page content
      <Modal
        {...spread}
        onCancel={() => window.alert('onCancel event triggered')}
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
    </React.Fragment>
  );
};
export default defaultStory;
