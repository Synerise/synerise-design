import React, { useRef, useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { ObjectAvatar } from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Icon, { MailM, UserM } from '@synerise/ds-icon';
import Layout, { LayoutProps } from '@synerise/ds-layout';
import Modal, { showModal } from '@synerise/ds-modal';
import Stepper from '@synerise/ds-stepper';

import { Placeholder, PropNamePill } from '../../constants';
import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  reactNodeAsSelect,
  sleep,
} from '../../utils';
import { STEPPER_STEPS, StepData } from '../Stepper/Stepper.data';
import { SIZES, TAB_PROPS, headerWithPrefix } from './Modal.data';
import * as S from './styles';

export default {
  title: 'Components/Modal',
  component: Modal,
  render: (args, storyContext) => {
    const open = storyContext.viewMode === 'docs' ? false : args.open;
    return <Modal {...args} open={open} />;
  },
  decorators: [centeredPaddedWrapper],
  argTypes: {
    wrapClassName: CLASSNAME_ARG_CONTROL,
    open: BOOLEAN_CONTROL,
    title: {
      ...reactNodeAsSelect(['blank', 'title', 'withAvatar', 'iconAndLabel'], {
        blank: '',
        title: 'Title',
        withAvatar: headerWithPrefix(
          'Header with avatar',
          <ObjectAvatar
            badgeStatus="active"
            iconComponent={
              <Icon component={<MailM />} color={theme.palette['red-500']} />
            }
          />,
        ),
        iconAndLabel: headerWithPrefix(
          'Header with icon',
          <Icon component={<UserM />} color={theme.palette['grey-600']} />,
        ),
      }),
    },
    description: REACT_NODE_AS_STRING,
    cancelText: REACT_NODE_AS_STRING,
    okText: REACT_NODE_AS_STRING,
    width: NUMBER_CONTROL,
    okType: REACT_NODE_AS_STRING,
    zIndex: NUMBER_CONTROL,
    bodyBackground: {
      ...controlFromOptionsArray('select', ['white', 'grey']),
    },
    closable: BOOLEAN_CONTROL,
    confirmLoading: BOOLEAN_CONTROL,
    onOk: {
      action: 'onOk',
    },
    onCancel: {
      action: 'onCancel',
    },
    afterClose: {
      action: 'afterClose',
    },
    settingButton: REACT_NODE_AS_STRING,
    showHeaderAction: BOOLEAN_CONTROL,
    bodyFullWidth: BOOLEAN_CONTROL,
    headerActions: REACT_NODE_AS_STRING,
    renderCustomFooter: BOOLEAN_CONTROL,
    disableScrollbar: BOOLEAN_CONTROL,
    footer: REACT_NODE_AS_STRING,
    removeFooter: BOOLEAN_CONTROL,
    maxViewportHeight: NUMBER_CONTROL,
    size: {
      ...controlFromOptionsArray('select', SIZES),
    },
  },
  args: {
    open: true,
    onOk: fn(),
    afterClose: fn(),
    onCancel: fn(),
  },
} as Meta<typeof Modal>;

type Story = StoryObj<typeof Modal>;

export const Blank: Story = {
  args: {
    blank: true,
    footer: null,
    size: 'small',
    children: <div style={{ height: 362 }}></div>,
  },
  parameters: {
    docs: {
      source: {
        code: '<Modal blank footer={null} size="small" open>\n  <div style={{ height: 362 }} />\n</Modal>',
      },
    },
  },
};

export const withHeader: Story = {
  args: {
    title: 'title',
    footer: null,
    size: 'small',
    children: <div style={{ height: 362 }}></div>,
  },
  parameters: {
    docs: {
      source: {
        code: '<Modal title="title" footer={null} size="small" open>\n  <div style={{ height: 362 }} />\n</Modal>',
      },
    },
  },
};

export const withTabs: Story = {
  args: {
    headerTabProps: TAB_PROPS,
    title: (
      <>
        title <PropNamePill>title</PropNamePill>
      </>
    ),
    headerBottomBar: (
      <>
        header bottom bar content <PropNamePill>headerBottomBar</PropNamePill>
      </>
    ),
    footer: null,
    size: 'small',
    children: <Placeholder $height={400} />,
  },
  parameters: {
    docs: {
      source: {
        code: '<Modal\n  title="title"\n  headerTabProps={TAB_PROPS}\n  headerBottomBar={<div>bottom bar</div>}\n  footer={null}\n  size="small"\n  open\n>\n  {/* content */}\n</Modal>',
      },
    },
  },
};

export const Fullscreen: Story = {
  args: {
    title: 'title',
    size: 'fullScreen',
    children: <Placeholder $height={1400} />,
  },
  parameters: {
    docs: {
      source: {
        code: '<Modal title="title" size="fullScreen" open>\n  {/* content */}\n</Modal>',
      },
    },
  },
};

export const withFooter: Story = {
  args: {
    title: 'title',
    size: 'small',
    children: 'Modal content...',
  },
  parameters: {
    docs: {
      source: {
        code: '<Modal\n  title="title"\n  size="small"\n  onOk={handleOk}\n  onCancel={handleCancel}\n  open\n>\n  Modal content...\n</Modal>',
      },
    },
  },
};

export const withFooterPrefixAndSuffix: Story = {
  args: {
    title: 'title',
    size: 'small',
    children: 'Modal content...',
    infix: <Button>infix</Button>,
    prefix: <Button>prefix</Button>,
    suffix: <Button>suffix</Button>,
  },
  parameters: {
    docs: {
      source: {
        code: '<Modal\n  title="title"\n  size="small"\n  infix={<Button>infix</Button>}\n  prefix={<Button>prefix</Button>}\n  suffix={<Button>suffix</Button>}\n  onOk={handleOk}\n  onCancel={handleCancel}\n  open\n>\n  Modal content...\n</Modal>',
      },
    },
  },
};

