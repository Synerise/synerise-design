import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils';
import Button from '@synerise/ds-button';
import { Tag, TagShape } from '../index';

describe('Tag', () => {
  const TAGNAME = 'Test';
  const TAG_TESTID = 'tag';
  const REMOVE_BUTTON_TESTID = 'remove-btn'

  const onClick = jest.fn();
  const onRemove = jest.fn();

  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} />
    );

    // ASSERT
    expect(getByText(TAGNAME)).toBeTruthy();
  });

  it('should render with remove button', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} removable />
    );

    // ASSERT
    expect(getByTestId(REMOVE_BUTTON_TESTID)).toBeTruthy();
  });

  it('should onRemove fire', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} onRemove={onRemove} removable />
    );

    // ACT
    fireEvent.click(getByTestId(REMOVE_BUTTON_TESTID));

    // ASSERT
    expect(onRemove).toHaveBeenCalled();
  });

  it('should onClick fire', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} onClick={onClick} />
    );

    // ACT
    fireEvent.click(getByTestId(TAG_TESTID));

    // ASSERT
    expect(onClick).toHaveBeenCalled();
  });

  it('should onClick fire if disabled', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} onClick={onClick} disabled />
    );

    // ACT
    fireEvent.click(getByTestId(TAG_TESTID));

    // ASSERT
    expect(onClick).toHaveBeenCalled();
  });

  it('should className be passed down', () => {
    // ARRANGE
    const TEST_CLASS = 'test-class';
    const { getByTestId } = renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} className={TEST_CLASS} />
    );

    // ASSERT
    expect(getByTestId(TAG_TESTID).classList.contains(TEST_CLASS)).toBe(true);
  });
});
