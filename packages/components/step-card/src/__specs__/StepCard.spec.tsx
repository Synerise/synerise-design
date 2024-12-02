import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import StepCard, { REORDER_THROTTLE } from './../StepCard';

const TEXTS = {
  matching: 'Matching',
  notMatching: 'Not matching',
  namePlaceholder: 'Placeholder',
  moveTooltip: 'Move',
  deleteTooltip: 'Delete',
  duplicateTooltip: 'Duplicate',
};

const FOOTER_CONTENT = 'Footer';
const HEADER_RIGHT_SIDE_CONTENT = 'Header right side slot';
const CONTENT = 'Content';
const STEP_CARD_NAME = 'funnel';

describe('StepCard', () => {
  it('Should render as matching with footer, name and content', () => {
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    renderWithProvider(
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
    expect(screen.getByText(TEXTS.matching)).toBeInTheDocument();
    expect(screen.queryByText(TEXTS.notMatching)).not.toBeInTheDocument();
    expect(screen.getByText(FOOTER_CONTENT)).toBeInTheDocument();
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });
  it('Should render with header right side slot', () => {
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    renderWithProvider(
      <StepCard
        matching={true}
        onChangeMatching={handleChangeMatching}
        name={STEP_CARD_NAME}
        onChangeName={handleChangeName}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        texts={TEXTS}
        headerRightSide={HEADER_RIGHT_SIDE_CONTENT}
      >
        {CONTENT}
      </StepCard>
    );
    expect(screen.getByText(HEADER_RIGHT_SIDE_CONTENT)).toBeInTheDocument();
  });
  it('Should call duplicate callback', () => {
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
    const duplicateIcon = container.querySelector('.duplicate-s');
    fireEvent.click(duplicateIcon as HTMLElement);

    expect(handleDuplicate).toBeCalled();
  });

  it('Should call delete callback', () => {
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
    const deleteIcon = container.querySelector('.trash-s');
    fireEvent.click(deleteIcon as HTMLElement);

    expect(handleDelete).toBeCalled();
  });
  it('Should render move arrow cruds', async () => {
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    const handleMove = jest.fn();
    const { container } = renderWithProvider(
      <StepCard
        matching={true}
        onChangeMatching={handleChangeMatching}
        name={STEP_CARD_NAME}
        onChangeName={handleChangeName}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onMove={handleMove}
        expressionIndex={1}
        expressionCount={3}
        texts={TEXTS}
        footer={FOOTER_CONTENT}
      >
        {CONTENT}
      </StepCard>
    );
    
    const moveUpArrow = container.querySelector('.moveup');
    expect(moveUpArrow).toBeInTheDocument();
    const moveDownArrow = container.querySelector('.movedown');
    expect(moveDownArrow).toBeInTheDocument();
    
    
  });
  it('Should call move callback', async () => {
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    const handleMove = jest.fn();
    const { container } = renderWithProvider(
      <StepCard
        matching={true}
        onChangeMatching={handleChangeMatching}
        name={STEP_CARD_NAME}
        onChangeName={handleChangeName}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onMove={handleMove}
        expressionIndex={1}
        expressionCount={3}
        texts={TEXTS}
        footer={FOOTER_CONTENT}
      >
        {CONTENT}
      </StepCard>
    );
    
    const moveUpArrow = container.querySelector('.moveup');
    fireEvent.click(moveUpArrow as HTMLElement);
    await waitFor(() => {
      expect(handleMove).toBeCalled();
    }, {
      timeout: REORDER_THROTTLE * 1.5
    });
  });


  it('Should not call move callback if moveup is clicked on first expression', async () => {
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    const handleMove = jest.fn();
    const { container } = renderWithProvider(
      <StepCard
        matching={true}
        onChangeMatching={handleChangeMatching}
        name={STEP_CARD_NAME}
        onChangeName={handleChangeName}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onMove={handleMove}
        expressionIndex={0}
        expressionCount={3}
        texts={TEXTS}
        footer={FOOTER_CONTENT}
      >
        {CONTENT}
      </StepCard>
    );
    
    const moveUpArrow = container.querySelector('.moveup');
    fireEvent.click(moveUpArrow as HTMLElement);
    await waitFor(() => {
      expect(handleMove).not.toBeCalled();
    }, {
      timeout: REORDER_THROTTLE * 1.5
    });
  });


  it('Should not call move callback if movedown is clicked on last expression', async () => {
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    const handleMove = jest.fn();
    const { container } = renderWithProvider(
      <StepCard
        matching={true}
        onChangeMatching={handleChangeMatching}
        name={STEP_CARD_NAME}
        onChangeName={handleChangeName}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onMove={handleMove}
        expressionIndex={2}
        expressionCount={3}
        texts={TEXTS}
        footer={FOOTER_CONTENT}
      >
        {CONTENT}
      </StepCard>
    );
    
    const moveDownArrow = container.querySelector('.movedown');
    fireEvent.click(moveDownArrow as HTMLElement);
    await waitFor(() => {
      expect(handleMove).not.toBeCalled();
    }, {
      timeout: REORDER_THROTTLE * 1.5
    });
  });

  it('Should call changeMatching callback', () => {
    const handleChangeMatching = jest.fn();
    const handleChangeName = jest.fn();
    const handleDuplicate = jest.fn();
    const handleDelete = jest.fn();
    renderWithProvider(
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
    fireEvent.click(screen.getByText(TEXTS.matching));

    expect(handleChangeMatching).toBeCalled();
  });
});