export const withScroll: Story = {
  args: {
    title: 'title',
    footer: null,
    size: 'small',
    children: <Placeholder $height={600} />,
    maxViewportHeight: 70,
  },
  parameters: {
    docs: {
      source: {
        code: '<Modal\n  title="title"\n  footer={null}\n  size="small"\n  maxViewportHeight={70}\n  open\n>\n  {/* tall content */}\n</Modal>',
      },
    },
  },
};

export const withLayout: StoryObj<LayoutProps & { sidebarHeight: number }> = {
  render: ({ sidebarHeight, ...args }, storyContext) => {
    const open = storyContext.viewMode === 'docs' ? false : args.open;
    return (
      <Modal {...args} open={open}>
        <Layout
          styles={{
            rightInner: { padding: '24px' },
          }}
          right={{
            content: <Placeholder $height={sidebarHeight} />,
            opened: true,
            onChange: () => {},
          }}
        >
          <Placeholder $height={1400} />
        </Layout>
      </Modal>
    );
  },
  args: {
    open: true,
    title: 'title',
    footer: null,
    size: 'large',

    bodyFullWidth: true,
    disableScrollbar: true,
    maxViewportHeight: 70,
    sidebarHeight: 400,
    bodyBackground: 'grey',
  },
  parameters: {
    docs: {
      source: {
        code: '<Modal\n  title="title"\n  footer={null}\n  size="large"\n  bodyFullWidth\n  bodyBackground="grey"\n  disableScrollbar\n  maxViewportHeight={70}\n  open\n>\n  <Layout right={{ content: <Sidebar />, opened: true, onChange: () => {} }}>\n    {/* main content */}\n  </Layout>\n</Modal>',
      },
    },
  },
};

export const ModalWithStepper: Story = {
  render: ({ activeIndex, ...args }) => {
    const [activeStep, setActiveStep] = useState(activeIndex);
    const handleStepClick = (index) => setActiveStep(index);
    return (
      <Modal {...args}>
        <S.StepperWrapper>
          <Stepper style={{ width: '100%', justifyContent: 'center' }}>
            {STEPPER_STEPS.map((step: StepData, index: number) => (
              <Stepper.Step
                {...step}
                onClick={() => handleStepClick(index)}
                active={index === activeStep}
                done={index < activeStep}
              />
            ))}
          </Stepper>
        </S.StepperWrapper>
      </Modal>
    );
  },
  args: {
    title: 'title',
    size: 'medium',
  },
  parameters: {
    docs: {
      source: {
        code: '<Modal title="title" size="medium" onOk={handleOk} onCancel={handleCancel} open>\n  <Stepper style={{ width: \'100%\', justifyContent: \'center\' }}>\n    {steps.map((step, index) => (\n      <Stepper.Step {...step} active={index === activeStep} done={index < activeStep} />\n    ))}\n  </Stepper>\n</Modal>',
      },
    },
  },
};

export const WithInitialFocusRef: Story = {
  render: (args, storyContext) => {
    const open = storyContext.viewMode === 'docs' ? false : args.open;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchRef = useRef<HTMLInputElement>(null);
    return (
      <Modal {...args} open={open} initialFocusRef={searchRef}>
        <label htmlFor="modal-search-field">Search</label>
        <input
          id="modal-search-field"
          ref={searchRef}
          placeholder="Focused on open"
          style={{
            display: 'block',
            width: '100%',
            marginTop: 8,
            padding: 8,
          }}
        />
      </Modal>
    );
  },
  args: {
    title: 'Search dialog',
    footer: null,
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story:
          'By default a modal moves focus to the dialog container itself on open — screen readers announce the dialog name + role and no cursor lands in a non-critical field (WAI-ARIA APG Dialog pattern). Pass `initialFocusRef` only when focusing a specific control is genuinely useful, e.g. the search field of a search dialog or the name field of a rename dialog.',
      },
      source: {
        code: 'const searchRef = useRef<HTMLInputElement>(null);\n\n<Modal title="Search dialog" size="small" footer={null} initialFocusRef={searchRef} open>\n  <label htmlFor="search">Search</label>\n  <input id="search" ref={searchRef} />\n</Modal>',
      },
    },
  },
};

export const ShowModal: Story = {
  render: (args) => {
    const handleClick = () => {
      const ref = showModal({
        ...args,
        onOk: () => {
          ref.destroy();
        },
        onCancel: () => {
          ref.destroy();
        },
      });
    };
    return <Button onClick={handleClick}>Show modal</Button>;
  },
  args: {
    title: 'title',
    size: 'small',
  },
  parameters: {
    docs: {
      source: {
        code: "const ref = showModal({\n  title: 'title',\n  size: 'small',\n  onOk: () => ref.destroy(),\n  onCancel: () => ref.destroy(),\n});",
      },
    },
  },
};

export const ShowModalPromise: Story = {
  render: (args) => {
    const onOk = async () => {
      await sleep(1000);
      return false;
    };
    const onCancel = async () => {
      await sleep(1000);
      return true;
    };
    const handleClick = () => {
      const ref = showModal({
        ...args,
        onOk,
        onCancel,
      });
    };
    return <Button onClick={handleClick}>Show modal</Button>;
  },
  args: {
    title: 'title',
    size: 'small',
  },
  parameters: {
    docs: {
      source: {
        code: "// onOk / onCancel can return a Promise — the modal stays open until it resolves\nconst ref = showModal({\n  title: 'title',\n  size: 'small',\n  onOk: async () => { await doWork(); },\n  onCancel: async () => { await doCleanup(); },\n});",
      },
    },
  },
};
