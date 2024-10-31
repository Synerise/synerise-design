import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import React from 'react';
import Filter from '../Filter';
import { fireEvent } from '@testing-library/react';
import Button from '@synerise/ds-button';

const DEFAULT_TEXTS = {
  matching: {
    matching: 'Matching',
    notMatching: 'Not matching',
  },
  placeholder: {
    textPlaceholder: 'Choose items',
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
    // ARRANGE
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

    // ASSERT
    expect(getByText('Matching')).toBeTruthy();
  });
  it('Should render with add button', () => {
    // ARRANGE
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

    // ASSERT
    expect(getByText(DEFAULT_TEXTS.addFilter)).toBeTruthy();
    expect(onAdd).toBeCalled();
  });

  it('Should render with expression with footer and content', () => {
    // ARRANGE
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

    // ASSERT
    expect(getByText('Footer')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });

  it('Should render with expression with right side slot', () => {
    // ARRANGE
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
        renderStepHeaderRightSide={() => <span>Right side</span>}
        matching={{
          onChange: handleChangeMatching,
          matching: true,
        }}
        texts={DEFAULT_TEXTS}
      />
    );

    // ASSERT
    expect(getByText('Right side')).toBeTruthy();
  });
  it.todo('Should render single stepcard with up / down reorder arrows disabled')
  it.todo('Should render multiple stepcard with up / down reorder arrows enabled')
  it.todo('Should change order when up / down reorder arrows clicked n-times')
});


