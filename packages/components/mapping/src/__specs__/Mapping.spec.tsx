import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Mapping from '../index';

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const DIVIDER = 'DIVIDER';
const BUTTONS = 'BUTTONS';

const DATA = [
  {
    nameLeft: LEFT,
    nameRight: RIGHT,
    id: '1',
  },
  {
    nameLeft: LEFT,
    nameRight: RIGHT,
    id: '2',
  },
  {
    nameLeft: LEFT,
    nameRight: RIGHT,
    id: '3',
  },
];
const LEFT_COMPONENT = ({ item }) => <>{item.nameLeft}</>;
const RIGHT_COMPONENT = ({ item }) => <>{item.nameRight}</>;
const CENTER_COMPONENT = () => <>{DIVIDER}</>;
const SELECTION = {
  onSelectionChange: jest.fn(),
  actionButtons: <>{BUTTONS}</>,
};
const ENABLE_BATCH = 'ENABLE_BATCH';

const MAPPING = (props) => (
  <Mapping
    dataSource={DATA}
    leftComponent={LEFT_COMPONENT}
    rightComponent={RIGHT_COMPONENT}
    {...props}
  />
);

describe('Mapping', () => {
  it('should render', () => {
    renderWithProvider(<MAPPING centerComponent={CENTER_COMPONENT} />);

    expect(screen.getAllByText(LEFT)).toHaveLength(DATA.length);
    expect(screen.getAllByText(RIGHT)).toHaveLength(DATA.length);
    expect(screen.getAllByText(DIVIDER)).toHaveLength(DATA.length);
  });

  it('should render without center component', () => {
    renderWithProvider(<MAPPING />);
    expect(screen.getAllByText(LEFT)).toHaveLength(DATA.length);
    expect(screen.getAllByText(RIGHT)).toHaveLength(DATA.length);
    expect(screen.queryByText(DIVIDER)).not.toBeInTheDocument();
  });

  it('should render with batch selection checkboxes', async () => {
    renderWithProvider(
      <MAPPING
        batchSelection={SELECTION}
        texts={{
          enableBatchSelection: ENABLE_BATCH,
        }}
      />,
    );
    userEvent.click(screen.getByText(ENABLE_BATCH));
    await waitFor(() =>
      expect(screen.getAllByRole('checkbox')).toHaveLength(DATA.length + 1),
    );
    expect(screen.queryByText(BUTTONS)).not.toBeInTheDocument();
  });
  it('action buttons should not be visible when items are not selected', async () => {
    renderWithProvider(
      <MAPPING
        batchSelection={SELECTION}
        texts={{
          enableBatchSelection: ENABLE_BATCH,
        }}
      />,
    );
    userEvent.click(screen.getByText(ENABLE_BATCH));
    await waitFor(() =>
      expect(screen.getAllByRole('checkbox')).toHaveLength(DATA.length + 1),
    );
    expect(screen.queryByText(BUTTONS)).not.toBeInTheDocument();
  });

  it('action buttons should be visible when items are selected', async () => {
    renderWithProvider(
      <MAPPING
        batchSelection={SELECTION}
        texts={{
          enableBatchSelection: ENABLE_BATCH,
        }}
      />,
    );
    userEvent.click(screen.getByText(ENABLE_BATCH));
    await waitFor(() =>
      expect(screen.getAllByRole('checkbox')).toHaveLength(DATA.length + 1),
    );
    const checkboxes = screen.getAllByRole('checkbox');
    userEvent.click(checkboxes[1]);
    expect(await screen.findByText(BUTTONS)).toBeInTheDocument();
  });

  it('onSelectionChange should fire when items are selected', async () => {
    renderWithProvider(
      <MAPPING
        batchSelection={SELECTION}
        texts={{
          enableBatchSelection: ENABLE_BATCH,
        }}
      />,
    );
    userEvent.click(screen.getByText(ENABLE_BATCH));
    await waitFor(() =>
      expect(screen.getAllByRole('checkbox')).toHaveLength(DATA.length + 1),
    );
    const checkboxes = screen.getAllByRole('checkbox');
    userEvent.click(checkboxes[1]);
    await waitFor(() => expect(SELECTION.onSelectionChange).toHaveBeenCalled());
  });
});
