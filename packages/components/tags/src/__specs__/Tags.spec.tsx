import * as React from 'react';
import { fireEvent, getByText as globalGetByText } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils';
import Button from '@synerise/ds-button';
import Tags, { TagShape } from '../index';

describe('Tags', () => {
  const TAGS_TESTID = 'tags';
  const ADD_TAG_BUTTON = 'Add tag';
  const CREATE_TAG_BUTTON = 'Create tag';
  const DROPDOWN_TESTID = 'dropdown';
  const SEARCH_PLACEHOLDER = 'Search...';
  const MANAGE_LINK_LABEL = 'Manage Link Label';
  const CREATE_TAG_BTN_TESTID = 'create-tag-btn';

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

  const onClick = jest.fn();

  it('should render without any props', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Tags />
    );

    // ASSERT
    expect(getByTestId(TAGS_TESTID)).toBeTruthy();
  });

  it('should render with selected tags', () => {
    // ARRANGE
    const selected = [tagOne, tagTwo];

    const { getByTestId } = renderWithProvider(
      <Tags tagShape={TagShape.DEFAULT_ROUND} selected={selected} />
    );

    // ASSERT
    expect(getByTestId('tag-0')).toBeTruthy();
    expect(getByTestId('tag-1')).toBeTruthy();
  });

  it('should render with add tag button', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Tags
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
        }}
        addable
      />
    );

    // ASSERT
    expect(getByText(ADD_TAG_BUTTON)).toBeTruthy();
  });

  it('should render with available tags in dropdown', () => {
    // ARRANGE
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
      />
    );

    // ACT
    fireEvent.click(getByText(ADD_TAG_BUTTON));

    // ASSERT
    const dropdown = getByTestId(DROPDOWN_TESTID);

    expect(dropdown).toBeTruthy();
    expect(dropdown.querySelector(`[data-testid="tag-${tagOne.id}"]`)).toBeFalsy(); // already selected tag
    expect(dropdown.querySelector(`[data-testid="tag-${tagTwo.id}"]`)).toBeTruthy(); // not selected tag
  });

  it('should render with create button', () => {
    // ARRANGE
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
      />
    );

    // ACT
    fireEvent.click(getByText(ADD_TAG_BUTTON));
    fireEvent.change(getByPlaceholderText(SEARCH_PLACEHOLDER), { target: { value: tagOne.name.slice(0, -1) } });
    fireEvent.click(getByText(CREATE_TAG_BUTTON));

    // ASSERT
    const dropdown = getByTestId(DROPDOWN_TESTID);
    const foundTag = globalGetByText(dropdown, tagOne.name);

    expect(onCreate).toHaveBeenCalled();
    expect(foundTag).toBeTruthy();
  });

  it('should render with manage link', () => {
    // ARRANGE
    const data = [tagOne, tagTwo, tagThree];
    const selected = [];

    const { getByText, getByTestId, getByPlaceholderText } = renderWithProvider(
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
      />
    );

    // ACT
    fireEvent.click(getByText(ADD_TAG_BUTTON));
    fireEvent.change(getByPlaceholderText(SEARCH_PLACEHOLDER), { target: { value: 'anything' } });

    // ASSERT
    expect(getByText(MANAGE_LINK_LABEL)).toBeTruthy();
  });

  it('should fire onSelectedChange', () => {
    // ARRANGE
    const data = [tagOne, tagTwo, tagThree];
    const selected = [];

    const { getByText, getByTestId, getByPlaceholderText } = renderWithProvider(
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
      />
    );

    // ACT
    fireEvent.click(getByText(ADD_TAG_BUTTON));

    const dropdown = getByTestId(DROPDOWN_TESTID);
    const foundTag = globalGetByText(dropdown, tagOne.name);
    
    fireEvent.click(foundTag);

    // ASSERT
    expect(onSelectedChange).toHaveBeenCalled();
  })
});
