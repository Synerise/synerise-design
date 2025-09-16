import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import Tag, { TagShape } from '../index';

describe('Tag', () => {
  const TAGNAME = 'Test';
  const TAG_TESTID = 'tag';
  const REMOVE_BUTTON_TESTID = 'remove-btn';

  const onClick = jest.fn();
  const onRemove = jest.fn();

  it('should render', () => {
    renderWithProvider(<Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} />);

    expect(screen.getByText(TAGNAME)).toBeInTheDocument();
  });

  it('should render with remove button', () => {
    renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} removable />,
    );

    expect(screen.getByTestId(REMOVE_BUTTON_TESTID)).toBeInTheDocument();
  });

  it('should onRemove fire', () => {
    renderWithProvider(
      <Tag
        id="test"
        shape={TagShape.DEFAULT_ROUND}
        name={TAGNAME}
        onRemove={onRemove}
        removable
      />,
    );

    fireEvent.click(screen.getByTestId(REMOVE_BUTTON_TESTID));

    expect(onRemove).toHaveBeenCalled();
  });

  it('should onClick fire', () => {
    renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} onClick={onClick} />,
    );

    fireEvent.click(screen.getByTestId(TAG_TESTID));

    expect(onClick).toHaveBeenCalled();
  });

  it('should onClick fire if disabled', () => {
    renderWithProvider(
      <Tag
        shape={TagShape.DEFAULT_ROUND}
        name={TAGNAME}
        onClick={onClick}
        disabled
      />,
    );

    fireEvent.click(screen.getByTestId(TAG_TESTID));

    expect(onClick).toHaveBeenCalled();
  });

  it('should className be passed down', () => {
    const TEST_CLASS = 'test-class';
    renderWithProvider(
      <Tag
        shape={TagShape.DEFAULT_ROUND}
        name={TAGNAME}
        className={TEST_CLASS}
      />,
    );

    expect(screen.getByTestId(TAG_TESTID).classList.contains(TEST_CLASS)).toBe(
      true,
    );
  });
});
