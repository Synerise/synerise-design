import * as React from 'react';
import Modal, { buildModalFooter } from "@synerise/ds-modal/dist/Modal";
import Button from '@synerise/ds-button';
import { propsWithKnobs } from '../index.stories';
import { withState } from '@dump247/storybook-state';
import * as S from './styles';
import Stepper from '@synerise/ds-stepper';
import { boolean, select, text } from '@storybook/addon-knobs';
import Radio from '@synerise/ds-radio';

const DEFAULT_STATE = {
  visible: false,
  activeStep: 0,
};

const steps = [
  {
    number: 1,
    label: 'Details',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    number: 2,
    label: 'Settings',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    number: 3,
    label: 'Filters & Facets',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    number: 4,
    label: 'Ranking',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
];

const withStepper = withState(DEFAULT_STATE)(({ store }) => {
  const spread = propsWithKnobs();
  const showTooltip = boolean('Show step tooltip', false);
  const invalidStep = select('Set index of invalid step', [0, 1, 2, 3, '-'], '-');
  const buildFooter = () =>
    buildModalFooter({
      ...(spread as any),
      okButtonProps: {loading: propsWithKnobs().confirmLoading},
      prefix: <div style={{ width: '100%', display: 'flex' }}>
        <Button type="secondary">{spread.settingButton}</Button>
      </div>});
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
          spread.removeFooter ? null : (spread.renderCustomFooter ? buildFooter() : undefined)
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
            {steps.map((step, index) => (
              <Stepper.Step
                onClick={() => store.set({ activeStep: index })}
                label={step.label}
                stepNumber={step.number}
                active={index === store.state.activeStep}
                done={index < store.state.activeStep || boolean('All steps done', false)}
                validated={invalidStep === index}
                tooltip={showTooltip && text('Set tooltip text', 'Tooltip info')}
                children={step.children}
              />
            ))}
          </Stepper>
        </S.StepperWrapper>
      </Modal>
    </div>
  );
});

export default withStepper;
