import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import { FormattedNumber, theme } from '@synerise/ds-core';
import Estimation, { EstimationProps } from '@synerise/ds-estimation';
import Icon, { RefreshM, ShowM } from '@synerise/ds-icon';

import { BOOLEAN_CONTROL } from '../../utils';
import { Bold } from './Estimation.styles';

export default {
  component: Estimation,
  title: 'Components/Estimation',
  tags: ['autodocs', 'new'],
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Estimated reach',
    tooltip: 'This is the tooltip text',
    value: <FormattedNumber value={12221} />,
    calculatedDate: new Date(),
    footerButtons: (
      <Button type="ghost-primary" mode="icon-label">
        <Icon component={<RefreshM />} /> Refresh
      </Button>
    ),
  },
  argTypes: {
    isLoading: BOOLEAN_CONTROL,
  },
} as Meta<EstimationProps>;

export const Default: StoryObj<EstimationProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Estimation
  label="Estimated reach"
  tooltip="This is the tooltip text"
  value={<FormattedNumber value={12221} />}
  calculatedDate={new Date()}
  footerButtons={
    <Button type="ghost-primary" mode="icon-label">
      <Icon component={<RefreshM />} /> Refresh
    </Button>
  }
/>`,
      },
    },
  },
};

export const Loading: StoryObj<EstimationProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Estimation
  label="Estimated reach"
  tooltip="This is the tooltip text"
  value={<FormattedNumber value={12221} />}
  calculatedDate={new Date()}
  isLoading={true}
  // make sure to set buttons disabled prop in loading state
  footerButtons={
    <Button disabled type="ghost-primary" mode="icon-label">
      <Icon component={<RefreshM />} /> Refresh
    </Button>
  }
/>`,
      },
    },
  },
  args: {
    isLoading: true,
    footerButtons: (
      <Button disabled type="ghost-primary" mode="icon-label">
        <Icon component={<RefreshM />} /> Refresh
      </Button>
    ),
  },
};

export const WithTotal: StoryObj<EstimationProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Estimation
  label="Estimated reach"
  tooltip="This is the tooltip text"
  value={<FormattedNumber value={12221} />}
  calculatedDate={new Date()}
  total={
    <>
      Total: <Bold level={6}>
        <FormattedNumber value={872221} />
      </Bold>
    </>
  }
  footerButtons={
    <Button type="ghost-primary" mode="icon-label">
      <Icon component={<RefreshM />} /> Refresh
    </Button>
  }
/>`,
      },
    },
  },
  args: {
    total: (
      <>
        Total:{' '}
        <Bold level={6}>
          <FormattedNumber value={872221} />
        </Bold>{' '}
      </>
    ),
  },
};

export const WithError: StoryObj<EstimationProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Estimation
  label="Estimated reach"
  tooltip="This is the tooltip text"
  value="N/a"
  calculatedDate={new Date()}
  errorMessage="An error occurred"
  footerButtons={
    <Button type="ghost-primary" mode="icon-label">
      <Icon component={<RefreshM />} /> Refresh
    </Button>
  }
/>`,
      },
    },
  },
  args: {
    value: 'N/a',
    errorMessage: 'An error occurred',
  },
};

export const WithProgressBar: StoryObj<EstimationProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Estimation
  label="Estimated reach"
  tooltip="This is the tooltip text"
  value={<FormattedNumber value={12221} />}
  calculatedDate={new Date()}
  total={
    <>
      Total: <Bold level={6}>
        <FormattedNumber value={872221} />
      </Bold>
    </>
  }
  progressBarValues={[
    {
      percent: 22,
      color: theme.palette['green-600'],
      label: (
        <>
          Estimated reach: <Bold level={6}>52%</Bold>
        </>
      ),
    },
    {
      percent: 78,
      color: theme.palette['grey-200'],
    },
  ]}
  footerButtons={
    <Button type="ghost-primary" mode="icon-label">
      <Icon component={<RefreshM />} /> Refresh
    </Button>
  }
