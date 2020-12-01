import * as React from 'react';
import Modal from '@synerise/ds-modal/dist/Modal';
import Button from '@synerise/ds-button';
import { propsWithKnobs } from '../index.stories';
import { withState } from '@dump247/storybook-state';
import * as S from './styles';
import Stepper from '@synerise/ds-stepper';

const DEFAULT_STATE = {
  visible: false,
};

const withStepper = withState(DEFAULT_STATE)(({ store }) => {
  const spread = propsWithKnobs();

  return (
    <div
      style={{
        width: '100%',
        left: 0,
        top: 0,
        position: 'absolute',
        height: '100%',
        padding: 24,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Button type={'primary'} onClick={() => store.set({ visible: true })}>
        Show modal
      </Button>
      <Modal
        {...spread}
        visible={store.state.visible}
        onCancel={() => store.set({ visible: false })}
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
        <S.StepperWrapper>
          <Stepper style={{ width: '100%', justifyContent: 'center' }}>
            <Stepper.Step label={'Details'} stepNumber={1} active />
            <Stepper.Step label={'Settings'} stepNumber={2} />
            <Stepper.Step label={'Filters'} stepNumber={3} />
            <Stepper.Step label={'Ranking'} stepNumber={4} />
          </Stepper>
        </S.StepperWrapper>
      </Modal>
    </div>
  );
});

export default withStepper;
