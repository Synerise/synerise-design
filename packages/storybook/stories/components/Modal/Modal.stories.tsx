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
import { VirtualTable } from '@synerise/ds-table-new';
import { type ColumnDef } from '@tanstack/react-table';

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
import { DATA_SOURCE_FULL } from '../TableNew/data/tableData';
import { SIZES, TAB_PROPS, headerWithPrefix } from './Modal.data';
import * as S from './styles';

type RecordRow = (typeof DATA_SOURCE_FULL)[number];

const NAME_COLUMN: ColumnDef<RecordRow>[] = [
  { accessorKey: 'name', id: 'name', header: 'Name' },
];

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

export const withVirtualTable: Story = {
  render: (args, storyContext) => {
    const open = storyContext.viewMode === 'docs' ? false : args.open;
    // One ref drives both: the modal's custom scrollbar exposes its scroll node
    // through `bodyScrollRef`, and the VirtualTable virtualizes against it via
    // `scrollElementRef`. Title and footer stay pinned while the body scrolls.
    const scrollRef = useRef<HTMLDivElement>(null);
    return (
      <Modal {...args} open={open} bodyScrollRef={scrollRef}>
        <VirtualTable
          stickyHeader
          scrollElementRef={scrollRef}
          rowKey="key"
          matchesSearchQuery={(query, row) =>
            row.name.toLowerCase().includes(query.toLowerCase())
          }
          searchProps={{ placeholder: 'Search by name...' }}
          selectionConfig={{ onChange: () => {}, limit: 5 }}
          columns={NAME_COLUMN}
          data={DATA_SOURCE_FULL}
        />
      </Modal>
    );
  },
  args: {
    title: 'Records',
    footer: null,
    size: 'large',
    maxViewportHeight: 70,
    bodyFullWidth: true,
  },
  parameters: {
    docs: {
      source: {
        code: "// One ref drives both — Modal#bodyScrollRef exposes the modal's custom\n// scrollbar scroll node, VirtualTable#scrollElementRef virtualizes against it.\nconst scrollRef = useRef<HTMLDivElement>(null);\n\nconst columns = [{ accessorKey: 'name', id: 'name', header: 'Name' }];\n\n<Modal\n  title=\"Records\"\n  footer={null}\n  size=\"large\"\n  maxViewportHeight={70}\n  bodyFullWidth\n  bodyScrollRef={scrollRef}\n  open\n>\n  <VirtualTable\n    stickyHeader\n    scrollElementRef={scrollRef}\n    rowKey=\"key\"\n    matchesSearchQuery={(query, row) =>\n      row.name.toLowerCase().includes(query.toLowerCase())\n    }\n    searchProps={{ placeholder: 'Search by name...' }}\n    selectionConfig={{ onChange: () => {}, limit: 5 }}\n    columns={columns}\n    data={data}\n  />\n</Modal>",
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
