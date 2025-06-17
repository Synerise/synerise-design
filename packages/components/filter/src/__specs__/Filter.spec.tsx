import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils';
import Button from '@synerise/ds-button';

import Filter from '../Filter';

const DEFAULT_TEXTS = {
  matching: {
    matching: 'Matching',
    notMatching: 'Not matching',
  },
  addFilter: 'Add filter',
};

const DEFAULT_EXPRESSION = {
  type: 'STEP' as const,
  id: '123',
  data: {
    name: 'Step #1',
    matching: false,
  },
  logic: {
    type: 'LOGIC' as const,
    id: '321',
    data: {
      value: 'AND',
    },
  },
};

describe('Filter component', () => {
  it('Should render with matching', () => {
    const onChangeLogic = jest.fn();
    const onChangeOrder = jest.fn();
    const onChangeStepMatching = jest.fn();
    const onDuplicateStep = jest.fn();
    const onDeleteStep = jest.fn();
    const onChangeStepName = jest.fn();
    const handleChangeMatching = jest.fn();
    const { getByText } = renderWithProvider(
      <Filter
        expressions={[]}
        onChangeLogic={onChangeLogic}
        onChangeOrder={onChangeOrder}
        onChangeStepMatching={onChangeStepMatching}
        onChangeStepName={onChangeStepName}
        onDeleteStep={onDeleteStep}
        onDuplicateStep={onDuplicateStep}
        matching={{
          onChange: handleChangeMatching,
          matching: true,
        }}
        texts={DEFAULT_TEXTS}
      />
    );

    expect(getByText('Matching')).toBeTruthy();
  });
  it('Should render with add button', () => {
    const onChangeLogic = jest.fn();
    const onChangeOrder = jest.fn();
    const onChangeStepMatching = jest.fn();
    const onDuplicateStep = jest.fn();
    const onDeleteStep = jest.fn();
    const onChangeStepName = jest.fn();
    const onChangeMatching = jest.fn();
    const onAdd = jest.fn();
    const { getByText } = renderWithProvider(
      <Filter
        expressions={[]}
        onChangeLogic={onChangeLogic}
        onChangeOrder={onChangeOrder}
        onChangeStepMatching={onChangeStepMatching}
        onChangeStepName={onChangeStepName}
        onDeleteStep={onDeleteStep}
        onDuplicateStep={onDuplicateStep}
        addFilterComponent={<Button onClick={onAdd}>{DEFAULT_TEXTS.addFilter}</Button>}
        matching={{
          onChange: onChangeMatching,
          matching: true,
        }}
        texts={DEFAULT_TEXTS}
      />
    );

    // ACT
    fireEvent.click(getByText(DEFAULT_TEXTS.addFilter));

    expect(getByText(DEFAULT_TEXTS.addFilter)).toBeTruthy();
    expect(onAdd).toBeCalled();
  });

  it('Should render with expression with footer and content', () => {
    const onChangeLogic = jest.fn();
    const onChangeOrder = jest.fn();
    const onChangeStepMatching = jest.fn();
    const onDuplicateStep = jest.fn();
    const onDeleteStep = jest.fn();
    const onChangeStepName = jest.fn();
    const handleChangeMatching = jest.fn();
    const { getByText } = renderWithProvider(
      <Filter
        expressions={[DEFAULT_EXPRESSION]}
        onChangeLogic={onChangeLogic}
        onChangeOrder={onChangeOrder}
        onChangeStepMatching={onChangeStepMatching}
        onChangeStepName={onChangeStepName}
        onDeleteStep={onDeleteStep}
        onDuplicateStep={onDuplicateStep}
        renderStepFooter={() => <span>Footer</span>}
        renderStepContent={() => <span>Content</span>}
        matching={{
          onChange: handleChangeMatching,
          matching: true,
        }}
        texts={DEFAULT_TEXTS}
      />
    );

    expect(getByText('Footer')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });

  it('Should render with expression with right side slot', () => {
    const onChangeLogic = jest.fn();
    const onChangeOrder = jest.fn();
    const onChangeStepMatching = jest.fn();
    const onDuplicateStep = jest.fn();
    const onDeleteStep = jest.fn();
    const onChangeStepName = jest.fn();
    const handleChangeMatching = jest.fn();
    renderWithProvider(
      <Filter
        expressions={[DEFAULT_EXPRESSION]}
        onChangeLogic={onChangeLogic}
        onChangeOrder={onChangeOrder}
        onChangeStepMatching={onChangeStepMatching}
        onChangeStepName={onChangeStepName}
        onDeleteStep={onDeleteStep}
        onDuplicateStep={onDuplicateStep}
        renderStepHeaderRightSide={() => <span>Right side</span>}
        matching={{
          onChange: handleChangeMatching,
          matching: true,
        }}
        texts={DEFAULT_TEXTS}
      />
    );

    expect(screen.getByText('Right side')).toBeInTheDocument();
  });
  it.todo('Should render single stepcard with up / down reorder arrows disabled')
  it.todo('Should render multiple stepcard with up / down reorder arrows enabled')
  it.todo('Should change order when up / down reorder arrows clicked n-times')
});


