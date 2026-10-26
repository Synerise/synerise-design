import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { fn } from 'storybook/test';
import styled from 'styled-components';

import Button from '@synerise/ds-button';
import DateRangePicker, {
  CONST,
  type DateRangePickerProps,
  RawDateRangePicker,
  utils,
} from '@synerise/ds-date-range-picker';
import Tooltip from '@synerise/ds-tooltip';

import { centeredPaddedWrapper } from '../../utils';
import {
  datePickerArgTypes,
  filterArgTypes,
  generalArgTypes,
  relativeArgTypes,
} from './argTypes';
import { ABSOLUTE_RANGE, RANGE_WITH_START_DATE, TEXTS } from './constants';

export default {
  title: 'Components/Pickers/DateRangePicker',
  component: DateRangePicker,

  parameters: {
    layout: 'fullscreen',
    date: new Date('March 10, 2021 10:00:00'),
  },
  decorators: [centeredPaddedWrapper],
  render: ({ relativeModes, ...args }) => {
    const relativeFuture = relativeModes?.includes('FUTURE');
    const relativePast = relativeModes?.includes('PAST');
    return (
      <DateRangePicker
        {...args}
        relativeModes={relativeModes}
        relativeFuture={relativeFuture}
        relativePast={relativePast}
      />
    );
  },
  argTypes: {
    ...generalArgTypes,
    ...datePickerArgTypes,
    ...relativeArgTypes,
    ...filterArgTypes,
    intl: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    onApply: fn(),
    onFilterSave: fn(),
    onValueChange: fn(),
    onVisibleChange: fn(),
  },
} as Meta<DateRangePickerProps>;

type Story = StoryObj<DateRangePickerProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<DateRangePicker
  onApply={handleApply}
  showTime
  showRelativePicker
  showFilter
  relativeModes={['PAST', 'FUTURE', 'SINCE']}
/>`,
      },
    },
  },
  args: {
    showRelativePicker: true,
    relativeModes: ['PAST', 'FUTURE', 'SINCE'],
    showTime: true,
    showFilter: true,
  },
};

export const WithoutPopover: Story = {
  parameters: {
    mockingDate: new Date('March 10, 2021 10:00:00'),
    layout: 'centered',
    docs: {
      source: {
        code: `<RawDateRangePicker
  onApply={handleApply}
  showTime
  showRelativePicker
  showFilter
  disableAbsoluteTimepickerInRelative
  relativeModes={['PAST']}
  texts={texts}
/>`,
      },
    },
  },
  render: (args) => {
    return <RawDateRangePicker texts={TEXTS} {...args} />;
  },
  args: {
    showRelativePicker: true,
    relativeModes: ['PAST'],
    showTime: true,
    showFilter: true,
    disableAbsoluteTimepickerInRelative: true,
  },
};

export const RelativePickerOptions: Story = {
  parameters: {
    controls: {
      include: Object.keys(relativeArgTypes),
    },
    docs: {
      source: {
        code: `<DateRangePicker
  onApply={handleApply}
  showRelativePicker
  relativeModes={['PAST', 'FUTURE', 'SINCE']}
/>`,
      },
    },
  },
  args: {
    showRelativePicker: true,
    relativeModes: ['PAST', 'FUTURE', 'SINCE'],
  },
};

export const GeneralOptions: Story = {
  parameters: {
    controls: {
      include: Object.keys(generalArgTypes),
    },
    docs: {
      source: {
        code: `<DateRangePicker onApply={handleApply} showTime showNowButton />`,
      },
    },
  },
  args: {
    showNowButton: true,
    showTime: true,
  },
};

export const DatePickerOptions: Story = {
  parameters: {
    controls: {
      include: Object.keys(datePickerArgTypes),
    },
    docs: {
      source: {
        code: `<DateRangePicker onApply={handleApply} showTime showNowButton />`,
      },
    },
  },
  args: {
    showNowButton: true,
    showTime: true,
  },
};

export const DateFilterOptions: Story = {
  parameters: {
    controls: {
      include: Object.keys(filterArgTypes),
    },
    docs: {
      source: {
        code: `<DateRangePicker
  onApply={handleApply}
  showFilter
  filterValueSelectionModes={['Hour', 'Range']}
/>`,
      },
    },
  },
  args: {
    showFilter: true,
    filterValueSelectionModes: ['Hour', 'Range'],
  },
};

export const WithDefaultValue: Story = {
  parameters: {
    docs: {
      source: {
        code: `<DateRangePicker
  onApply={handleApply}
  value={{
    type: 'ABSOLUTE',
    from: '2020-08-18T22:00:00.000Z',
    to: '2020-08-28T22:00:00.000Z',
  }}
/>`,
      },
    },
  },
  args: {
    value: ABSOLUTE_RANGE,
  },
};

export const WithStartDate: Story = {
  parameters: {
    docs: {
      source: {
        code: `<DateRangePicker
  onApply={handleApply}
  value={{
    type: 'ABSOLUTE',
    from: '2020-08-18T22:00:00.000Z',
  }}
/>`,
      },
    },
  },
  args: {
    value: RANGE_WITH_START_DATE,
  },
};

export const CustomTrigger: Story = {
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code: `<DateRangePicker
  onApply={handleApply}
  showTime
  popoverTrigger={
    <Tooltip description="Custom tooltip">
      <Button>Custom trigger</Button>
    </Tooltip>
  }
/>`,
      },
    },
  },
  render: (args) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [dateRangeVisible, setDateRangeVisible] = useState(false);

    return (
      <DateRangePicker
        {...args}
        popoverTrigger={
          <Tooltip
            trigger={['hover']}
            onOpenChange={setTooltipVisible}
            open={!dateRangeVisible && tooltipVisible}
            placement={'bottom'}
            description="Date range picker with custom trigger button and tooltip with description"
            type="largeSimple"
          >
            <Button>Custom trigger</Button>
          </Tooltip>
        }
      />
    );
  },
  args: {
    showTime: true,
  },
};

export const RelativeRangePresets: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: () => {
    const Table = styled.table`
      td {
        white-space: nowrap;
        padding: 4px 12px;
        text-align: right;
      }
      td.opacity {
        opacity: 0.5;
      }
    `;
    const presets = [...CONST.RELATIVE_PRESETS, ...CONST.ABSOLUTE_PRESETS];
    const dateStr = (date?: Date) => {
      try {
        return JSON.stringify(
          {
            utc: date?.toUTCString(),
            iso: date?.toISOString(),
            str: date?.toString(),
            locale: date?.toLocaleString(),
          },
          null,
          2,
        );
      } catch (e) {
        return e;
      }
    };
    return (
      <>
        <Table style={{ width: '600px' }}>
          <thead>
            <tr>
              <td>relative date range</td>
              <td></td>
              <td>value.from</td>
              <td>value.to</td>
              <td>ending month of date-range-end</td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(presets).map(([k, e]) => {
              const dateRange = utils.normalizeRange(e);
              return dateRange ? (
                <tr>
                  <td title={JSON.stringify(e, null, 2)}>{e.key}</td>
                  <td className="opacity"></td>
                  <td>
                    <div title={dateStr(dateRange?.from as Date)}>
                      {dateRange?.from?.toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <div title={dateStr(dateRange?.to as Date)}>
                      {dateRange?.to?.toLocaleString()}
                    </div>
                  </td>
                  <td className="opacity">
                    <div title={dateStr(dateRange?.to as Date)}>
                      {utils.END_OF['MONTHS'](
                        dateRange?.to as Date,
                      )?.toLocaleString()}
                    </div>
                  </td>
                </tr>
              ) : (
                <></>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  },
};
