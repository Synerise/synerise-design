import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import StepCard from './../StepCard';
import { fireEvent } from '@testing-library/dom';

const TEXTS = {
  matching: 'Matching',
  notMatching: 'Not matching',
  namePlaceholder: 'Placeholder',
  moveTooltip: 'Move',
  deleteTooltip: 'Delete',
  duplicateTooltip: 'Duplicate',
};

const FOOTER_CONTENT = 'Footer';
const CONTENT = 'Content';
const STEP_CARD_NAME = 'funnel';

describe('StepCard', () => {
  it('Should render as matching with footer, name and content', () => {
    // ARRANGE
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    const { getByText, queryByText } = renderWithProvider(
      <StepCard
        matching={true}
        onChangeMatching={handleChangeMatching}
        name={STEP_CARD_NAME}
        onChangeName={handleChangeName}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        texts={TEXTS}
        footer={FOOTER_CONTENT}
      >
        {CONTENT}
      </StepCard>
    );
    // ASSERT
    expect(getByText(TEXTS.matching)).toBeTruthy();
    expect(queryByText(TEXTS.notMatching)).toBeFalsy();
    expect(getByText(FOOTER_CONTENT)).toBeTruthy();
    expect(getByText(CONTENT)).toBeTruthy();
    expect(getByText(STEP_CARD_NAME)).toBeTruthy();
  });
  it('Should call duplicate callback', () => {
    // ARRANGE
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    const { container } = renderWithProvider(
      <StepCard
        matching={true}
        onChangeMatching={handleChangeMatching}
        name={STEP_CARD_NAME}
        onChangeName={handleChangeName}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        texts={TEXTS}
        footer={FOOTER_CONTENT}
      >
        {CONTENT}
      </StepCard>
    );
    // ACT
    const duplicateIcon = container.querySelector('.duplicate-s');
    fireEvent.click(duplicateIcon as HTMLElement);

    // ASSERT
    expect(handleDuplicate).toBeCalled();
  });

  it('Should call delete callback', () => {
    // ARRANGE
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    const { container } = renderWithProvider(
      <StepCard
        matching={true}
        onChangeMatching={handleChangeMatching}
        name={STEP_CARD_NAME}
        onChangeName={handleChangeName}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        texts={TEXTS}
        footer={FOOTER_CONTENT}
      >
        {CONTENT}
      </StepCard>
    );
    // ACT
    const deleteIcon = container.querySelector('.trash-s');
    fireEvent.click(deleteIcon as HTMLElement);

    // ASSERT
    expect(handleDelete).toBeCalled();
  });

  it('Should call changeMatching callback', () => {
    // ARRANGE
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    const { getByText } = renderWithProvider(
      <StepCard
        matching={true}
        onChangeMatching={handleChangeMatching}
        name={STEP_CARD_NAME}
        onChangeName={handleChangeName}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        texts={TEXTS}
        footer={FOOTER_CONTENT}
      >
        {CONTENT}
      </StepCard>
    );
    // ACT
    fireEvent.click(getByText(TEXTS.matching));

    // ASSERT
    expect(handleChangeMatching).toBeCalled();
  });
});
