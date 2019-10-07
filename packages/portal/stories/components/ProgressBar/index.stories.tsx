import * as React from 'react';
import { DSProvider } from '@synerise/ds-core';
import { storiesOf } from "@storybook/react";
import ProgressBar, { PROGRESS_BAR_COLORS } from "@synerise/ds-progress-bar";

storiesOf('Components|Progress Bar', module)
  .add('Solo bar', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar
            values={
              [
                {
                  amount: 60,
                },
              ]
            }
            showLabel={false}
          />
        </div>
      </DSProvider>
    </div>
  ))
  .add('Label + description', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar
            values={
              [
                {
                  amount: 60,
                }
              ]
            }
            showLabel={true}
            description="Description"
          />
        </div>
      </DSProvider>
    </div>
  ))
  .add('Label', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar
            values={
              [
                {
                  amount: 60,
                }
              ]
            }
            showLabel={true}
          />
        </div>
      </DSProvider>
    </div>
  ))
  .add('Multivalue', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar
            values={
              [
                {
                  amount: 10,
                  color: PROGRESS_BAR_COLORS.GREEN,
                },
                {
                  amount: 20,
                  color: PROGRESS_BAR_COLORS.MARS,
                },
                {
                  amount: 100,
                  color: PROGRESS_BAR_COLORS.PURPLE,
                },
                {
                  amount: 70,
                  color: PROGRESS_BAR_COLORS.YELLOW,
                },
              ]
            }
            showLabel={false}
            total={100}
          />

        </div>
      </DSProvider>
    </div>
  ))
  .add('Multivalue label + description', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar
            values={
              [
                {
                  amount: 10,
                  color: PROGRESS_BAR_COLORS.GREEN,
                },
                {
                  amount: 20,
                  color: PROGRESS_BAR_COLORS.MARS,
                },
                {
                  amount: 100,
                  color: PROGRESS_BAR_COLORS.PURPLE,
                },
                {
                  amount: 70,
                  color: PROGRESS_BAR_COLORS.YELLOW,
                },
              ]
            }
            showLabel={true}
            total={100}
            description="Description"
          />

        </div>
      </DSProvider>
    </div>
  ))
  .add('Multivalue label', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar
            values={
              [
                {
                  amount: 10,
                  color: PROGRESS_BAR_COLORS.GREEN,
                },
                {
                  amount: 20,
                  color: PROGRESS_BAR_COLORS.MARS,
                },
                {
                  amount: 100,
                  color: PROGRESS_BAR_COLORS.PURPLE,
                },
                {
                  amount: 70,
                  color: PROGRESS_BAR_COLORS.YELLOW,
                },
              ]
            }
            showLabel={true}
            total={200}
          />

        </div>
      </DSProvider>
    </div>
  ))
;
