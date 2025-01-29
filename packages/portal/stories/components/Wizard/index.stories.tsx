import React from 'react';

import Wizard from '@synerise/ds-wizard';
import { ObjectAvatar } from '@synerise/ds-avatar';
import {
  EditM,
  MailM,
} from '@synerise/ds-icon';
import { boolean, text, object } from '@storybook/addon-knobs';
import Stepper from '@synerise/ds-stepper';
import Radio from '@synerise/ds-radio';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Icon, { AcademyM, ArrowLeftCircleM, ChatM, HelpM, SettingsM } from '@synerise/ds-icon';

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

const inlineEditProps = {
  name: 'name-of-input',
  value: 'Wizard title',
  maxLength: 60,
  handleOnChange: action('onChange'),
  handleOnBlur: () => action('onBlur'),
  handleOnEnterPress: () => action('onEnterPress'),
  placeholder: 'Example text',
  size: 'normal',
  customIcon: <EditM/>,
}


const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const setActiveStep = index => store.set({ activeStep: index });
    const handlePrevStep = () => store.set({ activeStep: store.state.activeStep - 1 });
    const handleNextStep = () => store.set({ activeStep: store.state.activeStep + 1 });
    const handleClose = () => store.set({ visible: false });
    const handleShow = () => store.set({ visible: true });
    const stepButtonProps = object('stepButtonProps', {});
    const editableTitle = boolean('Editable header? ', false);
    const headerAvatar = editableTitle ? <ObjectAvatar iconComponent={<Icon component={<MailM />} color={theme.palette['red-600']} />} badgeStatus="active" /> : undefined;
    const headerInlineEdit = editableTitle ? inlineEditProps : undefined;
    const headerAction = boolean('Skip button in header? ', false);
    const footerAction = boolean('Skip button in footer? ', false);
    return (
      <>
        <Wizard
          visible={store.state.visible}
          title={text('Set wizard title', 'Wizard title')}
          headerAvatar={headerAvatar}
          headerInlineEdit={headerInlineEdit}
          navigationInFooter={boolean('Navigation in footer?', true)}
          onClose={handleClose}
          headerAction={headerAction && <Button onClick={action('header action')}>Save and skip wizard</Button>}
          footerAction={footerAction && <Button type="secondary" onClick={action('footer action')}>Skip wizard</Button>}
          onPrevStep={store.state.activeStep === 0 ? undefined : handlePrevStep}
          onNextStep={store.state.activeStep === 3 ? handleClose : handleNextStep}
          contentWidth={'588px'}
          texts={{
            prevButtonLabel: 'Back',
            nextButtonLabel: store.state.activeStep === 3 ? 'Complete' : 'Next step',
          }}
          stepButtonProps={stepButtonProps}
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
          footerLeft={
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
    const stepButtonProps = object('stepButtonProps', {});
    return (
      <>
        <Wizard.OnModal
          modalProps={{
            size: 'medium',
          }}
          visible={store.state.visible}
          title={text('Set wizard title', 'Wizard title')}
          onClose={handleClose}
          headerAction={<Button onClick={action('header action')}>Save and skip wizard</Button>}
          onPrevStep={store.state.activeStep === 0 ? null : handlePrevStep}
          onNextStep={store.state.activeStep === 3 ? handleClose : handleNextStep}
          contentWidth={'588px'}
          texts={{
            prevButtonLabel: 'Back',
            nextButtonLabel: store.state.activeStep === 3 ? 'Complete' : 'Next step',
          }}
          stepButtonProps={stepButtonProps}
          stepper={
            <Stepper size={'small'}>
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
          <div style={{ width: '100%', height: '439px', backgroundColor: theme.palette['red-200'] }}></div>
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
