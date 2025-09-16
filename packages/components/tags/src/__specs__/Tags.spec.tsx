import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import {
  fireEvent,
  getByText as globalGetByText,
} from '@testing-library/react';

import Tags, { TagShape } from '../index';

describe('Tags', () => {
  const TAGS_TESTID = 'tags';
  const ADD_TAG_BUTTON = 'Add tag';
  const CREATE_TAG_BUTTON = 'Create tag';
  const DROPDOWN_TESTID = 'dropdown';
  const SEARCH_PLACEHOLDER = 'Search...';
  const MANAGE_LINK_LABEL = 'Manage Link Label';

  const onSelectedChange = jest.fn();
  const onCreate = jest.fn();

  const tagOne = {
    id: 0,
    name: 'Tag One',
  };

  const tagTwo = {
    id: 1,
    name: 'Tag Two',
  };

  const tagThree = {
    id: 2,
    name: 'Tag Three',
  };

  it('should render without any props', () => {
    const { getByTestId } = renderWithProvider(<Tags />);

    expect(getByTestId(TAGS_TESTID)).toBeTruthy();
  });

  it('should render with selected tags', () => {
    const selected = [tagOne, tagTwo];

    const { getByTestId } = renderWithProvider(
      <Tags tagShape={TagShape.DEFAULT_ROUND} selected={selected} />,
    );

    expect(getByTestId('tag-0')).toBeTruthy();
    expect(getByTestId('tag-1')).toBeTruthy();
  });

  it('should render with add tag button', () => {
    const { getByText } = renderWithProvider(
      <Tags
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
        }}
        addable
      />,
    );

    expect(getByText(ADD_TAG_BUTTON)).toBeTruthy();
  });

  it('should render with available tags in dropdown', () => {
    const data = [tagOne, tagTwo, tagThree];
    const selected = [tagOne];

    const { getByText, getByTestId } = renderWithProvider(
      <Tags
        data={data}
        selected={selected}
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
        }}
        addable
      />,
    );

    fireEvent.click(getByText(ADD_TAG_BUTTON));

    const dropdown = getByTestId(DROPDOWN_TESTID);

    expect(dropdown).toBeTruthy();
    expect(
      dropdown.querySelector(`[data-testid="tag-${tagOne.id}"]`),
    ).toBeFalsy(); // already selected tag
    expect(
      dropdown.querySelector(`[data-testid="tag-${tagTwo.id}"]`),
    ).toBeTruthy(); // not selected tag
  });

  it('should render with create button', () => {
    const data = [tagOne, tagTwo, tagThree];
    const selected = [];

    const { getByText, getByTestId, getByPlaceholderText } = renderWithProvider(
      <Tags
        data={data}
        selected={selected}
        onCreate={onCreate}
        texts={{
          createTagButtonLabel: CREATE_TAG_BUTTON,
          addButtonLabel: ADD_TAG_BUTTON,
          searchPlaceholder: SEARCH_PLACEHOLDER,
        }}
        addable
        creatable
      />,
    );

    fireEvent.click(getByText(ADD_TAG_BUTTON));
    fireEvent.change(getByPlaceholderText(SEARCH_PLACEHOLDER), {
      target: { value: tagOne.name.slice(0, -1) },
    });
    fireEvent.click(getByText(CREATE_TAG_BUTTON));

    const dropdown = getByTestId(DROPDOWN_TESTID);
    const foundTag = globalGetByText(dropdown, tagOne.name);

    expect(onCreate).toHaveBeenCalled();
    expect(foundTag).toBeTruthy();
  });

  it('should render with manage link', () => {
    const data = [tagOne, tagTwo, tagThree];
    const selected = [];

    const { getByText, getByPlaceholderText } = renderWithProvider(
      <Tags
        data={data}
        selected={selected}
        manageLink="https://synerise.com"
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
          manageLinkLabel: MANAGE_LINK_LABEL,
          searchPlaceholder: SEARCH_PLACEHOLDER,
        }}
        addable
      />,
    );

    fireEvent.click(getByText(ADD_TAG_BUTTON));
    fireEvent.change(getByPlaceholderText(SEARCH_PLACEHOLDER), {
      target: { value: 'anything' },
    });

    expect(getByText(MANAGE_LINK_LABEL)).toBeTruthy();
  });

  it('should fire onSelectedChange', () => {
    const data = [tagOne, tagTwo, tagThree];
    const selected = [];

    const { getByText, getByTestId } = renderWithProvider(
      <Tags
        data={data}
        selected={selected}
        onSelectedChange={onSelectedChange}
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
          searchPlaceholder: SEARCH_PLACEHOLDER,
        }}
        addable
        creatable
      />,
    );

    fireEvent.click(getByText(ADD_TAG_BUTTON));

    const dropdown = getByTestId(DROPDOWN_TESTID);
    const foundTag = globalGetByText(dropdown, tagOne.name);

    fireEvent.click(foundTag);

    expect(onSelectedChange).toHaveBeenCalled();
  });
});
