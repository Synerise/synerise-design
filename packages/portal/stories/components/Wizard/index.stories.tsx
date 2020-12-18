import * as React from 'react';

import Wizard from '@synerise/ds-wizard';
import { boolean, text } from '@storybook/addon-knobs';
import Stepper from '@synerise/ds-stepper';
import Radio from '@synerise/ds-radio';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import Button from '@synerise/ds-button';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { AcademyM, ChatM, HelpM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';

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
    label: 'Filters & Facets in analytics',
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

const DEFAULT_STATE = {
  activeStep: 0,
  visible: false,
};

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const setActiveStep = index => store.set({ activeStep: index });
    const handlePrevStep = () => store.set({ activeStep: store.state.activeStep - 1 });
    const handleNextStep = () => store.set({ activeStep: store.state.activeStep + 1 });
    const handleClose = () => store.set({ visible: false });
    const handleShow = () => store.set({ visible: true });
    return (
      <>
        <Wizard
          visible={store.state.visible}
          title={text('Set wizard title', 'Wizard title')}
          onClose={handleClose}
          headerAction={<Button onClick={action('header action')}>Save and skip wizard</Button>}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          contentWidth={'588px'}
          texts={{
            prevButtonLabel: 'Back',
            nextButtonLabel: store.state.activeStep === 3 ? 'Complete' : 'Next step',
          }}
          stepper={
            <Stepper>
              {steps.map((step, index) => (
                <Stepper.Step
                  onClick={() => setActiveStep(index)}
                  label={step.label}
                  stepNumber={step.number}
                  active={index === store.state.activeStep}
                  done={index < store.state.activeStep || boolean('All steps done', false)}
                  validated={false}
                  tooltip={false}
                  children={step.children}
                />
              ))}
            </Stepper>
          }
          footer={
            <>
              <Button mode="icon-label" type="ghost" onClick={action('AI Search help')}>
                <Icon component={<AcademyM />} /> AI Search Help
              </Button>
              <Button mode="icon-label" type="ghost" onClick={action('Feedback about AI Search')}>
                <Icon component={<ChatM />} /> Feedback about AI Search?
              </Button>
              <Button mode="icon-label" type="ghost" onClick={action('Contact support')}>
                <Icon component={<HelpM />} /> Contact support
              </Button>
            </>
          }
        >
          <div style={{ width: '100%', height: '500px', backgroundColor: theme.palette['red-200'] }}></div>
        </Wizard>
        <Button onClick={handleShow}>Show wizard</Button>
      </>
    );
  }),
  onModal: withState(DEFAULT_STATE)(({ store }) => {
    const setActiveStep = index => store.set({ activeStep: index });
    const handlePrevStep = () => store.set({ activeStep: store.state.activeStep - 1 });
    const handleNextStep = () => store.set({ activeStep: store.state.activeStep + 1 });
    const handleClose = () => store.set({ visible: false });
    const handleShow = () => store.set({ visible: true });
    return (
      <>
        <Wizard.OnModal
          modalProps={{
            size: 'large',
          }}
          visible={store.state.visible}
          title={text('Set wizard title', 'Wizard title')}
          onClose={handleClose}
          headerAction={<Button onClick={action('header action')}>Save and skip wizard</Button>}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          contentWidth={'588px'}
          texts={{
            prevButtonLabel: 'Back',
            nextButtonLabel: store.state.activeStep === 3 ? 'Complete' : 'Next step',
          }}
          stepper={
            <Stepper size={'small≥'}>
              {steps.map((step, index) => (
                <Stepper.Step
                  onClick={() => setActiveStep(index)}
                  label={step.label}
                  stepNumber={step.number}
                  active={index === store.state.activeStep}
                  done={index < store.state.activeStep || boolean('All steps done', false)}
                  validated={false}
                  tooltip={false}
                  children={step.children}
                />
              ))}
            </Stepper>
          }
          footer={
            <>
              <Button mode="icon-label" type="ghost" onClick={action('AI Search help')}>
                <Icon component={<AcademyM />} /> AI Search Help
              </Button>
              <Button mode="icon-label" type="ghost" onClick={action('Feedback about AI Search')}>
                <Icon component={<ChatM />} /> Feedback about AI Search?
              </Button>
              <Button mode="icon-label" type="ghost" onClick={action('Contact support')}>
                <Icon component={<HelpM />} /> Contact support
              </Button>
            </>
          }
        >
          <div style={{ width: '100%', height: '500px', backgroundColor: theme.palette['red-200'] }}></div>
        </Wizard.OnModal>
        <Button onClick={handleShow}>Show wizard</Button>
      </>
    );
  }),
};

export default {
  name: 'Components/Wizard',
  config: {},
  stories,
  Component: Wizard,
};
