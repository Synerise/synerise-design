import * as React from 'react';
import Modal, { buildModalFooter } from "@synerise/ds-modal";
import Button from '@synerise/ds-button';
import { propsWithKnobs } from '../index.stories';
import { withState } from '@dump247/storybook-state';
import * as S from '@synerise/ds-modal/dist/Modal.styles';

const DEFAULT_STATE = {
  visible: false,
};

const defaultStory = withState(DEFAULT_STATE)(({ store }) => {
    const spread = propsWithKnobs();
    const buildFooter = () => buildModalFooter({
      ...(spread as any),
      okButtonProps: {loading: propsWithKnobs().confirmLoading},
      prefix: <div style={{ width: '100%', display: 'flex' }}>
        <Button type="secondary">{spread.settingButton}</Button>
      </div>})
    return (
      <div style={{width: '100%', left: 0, top: 0, position: 'absolute', height: '100%', padding: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
        <Button type={'primary'} onClick={() => store.set({visible: true})}>
          Show modal
        </Button>
        <Modal
          {...spread}
          visible={store.state.visible}
          onCancel={() => store.set({visible: false})}
          footer={ spread.removeFooter ? null : (spread.renderCustomFooter ? buildFooter() : undefined) }
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