/>`,
      },
    },
  },
  args: {
    ...WithTotal.args,
    progressBarValues: [
      {
        percent: 22,
        color: theme.palette['green-600'],
        label: (
          <>
            Estimated reach: <Bold level={6}>52%</Bold>
          </>
        ),
      },
      {
        percent: 78,
        color: theme.palette['grey-200'],
      },
    ],
  },
};

export const CompleteExample: StoryObj<EstimationProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Estimation
  label="Estimated reach"
  tooltip="This is the tooltip text"
  value={<FormattedNumber value={12221} />}
  calculatedDate={new Date()}
  total={
    <>
      Total: <Bold level={6}>
        <FormattedNumber value={872221} />
      </Bold>
    </>
  }
  progressBarValues={[
    {
      percent: 52,
      color: theme.palette['green-600'],
      label: (
        <>
          Estimated reach: <Bold level={6}>52%</Bold>
        </>
      ),
    },
    {
      percent: 12,
      color: theme.palette['yellow-600'],
      label: (
        <>
          Global control group: <Bold level={6}>12%</Bold> of estimated reach
        </>
      ),
    },
    {
      percent: 36,
      color: theme.palette['grey-200'],
    },
  ]}
  footerButtons={
    <>
      <Button type="ghost" mode="icon-label">
        <Icon component={<ShowM />} /> Show conditions
      </Button>
      <Button type="ghost-primary" mode="icon-label">
        <Icon component={<RefreshM />} /> Refresh
      </Button>
    </>
  }
/>`,
      },
    },
  },
  render: ({ isLoading, ...args }) => {
    const skeletonConfig = isLoading
      ? {
          total: true,
          progressBar: true,
        }
      : false;
    return <Estimation isLoading={skeletonConfig} {...args} />;
  },
  args: {
    ...WithTotal.args,
    footerButtons: (
      <>
        <Button type="ghost" mode="icon-label">
          <Icon component={<ShowM />} /> Show conditions
        </Button>
        <Button type="ghost-primary" mode="icon-label">
          <Icon component={<RefreshM />} /> Refresh
        </Button>
      </>
    ),
    progressBarValues: [
      {
        percent: 52,
        color: theme.palette['green-600'],
        label: (
          <>
            Estimated reach: <Bold level={6}>52%</Bold>
          </>
        ),
      },
      {
        percent: 12,
        color: theme.palette['yellow-600'],
        label: (
          <>
            Global control group: <Bold level={6}>12%</Bold> of estimated reach
          </>
        ),
      },
      {
        percent: 36,
        color: theme.palette['grey-200'],
      },
    ],
  },
};

export const CompleteExampleLoading: StoryObj<EstimationProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Estimation
  label="Estimated reach"
  tooltip="This is the tooltip text"
  value={<FormattedNumber value={12221} />}
  calculatedDate={new Date()}
  isLoading={{
    total: true,
    progressBar: true,
  }}
  total={
    <>
      Total: <Bold level={6}>
        <FormattedNumber value={872221} />
      </Bold>
    </>
  }
  progressBarValues={[
    {
      percent: 52,
      color: theme.palette['green-600'],
      label: (
        <>
          Estimated reach: <Bold level={6}>52%</Bold>
        </>
      ),
    },
    {
      percent: 12,
      color: theme.palette['yellow-600'],
      label: (
        <>
          Global control group: <Bold level={6}>12%</Bold> of estimated reach
        </>
      ),
    },
    {
      percent: 36,
      color: theme.palette['grey-200'],
    },
  ]}
  // make sure to set buttons disabled prop in loading state
  footerButtons={
    <>
      <Button disabled type="ghost" mode="icon-label">
        <Icon component={<ShowM />} /> Show conditions
      </Button>
      <Button disabled type="ghost-primary" mode="icon-label">
        <Icon component={<RefreshM />} /> Refresh
      </Button>
    </>
  }
/>`,
      },
    },
  },
  argTypes: {
    isLoading: {
      control: false,
    },
  },
  args: {
    ...WithTotal.args,
    isLoading: {
      total: true,
      progressBar: true,
    },
    footerButtons: (
      <>
        <Button disabled type="ghost" mode="icon-label">
          <Icon component={<ShowM />} /> Show conditions
        </Button>
        <Button disabled type="ghost-primary" mode="icon-label">
          <Icon component={<RefreshM />} /> Refresh
        </Button>
      </>
    ),
    progressBarValues: [
      {
        percent: 52,
        color: theme.palette['green-600'],
        label: (
          <>
            Estimated reach: <Bold level={6}>52%</Bold>
          </>
        ),
      },
      {
        percent: 12,
        color: theme.palette['yellow-600'],
        label: (
          <>
            Global control group: <Bold level={6}>12%</Bold> of estimated reach
          </>
        ),
      },
      {
        percent: 36,
        color: theme.palette['grey-200'],
      },
    ],
  },
};
